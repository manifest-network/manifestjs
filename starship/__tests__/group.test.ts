import { OfflineSigner } from "@cosmjs/proto-signing";
import { ConfigContext, generateMnemonic, useRegistry } from "starshipjs";
import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  initChain,
  POA_GROUP_ADDRESS,
  // @ts-ignore
} from "../src/test_helper";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { Exec } from "../../src/codegen/cosmos/group/v1/tx";
import { MessageComposer as GroupMsgComposer } from "../../src/codegen/cosmos/group/v1/tx.registry";
import { MessageComposer as SendMsgComposer } from "../../src/codegen/cosmos/bank/v1beta1/tx.registry";
import { Any } from "../../src/codegen/google/protobuf/any";
import {
  ProposalStatus,
  ThresholdDecisionPolicy,
  VoteOption,
} from "../../src/codegen/cosmos/group/v1/types";
import { Duration } from "../../src/codegen/google/protobuf/duration";
import { createRPCQueryClient } from "../../src/codegen/cosmos/rpc.query";
import path from "path";
import { getSigningCosmosTxRpc } from "../../src/codegen";

const inits = [
  {
    description: "group-module (proto-signing)",
    createWallets: createProtoWallet,
  },
  {
    description: "group-module (amino-signing)",
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

  test("create group", async () => {
    const client = await getSigningCosmosTxRpc({
      rpcEndpoint,
      signer: test1Wallet,
    });
    const queryClient = await createRPCQueryClient({ rpcEndpoint });

    const msg = GroupMsgComposer.fromPartial.createGroupWithPolicy({
      admin: t1Addr,
      members: [
        { address: t1Addr, weight: "1", metadata: "test member 1" },
        { address: t2Addr, weight: "1", metadata: "test member 2" },
      ],
      groupMetadata: "test group - " + description,
      groupPolicyMetadata: "test group policy - " + description,
      groupPolicyAsAdmin: true,
      decisionPolicy: ThresholdDecisionPolicy.toProtoMsg({
        threshold: "1",
        windows: {
          votingPeriod: Duration.fromPartial({ seconds: 10n }),
          minExecutionPeriod: Duration.fromPartial({ seconds: 0n }),
        },
      }),
    });

    const result = await client.signAndBroadcast(
      t1Addr,
      [msg],
      fee,
      "create group test - " + description
    );
    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);

    const groups = await queryClient.cosmos.group.v1.groupsByMember({
      address: t1Addr,
    });
    expect(groups.groups.length).toEqual(1);
  });

  test("submit group proposal (send)", async () => {
    const client = await getSigningCosmosTxRpc({
      rpcEndpoint,
      signer: test1Wallet,
    });
    const queryClient = await createRPCQueryClient({ rpcEndpoint });

    // Fetch the group info
    const groups = await queryClient.cosmos.group.v1.groupsByMember({
      address: t1Addr,
    });
    expect(groups.groups.length).toEqual(1);
    const group = groups.groups[0];

    // Send some tokens to the group admin
    const msgSend = SendMsgComposer.fromPartial.send({
      fromAddress: t1Addr,
      toAddress: group.admin,
      amount: [{ denom, amount: "100000" }],
    });
    const sendResult = await client.signAndBroadcast(
      t1Addr,
      [msgSend],
      fee,
      "send tokens to group admin"
    );
    assertIsDeliverTxSuccess(sendResult);
    expect(sendResult.code).toEqual(0);

    const proposal = Any.fromPartial(
      SendMsgComposer.encoded.send({
        fromAddress: group.admin,
        toAddress: t1Addr,
        amount: [{ denom, amount: "1000" }],
      })
    );

    const msg = GroupMsgComposer.fromPartial.submitProposal({
      groupPolicyAddress: group.admin,
      title: "test proposal title",
      summary: "test proposal summary",
      proposers: [t1Addr],
      exec: Exec.EXEC_UNSPECIFIED,
      messages: [proposal],
      metadata: "test proposal metadata",
    });

    const result = await client.signAndBroadcast(
      t1Addr,
      [msg],
      fee,
      "submit group proposal test - " + description
    );
    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);
  });

  test("vote on (send) group proposal", async () => {
    const client = await getSigningCosmosTxRpc({
      rpcEndpoint,
      signer: test1Wallet,
    });
    const queryClient = await createRPCQueryClient({ rpcEndpoint });

    // Fetch the group info
    const groups = await queryClient.cosmos.group.v1.groupsByMember({
      address: t1Addr,
    });
    expect(groups.groups.length).toEqual(1);
    const group = groups.groups[0];

    // Get the group proposals
    const proposals = await queryClient.cosmos.group.v1.proposalsByGroupPolicy({
      address: group.admin,
    });
    expect(proposals.proposals.length).toEqual(1);

    // Get the first proposal
    const proposal = proposals.proposals[0];
    expect(proposal.status).toEqual(ProposalStatus.PROPOSAL_STATUS_SUBMITTED);

    const msg = GroupMsgComposer.fromPartial.vote({
      proposalId: proposal.id,
      voter: t1Addr,
      option: VoteOption.VOTE_OPTION_YES,
      metadata: "test vote metadata",
      exec: Exec.EXEC_UNSPECIFIED,
    });

    const result = await client.signAndBroadcast(
      t1Addr,
      [msg],
      fee,
      "vote on group proposal test - " + description
    );
    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);

    // Wait 10 seconds for the proposal to expire
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const proposalAfterVote = await queryClient.cosmos.group.v1.proposal({
      proposalId: proposal.id,
    });
    expect(proposalAfterVote.proposal.status).toEqual(
      ProposalStatus.PROPOSAL_STATUS_ACCEPTED
    );
  });

  test("execute (send) group proposal", async () => {
    const client = await getSigningCosmosTxRpc({
      rpcEndpoint,
      signer: test1Wallet,
    });
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const initBalance = await queryClient.cosmos.bank.v1beta1.balance({
      address: t1Addr,
      denom,
    });

    // Fetch the group info
    const groups = await queryClient.cosmos.group.v1.groupsByMember({
      address: t1Addr,
    });
    expect(groups.groups.length).toEqual(1);
    const group = groups.groups[0];

    // Get the group proposals
    const proposals = await queryClient.cosmos.group.v1.proposalsByGroupPolicy({
      address: group.admin,
    });
    expect(proposals.proposals.length).toEqual(1);

    // Get the first proposal
    const proposal = proposals.proposals[0];
    expect(proposal.status).toEqual(ProposalStatus.PROPOSAL_STATUS_ACCEPTED);

    const msg = GroupMsgComposer.fromPartial.exec({
      proposalId: proposal.id,
      executor: t1Addr,
    });

    const result = await client.signAndBroadcast(
      t1Addr,
      [msg],
      fee,
      "execute group proposal test - " + description
    );
    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);

    const amount = 1000;
    const afterBalance = await queryClient.cosmos.bank.v1beta1.balance({
      address: t1Addr,
      denom,
    });
    // The new amount should be the initial amount minus the fees plus the amount sent in the proposal
    expect(afterBalance.balance.amount).toEqual(
      (
        parseInt(initBalance.balance.amount) +
        amount -
        parseInt(fee.amount[0].amount)
      ).toString()
    );
  });
});
