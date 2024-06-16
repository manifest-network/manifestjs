import { Description, DescriptionAmino, DescriptionSDKType, CommissionRates, CommissionRatesAmino, CommissionRatesSDKType } from "./validator";
import { Any, AnyProtoMsg, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { Params, ParamsAmino, ParamsSDKType, StakingParams, StakingParamsAmino, StakingParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial, Exact } from "../../../helpers";
import { encodePubkey, decodePubkey } from "@cosmjs/proto-signing";
import { Pubkey } from "@cosmjs/amino";
/** SetPower sets the new power of the validator and accepts new validators into the set. */
export interface MsgSetPower {
  sender: string;
  validatorAddress: string;
  power: bigint;
  unsafe: boolean;
}
export interface MsgSetPowerProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.MsgSetPower";
  value: Uint8Array;
}
/** SetPower sets the new power of the validator and accepts new validators into the set. */
export interface MsgSetPowerAmino {
  sender?: string;
  validator_address?: string;
  power?: string;
  unsafe?: boolean;
}
export interface MsgSetPowerAminoMsg {
  type: "poa/MsgSetPower";
  value: MsgSetPowerAmino;
}
/** SetPower sets the new power of the validator and accepts new validators into the set. */
export interface MsgSetPowerSDKType {
  sender: string;
  validator_address: string;
  power: bigint;
  unsafe: boolean;
}
/** MsgSetPowerResponse is the response type for the Msg/SetPower RPC method. */
export interface MsgSetPowerResponse {}
export interface MsgSetPowerResponseProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.MsgSetPowerResponse";
  value: Uint8Array;
}
/** MsgSetPowerResponse is the response type for the Msg/SetPower RPC method. */
export interface MsgSetPowerResponseAmino {}
export interface MsgSetPowerResponseAminoMsg {
  type: "/strangelove_ventures.poa.v1.MsgSetPowerResponse";
  value: MsgSetPowerResponseAmino;
}
/** MsgSetPowerResponse is the response type for the Msg/SetPower RPC method. */
export interface MsgSetPowerResponseSDKType {}
/** MsgRemoveValidator removes an active validitor from the set and unbonds their delegations. */
export interface MsgRemoveValidator {
  sender: string;
  validatorAddress: string;
}
export interface MsgRemoveValidatorProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidator";
  value: Uint8Array;
}
/** MsgRemoveValidator removes an active validitor from the set and unbonds their delegations. */
export interface MsgRemoveValidatorAmino {
  sender?: string;
  validator_address?: string;
}
export interface MsgRemoveValidatorAminoMsg {
  type: "poa/MsgRemoveValidator";
  value: MsgRemoveValidatorAmino;
}
/** MsgRemoveValidator removes an active validitor from the set and unbonds their delegations. */
export interface MsgRemoveValidatorSDKType {
  sender: string;
  validator_address: string;
}
/** MsgSetPowerResponse is the response type for the Msg/RemoveValidator RPC method. */
export interface MsgRemoveValidatorResponse {}
export interface MsgRemoveValidatorResponseProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidatorResponse";
  value: Uint8Array;
}
/** MsgSetPowerResponse is the response type for the Msg/RemoveValidator RPC method. */
export interface MsgRemoveValidatorResponseAmino {}
export interface MsgRemoveValidatorResponseAminoMsg {
  type: "/strangelove_ventures.poa.v1.MsgRemoveValidatorResponse";
  value: MsgRemoveValidatorResponseAmino;
}
/** MsgSetPowerResponse is the response type for the Msg/RemoveValidator RPC method. */
export interface MsgRemoveValidatorResponseSDKType {}
/** MsgRemovePending removes an pending validator from the queue. */
export interface MsgRemovePending {
  sender: string;
  validatorAddress: string;
}
export interface MsgRemovePendingProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePending";
  value: Uint8Array;
}
/** MsgRemovePending removes an pending validator from the queue. */
export interface MsgRemovePendingAmino {
  sender?: string;
  validator_address?: string;
}
export interface MsgRemovePendingAminoMsg {
  type: "poa/MsgRemovePending";
  value: MsgRemovePendingAmino;
}
/** MsgRemovePending removes an pending validator from the queue. */
export interface MsgRemovePendingSDKType {
  sender: string;
  validator_address: string;
}
/** MsgRemovePendingResponse is the response type for the Msg/RemovePending RPC method. */
export interface MsgRemovePendingResponse {}
export interface MsgRemovePendingResponseProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePendingResponse";
  value: Uint8Array;
}
/** MsgRemovePendingResponse is the response type for the Msg/RemovePending RPC method. */
export interface MsgRemovePendingResponseAmino {}
export interface MsgRemovePendingResponseAminoMsg {
  type: "/strangelove_ventures.poa.v1.MsgRemovePendingResponse";
  value: MsgRemovePendingResponseAmino;
}
/** MsgRemovePendingResponse is the response type for the Msg/RemovePending RPC method. */
export interface MsgRemovePendingResponseSDKType {}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /**
   * sender is the address of the admin account with permission to update.
   * ex: governance, multisig/DAO, or standard account found in Params.
   */
  sender: string;
  /** module parameters (all must be supplied). */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateParams";
  value: Uint8Array;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParamsAmino {
  /**
   * sender is the address of the admin account with permission to update.
   * ex: governance, multisig/DAO, or standard account found in Params.
   */
  sender?: string;
  /** module parameters (all must be supplied). */
  params?: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "poa/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParamsSDKType {
  sender: string;
  params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/strangelove_ventures.poa.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseSDKType {}
/** MsgUpdateStakingParams is the Msg/UpdateStakingParams request type. */
export interface MsgUpdateStakingParams {
  /**
   * sender is the address of the admin account with permission to update.
   * ex: governance, multisig/DAO, or standard account found in Params.
   */
  sender: string;
  /** x/staking  module parameters (all must be supplied). */
  params: StakingParams;
}
export interface MsgUpdateStakingParamsProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParams";
  value: Uint8Array;
}
/** MsgUpdateStakingParams is the Msg/UpdateStakingParams request type. */
export interface MsgUpdateStakingParamsAmino {
  /**
   * sender is the address of the admin account with permission to update.
   * ex: governance, multisig/DAO, or standard account found in Params.
   */
  sender?: string;
  /** x/staking  module parameters (all must be supplied). */
  params?: StakingParamsAmino;
}
export interface MsgUpdateStakingParamsAminoMsg {
  type: "poa/MsgUpdateStakingParams";
  value: MsgUpdateStakingParamsAmino;
}
/** MsgUpdateStakingParams is the Msg/UpdateStakingParams request type. */
export interface MsgUpdateStakingParamsSDKType {
  sender: string;
  params: StakingParamsSDKType;
}
/**
 * MsgUpdateStakingParamsResponse defines the response structure for executing a
 * MsgUpdateStakingParams message.
 */
