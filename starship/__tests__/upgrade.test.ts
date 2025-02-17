import { ConfigContext, generateMnemonic, useRegistry } from "starshipjs";
import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  initChain,
  POA_GROUP_ADDRESS,
  submitVoteExecGroupProposal,
  test1Mnemonic,
  test2Mnemonic,
} from "../src/test_helper";
import path from "path";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { getSigningCosmosClient } from "../../src";
import { createRPCQueryClient } from "../../src/codegen/cosmos/rpc.query";
import { Any } from "../../src/codegen/google/protobuf/any";
import { SigningStargateClient } from "@cosmjs/stargate";
import { MsgSoftwareUpgrade } from "../../src/codegen/cosmos/upgrade/v1beta1/tx";
import { Plan } from "../../src/codegen/cosmos/upgrade/v1beta1/upgrade";

const inits = [
  {
    description: "upgrade-module (proto-signing)",
    createWallets: createProtoWallet,
  },
  {
    description: "upgrade-module (amino-signing)",
    createWallets: createAminoWallet,
  },
];

describe.each(inits)("$description", ({ createWallets }) => {
  let test1Wallet: OfflineSigner,
    test1Address: string,
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
    fee = { amount: [{ denom, amount: "100000" }], gas: "550000" };

    test1Address = (await test1Wallet.getAccounts())[0].address;

    await chainData.creditFromFaucet(test1Address, denom);

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

  test("submit upgrade proposal", async () => {
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const currentHeight = await cosmosSigningClient.getHeight();
    
    // Create upgrade plan
    const plan = Plan.fromPartial({
      name: "v0.0.1-rc.5-cosmwasm",
      height: BigInt(currentHeight + 100), // Schedule upgrade 100 blocks in the future
      info: JSON.stringify({
        binaries: {
          "linux/amd64": "https://github.com/liftedinit/manifest-ledger/releases/download/v0.0.1-rc.5-cosmwasm/manifestd-v0.0.1-rc.5-cosmwasm-linux-amd64"
        }
      })
    });

    // Create upgrade message
    const upgradeMsg = Any.fromPartial({
      typeUrl: "/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade",
      value: MsgSoftwareUpgrade.encode({
        authority: POA_GROUP_ADDRESS,
        plan: plan
      }).finish()
    });

    // Submit proposal through group
    const proposalId = await submitVoteExecGroupProposal(
      test1Address,
      POA_GROUP_ADDRESS,
      cosmosSigningClient,
      "Upgrade to Manifest v0.0.1-rc.5-cosmwasm",
      "Upgrade to Manifest v0.0.1-rc.5-cosmwasm. This release includes CosmWasm support.",
      [test1Address],
      [upgradeMsg],
      fee
    );

    // Verify proposal was created
    const proposal = await queryClient.cosmos.group.v1.proposal({
      proposalId: proposalId
    });
    expect(proposal?.proposal?.title).toBe("Upgrade to Manifest v0.0.1-rc.5-cosmwasm");

    // Verify upgrade plan was scheduled
    const upgradePlan = await queryClient.cosmos.upgrade.v1beta1.currentPlan({});
    expect(upgradePlan.plan?.name).toBe("v0.0.1-rc.5-cosmwasm");
    expect(upgradePlan.plan?.height).toBe(BigInt(currentHeight + 100));
  }, 30000);
});
