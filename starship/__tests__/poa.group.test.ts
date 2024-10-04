import { ConfigContext, useRegistry } from "starshipjs";
import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  initChain,
  POA_GROUP_ADDRESS,
  submitVoteExecGroupProposal,
  test1Mnemonic,
  test1Val,
  test2Mnemonic,
  waitForNBlocks,
  // @ts-ignore
} from "../src/test_helper";
import { encodePubkey, OfflineSigner } from "@cosmjs/proto-signing";
import { MessageComposer as POAMessageComposer } from "../../src/codegen/strangelove_ventures/poa/v1/tx.registry";
import { Any } from "../../src/codegen/google/protobuf/any";
import {
  getSigningCosmosClient,
  getSigningStrangeloveVenturesClient,
} from "../../src/codegen";
import { createRPCQueryClient as POARPCQueryClient } from "../../src/codegen/strangelove_ventures/rpc.query";
import {
  CommissionRates,
  Description,
} from "../../src/codegen/strangelove_ventures/poa/v1/validator";
import { fromBase64 } from "@cosmjs/encoding";
import { encodeEd25519Pubkey } from "@cosmjs/amino";
import {
  assertIsDeliverTxSuccess,
  SigningStargateClient,
} from "@cosmjs/stargate";
import { ProposalExecutorResult } from "../../src/codegen/cosmos/group/v1/types";
import path from "path";
import { createRPCQueryClient as CosmosRPCQueryClient } from "../../src/codegen/cosmos/rpc.query";

const inits = [
  {
    description: "group-poa-admin (proto-signing)",
    createWallets: createProtoWallet,
  },
  {
    description: "group-poa-admin (amino-signing)",
    createWallets: createAminoWallet,
  },
];

// Test POA module endpoints that require POA Admin permissions with both proto and amino signing.
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

  test("set power (poa)", async () => {
    const client = await getSigningCosmosClient({
      rpcEndpoint,
      signer: test1Wallet,
    });
    const queryClient = await POARPCQueryClient({ rpcEndpoint });

    const validatorAddress = await getFirstBondedValidatorAddress();
    const currentPower =
      await queryClient.strangelove_ventures.poa.v1.consensusPower({
        validatorAddress,
      });
    const newPower = (currentPower.consensusPower + 1n) * 1000000n;

    const proposal = Any.fromPartial(
      POAMessageComposer.encoded.setPower({
        sender: POA_GROUP_ADDRESS,
        validatorAddress,
        power: newPower,
        unsafe: true,
      })
    );

    await submitVoteExecGroupProposal(
      test1Address,
      POA_GROUP_ADDRESS,
      client,
      "set power",
      "some set power",
      [test1Address],
      [proposal],
      fee
    );
    await waitForNBlocks(client, 2);

    const updatedPower =
      await queryClient.strangelove_ventures.poa.v1.consensusPower({
        validatorAddress,
      });
    expect(updatedPower.consensusPower).toEqual(
      currentPower.consensusPower + 1n
    );
  }, 30000);

  // TODO: Enable this test when https://github.com/cosmology-tech/telescope/issues/660 is fixed
  test.skip("remove pending validator (poa)", async () => {
    const queryClient = await POARPCQueryClient({ rpcEndpoint });
    const pendingValidatorsBefore =
      await queryClient.strangelove_ventures.poa.v1.pendingValidators();
    const pendingValidatorsBeforeLength =
      pendingValidatorsBefore.pending.length;
    const description = Description.fromPartial({
      moniker: "test-validator",
      identity: "some identity",
      website: "www.some.website.com",
      securityContact: "some contact",
      details: "some details",
    });
    // Rates must be integers, not floating point numbers.
    // E.g., 1000000000000000000 == 1.0
    const commission = CommissionRates.fromPartial({
      rate: "0",
      maxRate: "0",
      maxChangeRate: "0",
    });
    const msg = POAMessageComposer.fromPartial.createValidator({
      description,
      commission,
      minSelfDelegation: "1",
      delegatorAddress: "",
      validatorAddress: test1Val.address,
      pubkey: encodePubkey(encodeEd25519Pubkey(fromBase64(test1Val.pubkey))),
    });
    const poaClient = await getSigningStrangeloveVenturesClient({
      rpcEndpoint,
      signer: test1Wallet,
    });
    const result = await poaClient.signAndBroadcast(test1Address, [msg], fee);
    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);

    const pendingValidatorsAfterCreate =
      await queryClient.strangelove_ventures.poa.v1.pendingValidators();
    expect(pendingValidatorsAfterCreate.pending.length).toEqual(
      pendingValidatorsBeforeLength + 1
    );

    const proposal = Any.fromPartial(
      POAMessageComposer.encoded.removePending({
        sender: POA_GROUP_ADDRESS,
        validatorAddress: test1Val.address,
      })
    );

    await submitVoteExecGroupProposal(
      test1Address,
      POA_GROUP_ADDRESS,
      cosmosSigningClient,
      "remove pending",
      "some remove pending",
      [test1Address],
      [proposal],
      fee
    );
    const pendingValidatorsAfterRemovePending =
      await queryClient.strangelove_ventures.poa.v1.pendingValidators();
    expect(pendingValidatorsAfterRemovePending.pending.length).toEqual(
      pendingValidatorsBeforeLength
    );
  }, 30000);

  test("remove validator (poa)", async () => {
    const queryClient = await POARPCQueryClient({ rpcEndpoint });
    const validatorAddress = await getFirstBondedValidatorAddress();

    const proposal = Any.fromPartial(
      POAMessageComposer.encoded.removeValidator({
        sender: POA_GROUP_ADDRESS,
        validatorAddress,
      })
    );

    const proposalId = await submitVoteExecGroupProposal(
      test1Address,
      POA_GROUP_ADDRESS,
      cosmosSigningClient,
      "remove validator",
      "some remove validator",
      [test1Address],
      [proposal],
      fee
    );
    const proposalInfo = await queryClient.cosmos.group.v1.proposal({
      proposalId,
    });

    // We don't care about the result, we just want to know if the message gets through
    expect(proposalInfo.proposal.executorResult).toEqual(
      ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_FAILURE
    );
  }, 20000);

  async function getFirstBondedValidatorAddress() {
    const queryClient = await CosmosRPCQueryClient({ rpcEndpoint });
    const bondedVal = await queryClient.cosmos.staking.v1beta1.validators({
      status: "BOND_STATUS_BONDED",
    });
    expect(bondedVal.validators.length).toEqual(1);
    return bondedVal.validators[0].operatorAddress;
  }
});
