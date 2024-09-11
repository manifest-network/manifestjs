import "./setup.test";

import { OfflineSigner } from "@cosmjs/proto-signing";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { getSigningLiftedinitClient } from "../../src";
// @ts-ignore
import {
  createAminoWallet,
  createBurnMsg,
  createMsgPayout,
  createPayoutPair,
  createProtoWallet,
  initChain,
  poaAdminMnemonic,
  test1Mnemonic,
} from "../src/test_helper";

const inits = [
  {
    description: "manifest-module (proto-signing)",
    createWallets: createProtoWallet,
    mnemonics: [poaAdminMnemonic, test1Mnemonic],
  },
  {
    description: "manifest-module (amino-signing)",
    createWallets: createAminoWallet,
    mnemonics: [poaAdminMnemonic, test1Mnemonic],
  },
];

// Test all endpoints of the Manifest module with both Proto and Amino signing
describe.each(inits)("$description", ({ createWallets, mnemonics }) => {
  let poaWallet: OfflineSigner,
    test1Wallet: OfflineSigner,
    poaAddress: string,
    test1Address: string,
    denom: string,
    rpcEndpoint: string,
    fee: { amount: { denom: string; amount: string }[]; gas: string };

  beforeAll(async () => {
    expect(mnemonics.length).toEqual(2);

    const chainData = await initChain("manifest-ledger-beta");
    denom = chainData.denom;
    rpcEndpoint = chainData.rpcEndpoint;

    poaWallet = await createWallets(mnemonics[0], chainData.prefix);
    test1Wallet = await createWallets(mnemonics[1], chainData.prefix);

    fee = { amount: [{ denom, amount: "100000" }], gas: "550000" };

    poaAddress = (await poaWallet.getAccounts())[0].address;
    test1Address = (await test1Wallet.getAccounts())[0].address;

    await chainData.creditFromFaucet(poaAddress);
    await chainData.creditFromFaucet(test1Address);
  });

  test("mint tokens to destination", async () => {
    const signingClient = await getSigningClient();
    const mintAmount = 1000000;

    const test1InitBalance = await signingClient.getBalance(
      test1Address,
      denom
    );
    const resultBalance = BigInt(test1InitBalance.amount) + BigInt(mintAmount);

    const payoutMsg = createMsgPayout(poaAddress, [
      createPayoutPair(test1Address, denom, mintAmount),
    ]);
    const resp = await signingClient.signAndBroadcast(
      poaAddress,
      [payoutMsg],
      fee
    );

    assertIsDeliverTxSuccess(resp);
    const test1Balance = await signingClient.getBalance(test1Address, denom);
    expect(test1Balance.amount).toEqual(resultBalance.toString());
  });

  test("burn tokens from self", async () => {
    const signingClient = await getSigningClient();
    const burnAmount = 1000000;

    const poaInitialBalance = await signingClient.getBalance(poaAddress, denom);
    const resultBalance =
      BigInt(poaInitialBalance.amount) -
      BigInt(burnAmount) -
      BigInt(fee.amount[0].amount);

    const burnMsg = createBurnMsg(poaAddress, burnAmount, denom);
    const resp = await signingClient.signAndBroadcast(
      poaAddress,
      [burnMsg],
      fee
    );

    assertIsDeliverTxSuccess(resp);
    const poaBalance = await signingClient.getBalance(poaAddress, denom);
    expect(poaBalance.amount).toEqual(resultBalance.toString());
  });

  const getSigningClient = async () => {
    return await getSigningLiftedinitClient({
      rpcEndpoint,
      signer: poaWallet,
    });
  };
});