export interface MsgUpdateStakingParamsResponse {}
export interface MsgUpdateStakingParamsResponseProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateStakingParamsResponse defines the response structure for executing a
 * MsgUpdateStakingParams message.
 */
export interface MsgUpdateStakingParamsResponseAmino {}
export interface MsgUpdateStakingParamsResponseAminoMsg {
  type: "/strangelove_ventures.poa.v1.MsgUpdateStakingParamsResponse";
  value: MsgUpdateStakingParamsResponseAmino;
}
/**
 * MsgUpdateStakingParamsResponse defines the response structure for executing a
 * MsgUpdateStakingParams message.
 */
export interface MsgUpdateStakingParamsResponseSDKType {}
/**
 * cosmos-sdk/proto/staking/v1beta1/tx.proto
 * MsgCreateValidator defines a SDK message for creating a new validator.
 */
export interface MsgCreateValidator {
  description: Description;
  commission: CommissionRates;
  minSelfDelegation: string;
  /**
   * Deprecated: Use of Delegator Address in MsgCreateValidator is deprecated.
   * The validator address bytes and delegator address bytes refer to the same
   * account while creating validator (defer only in bech32 notation).
   */
  /** @deprecated */
  delegatorAddress: string;
  validatorAddress: string;
  pubkey?: Any | undefined;
}
export interface MsgCreateValidatorProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.MsgCreateValidator";
  value: Uint8Array;
}
export type MsgCreateValidatorEncoded = Omit<MsgCreateValidator, "pubkey"> & {
  pubkey?: AnyProtoMsg | undefined;
};
/**
 * cosmos-sdk/proto/staking/v1beta1/tx.proto
 * MsgCreateValidator defines a SDK message for creating a new validator.
 */
