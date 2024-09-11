import "./setup.test";

import { generateMnemonic, useChain } from "starshipjs";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {
  assertIsDeliverTxSuccess,
  createProtobufRpcClient,
  QueryClient,
  setupBankExtension,
} from "@cosmjs/stargate";
import {
  MsgBurnHeldBalance,
  MsgPayout,
} from "../../src/codegen/liftedinit/manifest/v1/tx";
import { getSigningLiftedinitClient } from "../../src";
import { QueryClientImpl } from "../../src/codegen/liftedinit/manifest/v1/query.rpc.Query";
// @ts-ignore
import { poaAdminMnemonic } from "../src/test_helper";
import { HttpEndpoint, Tendermint37Client } from "@cosmjs/tendermint-rpc";

describe("manifest module", () => {
  let poaWallet: DirectSecp256k1HdWallet,
    randomWallet: DirectSecp256k1HdWallet,
    denom: string;
  let getRpcEndpoint: () =>
    | string
    | HttpEndpoint
    | PromiseLike<string | HttpEndpoint>;

  beforeAll(async () => {
    let chainInfo: { chain: { bech32_prefix: any } },
      getCoin: () => any,
      creditFromFaucet: (arg0: string) => any;
    ({ chainInfo, getCoin, getRpcEndpoint, creditFromFaucet } = useChain(
      "manifest-ledger-beta"
    ));
    denom = (await getCoin()).base;

    // Initialize wallet
    poaWallet = await DirectSecp256k1HdWallet.fromMnemonic(poaAdminMnemonic, {
      prefix: chainInfo.chain.bech32_prefix,
    });
    const address = (await poaWallet.getAccounts())[0].address;

    randomWallet = await DirectSecp256k1HdWallet.fromMnemonic(
      generateMnemonic(),
      { prefix: chainInfo.chain.bech32_prefix }
    );
    const randomAddress = (await randomWallet.getAccounts())[0].address;

    await creditFromFaucet(address);
    await creditFromFaucet(randomAddress);
  });

  test("mint tokens to destination", async () => {
    const signingClient = await getSigningClient();
    const fee = getFee();
    const initialAmount = 1000000000000;
    const mintAmount = 1000000;
    const resultBalance = initialAmount + mintAmount;

    const poaAddress = (await poaWallet.getAccounts())[0].address;
    const randomAddress = (await randomWallet.getAccounts())[0].address;
    await checkBalance(randomAddress, initialAmount);

    const payoutMsg = {
      typeUrl: MsgPayout.typeUrl,
      value: MsgPayout.fromPartial({
        authority: poaAddress,
        payoutPairs: [
          {
            address: randomAddress,
            coin: { denom, amount: mintAmount.toString() },
          },
        ],
      }),
    };
    const resp = await signingClient.signAndBroadcast(
      poaAddress,
      [payoutMsg],
      fee
    );

    assertIsDeliverTxSuccess(resp);
    await checkBalance(randomAddress, resultBalance);
  });

  test("burn tokens from self", async () => {
    const signingClient = await getSigningClient();
    const fee = getFee();
    const burnAmount = 1000000;

    const poaAddress = (await poaWallet.getAccounts())[0].address;
    const balance = await signingClient.getBalance(poaAddress, denom);
    expect(balance.denom).toEqual(denom);

    const resultBalance =
      BigInt(balance.amount) -
      BigInt(burnAmount) -
      BigInt(fee.amount[0].amount);

    const burnMsg = {
      typeUrl: MsgBurnHeldBalance.typeUrl,
      value: MsgBurnHeldBalance.fromPartial({
        authority: poaAddress,
        burnCoins: [{ denom, amount: burnAmount.toString() }],
      }),
    };
    const resp = await signingClient.signAndBroadcast(
      poaAddress,
      [burnMsg],
      fee
    );

    assertIsDeliverTxSuccess(resp);
    await checkBalance(poaAddress, resultBalance);
  });

  const getFee = () => ({
    amount: [{ denom, amount: "100000" }],
    gas: "550000",
  });

  const getSigningClient = async () => {
    return await getSigningLiftedinitClient({
      rpcEndpoint: await getRpcEndpoint(),
      signer: poaWallet,
    });
  };

  const getQueryClient = async () => {
    const cometClient = await Tendermint37Client.connect(
      await getRpcEndpoint()
    );
    return QueryClient.withExtensions(
      cometClient,
      setupBankExtension
    );
  };

  const checkBalance = async (
    addr: string,
    expectedAmount: number | bigint
  ) => {
    const client = await getQueryClient();
    const balance = await client.bank.balance(addr, denom);
    expect(balance.amount).toEqual(expectedAmount.toString());
    expect(balance.denom).toEqual(denom);
  };
});
