import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial } from "../../../helpers";
import { Decimal } from "@cosmjs/math";
/** Params defines the parameters for the module. */
export interface Params {
  /** Array of addresses that are allowed to control the chains validators power. */
  admins: string[];
  /** allow_validator_self_exit allows for a valdiator to remove themselves from the validator set. */
  allowValidatorSelfExit: boolean;
}
export interface ParamsProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /** Array of addresses that are allowed to control the chains validators power. */
  admins?: string[];
  /** allow_validator_self_exit allows for a valdiator to remove themselves from the validator set. */
  allow_validator_self_exit?: boolean;
}
export interface ParamsAminoMsg {
  type: "poa/params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  admins: string[];
  allow_validator_self_exit: boolean;
}
/** StakingParams defines the parameters for the x/staking module. */
export interface StakingParams {
  /** unbonding_time is the time duration of unbonding. */
  unbondingTime: Duration;
  /** max_validators is the maximum number of validators. */
  maxValidators: number;
  /**
   * max_entries is the max entries for either unbonding delegation or
   * redelegation (per pair/trio).
   */
  maxEntries: number;
  /** historical_entries is the number of historical entries to persist. */
  historicalEntries: number;
  /** bond_denom defines the bondable coin denomination. */
  bondDenom: string;
  /**
   * min_commission_rate is the chain-wide minimum commission rate that a
   * validator can charge their delegators
   */
  minCommissionRate: string;
}
export interface StakingParamsProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.StakingParams";
  value: Uint8Array;
}
/** StakingParams defines the parameters for the x/staking module. */
export interface StakingParamsAmino {
  /** unbonding_time is the time duration of unbonding. */
  unbonding_time: DurationAmino;
  /** max_validators is the maximum number of validators. */
  max_validators?: number;
  /**
   * max_entries is the max entries for either unbonding delegation or
   * redelegation (per pair/trio).
   */
  max_entries?: number;
  /** historical_entries is the number of historical entries to persist. */
  historical_entries?: number;
  /** bond_denom defines the bondable coin denomination. */
  bond_denom?: string;
  /**
   * min_commission_rate is the chain-wide minimum commission rate that a
   * validator can charge their delegators
   */
  min_commission_rate: string;
}
export interface StakingParamsAminoMsg {
  type: "cosmos-sdk/x/staking/Params";
  value: StakingParamsAmino;
}
/** StakingParams defines the parameters for the x/staking module. */
export interface StakingParamsSDKType {
  unbonding_time: DurationSDKType;
  max_validators: number;
  max_entries: number;
  historical_entries: number;
  bond_denom: string;
  min_commission_rate: string;
}
function createBaseParams(): Params {
  return {
    admins: [],
    allowValidatorSelfExit: false
  };
}
export const Params = {
  typeUrl: "/strangelove_ventures.poa.v1.Params",
  aminoType: "poa/params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.admins) {
      writer.uint32(10).string(v!);
    }
    if (message.allowValidatorSelfExit === true) {
      writer.uint32(16).bool(message.allowValidatorSelfExit);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admins.push(reader.string());
          break;
        case 2:
          message.allowValidatorSelfExit = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Params>): Params {
    const message = createBaseParams();
    message.admins = object.admins?.map(e => e) || [];
    message.allowValidatorSelfExit = object.allowValidatorSelfExit ?? false;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    message.admins = object.admins?.map(e => e) || [];
    if (object.allow_validator_self_exit !== undefined && object.allow_validator_self_exit !== null) {
      message.allowValidatorSelfExit = object.allow_validator_self_exit;
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    if (message.admins) {
      obj.admins = message.admins.map(e => e);
    } else {
      obj.admins = message.admins;
    }
    obj.allow_validator_self_exit = message.allowValidatorSelfExit === false ? undefined : message.allowValidatorSelfExit;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  toAminoMsg(message: Params): ParamsAminoMsg {
    return {
      type: "poa/params",
      value: Params.toAmino(message)
    };
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseStakingParams(): StakingParams {
  return {
    unbondingTime: Duration.fromPartial({}),
    maxValidators: 0,
    maxEntries: 0,
    historicalEntries: 0,
    bondDenom: "",
    minCommissionRate: ""
  };
}
export const StakingParams = {
  typeUrl: "/strangelove_ventures.poa.v1.StakingParams",
  aminoType: "cosmos-sdk/x/staking/Params",
  encode(message: StakingParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.unbondingTime !== undefined) {
      Duration.encode(message.unbondingTime, writer.uint32(10).fork()).ldelim();
    }
    if (message.maxValidators !== 0) {
      writer.uint32(16).uint32(message.maxValidators);
    }
    if (message.maxEntries !== 0) {
      writer.uint32(24).uint32(message.maxEntries);
    }
    if (message.historicalEntries !== 0) {
      writer.uint32(32).uint32(message.historicalEntries);
    }
    if (message.bondDenom !== "") {
      writer.uint32(42).string(message.bondDenom);
    }
    if (message.minCommissionRate !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.minCommissionRate, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): StakingParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStakingParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbondingTime = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.maxValidators = reader.uint32();
          break;
        case 3:
          message.maxEntries = reader.uint32();
          break;
        case 4:
          message.historicalEntries = reader.uint32();
          break;
        case 5:
          message.bondDenom = reader.string();
          break;
        case 6:
          message.minCommissionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<StakingParams>): StakingParams {
    const message = createBaseStakingParams();
    message.unbondingTime = object.unbondingTime !== undefined && object.unbondingTime !== null ? Duration.fromPartial(object.unbondingTime) : undefined;
    message.maxValidators = object.maxValidators ?? 0;
    message.maxEntries = object.maxEntries ?? 0;
    message.historicalEntries = object.historicalEntries ?? 0;
    message.bondDenom = object.bondDenom ?? "";
    message.minCommissionRate = object.minCommissionRate ?? "";
    return message;
  },
  fromAmino(object: StakingParamsAmino): StakingParams {
    const message = createBaseStakingParams();
    if (object.unbonding_time !== undefined && object.unbonding_time !== null) {
      message.unbondingTime = Duration.fromAmino(object.unbonding_time);
    }
    if (object.max_validators !== undefined && object.max_validators !== null) {
      message.maxValidators = object.max_validators;
    }
    if (object.max_entries !== undefined && object.max_entries !== null) {
      message.maxEntries = object.max_entries;
    }
    if (object.historical_entries !== undefined && object.historical_entries !== null) {
      message.historicalEntries = object.historical_entries;
    }
    if (object.bond_denom !== undefined && object.bond_denom !== null) {
      message.bondDenom = object.bond_denom;
    }
    if (object.min_commission_rate !== undefined && object.min_commission_rate !== null) {
      message.minCommissionRate = object.min_commission_rate;
    }
    return message;
  },
  toAmino(message: StakingParams): StakingParamsAmino {
    const obj: any = {};
    obj.unbonding_time = message.unbondingTime ? Duration.toAmino(message.unbondingTime) : Duration.toAmino(Duration.fromPartial({}));
    obj.max_validators = message.maxValidators === 0 ? undefined : message.maxValidators;
    obj.max_entries = message.maxEntries === 0 ? undefined : message.maxEntries;
    obj.historical_entries = message.historicalEntries === 0 ? undefined : message.historicalEntries;
    obj.bond_denom = message.bondDenom === "" ? undefined : message.bondDenom;
    obj.min_commission_rate = message.minCommissionRate ?? "";
    return obj;
  },
  fromAminoMsg(object: StakingParamsAminoMsg): StakingParams {
    return StakingParams.fromAmino(object.value);
  },
  toAminoMsg(message: StakingParams): StakingParamsAminoMsg {
    return {
      type: "cosmos-sdk/x/staking/Params",
      value: StakingParams.toAmino(message)
    };
  },
  fromProtoMsg(message: StakingParamsProtoMsg): StakingParams {
    return StakingParams.decode(message.value);
  },
  toProto(message: StakingParams): Uint8Array {
    return StakingParams.encode(message).finish();
  },
  toProtoMsg(message: StakingParams): StakingParamsProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.StakingParams",
      value: StakingParams.encode(message).finish()
    };
  }
};