import path from "path";
import { ConfigContext, useRegistry } from "starshipjs";
import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  generateRandomString,
  initChain,
  POA_GROUP_ADDRESS,
  submitVoteExecGroupProposal,
  test1Mnemonic,
  test2Mnemonic,
  // @ts-ignore
} from "../src/test_helper";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { MessageComposer as TokenFactoryMessageComposer } from "../../src/codegen/osmosis/tokenfactory/v1beta1/tx.registry";
import { Any } from "../../src/codegen/google/protobuf/any";
import { getSigningCosmosClient } from "../../src/codegen";
import { createRPCQueryClient as TokenfactoryRPCQueryClient } from "../../src/codegen/osmosis/rpc.query";
import { SigningStargateClient } from "@cosmjs/stargate";
import {
  DenomUnit,
  Metadata,
} from "../../src/codegen/cosmos/bank/v1beta1/bank";

const inits = [
  {
    description: "group-tokenfactory-admin (proto-signing)",
    createWallets: createProtoWallet,
  },
  {
    description: "group-tokenfactory-admin (amino-signing)",
    createWallets: createAminoWallet,
  },
];

// Test TokenFactory module endpoints through the POA Admin with both proto and amino signing.
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

  test("create denom (tokenfactory)", async () => {
    const queryClient = await TokenfactoryRPCQueryClient({ rpcEndpoint });
    const [_, fullDenom] = await createRandomDenom();
    const denomAuthorityMetadata =
      await queryClient.osmosis.tokenfactory.v1beta1.denomAuthorityMetadata({
        denom: fullDenom,
      });
    expect(denomAuthorityMetadata.authorityMetadata.admin).toEqual(
      POA_GROUP_ADDRESS
    );
  }, 20000);

  test("set denom metadata (tokenfactory)", async () => {
    const queryClient = await TokenfactoryRPCQueryClient({ rpcEndpoint });
    const [subdenom, fullDenom] = await createRandomDenom();
    const display = subdenom.slice(1).toUpperCase();
    const metadata = Metadata.fromPartial({
      description: "test description",
      base: fullDenom,
      display,
      name: "test name",
      symbol: display,
      denomUnits: [
        DenomUnit.fromPartial({
          denom: fullDenom,
          exponent: 0,
          aliases: [display],
        }),
        DenomUnit.fromPartial({
          denom: display,
          exponent: 6,
          aliases: [fullDenom],
        }),
      ],
    });
    const setMetadataMsg = Any.fromPartial(
      TokenFactoryMessageComposer.encoded.setDenomMetadata({
        sender: POA_GROUP_ADDRESS,
        metadata,
      })
    );
    await submitVoteExecGroupProposal(
      test1Address,
      POA_GROUP_ADDRESS,
      cosmosSigningClient,
      "set denom metadata",
      "some set denom metadata",
      [test1Address],
      [setMetadataMsg],
      fee
    );

    const meta = await queryClient.cosmos.bank.v1beta1.denomMetadata({
      denom: fullDenom,
    });
    expect(meta.metadata).toStrictEqual(metadata);
  }, 40000);

  test("mint (tokenfactory)", async () => {
    const [_, fullDenom] = await createRandomDenom();
    await mintDenom({ denom: fullDenom, amount: "1000" }, test2Address);
  }, 40000);

  test("burn (tokenfactory)", async () => {
    const queryClient = await TokenfactoryRPCQueryClient({ rpcEndpoint });
    const [_, fullDenom] = await createRandomDenom();
    await mintDenom({ denom: fullDenom, amount: "1000" }, test2Address);

    const balanceBeforeBurn = await queryClient.cosmos.bank.v1beta1.balance({
      address: test2Address,
      denom: fullDenom,
    });
    const burnMsg = Any.fromPartial(
      TokenFactoryMessageComposer.encoded.burn({
        sender: POA_GROUP_ADDRESS,
        amount: balanceBeforeBurn.balance,
        burnFromAddress: test2Address,
      })
    );
    await submitVoteExecGroupProposal(
      test1Address,
      POA_GROUP_ADDRESS,
      cosmosSigningClient,
      "burn",
      "some burn",
      [test1Address],
      [burnMsg],
      fee
    );

    const balanceAfterBurn = await queryClient.cosmos.bank.v1beta1.balance({
      address: test2Address,
      denom: fullDenom,
    });
    expect(balanceAfterBurn.balance).toEqual({ denom: fullDenom, amount: "0" });
  }, 60000);

  test("change admin (tokenfactory)", async () => {
    const queryClient = await TokenfactoryRPCQueryClient({ rpcEndpoint });
    const [_, fullDenom] = await createRandomDenom();

    const newAdmin = test2Address;
    const changeAdminMsg = Any.fromPartial(
      TokenFactoryMessageComposer.encoded.changeAdmin({
        sender: POA_GROUP_ADDRESS,
        denom: fullDenom,
        newAdmin,
      })
    );
    await submitVoteExecGroupProposal(
      test1Address,
      POA_GROUP_ADDRESS,

      cosmosSigningClient,
      "change admin",
      "some change admin",
      [test1Address],
      [changeAdminMsg],
      fee
    );

    const denomAuthorityMetadata =
      await queryClient.osmosis.tokenfactory.v1beta1.denomAuthorityMetadata({
        denom: fullDenom,
      });
    expect(denomAuthorityMetadata.authorityMetadata.admin).toEqual(newAdmin);
  }, 40000);

  // Helper functions that created a new denom via a group proposal
  async function createRandomDenom() {
    const subdenom = "u" + generateRandomString(5);
    const msg = Any.fromPartial(
      TokenFactoryMessageComposer.encoded.createDenom({
        sender: POA_GROUP_ADDRESS,
        subdenom,
      })
    );
    await submitVoteExecGroupProposal(
      test1Address,
      POA_GROUP_ADDRESS,
      cosmosSigningClient,
      "create denom",
      "some create denom",
      [test1Address],
      [msg],
      fee
    );
    return [subdenom, `factory/${POA_GROUP_ADDRESS}/${subdenom}`];
  }

  // Helper function that mints a denom via a group proposal
  async function mintDenom(
    amount: { denom: string; amount: string },
    mintToAddress: string
  ) {
    const queryClient = await TokenfactoryRPCQueryClient({ rpcEndpoint });
    const mintMsg = Any.fromPartial(
      TokenFactoryMessageComposer.encoded.mint({
        sender: POA_GROUP_ADDRESS,
        amount,
        mintToAddress,
      })
    );
    await submitVoteExecGroupProposal(
      test1Address,
      POA_GROUP_ADDRESS,
      cosmosSigningClient,
      "mint",
      "some mint",
      [test1Address],
      [mintMsg],
      fee
    );
    const balanceMint = await queryClient.cosmos.bank.v1beta1.balance({
      address: mintToAddress,
      denom: amount.denom,
    });
    expect(balanceMint.balance).toEqual(amount);
  }
});