export interface MsgCreateValidatorAmino {
  description: DescriptionAmino;
  commission: CommissionRatesAmino;
  min_self_delegation: string;
  /**
   * Deprecated: Use of Delegator Address in MsgCreateValidator is deprecated.
   * The validator address bytes and delegator address bytes refer to the same
   * account while creating validator (defer only in bech32 notation).
   */
  /** @deprecated */
  delegator_address?: string;
  validator_address?: string;
  pubkey?: AnyAmino;
}
export interface MsgCreateValidatorAminoMsg {
  type: "poa/MsgCreateValidator";
  value: MsgCreateValidatorAmino;
}
/**
 * cosmos-sdk/proto/staking/v1beta1/tx.proto
 * MsgCreateValidator defines a SDK message for creating a new validator.
 */
export interface MsgCreateValidatorSDKType {
  description: DescriptionSDKType;
  commission: CommissionRatesSDKType;
  min_self_delegation: string;
  /** @deprecated */
  delegator_address: string;
  validator_address: string;
  pubkey?: AnySDKType | undefined;
}
/** MsgCreateValidatorResponse is the response type for the Msg/CreateValidator RPC method. */
export interface MsgCreateValidatorResponse {}
export interface MsgCreateValidatorResponseProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.MsgCreateValidatorResponse";
  value: Uint8Array;
}
/** MsgCreateValidatorResponse is the response type for the Msg/CreateValidator RPC method. */
export interface MsgCreateValidatorResponseAmino {}
export interface MsgCreateValidatorResponseAminoMsg {
  type: "/strangelove_ventures.poa.v1.MsgCreateValidatorResponse";
  value: MsgCreateValidatorResponseAmino;
}
/** MsgCreateValidatorResponse is the response type for the Msg/CreateValidator RPC method. */
export interface MsgCreateValidatorResponseSDKType {}
function createBaseMsgSetPower(): MsgSetPower {
  return {
    sender: "",
    validatorAddress: "",
    power: BigInt(0),
    unsafe: false
  };
}
export const MsgSetPower = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgSetPower",
  aminoType: "poa/MsgSetPower",
  encode(message: MsgSetPower, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.power !== BigInt(0)) {
      writer.uint32(24).uint64(message.power);
    }
    if (message.unsafe === true) {
      writer.uint32(32).bool(message.unsafe);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSetPower {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetPower();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        case 3:
          message.power = reader.uint64();
          break;
        case 4:
          message.unsafe = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetPower>, I>>(object: I): MsgSetPower {
    const message = createBaseMsgSetPower();
    message.sender = object.sender ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.power = object.power !== undefined && object.power !== null ? BigInt(object.power.toString()) : BigInt(0);
    message.unsafe = object.unsafe ?? false;
    return message;
  },
  fromAmino(object: MsgSetPowerAmino): MsgSetPower {
    const message = createBaseMsgSetPower();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.power !== undefined && object.power !== null) {
      message.power = BigInt(object.power);
    }
    if (object.unsafe !== undefined && object.unsafe !== null) {
      message.unsafe = object.unsafe;
    }
    return message;
  },
  toAmino(message: MsgSetPower): MsgSetPowerAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
    obj.power = message.power !== BigInt(0) ? message.power.toString() : undefined;
    obj.unsafe = message.unsafe === false ? undefined : message.unsafe;
    return obj;
  },
  fromAminoMsg(object: MsgSetPowerAminoMsg): MsgSetPower {
    return MsgSetPower.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetPower): MsgSetPowerAminoMsg {
    return {
      type: "poa/MsgSetPower",
      value: MsgSetPower.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgSetPowerProtoMsg): MsgSetPower {
    return MsgSetPower.decode(message.value);
  },
  toProto(message: MsgSetPower): Uint8Array {
    return MsgSetPower.encode(message).finish();
  },
  toProtoMsg(message: MsgSetPower): MsgSetPowerProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.MsgSetPower",
      value: MsgSetPower.encode(message).finish()
    };
  }
};
function createBaseMsgSetPowerResponse(): MsgSetPowerResponse {
  return {};
}
export const MsgSetPowerResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgSetPowerResponse",
  encode(_: MsgSetPowerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSetPowerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetPowerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetPowerResponse>, I>>(_: I): MsgSetPowerResponse {
    const message = createBaseMsgSetPowerResponse();
    return message;
  },
  fromAmino(_: MsgSetPowerResponseAmino): MsgSetPowerResponse {
    const message = createBaseMsgSetPowerResponse();
    return message;
  },
  toAmino(_: MsgSetPowerResponse): MsgSetPowerResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetPowerResponseAminoMsg): MsgSetPowerResponse {
    return MsgSetPowerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetPowerResponseProtoMsg): MsgSetPowerResponse {
    return MsgSetPowerResponse.decode(message.value);
  },
  toProto(message: MsgSetPowerResponse): Uint8Array {
    return MsgSetPowerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetPowerResponse): MsgSetPowerResponseProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.MsgSetPowerResponse",
      value: MsgSetPowerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveValidator(): MsgRemoveValidator {
  return {
    sender: "",
    validatorAddress: ""
  };
}
export const MsgRemoveValidator = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidator",
  aminoType: "poa/MsgRemoveValidator",
  encode(message: MsgRemoveValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRemoveValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemoveValidator>, I>>(object: I): MsgRemoveValidator {
    const message = createBaseMsgRemoveValidator();
    message.sender = object.sender ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  },
  fromAmino(object: MsgRemoveValidatorAmino): MsgRemoveValidator {
    const message = createBaseMsgRemoveValidator();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    return message;
  },
  toAmino(message: MsgRemoveValidator): MsgRemoveValidatorAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveValidatorAminoMsg): MsgRemoveValidator {
    return MsgRemoveValidator.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRemoveValidator): MsgRemoveValidatorAminoMsg {
    return {
      type: "poa/MsgRemoveValidator",
      value: MsgRemoveValidator.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgRemoveValidatorProtoMsg): MsgRemoveValidator {
    return MsgRemoveValidator.decode(message.value);
  },
  toProto(message: MsgRemoveValidator): Uint8Array {
    return MsgRemoveValidator.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveValidator): MsgRemoveValidatorProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidator",
      value: MsgRemoveValidator.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveValidatorResponse(): MsgRemoveValidatorResponse {
  return {};
}
export const MsgRemoveValidatorResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidatorResponse",
  encode(_: MsgRemoveValidatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRemoveValidatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemoveValidatorResponse>, I>>(_: I): MsgRemoveValidatorResponse {
    const message = createBaseMsgRemoveValidatorResponse();
    return message;
  },
  fromAmino(_: MsgRemoveValidatorResponseAmino): MsgRemoveValidatorResponse {
    const message = createBaseMsgRemoveValidatorResponse();
    return message;
  },
  toAmino(_: MsgRemoveValidatorResponse): MsgRemoveValidatorResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemoveValidatorResponseAminoMsg): MsgRemoveValidatorResponse {
    return MsgRemoveValidatorResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveValidatorResponseProtoMsg): MsgRemoveValidatorResponse {
    return MsgRemoveValidatorResponse.decode(message.value);
  },
  toProto(message: MsgRemoveValidatorResponse): Uint8Array {
    return MsgRemoveValidatorResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveValidatorResponse): MsgRemoveValidatorResponseProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidatorResponse",
      value: MsgRemoveValidatorResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemovePending(): MsgRemovePending {
  return {
    sender: "",
    validatorAddress: ""
  };
}
export const MsgRemovePending = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePending",
  aminoType: "poa/MsgRemovePending",
  encode(message: MsgRemovePending, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRemovePending {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemovePending();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemovePending>, I>>(object: I): MsgRemovePending {
    const message = createBaseMsgRemovePending();
    message.sender = object.sender ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  },
  fromAmino(object: MsgRemovePendingAmino): MsgRemovePending {
    const message = createBaseMsgRemovePending();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    return message;
  },
  toAmino(message: MsgRemovePending): MsgRemovePendingAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
    return obj;
  },
  fromAminoMsg(object: MsgRemovePendingAminoMsg): MsgRemovePending {
    return MsgRemovePending.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRemovePending): MsgRemovePendingAminoMsg {
    return {
      type: "poa/MsgRemovePending",
      value: MsgRemovePending.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgRemovePendingProtoMsg): MsgRemovePending {
    return MsgRemovePending.decode(message.value);
  },
  toProto(message: MsgRemovePending): Uint8Array {
    return MsgRemovePending.encode(message).finish();
  },
  toProtoMsg(message: MsgRemovePending): MsgRemovePendingProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePending",
      value: MsgRemovePending.encode(message).finish()
    };
  }
};
function createBaseMsgRemovePendingResponse(): MsgRemovePendingResponse {
  return {};
}
export const MsgRemovePendingResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePendingResponse",
  encode(_: MsgRemovePendingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRemovePendingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemovePendingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemovePendingResponse>, I>>(_: I): MsgRemovePendingResponse {
    const message = createBaseMsgRemovePendingResponse();
    return message;
  },
  fromAmino(_: MsgRemovePendingResponseAmino): MsgRemovePendingResponse {
    const message = createBaseMsgRemovePendingResponse();
    return message;
  },
  toAmino(_: MsgRemovePendingResponse): MsgRemovePendingResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemovePendingResponseAminoMsg): MsgRemovePendingResponse {
    return MsgRemovePendingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemovePendingResponseProtoMsg): MsgRemovePendingResponse {
    return MsgRemovePendingResponse.decode(message.value);
  },
  toProto(message: MsgRemovePendingResponse): Uint8Array {
    return MsgRemovePendingResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemovePendingResponse): MsgRemovePendingResponseProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePendingResponse",
      value: MsgRemovePendingResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    sender: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateParams",
  aminoType: "poa/MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.sender = object.sender ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams): MsgUpdateParamsAminoMsg {
    return {
      type: "poa/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateStakingParams(): MsgUpdateStakingParams {
  return {
    sender: "",
    params: StakingParams.fromPartial({})
  };
}
export const MsgUpdateStakingParams = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParams",
  aminoType: "poa/MsgUpdateStakingParams",
  encode(message: MsgUpdateStakingParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.params !== undefined) {
      StakingParams.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateStakingParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateStakingParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.params = StakingParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateStakingParams>, I>>(object: I): MsgUpdateStakingParams {
    const message = createBaseMsgUpdateStakingParams();
    message.sender = object.sender ?? "";
    message.params = object.params !== undefined && object.params !== null ? StakingParams.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateStakingParamsAmino): MsgUpdateStakingParams {
    const message = createBaseMsgUpdateStakingParams();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = StakingParams.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateStakingParams): MsgUpdateStakingParamsAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.params = message.params ? StakingParams.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateStakingParamsAminoMsg): MsgUpdateStakingParams {
    return MsgUpdateStakingParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateStakingParams): MsgUpdateStakingParamsAminoMsg {
    return {
      type: "poa/MsgUpdateStakingParams",
      value: MsgUpdateStakingParams.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgUpdateStakingParamsProtoMsg): MsgUpdateStakingParams {
    return MsgUpdateStakingParams.decode(message.value);
  },
  toProto(message: MsgUpdateStakingParams): Uint8Array {
    return MsgUpdateStakingParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateStakingParams): MsgUpdateStakingParamsProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParams",
      value: MsgUpdateStakingParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateStakingParamsResponse(): MsgUpdateStakingParamsResponse {
  return {};
}
export const MsgUpdateStakingParamsResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParamsResponse",
  encode(_: MsgUpdateStakingParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateStakingParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateStakingParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateStakingParamsResponse>, I>>(_: I): MsgUpdateStakingParamsResponse {
    const message = createBaseMsgUpdateStakingParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateStakingParamsResponseAmino): MsgUpdateStakingParamsResponse {
    const message = createBaseMsgUpdateStakingParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateStakingParamsResponse): MsgUpdateStakingParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateStakingParamsResponseAminoMsg): MsgUpdateStakingParamsResponse {
    return MsgUpdateStakingParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateStakingParamsResponseProtoMsg): MsgUpdateStakingParamsResponse {
    return MsgUpdateStakingParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateStakingParamsResponse): Uint8Array {
    return MsgUpdateStakingParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateStakingParamsResponse): MsgUpdateStakingParamsResponseProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParamsResponse",
      value: MsgUpdateStakingParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCreateValidator(): MsgCreateValidator {
  return {
    description: Description.fromPartial({}),
    commission: CommissionRates.fromPartial({}),
    minSelfDelegation: "",
    delegatorAddress: "",
    validatorAddress: "",
    pubkey: undefined
  };
}
export const MsgCreateValidator = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgCreateValidator",
  aminoType: "poa/MsgCreateValidator",
  encode(message: MsgCreateValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.description !== undefined) {
      Description.encode(message.description, writer.uint32(10).fork()).ldelim();
    }
    if (message.commission !== undefined) {
      CommissionRates.encode(message.commission, writer.uint32(18).fork()).ldelim();
    }
    if (message.minSelfDelegation !== "") {
      writer.uint32(26).string(message.minSelfDelegation);
    }
    if (message.delegatorAddress !== "") {
      writer.uint32(34).string(message.delegatorAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(42).string(message.validatorAddress);
    }
    if (message.pubkey !== undefined) {
      Any.encode((message.pubkey as Any), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.description = Description.decode(reader, reader.uint32());
          break;
        case 2:
          message.commission = CommissionRates.decode(reader, reader.uint32());
          break;
        case 3:
          message.minSelfDelegation = reader.string();
          break;
        case 4:
          message.delegatorAddress = reader.string();
          break;
        case 5:
          message.validatorAddress = reader.string();
          break;
        case 6:
          message.pubkey = (Cosmos_cryptoPubKey_InterfaceDecoder(reader) as Any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateValidator>, I>>(object: I): MsgCreateValidator {
    const message = createBaseMsgCreateValidator();
    message.description = object.description !== undefined && object.description !== null ? Description.fromPartial(object.description) : undefined;
    message.commission = object.commission !== undefined && object.commission !== null ? CommissionRates.fromPartial(object.commission) : undefined;
    message.minSelfDelegation = object.minSelfDelegation ?? "";
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.pubkey = object.pubkey !== undefined && object.pubkey !== null ? Any.fromPartial(object.pubkey) : undefined;
    return message;
  },
  fromAmino(object: MsgCreateValidatorAmino): MsgCreateValidator {
    const message = createBaseMsgCreateValidator();
    if (object.description !== undefined && object.description !== null) {
      message.description = Description.fromAmino(object.description);
    }
    if (object.commission !== undefined && object.commission !== null) {
      message.commission = CommissionRates.fromAmino(object.commission);
    }
    if (object.min_self_delegation !== undefined && object.min_self_delegation !== null) {
      message.minSelfDelegation = object.min_self_delegation;
    }
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.pubkey !== undefined && object.pubkey !== null) {
      message.pubkey = encodePubkey(object.pubkey);
    }
    return message;
  },
  toAmino(message: MsgCreateValidator): MsgCreateValidatorAmino {
    const obj: any = {};
    obj.description = message.description ? Description.toAmino(message.description) : Description.toAmino(Description.fromPartial({}));
    obj.commission = message.commission ? CommissionRates.toAmino(message.commission) : CommissionRates.toAmino(CommissionRates.fromPartial({}));
    obj.min_self_delegation = message.minSelfDelegation ?? "";
    obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
    obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
    obj.pubkey = message.pubkey ? decodePubkey(message.pubkey) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCreateValidatorAminoMsg): MsgCreateValidator {
    return MsgCreateValidator.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateValidator): MsgCreateValidatorAminoMsg {
    return {
      type: "poa/MsgCreateValidator",
      value: MsgCreateValidator.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgCreateValidatorProtoMsg): MsgCreateValidator {
    return MsgCreateValidator.decode(message.value);
  },
  toProto(message: MsgCreateValidator): Uint8Array {
    return MsgCreateValidator.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateValidator): MsgCreateValidatorProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.MsgCreateValidator",
      value: MsgCreateValidator.encode(message).finish()
    };
  }
};
function createBaseMsgCreateValidatorResponse(): MsgCreateValidatorResponse {
  return {};
}
export const MsgCreateValidatorResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgCreateValidatorResponse",
  encode(_: MsgCreateValidatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateValidatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateValidatorResponse>, I>>(_: I): MsgCreateValidatorResponse {
    const message = createBaseMsgCreateValidatorResponse();
    return message;
  },
  fromAmino(_: MsgCreateValidatorResponseAmino): MsgCreateValidatorResponse {
    const message = createBaseMsgCreateValidatorResponse();
    return message;
  },
  toAmino(_: MsgCreateValidatorResponse): MsgCreateValidatorResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreateValidatorResponseAminoMsg): MsgCreateValidatorResponse {
    return MsgCreateValidatorResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateValidatorResponseProtoMsg): MsgCreateValidatorResponse {
    return MsgCreateValidatorResponse.decode(message.value);
  },
  toProto(message: MsgCreateValidatorResponse): Uint8Array {
    return MsgCreateValidatorResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateValidatorResponse): MsgCreateValidatorResponseProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.MsgCreateValidatorResponse",
      value: MsgCreateValidatorResponse.encode(message).finish()
    };
  }
};
export const Cosmos_cryptoPubKey_InterfaceDecoder = (input: BinaryReader | Uint8Array): Any => {
  const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
  const data = Any.decode(reader, reader.uint32());
  switch (data.typeUrl) {
    default:
      return data;
  }
};
export const Cosmos_cryptoPubKey_FromAmino = (content: AnyAmino): Any => {
  return encodePubkey(content);
};
export const Cosmos_cryptoPubKey_ToAmino = (content: Any): Pubkey | null => {
  return decodePubkey(content);
};