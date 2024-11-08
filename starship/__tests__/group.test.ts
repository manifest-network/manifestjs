import { OfflineSigner } from "@cosmjs/proto-signing";
import { ConfigContext, generateMnemonic, useRegistry } from "starshipjs";
import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  initChain,
  POA_GROUP_ADDRESS,
  submitVoteExecGroupProposal,
} from "../src/test_helper";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { MessageComposer as GroupMsgComposer } from "../../src/codegen/cosmos/group/v1/tx.registry";
import { Any } from "../../src/codegen/google/protobuf/any";
import { ThresholdDecisionPolicy } from "../../src/codegen/cosmos/group/v1/types";
import { Duration } from "../../src/codegen/google/protobuf/duration";
import { createRPCQueryClient } from "../../src/codegen/cosmos/rpc.query";
import path from "path";
import { getSigningCosmosClient } from "../../src";
import {
  MsgUpdateGroupMembers,
  MsgUpdateGroupMetadata,
  MsgUpdateGroupPolicyDecisionPolicy,
  MsgUpdateGroupPolicyDecisionPolicyEncoded,
  MsgUpdateGroupPolicyMetadata,
} from "../../src/codegen/cosmos/group/v1/tx";
import { MsgSend } from "../../src/codegen/cosmos/bank/v1beta1/tx";
import { MsgGrantAllowance } from "../../src/codegen/cosmos/feegrant/v1beta1/tx";
import {
  AllowedMsgAllowance,
  BasicAllowance,
} from "../../src/codegen/cosmos/feegrant/v1beta1/feegrant";
import { Grant } from '../../src/codegen/cosmos/authz/v1beta1/authz';
import { SendAuthorization } from '../../src/codegen/cosmos/bank/v1beta1/authz';
import { MsgGrant } from '../../src/codegen/cosmos/authz/v1beta1/tx';

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

  describe("group proposals", () => {
    test("send", async () => {
      const queryClient = await createRPCQueryClient({ rpcEndpoint });
      const client = await getSigningCosmosClient({
        rpcEndpoint,
        signer: test1Wallet,
      });

      const group = await getGroupByMember(t1Addr);

      const t1AddrBeforeBalance = await queryClient.cosmos.bank.v1beta1.balance(
        { address: t1Addr, denom: denom }
      );
      const groupBeforeBalance = await queryClient.cosmos.bank.v1beta1.balance({
        address: group.admin,
        denom: denom,
      });

      const send: MsgSend = {
        fromAddress: group.admin,
        toAddress: t1Addr,
        amount: [{ denom, amount: "1000" }],
      };
      const proposal = Any.fromPartial(MsgSend.toProtoMsg(send));
      await submitVoteExecGroupProposal(
        t1Addr,
        group.admin,
        client,
        "send proposal",
        "send 1000 tokens to myself",
        [t1Addr],
        [proposal],
        fee
      );

      const t1AddrAfterBalance = await queryClient.cosmos.bank.v1beta1.balance({
        address: t1Addr,
        denom: denom,
      });
      const groupAfterBalance = await queryClient.cosmos.bank.v1beta1.balance({
        address: group.admin,
        denom: denom,
      });

      expect(t1AddrAfterBalance.balance.amount).toEqual(
        (
          BigInt(t1AddrBeforeBalance.balance.amount) +
          BigInt("1000") -
          BigInt(3) * BigInt(fee.amount[0].amount)
        ).toString()
      );
      expect(groupAfterBalance.balance.amount).toEqual(
        (BigInt(groupBeforeBalance.balance.amount) - BigInt("1000")).toString()
      );
    }, 30000);

    test("authz grant", async () => {
      const queryClient = await createRPCQueryClient({ rpcEndpoint });
      const client = await getSigningCosmosClient({
        rpcEndpoint,
        signer: test1Wallet,
      });

      const group = await getGroupByMember(t1Addr);
      const grant = MsgGrant.fromPartial({
        granter: group.admin,
        grantee: t1Addr,
        grant: Grant.fromPartial({
          authorization: SendAuthorization.fromPartial({
            spendLimit: [{ denom, amount: "1000" }],
            allowList: [""],
          })
        }),
      })

      const proposal = Any.fromPartial(MsgGrant.toProtoMsg(grant));
      await submitVoteExecGroupProposal(
        t1Addr,
        group.admin,
        client,
        "authz grant proposal",
        "authz grant proposal",
        [t1Addr],
        [proposal],
        fee
      );

      const allowance =
        await queryClient.cosmos.authz.v1beta1.granterGrants({
          granter: group.admin,
        });
      expect(allowance.grants.length).toEqual(1);
      expect(allowance.grants[0].granter).toEqual(grant.granter);
      expect(allowance.grants[0].grantee).toEqual(grant.grantee);
    }, 30000);

    test("feegrant", async () => {
      const queryClient = await createRPCQueryClient({ rpcEndpoint });
      const client = await getSigningCosmosClient({
        rpcEndpoint,
        signer: test1Wallet,
      });

      const group = await getGroupByMember(t1Addr);
      const feegrant = MsgGrantAllowance.fromPartial({
        granter: group.admin,
        grantee: t1Addr,
        allowance: AllowedMsgAllowance.fromPartial({
          allowance: BasicAllowance.fromPartial({
            spendLimit: [{ denom, amount: "1000" }],
            expiration: null,
          }),
          allowedMessages: ["/cosmos.bank.v1beta1.MsgSend"],
        }),
      });

      const proposal = Any.fromPartial(MsgGrantAllowance.toProtoMsg(feegrant));
      await submitVoteExecGroupProposal(
        t1Addr,
        group.admin,
        client,
        "feegrant proposal",
        "feegrant fee authorization",
        [t1Addr],
        [proposal],
        fee
      );

      const allowance =
        await queryClient.cosmos.feegrant.v1beta1.allowancesByGranter({
          granter: group.admin,
        });
      expect(allowance.allowances.length).toEqual(1);
      expect(allowance.allowances[0].granter).toEqual(feegrant.granter);
      expect(allowance.allowances[0].grantee).toEqual(feegrant.grantee);
    }, 30000);

    test("update group metadata", async () => {
      const queryClient = await createRPCQueryClient({ rpcEndpoint });
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

      await submitVoteExecGroupProposal(
        t1Addr,
        group.admin,
        client,
        "update group metadata",
        "update the group metadata with new value",
        [t1Addr],
        [proposal],
        fee
      );

      queryClient.cosmos.group.v1
        .groupInfo({ groupId: group.id })
        .then((groupInfo) => {
          expect(groupInfo.info.metadata).toEqual(newMetadata.metadata);
        });
    }, 30000);

    test("remove group members", async () => {
      const queryClient = await createRPCQueryClient({ rpcEndpoint });
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
      await submitVoteExecGroupProposal(
        t1Addr,
        group.admin,
        client,
        "remove group members",
        "remove the group members t2Addr",
        [t1Addr],
        [proposal],
        fee
      );

      queryClient.cosmos.group.v1
        .groupsByMember({ address: t2Addr })
        .then((groups) => {
          expect(groups.groups.length).toEqual(0);
        });
    }, 30000);

    test("add group member", async () => {
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
            weight: "1",
            metadata: "user 2",
          },
        ],
      };
      const proposal = Any.fromPartial(
        MsgUpdateGroupMembers.toProtoMsg(update)
      );
      await submitVoteExecGroupProposal(
        t1Addr,
        group.admin,
        client,
        "add group members",
        "add the group members t2Addr",
        [t1Addr],
        [proposal],
        fee
      );

      const groupAfter = await getGroupByMember(t2Addr);
      expect(groupAfter.admin).toEqual(group.admin);
    }, 30000);

    test("update group policy metadata", async () => {
      const queryClient = await createRPCQueryClient({ rpcEndpoint });
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

      await submitVoteExecGroupProposal(
        t1Addr,
        group.admin,
        client,
        "update group policy metadata",
        "update the group policy metadata",
        [t1Addr],
        [proposal],
        fee
      );

      const groupPolicyAfter =
        await queryClient.cosmos.group.v1.groupPolicyInfo({
          address: group.admin,
        });
      expect(groupPolicyAfter.info.metadata).toEqual(newMetadata.metadata);
    }, 30000);

    test("update group policy decision policy", async () => {
      const client = await getSigningCosmosClient({
        rpcEndpoint,
        signer: test1Wallet,
      });
      const queryClient = await createRPCQueryClient({ rpcEndpoint });
      const group = await getGroupByMember(t1Addr);

      const newPolicy = ThresholdDecisionPolicy.fromPartial({
        threshold: "1",
        windows: {
          votingPeriod: Duration.fromPartial({ seconds: 15n }),
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
      await submitVoteExecGroupProposal(
        t1Addr,
        group.admin,
        client,
        "update group policy decision policy",
        "update the group policy decision policy",
        [t1Addr],
        [proposal],
        fee
      );
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
});
