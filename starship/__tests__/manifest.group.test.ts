import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  initChain,
  POA_GROUP_ADDRESS, submitVoteExecGroupProposal,
  test1Mnemonic,
  test2Mnemonic
  // @ts-ignore
} from '../src/test_helper';
import { OfflineSigner } from "@cosmjs/proto-signing";
import { SigningStargateClient } from '@cosmjs/stargate';
import path from "path";
import { ConfigContext, useRegistry } from "starshipjs";
import {getSigningCosmosClient} from "../../src/codegen";
import { MessageComposer as ManifestMessageComposer } from "../../src/codegen/liftedinit/manifest/v1/tx.registry";

const inits = [
  {
    description: "group-manifest-admin (proto-signing)",
    createWallets: createProtoWallet,
  },
  {
    description: "group-manifest-admin (amino-signing)",
    createWallets: createAminoWallet,
  },
];

// Test Manifest module endpoints that require POA Admin permissions with both proto and amino signing.
describe.each(inits)("$description", ({ createWallets }) => {
  let test1Wallet: OfflineSigner,
    test2Wallet: OfflineSigner,
    test1Address: string,
    test2Address: string,
    rpcEndpoint: string,
    fee: { amount: { denom: string; amount: string }[]; gas: string },
    cosmosSigningClient: SigningStargateClient;
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

    test1Wallet = await createWallets(test1Mnemonic, chainData.prefix);
    test2Wallet = await createWallets(test2Mnemonic, chainData.prefix);
    fee = { amount: [{ denom, amount: "100000" }], gas: "550000" };

    test1Address = (await test1Wallet.getAccounts())[0].address;
    test2Address = (await test2Wallet.getAccounts())[0].address;

    expect(test1Address).not.toEqual(test2Address);

    await chainData.creditFromFaucet(test1Address, denom);
    await chainData.creditFromFaucet(test2Address, denom);

    cosmosSigningClient = await getSigningCosmosClient({
      rpcEndpoint,
      signer: test1Wallet,
    });
    await cosmosSigningClient.sendTokens(
      test1Address,
      POA_GROUP_ADDRESS,
      [{ denom, amount: "100000000" }],
      fee
    );
  });

  test("payout (manifest)", async () => {
    const client = await getSigningCosmosClient({
      rpcEndpoint,
      signer: test1Wallet,
    });
    const beforeBalance = await client.getBalance(test2Address, denom);
    const proposal = ManifestMessageComposer.encoded.payout({
      authority: POA_GROUP_ADDRESS,
      payoutPairs: [
        {
          address: test2Address,
          coin: { denom, amount: "1000" },
        },
      ],
    });

    await submitVoteExecGroupProposal(
      test1Address,
      client,
      "payout",
      "some payout",
      [test1Address],
      [proposal],
      fee
    );

    const afterBalance = await client.getBalance(test2Address, denom);
    expect(afterBalance.amount).toEqual(
      (parseInt(beforeBalance.amount) + 1000).toString()
    );
  }, 30000);

  test("burn (manifest)", async () => {
    const proposal = ManifestMessageComposer.encoded.burnHeldBalance({
        authority: POA_GROUP_ADDRESS,
        burnCoins: [{ denom, amount: "1000" }],
      });

    const beforeBalance = await cosmosSigningClient.getBalance(
      POA_GROUP_ADDRESS,
      denom
    );
    await submitVoteExecGroupProposal(
      test1Address,
      cosmosSigningClient,
      "burn",
      "some burn",
      [test1Address],
      [proposal],
      fee
    );

    const afterBalance = await cosmosSigningClient.getBalance(
      POA_GROUP_ADDRESS,
      denom
    );
    expect(afterBalance.amount).toEqual(
      (parseInt(beforeBalance.amount) - 1000).toString()
    );
  }, 30000);
});
