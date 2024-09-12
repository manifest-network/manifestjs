import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { QueryClientImpl } from "../../src/codegen/strangelove_ventures/poa/v1/query.rpc.Query";
import { DirectSecp256k1HdWallet, encodePubkey } from "@cosmjs/proto-signing";
import { Secp256k1HdWallet } from "@cosmjs/amino";
import { useChain } from "starshipjs";
import {
  MsgBurnHeldBalance,
  MsgPayout,
} from "../../src/codegen/liftedinit/manifest/v1/tx";
import {
  MsgCreateValidator,
  MsgRemovePending,
  MsgRemoveValidator,
  MsgSetPower,
} from "../../src/codegen/strangelove_ventures/poa/v1/tx";
import {
  CommissionRates,
  Description,
} from "../../src/codegen/strangelove_ventures/poa/v1/validator";

// This is the POA_ADMIN_ADDRESS mnemonic as defined in the config.yaml file
export const poaAdminMnemonic =
  "razor dog gown public private couple ecology paper flee connect local robot diamond stay rude join sound win ribbon soup kidney glass robot vehicle";
// test1 key as defined in https://github.com/cosmology-tech/starship/blob/main/starship/charts/devnet/configs/keys.json
export const test1Mnemonic =
  "opinion knife other balcony surge more bamboo canoe romance ask argue teach anxiety adjust spike mystery wolf alone torch tail six decide wash alley";
export const test1Val = {
  address: "manifestvaloper1pss7nxeh3f9md2vuxku8q99femnwdjtcjhuxjm",
  pubkey: "qS4C8i2q1orM463qxf5QA8iAwdZ+Aix7Xm+sJqr1kg4=",
};
// test2 key as defined in https://github.com/cosmology-tech/starship/blob/main/starship/charts/devnet/configs/keys.json
export const test2Mnemonic =
  "logic help only text door wealth hurt always remove glory viable income agent olive trial female couch old offer crash menu zero pencil thrive";
export const test2Val = {
  address: "manifestvaloper16e0p4vwufmsn0lucwsnfmjfx67ry84y4dh5ec7",
  pubkey: "0PViQxy6wVFlGV0qocoxxI+a7+8HZawhpmVbHoSlrpE=",
};

// test3 key as defined in https://github.com/cosmology-tech/starship/blob/main/starship/charts/devnet/configs/keys.json
export const test3Mnemonic =
  "middle weather hip ghost quick oxygen awful library broken chicken tackle animal crunch appear fee indoor fitness enough orphan trend tackle faint eyebrow all";
export const test3Val = {
  address: "manifestvaloper1pn45c2jdwfwrwva0cknfdlnfst28ucpus9qfk4",
  pubkey: "cWa/RsXD2eidssyLnc8UwZY2468DldmWBTCx2/d7L+c=",
};

export const test4Mnemonic =
  "fox silver steel pretty vintage document frog little leopard valve base adapt clog success metal share you fresh loyal prosper clown cage guitar settle";
export const test4Val = {
  address: "manifestvaloper1za9kshgu0l3qfj5z3dvk2jpngadr45awkg5pu8",
  pubkey: "IS7oze6faap8/Vjmfn2dwMwAlVEbb8af5HHGEM4hsyI=",
};

export function setupPoaExtension(base: QueryClient) {
  const rpcClient = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpcClient);

  return {
    poa: {
      poaAuthority: async () => {
        return await queryService.poaAuthority();
      },
      consensusPower: async (valAddr: string) => {
        return await queryService.consensusPower({ validatorAddress: valAddr });
      },
      pendingValidators: async () => {
        return await queryService.pendingValidators();
      },
    },
  };
}

export const createProtoWallet = (mnemonic: string, prefix: string) =>
  DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix });
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

// MANIFEST
export const createMsgPayout = (
  authority: string,
  payoutPairs: { address: string; coin: { denom: string; amount: string } }[]
) => {
  return {
    typeUrl: MsgPayout.typeUrl,
    value: MsgPayout.fromPartial({ authority, payoutPairs }),
  };
};

export const createPayoutPair = (
  address: string,
  denom: string,
  amount: number
) => {
  return { address, coin: { denom, amount: amount.toString() } };
};

export const createBurnMsg = (
  authority: string,
  amount: number,
  denom: string
) => {
  return {
    typeUrl: MsgBurnHeldBalance.typeUrl,
    value: MsgBurnHeldBalance.fromPartial({
      authority,
      burnCoins: [{ amount: amount.toString(), denom }],
    }),
  };
};

// POA
const createDescription = (
  moniker: string,
  identity: string,
  website: string,
  securityContact: string,
  details: string
) => {
  return {
    moniker,
    identity,
    website,
    securityContact,
    details,
  };
};

export const createDefaultDescription = () => {
  return createDescription(
    "moniker",
    "identity",
    "website",
    "securityContact",
    "details"
  );
};

const createCommissionRates = (
  rate: string,
  maxRate: string,
  maxChangeRate: string
) => {
  return { rate, maxRate, maxChangeRate };
};

export const createDefaultCommissionRates = () => {
  return createCommissionRates("0.0", "0.0", "0.0");
};

export const createMsgCreateValidator = (
  validatorAddress: string,
  description: Description,
  commission: CommissionRates,
  pubkey: string
) => {
  return {
    typeUrl: MsgCreateValidator.typeUrl,
    value: {
      description,
      commission,
      minSelfDelegation: "1",
      validatorAddress,
      pubkey: encodePubkey({
        type: "tendermint/PubKeyEd25519",
        value: pubkey,
      }),
    },
  };
};

export const createMsgSetPower = (
  sender: string,
  validatorAddress: string,
  power: bigint,
  unsafe: boolean
) => {
  return {
    typeUrl: MsgSetPower.typeUrl,
    value: MsgSetPower.fromPartial({ sender, validatorAddress, power, unsafe }),
  };
};

export const createMsgRemoveValidator = (
  sender: string,
  validatorAddress: string
) => {
  return {
    typeUrl: MsgRemoveValidator.typeUrl,
    value: MsgRemoveValidator.fromPartial({ sender, validatorAddress }),
  };
};

export const createMsgRemovePendingValidator = (
  sender: string,
  validatorAddress: string
) => {
  return {
    typeUrl: MsgRemovePending.typeUrl,
    value: MsgRemovePending.fromPartial({ sender, validatorAddress }),
  };
};

export const BONDED = "BOND_STATUS_BONDED";
export const UNBONDING = "BOND_STATUS_UNBONDING";
