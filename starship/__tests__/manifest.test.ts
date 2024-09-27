import { OfflineSigner } from "@cosmjs/proto-signing";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  initChain, POA_ADDRESS,
  poaAdminMnemonic,
  test1Mnemonic,
  // @ts-ignore
} from "../src/test_helper";
import { createRPCQueryClient } from "../../src/codegen/liftedinit/rpc.query";
import { MessageComposer } from "../../src/codegen/liftedinit/manifest/v1/tx.registry";
import { PayoutPair } from "../../src/codegen/liftedinit/manifest/v1/tx";
import path from "path";
import {ConfigContext, useRegistry} from "starshipjs";
import {getSigningLiftedinitClient} from "../../src/codegen";

const inits = [
  {
    description: "manifest-module (proto-signing)",
    createWallets: createProtoWallet,
  },
  {
    description: "manifest-module (amino-signing)",
    createWallets: createAminoWallet,
  },
];

// Test all endpoints of the Manifest module with both Proto and Amino signing
describe.each(inits)("$description", ({ createWallets }) => {
  let poaWallet: OfflineSigner,
    test1Wallet: OfflineSigner,
    poaAddress: string,
    test1Address: string,
    rpcEndpoint: string,
    fee: { amount: { denom: string; amount: string }[]; gas: string };
  const denom = "umfx";

  beforeAll(async () => {
    const configFile = path.join(__dirname, "..", "configs", "config.local.yaml");
    ConfigContext.setConfigFile(configFile);
    ConfigContext.setRegistry(await useRegistry(configFile));

    const chainData = await initChain("manifest-ledger-beta");
    rpcEndpoint = chainData.rpcEndpoint;

    await checkPoaAdminIs(rpcEndpoint, POA_ADDRESS);

    poaWallet = await createWallets(poaAdminMnemonic, chainData.prefix);
    test1Wallet = await createWallets(test1Mnemonic, chainData.prefix);

    fee = { amount: [{ denom, amount: "100000" }], gas: "550000" };

    poaAddress = (await poaWallet.getAccounts())[0].address;
    test1Address = (await test1Wallet.getAccounts())[0].address;

    await chainData.creditFromFaucet(poaAddress);
    await chainData.creditFromFaucet(test1Address);
  });

  test("mint tokens to destination", async () => {
    const signingClient = await getSigningLiftedinitClient({
      rpcEndpoint,
      signer: poaWallet,
    });
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const mintAmount = 1000000;

    const test1InitBalance = await queryClient.cosmos.bank.v1beta1.balance({
      address: test1Address,
      denom,
    });
    const resultBalance =
      BigInt(test1InitBalance.balance.amount) + BigInt(mintAmount);

    const payoutMsg = MessageComposer.fromPartial.payout({
      authority: poaAddress,
      payoutPairs: [
        PayoutPair.fromPartial({
          address: test1Address,
          coin: { denom, amount: mintAmount.toString() },
        }),
      ],
    });

    const resp = await signingClient.signAndBroadcast(
      poaAddress,
      [payoutMsg],
      fee
    );
    assertIsDeliverTxSuccess(resp);
    const test1Balance = await queryClient.cosmos.bank.v1beta1.balance({
      address: test1Address,
      denom,
    });
    expect(test1Balance.balance.amount).toEqual(resultBalance.toString());
  });

  test("burn tokens from self", async () => {
    const signingClient = await getSigningLiftedinitClient({
      rpcEndpoint,
      signer: poaWallet,
    });
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const burnAmount = 1000000;

    const poaInitialBalance = await queryClient.cosmos.bank.v1beta1.balance({
      address: poaAddress,
      denom,
    });
    const resultBalance =
      BigInt(poaInitialBalance.balance.amount) -
      BigInt(burnAmount) -
      BigInt(fee.amount[0].amount);

    const burnMsg = MessageComposer.fromPartial.burnHeldBalance({
      authority: poaAddress,
      burnCoins: [{ amount: burnAmount.toString(), denom }],
    });
    const resp = await signingClient.signAndBroadcast(
      poaAddress,
      [burnMsg],
      fee
    );

    assertIsDeliverTxSuccess(resp);
    const poaBalance = await signingClient.getBalance(poaAddress, denom);
    expect(poaBalance.amount).toEqual(resultBalance.toString());
  });
});
