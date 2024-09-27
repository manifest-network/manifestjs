import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  generateRandomString,
  initChain,
  POA_GROUP_ADDRESS,
  // @ts-ignore
} from "../src/test_helper";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { MessageComposer } from "../../src/codegen/osmosis/tokenfactory/v1beta1/tx.registry";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { createRPCQueryClient } from "../../src/codegen/osmosis/rpc.query";
import { ConfigContext, generateMnemonic, useRegistry } from "starshipjs";
import {
  DenomUnit,
  Metadata,
} from "../../src/codegen/cosmos/bank/v1beta1/bank";
import path from "path";
import { getSigningOsmosisClient } from "../../src/codegen";

const inits = [
  {
    description: "tokenfactory-module (proto-signing)",
    createWallets: createProtoWallet,
  },
  {
    description: "tokenfactory-module (amino-signing)",
    createWallets: createAminoWallet,
  },
];

// Test TokenFactory module endpoints with both proto and amino signing.
describe.each(inits)("$description", ({ createWallets }) => {
  let t1Wallet: OfflineSigner,
    t2Wallet: OfflineSigner,
    t1Addr: string,
    t2Addr: string,
    rpcEndpoint: string,
    subdenom: string,
    fee: { amount: { denom: string; amount: string }[]; gas: string };
  const denom = "umfx";

  beforeAll(async () => {
    const configFile = path.join(
      __dirname,
      "..",
      "configs",
      "config.group.local.yaml"
    );
    ConfigContext.setConfigFile(configFile);
    ConfigContext.setRegistry(await useRegistry(configFile));

    const chainData = await initChain("manifest-ledger-beta");
    rpcEndpoint = chainData.rpcEndpoint;

    await checkPoaAdminIs(rpcEndpoint, POA_GROUP_ADDRESS);

    t1Wallet = await createWallets(generateMnemonic(), chainData.prefix);
    t2Wallet = await createWallets(generateMnemonic(), chainData.prefix);

    fee = { amount: [{ denom, amount: "100000" }], gas: "55000000" };

    subdenom = "u" + generateRandomString(5);

    t1Addr = (await t1Wallet.getAccounts())[0].address;
    t2Addr = (await t2Wallet.getAccounts())[0].address;

    await chainData.creditFromFaucet(t1Addr);
    await chainData.creditFromFaucet(t2Addr);
  });

  test("create denom", async () => {
    const client = await getSigningOsmosisClient({
      rpcEndpoint,
      signer: t1Wallet,
    });
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const msg = MessageComposer.fromPartial.createDenom({
      sender: t1Addr,
      subdenom,
    });
    const result = await client.signAndBroadcast(
      t1Addr,
      [msg],
      fee,
      "create denom"
    );
    assertIsDeliverTxSuccess(result);
    expect(result.code).toBe(0);

    const fullDenom = "factory/" + t1Addr + "/" + subdenom;

    const creator =
      await queryClient.osmosis.tokenfactory.v1beta1.denomsFromCreator({
        creator: t1Addr,
      });
    expect(creator.denoms.length).toBe(1);
    expect(creator.denoms[0]).toBe(fullDenom);
  });

  test("modify metadata", async () => {
    const client = await getSigningOsmosisClient({
      rpcEndpoint,
      signer: t1Wallet,
    });
    const queryClient = await createRPCQueryClient({ rpcEndpoint });

    const creator =
      await queryClient.osmosis.tokenfactory.v1beta1.denomsFromCreator({
        creator: t1Addr,
      });
    expect(creator.denoms.length).toBe(1);
    const denom = creator.denoms[0];
    const symbol = subdenom.slice(1).toUpperCase();

    const msg = MessageComposer.fromPartial.setDenomMetadata({
      sender: t1Addr,
      metadata: Metadata.fromPartial({
        description: "test description",
        display: symbol,
        base: denom,
        symbol: symbol,
        name: "test name",
        uri: "",
        uriHash: "",
        denomUnits: [
          DenomUnit.fromPartial({ denom, exponent: 0, aliases: [symbol] }),
          DenomUnit.fromPartial({
            denom: symbol,
            exponent: 6,
            aliases: [denom],
          }),
        ],
      }),
    });
    const result = await client.signAndBroadcast(
      t1Addr,
      [msg],
      fee,
      "set denom metadata"
    );
    assertIsDeliverTxSuccess(result);
    expect(result.code).toBe(0);

    const meta = await queryClient.cosmos.bank.v1beta1.denomMetadata({ denom });
    expect(meta.metadata).toStrictEqual(msg.value.metadata);
  });

  test("mint", async () => {
    const client = await getSigningOsmosisClient({
      rpcEndpoint,
      signer: t1Wallet,
    });
    const queryClient = await createRPCQueryClient({ rpcEndpoint });

    const creator =
      await queryClient.osmosis.tokenfactory.v1beta1.denomsFromCreator({
        creator: t1Addr,
      });
    const denom = creator.denoms[0];

    const initBalance = await queryClient.cosmos.bank.v1beta1.balance({
      address: t1Addr,
      denom,
    });
    const amount = 1000000;

    const msg = MessageComposer.fromPartial.mint({
      sender: t1Addr,
      amount: { denom, amount: amount.toString() },
      mintToAddress: t1Addr,
    });

    const result = await client.signAndBroadcast(t1Addr, [msg], fee, "mint");
    assertIsDeliverTxSuccess(result);
    expect(result.code).toBe(0);

    const balance = await queryClient.cosmos.bank.v1beta1.balance({
      address: t1Addr,
      denom,
    });
    expect(balance.balance.amount).toBe(
      (parseInt(initBalance.balance.amount) + amount).toString()
    );
  });

  test("burn", async () => {
    const client = await getSigningOsmosisClient({
      rpcEndpoint,
      signer: t1Wallet,
    });
    const queryClient = await createRPCQueryClient({ rpcEndpoint });

    const creator =
      await queryClient.osmosis.tokenfactory.v1beta1.denomsFromCreator({
        creator: t1Addr,
      });
    const denom = creator.denoms[0];

    const initBalance = await queryClient.cosmos.bank.v1beta1.balance({
      address: t1Addr,
      denom,
    });
    const amount = 50000;

    const msg = MessageComposer.fromPartial.burn({
      sender: t1Addr,
      amount: { denom, amount: amount.toString() },
      burnFromAddress: t1Addr,
    });

    const result = await client.signAndBroadcast(t1Addr, [msg], fee, "burn");
    assertIsDeliverTxSuccess(result);
    expect(result.code).toBe(0);

    const balance = await queryClient.cosmos.bank.v1beta1.balance({
      address: t1Addr,
      denom,
    });
    expect(balance.balance.amount).toBe(
      (parseInt(initBalance.balance.amount) - amount).toString()
    );
  });

  test("change admin", async () => {
    const client = await getSigningOsmosisClient({
      rpcEndpoint,
      signer: t1Wallet,
    });
    const queryClient = await createRPCQueryClient({ rpcEndpoint });

    const creator =
      await queryClient.osmosis.tokenfactory.v1beta1.denomsFromCreator({
        creator: t1Addr,
      });
    const denom = creator.denoms[0];

    const msg = MessageComposer.fromPartial.changeAdmin({
      sender: t1Addr,
      newAdmin: t2Addr,
      denom,
    });

    const result = await client.signAndBroadcast(
      t1Addr,
      [msg],
      fee,
      "change admin"
    );
    assertIsDeliverTxSuccess(result);
    expect(result.code).toBe(0);

    const admin =
      await queryClient.osmosis.tokenfactory.v1beta1.denomAuthorityMetadata({
        denom,
      });
    expect(admin.authorityMetadata.admin).toBe(t2Addr);
  });
});
