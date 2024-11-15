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
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { MessageComposer } from "../../src/codegen/cosmos/authz/v1beta1/tx.registry";
import { SendAuthorization } from "../../src/codegen/cosmos/bank/v1beta1/authz";
import { Grant } from "../../src/codegen/cosmos/authz/v1beta1/authz";

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

const inits = [
  {
    description: "authz-module (proto-signing)",
    createWallets: createProtoWallet,
  },
  {
    description: "authz-module (amino-signing)",
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

  test("authz grant", async () => {
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const signingClient = await getSigningCosmosClient({
      rpcEndpoint,
      signer: test1Wallet,
    });

    const msg = MessageComposer.fromPartial.grant({
      grantee: t2Addr,
      granter: t1Addr,
      grant: Grant.fromPartial({
        authorization: SendAuthorization.fromPartial({
          spendLimit: [{ denom: "umfx", amount: "10000" }],
          allowList: [""], // The list MUST contain a value, otherwise the signed message and the message decoded by the server won't match as the field gets omitted
        }),
        expiration: null,
      }),
    });

    const result = await signingClient.signAndBroadcast(t1Addr, [msg], fee);
    assertIsDeliverTxSuccess(result);

    const grants = await queryClient.cosmos.authz.v1beta1.granterGrants({
      granter: t1Addr,
    });
    expect(grants.grants.length).toBe(1);
    expect(grants.grants[0].grantee).toBe(t2Addr);
  });
});
