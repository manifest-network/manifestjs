import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Secp256k1HdWallet } from "@cosmjs/amino";
import { useChain } from "starshipjs";
import {
  assertIsDeliverTxSuccess,
  SigningStargateClient
} from '@cosmjs/stargate';
import { createRPCQueryClient } from "../../src/codegen/strangelove_ventures/rpc.query";
import { Any } from "../../src/codegen/google/protobuf/any";
import { MessageComposer as GroupMessageComposer } from "../../src/codegen/cosmos/group/v1/tx.registry";
import { MessageComposer as ManifestMessageComposer } from '../../src/codegen/liftedinit/manifest/v1/tx.registry';
import {
  Exec,
  MsgSubmitProposalResponse,
} from "../../src/codegen/cosmos/group/v1/tx";
import { VoteOption } from "../../src/codegen/cosmos/group/v1/types";

// The POA Address is a Group address created at genesis
export const POA_GROUP_ADDRESS =
  "manifest1afk9zr2hn2jsac63h4hm60vl9z3e5u69gndzf7c99cqge3vzwjzsfmy9qj";

// test1 key as defined in https://github.com/cosmology-tech/starship/blob/main/starship/charts/devnet/configs/keys.json
export const test1Mnemonic =
  "opinion knife other balcony surge more bamboo canoe romance ask argue teach anxiety adjust spike mystery wolf alone torch tail six decide wash alley";
// test2 key as defined in https://github.com/cosmology-tech/starship/blob/main/starship/charts/devnet/configs/keys.json
export const test2Mnemonic =
  "logic help only text door wealth hurt always remove glory viable income agent olive trial female couch old offer crash menu zero pencil thrive";
// test3 key as defined in https://github.com/cosmology-tech/starship/blob/main/starship/charts/devnet/configs/keys.json
export const test3Mnemonic =
  "middle weather hip ghost quick oxygen awful library broken chicken tackle animal crunch appear fee indoor fitness enough orphan trend tackle faint eyebrow all";

// Used for POA validator testing
export const test1Val = {
  mnemonic: test1Mnemonic,
  address: "manifestvaloper1pss7nxeh3f9md2vuxku8q99femnwdjtcjhuxjm",
  pubkey: "qS4C8i2q1orM463qxf5QA8iAwdZ+Aix7Xm+sJqr1kg4=",
};
export const test3Val = {
  mnemonic: test3Mnemonic,
  address: "manifestvaloper1pn45c2jdwfwrwva0cknfdlnfst28ucpus9qfk4",
  pubkey: "cWa/RsXD2eidssyLnc8UwZY2468DldmWBTCx2/d7L+c=",
};

// Create a Direct Signer wallet from a mnemonic
export const createProtoWallet = (mnemonic: string, prefix: string) =>
  DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix });

// Create an AMINO Signer wallet from a mnemonic
export const createAminoWallet = (mnemonic: string, prefix: string) =>
  Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix });

export async function initChain(chainId: string) {
  const { chainInfo, getCoin, getRpcEndpoint, creditFromFaucet } =
    useChain(chainId);

  const denom = (await getCoin()).base;
  const prefix = chainInfo.chain.bech32_prefix;
  const rpcEndpoint = await getRpcEndpoint();

  return { denom, prefix, rpcEndpoint, creditFromFaucet };
}

// Check that the POA Admin is the expected address
export const checkPoaAdminIs = async (
  rpcEndpoint: string,
  poaAdminAddress: string
) => {
  const client = await createRPCQueryClient({ rpcEndpoint });
  const account = await client.strangelove_ventures.poa.v1.poaAuthority();
  expect(account.authority).toEqual(poaAdminAddress);
};

// Wait for a number of blocks to be produced
export const waitForNBlocks = async (
  client: SigningStargateClient,
  numBlocks: number
) => {
  const height = await client.getHeight();
  let currentHeight = height;
  while (currentHeight < height + numBlocks) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    currentHeight = await client.getHeight();
  }
};

const submitGroupProposal = async (
  signer: string,
  client: SigningStargateClient,
  title: string,
  summary: string,
  proposers: string[],
  messages: { typeUrl: string; value: Uint8Array }[], // Encoded messages
  fee: { amount: { denom: string; amount: string }[]; gas: string }
) => {
  // COMMENTING THE FOLLOWING LINE WILL CAUSE THE PAYOUT/BURN TEST TO FAIL. WHY?
  Any.fromPartial(ManifestMessageComposer.encoded.payout({authority: "", payoutPairs: []}));

  const submitMsg  = {
    groupPolicyAddress: POA_GROUP_ADDRESS,
    title,
    summary,
    proposers,
    exec: Exec.EXEC_UNSPECIFIED,
    messages: messages.map((msg) => Any.fromPartial(msg)),
    metadata: "",
  }
  const msg = GroupMessageComposer.fromPartial.submitProposal(submitMsg);
  const result = await client.signAndBroadcast(signer, [msg], fee);
  assertIsDeliverTxSuccess(result);
  expect(result.code).toEqual(0);

  expect(result.msgResponses.length).toEqual(1);
  const encodedResponse = result.msgResponses[0];

  const submitResponse = MsgSubmitProposalResponse.decode(
    encodedResponse.value
  );
  return submitResponse.proposalId;
};

export const voteGroupProposal = async (
  signer: string,
  client: SigningStargateClient,
  proposalId: bigint,
  option: VoteOption,
  fee: { amount: { denom: string; amount: string }[]; gas: string }
) => {
  const voteMsg = GroupMessageComposer.fromPartial.vote({
    proposalId,
    voter: signer,
    option,
    metadata: "",
    exec: Exec.EXEC_UNSPECIFIED,
  });
  const result = await client.signAndBroadcast(signer, [voteMsg], fee);
  assertIsDeliverTxSuccess(result);
  expect(result.code).toEqual(0);
};

export const execGroupProposal = async (
  signer: string,
  client: SigningStargateClient,
  proposalId: bigint,
  fee: { amount: { denom: string; amount: string }[]; gas: string }
) => {
  const execMsg = GroupMessageComposer.fromPartial.exec({
    proposalId,
    executor: signer,
  });
  const result = await client.signAndBroadcast(signer, [execMsg], fee);
  assertIsDeliverTxSuccess(result);
  expect(result.code).toEqual(0);
};

export const submitVoteExecGroupProposal = async (
  signer: string,
  client: SigningStargateClient,
  title: string,
  summary: string,
  proposers: string[],
  messages: Any[],
  fee: { amount: { denom: string; amount: string }[]; gas: string },
  timeout: number = 5000
) => {
  const proposalId = await submitGroupProposal(
    signer,
    client,
    title,
    summary,
    proposers,
    messages,
    fee
  );
  await voteGroupProposal(
    signer,
    client,
    proposalId,
    VoteOption.VOTE_OPTION_YES,
    fee
  );

  // Wait for the proposal to be processed
  await new Promise((resolve) => setTimeout(resolve, timeout));

  await execGroupProposal(signer, client, proposalId, fee);

  return proposalId;
};

export function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
