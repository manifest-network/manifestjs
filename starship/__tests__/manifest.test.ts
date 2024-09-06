import "./setup.test";

import { generateMnemonic, useChain } from "starshipjs";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {
  assertIsDeliverTxSuccess,
  SigningStargateClient,
} from "@cosmjs/stargate";
import {
  MsgBurnHeldBalance,
  MsgPayout,
} from "../../src/codegen/liftedinit/manifest/v1/tx";
import { getSigningLiftedinitClient } from "../../src";

// This is the POA_ADMIN_ADDRESS mnemonic as defined in the config.yaml file
const poaAdminMnemonic =
  "razor dog gown public private couple ecology paper flee connect local robot diamond stay rude join sound win ribbon soup kidney glass robot vehicle";

describe("manifest module", () => {
  let wallet, denom, address, address2;
  let chainInfo, getCoin, getRpcEndpoint, creditFromFaucet;

  beforeAll(async () => {
    ({ chainInfo, getCoin, getRpcEndpoint, creditFromFaucet } = useChain(
      "manifest-ledger-beta"
    ));
    denom = (await getCoin()).base;

    // Initialize wallet
    wallet = await DirectSecp256k1HdWallet.fromMnemonic(poaAdminMnemonic, {
      prefix: chainInfo.chain.bech32_prefix,
    });
    address = (await wallet.getAccounts())[0].address;

    const wallet2 = await DirectSecp256k1HdWallet.fromMnemonic(
      generateMnemonic(),
      { prefix: chainInfo.chain.bech32_prefix }
    );
    address2 = (await wallet2.getAccounts())[0].address;

    await creditFromFaucet(address);
    await creditFromFaucet(address2);
  });

  const getFee = () => ({
    amount: [{ denom, amount: "100000" }],
    gas: "550000",
  });

  const getSigningClient = async () => {
    return await getSigningLiftedinitClient({
      rpcEndpoint: await getRpcEndpoint(),
      signer: wallet,
    });
  };

  const checkBalance = async (
    client: SigningStargateClient,
    addr: string,
    expectedAmount: number | bigint
  ) => {
    const balance = await client.getBalance(addr, denom);
    expect(balance.amount).toEqual(expectedAmount.toString());
    expect(balance.denom).toEqual(denom);
  };

  test("mint tokens to destination", async () => {
    const signingClient = await getSigningClient();
    const fee = getFee();
    const initialAmount = 1000000000000;
    const mintAmount = 1000000;
    const resultBalance = initialAmount + mintAmount;

    await checkBalance(signingClient, address2, initialAmount);

    const payoutMsg = {
      typeUrl: MsgPayout.typeUrl,
      value: MsgPayout.fromPartial({
        authority: address,
        payoutPairs: [
          { address: address2, coin: { denom, amount: mintAmount.toString() } },
        ],
      }),
    };
    const resp = await signingClient.signAndBroadcast(
      address,
      [payoutMsg],
      fee
    );

    assertIsDeliverTxSuccess(resp);
    await checkBalance(signingClient, address2, resultBalance);
  });

  test("burn tokens from self", async () => {
    const signingClient = await getSigningClient();
    const fee = getFee();
    const burnAmount = 1000000;

    const balance = await signingClient.getBalance(address, denom);
    expect(balance.denom).toEqual(denom);

    const resultBalance =
      BigInt(balance.amount) -
      BigInt(burnAmount) -
      BigInt(fee.amount[0].amount);

    const burnMsg = {
      typeUrl: MsgBurnHeldBalance.typeUrl,
      value: MsgBurnHeldBalance.fromPartial({
        authority: address,
        burnCoins: [{ denom, amount: burnAmount.toString() }],
      }),
    };
    const resp = await signingClient.signAndBroadcast(address, [burnMsg], fee);

    assertIsDeliverTxSuccess(resp);
    await checkBalance(signingClient, address, resultBalance);
  });
});
