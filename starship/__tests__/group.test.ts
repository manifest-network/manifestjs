import { OfflineSigner } from "@cosmjs/proto-signing";
import { ConfigContext, generateMnemonic, useRegistry } from "starshipjs";
import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  execGroupProposal,
  initChain,
  POA_GROUP_ADDRESS,
  voteGroupProposal,
} from "../src/test_helper";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { MessageComposer as GroupMsgComposer } from "../../src/codegen/cosmos/group/v1/tx.registry";
import { Any } from "../../src/codegen/google/protobuf/any";
import {
  ThresholdDecisionPolicy,
  VoteOption,
} from "../../src/codegen/cosmos/group/v1/types";
import { Duration } from "../../src/codegen/google/protobuf/duration";
import { createRPCQueryClient } from "../../src/codegen/cosmos/rpc.query";
import path from "path";
import { getSigningCosmosClient } from "../../src";
import {
  Exec,
  MsgSubmitProposalResponse,
  MsgUpdateGroupMembers,
  MsgUpdateGroupMetadata,
  MsgUpdateGroupPolicyDecisionPolicy,
  MsgUpdateGroupPolicyDecisionPolicyEncoded,
  MsgUpdateGroupPolicyMetadata,
  MsgWithdrawProposal,
} from "../../src/codegen/cosmos/group/v1/tx";
import { MsgSend } from "../../src/codegen/cosmos/bank/v1beta1/tx";

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

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
    const client = await getSigningCosmosClient({
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

    // Send some tokens to the group admin of the new group
    let sendResult = await client.sendTokens(
      t1Addr,
      groups.groups[0].admin,
      [{ denom, amount: "10000000" }],
      fee
    );
    assertIsDeliverTxSuccess(sendResult);
    expect(sendResult.code).toEqual(0);
  });

  describe("submit group proposal", () => {
    // The following test works with both proto and amino signing.
    test("send", async () => {
      const client = await getSigningCosmosClient({
        rpcEndpoint,
        signer: test1Wallet,
      });

      const group = await getGroupByMember(t1Addr);
      const send: MsgSend = {
        fromAddress: group.admin,
        toAddress: t1Addr,
        amount: [{ denom, amount: "1000" }],
      };
      const proposal = Any.fromPartial(MsgSend.toProtoMsg(send));
      const msgSubmitProposal = GroupMsgComposer.fromPartial.submitProposal({
        groupPolicyAddress: group.admin,
        title: "send proposal",
        summary: "send 1000 tokens to myself",
        proposers: [t1Addr],
        exec: Exec.EXEC_UNSPECIFIED,
        messages: [proposal],
        metadata: "",
      });
      const result = await client.signAndBroadcast(
        t1Addr,
        [msgSubmitProposal],
        fee
      );
      assertIsDeliverTxSuccess(result);
      expect(result.code).toEqual(0);
    }, 30000);

    // The following test fails with
    //    Log: unable to resolve type URL /cosmos.group.v1.GroupMember: tx parse error
    // This is a client-side error
    test("update group metadata", async () => {
      const client = await getSigningCosmosClient({
        rpcEndpoint,
        signer: test1Wallet,
      });
      const group = await getGroupByMember(t1Addr);

      const newMetadata: MsgUpdateGroupMetadata = {
        admin: group.admin,
        groupId: group.id,
        metadata: "new metadata",
      };
      const proposal = Any.fromPartial(
        MsgUpdateGroupMetadata.toProtoMsg(newMetadata)
      );
      const msgSubmitProposal = GroupMsgComposer.fromPartial.submitProposal({
        groupPolicyAddress: group.admin,
        title: "update group metadata",
        summary: "update the group metadata with new value",
        proposers: [t1Addr],
        exec: Exec.EXEC_UNSPECIFIED,
        messages: [proposal],
        metadata: "",
      });
      const result = await client.signAndBroadcast(
        t1Addr,
        [msgSubmitProposal],
        fee
      );
      assertIsDeliverTxSuccess(result);
      expect(result.code).toEqual(0);
    }, 30000);

    // The following test fails with
    //    Log: no concrete type registered for type URL /cosmos.group.v1.MsgCreateGroupPolicyResponse against interface *interface { ProtoMessage(); Reset(); String() string }: tx parse error
    // This is a client-side error
    test("withdraw proposal", async () => {
      const client = await getSigningCosmosClient({
        rpcEndpoint,
        signer: test1Wallet,
      });
      const group = await getGroupByMember(t1Addr);
      const send: MsgSend = {
        fromAddress: group.admin,
        toAddress: t1Addr,
        amount: [{ denom, amount: "1000" }],
      };
      const sendProposal = Any.fromPartial(MsgSend.toProtoMsg(send));
      const msgSubmitSendProposal = GroupMsgComposer.fromPartial.submitProposal(
        {
          groupPolicyAddress: group.admin,
          title: "send proposal to be withdrawn",
          summary: "withdraw this proposal please",
          proposers: [t1Addr],
          exec: Exec.EXEC_UNSPECIFIED,
          messages: [sendProposal],
          metadata: "",
        }
      );
      const result = await client.signAndBroadcast(
        t1Addr,
        [msgSubmitSendProposal],
        fee
      );
      assertIsDeliverTxSuccess(result);
      expect(result.code).toEqual(0);

      // Get the proposal Id
      const encodedResponse = result.msgResponses[0];
      const submitResponse = MsgSubmitProposalResponse.decode(
        encodedResponse.value
      );
      const proposal1Id = submitResponse.proposalId;

      const withdraw: MsgWithdrawProposal = {
        address: group.admin,
        proposalId: proposal1Id,
      };
      const withdrawProposal = Any.fromPartial(
        MsgWithdrawProposal.toProtoMsg(withdraw)
      );
      const msgSubmitWithdrawProposal =
        GroupMsgComposer.fromPartial.submitProposal({
          groupPolicyAddress: group.admin,
          title: "withdraw proposal",
          summary: "withdraw the proposal",
          proposers: [t1Addr],
          exec: Exec.EXEC_UNSPECIFIED,
          messages: [withdrawProposal],
          metadata: "",
        });
      const withdrawResult = await client.signAndBroadcast(
        t1Addr,
        [msgSubmitWithdrawProposal],
        fee
      );
      assertIsDeliverTxSuccess(withdrawResult);
      expect(withdrawResult.code).toEqual(0);
    }, 30000);

    // The following test fails with
    //    Log: unable to resolve type URL /cosmos.group.v1.GroupMember: tx parse error
    // This is a client-side error
    test("update group members", async () => {
      const client = await getSigningCosmosClient({
        rpcEndpoint,
        signer: test1Wallet,
      });
      const group = await getGroupByMember(t1Addr);
      const update: MsgUpdateGroupMembers = {
        admin: group.admin,
        groupId: group.id,
        memberUpdates: [
          {
            address: t2Addr,
            weight: "0",
            metadata: "user 2",
          },
        ],
      };
      const proposal = Any.fromPartial(
        MsgUpdateGroupMembers.toProtoMsg(update)
      );
      const msgSubmitProposal = GroupMsgComposer.fromPartial.submitProposal({
        groupPolicyAddress: group.admin,
        title: "update group members",
        summary: "update the group members",
        proposers: [t1Addr],
        exec: Exec.EXEC_UNSPECIFIED,
        messages: [proposal],
        metadata: "",
      });
      const result = await client.signAndBroadcast(
        t1Addr,
        [msgSubmitProposal],
        fee
      );
      assertIsDeliverTxSuccess(result);
    }, 30000);

    // The following test fails with
    //   Log: signature verification failed; please verify account number (36), sequence (2) and chain-id (manifest-ledger-beta): unauthorized
    // This is a server-side error
    //
    // The following AMINO message is broadcasted:
    //
    // ...
    // "msgs": [
    //     {
    //       "type": "cosmos-sdk/group/MsgSubmitProposal",
    //       "value": {
    //         "group_policy_address": "manifest1ys0dhh6x5s55h2g37zrnc7kh630jfq5p77as8pwyn60ax9zzqh9qfxfrxx",
    //         "proposers": [
    //           "manifest1dcq6zdnk7m44r7a7vyths57t9sru02730hqsu6"
    //         ],
    //         "messages": [
    //           {
    //             "type": "cosmos-sdk/MsgUpdateGroupPolicyMetadata",
    //             "value": {
    //               "admin": "manifest1ys0dhh6x5s55h2g37zrnc7kh630jfq5p77as8pwyn60ax9zzqh9qfxfrxx",
    //               "group_policy_address": "manifest1ys0dhh6x5s55h2g37zrnc7kh630jfq5p77as8pwyn60ax9zzqh9qfxfrxx",
    //               "metadata": "new group policy metadata"
    //             }
    //           }
    //         ],
    //         "title": "update group policy metadata",
    //         "summary": "change the group policy metadata"
    //       }
    //     }
    //   ],
    // ...
    //
    // But the following AMINO message is received by the server:
    //
    // ...
    // "msgs": [
    //   {
    //     "type": "cosmos-sdk/group/MsgSubmitProposal",
    //     "value": {
    //       "group_policy_address": "manifest142498n8sya3k3s5jftp7dujuqfw3ag4tpzc2ve45ykpwx6zmng8snlf063",
    //       "messages": [
    //         {
    //           "type": "cosmos-sdk/MsgUpdateGroupDecisionPolicy",
    //           "value": {
    //             "admin": "manifest142498n8sya3k3s5jftp7dujuqfw3ag4tpzc2ve45ykpwx6zmng8snlf063",
    //             "group_policy_address": "manifest142498n8sya3k3s5jftp7dujuqfw3ag4tpzc2ve45ykpwx6zmng8snlf063"
    //           }
    //         }
    //       ],
    //       "proposers": [
    //         "manifest1e8wzp3wdlfdqm5tnp4t6xqmdgp6qdk57luh6mq"
    //       ],
    //       "summary": "change the group policy metadata",
    //       "title": "update group policy metadata"
    //     }
    //   }
    // ],
    //
    // Notice the `metadata` field is missing in the received message!!!!!
    test("update group policy metadata", async () => {
      const client = await getSigningCosmosClient({
        rpcEndpoint,
        signer: test1Wallet,
      });
      const group = await getGroupByMember(t1Addr);

      const newMetadata: MsgUpdateGroupPolicyMetadata = {
        admin: group.admin,
        groupPolicyAddress: group.admin,
        metadata: "new group policy metadata",
      };
      const proposal = Any.fromPartial(
        MsgUpdateGroupPolicyMetadata.toProtoMsg(newMetadata)
      );

      const submitMsg = GroupMsgComposer.fromPartial.submitProposal({
        groupPolicyAddress: group.admin,
        title: "update group policy metadata",
        summary: "change the group policy metadata",
        proposers: [t1Addr],
        exec: Exec.EXEC_UNSPECIFIED,
        messages: [proposal],
        metadata: "",
      });
      const result = await client.signAndBroadcast(t1Addr, [submitMsg], fee);
      assertIsDeliverTxSuccess(result);
      expect(result.code).toEqual(0);
    }, 30000);

    // The following test works with both proto and amino signing.
    test("update group policy decision policy", async () => {
      const client = await getSigningCosmosClient({
        rpcEndpoint,
        signer: test1Wallet,
      });
      const queryClient = await createRPCQueryClient({ rpcEndpoint });
      const group = await getGroupByMember(t1Addr);

      const newPolicy = ThresholdDecisionPolicy.fromPartial({
        threshold: "2",
        windows: {
          votingPeriod: Duration.fromPartial({ seconds: 10n }),
          minExecutionPeriod: Duration.fromPartial({ seconds: 0n }),
        },
      });
      const newPolicyEncoded: MsgUpdateGroupPolicyDecisionPolicyEncoded = {
        admin: group.admin,
        groupPolicyAddress: group.admin,
        decisionPolicy: ThresholdDecisionPolicy.toProtoMsg(newPolicy),
      };
      const proposal = Any.fromPartial(
        MsgUpdateGroupPolicyDecisionPolicy.toProtoMsg(newPolicyEncoded)
      );
      const submitMsg = GroupMsgComposer.fromPartial.submitProposal({
        groupPolicyAddress: group.admin,
        title: "update group policy decision policy",
        summary: "change the group policy decision policy",
        proposers: [t1Addr],
        exec: Exec.EXEC_UNSPECIFIED,
        messages: [proposal],
        metadata: "",
      });
      const result = await client.signAndBroadcast(t1Addr, [submitMsg], fee);
      assertIsDeliverTxSuccess(result);
      expect(result.code).toEqual(0);

      const encodedResponse = result.msgResponses[0];

      const submitResponse = MsgSubmitProposalResponse.decode(
        encodedResponse.value
      );
      const proposalId = submitResponse.proposalId;

      await voteGroupProposal(
        t1Addr,
        client,
        proposalId,
        VoteOption.VOTE_OPTION_YES,
        fee
      );
      await new Promise((resolve) => setTimeout(resolve, 10000));
      await execGroupProposal(t1Addr, client, proposalId, fee);

      const groupPolicyAfter =
        await queryClient.cosmos.group.v1.groupPolicyInfo({
          address: group.admin,
        });
      expect(groupPolicyAfter.info.decisionPolicy).toEqual(newPolicy);
    }, 30000);
  });

  async function getGroupByMember(address: string) {
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const groups = await queryClient.cosmos.group.v1.groupsByMember({
      address,
    });
    expect(groups.groups.length).toEqual(1);
    return groups.groups[0];
  }

  async function getProposalByMember(address: string) {
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const group = await getGroupByMember(address);
    const proposals = await queryClient.cosmos.group.v1.proposalsByGroupPolicy({
      address: group.admin,
    });
    expect(proposals.proposals.length).toEqual(1);
    return proposals.proposals[0];
  }
});
