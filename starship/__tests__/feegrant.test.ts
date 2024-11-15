import { ConfigContext, generateMnemonic, useRegistry } from "starshipjs";
import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  initChain,
  POA_GROUP_ADDRESS,
} from "../src/test_helper";
import path from "path";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { getSigningCosmosClient } from "../../src";
import { createRPCQueryClient } from "../../src/codegen/cosmos/rpc.query";
import {
  AllowedMsgAllowance,
  BasicAllowance,
} from "../../src/codegen/cosmos/feegrant/v1beta1/feegrant";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { MessageComposer } from "../../src/codegen/cosmos/feegrant/v1beta1/tx.registry";

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

const inits = [
  {
    description: "feegrant-module (proto-signing)",
    createWallets: createProtoWallet,
  },
  {
    description: "feegrant-module (amino-signing)",
    createWallets: createAminoWallet,
  },
];

// Test Group module endpoints with both proto and amino signing.
describe.each(inits)("$description", ({ description, createWallets }) => {
  let test1Wallet: OfflineSigner,
    test2Wallet: OfflineSigner,
    t1Addr: string,
    t2Addr: string,
    rpcEndpoint: string,
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

    test1Wallet = await createWallets(generateMnemonic(), chainData.prefix);
    test2Wallet = await createWallets(generateMnemonic(), chainData.prefix);
    fee = { amount: [{ denom, amount: "100000" }], gas: "550000" };

    t1Addr = (await test1Wallet.getAccounts())[0].address;
    t2Addr = (await test2Wallet.getAccounts())[0].address;

    await chainData.creditFromFaucet(t1Addr, denom);
    await chainData.creditFromFaucet(t2Addr, denom);
  });

  test("feegrant", async () => {
    const client = await getSigningCosmosClient({
      rpcEndpoint,
      signer: test1Wallet,
    });
    const queryClient = await createRPCQueryClient({ rpcEndpoint });

    const msg = MessageComposer.fromPartial.grantAllowance({
      granter: t1Addr,
      grantee: t2Addr,
      allowance: AllowedMsgAllowance.fromPartial({
        allowance: BasicAllowance.fromPartial({
          spendLimit: [{ denom, amount: "1000000" }],
          expiration: null,
        }),
        allowedMessages: ["/cosmos.bank.v1beta1.MsgSend"],
      }),
    });

    const result = await client.signAndBroadcast(t1Addr, [msg], fee);
    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);

    const allowance = await queryClient.cosmos.feegrant.v1beta1.allowance({
      granter: t1Addr,
      grantee: t2Addr,
    });
    expect(allowance.allowance.granter).toEqual(t1Addr);
    expect(allowance.allowance.grantee).toEqual(t2Addr);
  });
});
