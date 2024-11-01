import { Description, DescriptionAmino, DescriptionSDKType, CommissionRates, CommissionRatesAmino, CommissionRatesSDKType } from "./validator";
import { Any, AnyProtoMsg, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { StakingParams, StakingParamsAmino, StakingParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
import { GlobalDecoderRegistry } from "../../../registry";
import { encodePubkey, decodePubkey } from "@cosmjs/proto-signing";
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
  is(o: any): o is MsgSetPower {
    return o && (o.$typeUrl === MsgSetPower.typeUrl || typeof o.sender === "string" && typeof o.validatorAddress === "string" && typeof o.power === "bigint" && typeof o.unsafe === "boolean");
  },
  isSDK(o: any): o is MsgSetPowerSDKType {
    return o && (o.$typeUrl === MsgSetPower.typeUrl || typeof o.sender === "string" && typeof o.validator_address === "string" && typeof o.power === "bigint" && typeof o.unsafe === "boolean");
  },
  isAmino(o: any): o is MsgSetPowerAmino {
    return o && (o.$typeUrl === MsgSetPower.typeUrl || typeof o.sender === "string" && typeof o.validator_address === "string" && typeof o.power === "bigint" && typeof o.unsafe === "boolean");
  },
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
  fromJSON(object: any): MsgSetPower {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      power: isSet(object.power) ? BigInt(object.power.toString()) : BigInt(0),
      unsafe: isSet(object.unsafe) ? Boolean(object.unsafe) : false
    };
  },
  toJSON(message: MsgSetPower): JsonSafe<MsgSetPower> {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    message.power !== undefined && (obj.power = (message.power || BigInt(0)).toString());
    message.unsafe !== undefined && (obj.unsafe = message.unsafe);
    return obj;
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
    obj.power = message.power !== BigInt(0) ? message.power?.toString() : undefined;
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
GlobalDecoderRegistry.register(MsgSetPower.typeUrl, MsgSetPower);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgSetPower.aminoType, MsgSetPower.typeUrl);
function createBaseMsgSetPowerResponse(): MsgSetPowerResponse {
  return {};
}
export const MsgSetPowerResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgSetPowerResponse",
  is(o: any): o is MsgSetPowerResponse {
    return o && o.$typeUrl === MsgSetPowerResponse.typeUrl;
  },
  isSDK(o: any): o is MsgSetPowerResponseSDKType {
    return o && o.$typeUrl === MsgSetPowerResponse.typeUrl;
  },
  isAmino(o: any): o is MsgSetPowerResponseAmino {
    return o && o.$typeUrl === MsgSetPowerResponse.typeUrl;
  },
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
  fromJSON(_: any): MsgSetPowerResponse {
    return {};
  },
  toJSON(_: MsgSetPowerResponse): JsonSafe<MsgSetPowerResponse> {
    const obj: any = {};
    return obj;
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
GlobalDecoderRegistry.register(MsgSetPowerResponse.typeUrl, MsgSetPowerResponse);
function createBaseMsgRemoveValidator(): MsgRemoveValidator {
  return {
    sender: "",
    validatorAddress: ""
  };
}
export const MsgRemoveValidator = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidator",
  aminoType: "poa/MsgRemoveValidator",
  is(o: any): o is MsgRemoveValidator {
    return o && (o.$typeUrl === MsgRemoveValidator.typeUrl || typeof o.sender === "string" && typeof o.validatorAddress === "string");
  },
  isSDK(o: any): o is MsgRemoveValidatorSDKType {
    return o && (o.$typeUrl === MsgRemoveValidator.typeUrl || typeof o.sender === "string" && typeof o.validator_address === "string");
  },
  isAmino(o: any): o is MsgRemoveValidatorAmino {
    return o && (o.$typeUrl === MsgRemoveValidator.typeUrl || typeof o.sender === "string" && typeof o.validator_address === "string");
  },
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
  fromJSON(object: any): MsgRemoveValidator {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : ""
    };
  },
  toJSON(message: MsgRemoveValidator): JsonSafe<MsgRemoveValidator> {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    return obj;
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
GlobalDecoderRegistry.register(MsgRemoveValidator.typeUrl, MsgRemoveValidator);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgRemoveValidator.aminoType, MsgRemoveValidator.typeUrl);
function createBaseMsgRemoveValidatorResponse(): MsgRemoveValidatorResponse {
  return {};
}
export const MsgRemoveValidatorResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidatorResponse",
  is(o: any): o is MsgRemoveValidatorResponse {
    return o && o.$typeUrl === MsgRemoveValidatorResponse.typeUrl;
  },
  isSDK(o: any): o is MsgRemoveValidatorResponseSDKType {
    return o && o.$typeUrl === MsgRemoveValidatorResponse.typeUrl;
  },
  isAmino(o: any): o is MsgRemoveValidatorResponseAmino {
    return o && o.$typeUrl === MsgRemoveValidatorResponse.typeUrl;
  },
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
  fromJSON(_: any): MsgRemoveValidatorResponse {
    return {};
  },
  toJSON(_: MsgRemoveValidatorResponse): JsonSafe<MsgRemoveValidatorResponse> {
    const obj: any = {};
    return obj;
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
GlobalDecoderRegistry.register(MsgRemoveValidatorResponse.typeUrl, MsgRemoveValidatorResponse);
function createBaseMsgRemovePending(): MsgRemovePending {
  return {
    sender: "",
    validatorAddress: ""
  };
}
export const MsgRemovePending = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePending",
  aminoType: "poa/MsgRemovePending",
  is(o: any): o is MsgRemovePending {
    return o && (o.$typeUrl === MsgRemovePending.typeUrl || typeof o.sender === "string" && typeof o.validatorAddress === "string");
  },
  isSDK(o: any): o is MsgRemovePendingSDKType {
    return o && (o.$typeUrl === MsgRemovePending.typeUrl || typeof o.sender === "string" && typeof o.validator_address === "string");
  },
  isAmino(o: any): o is MsgRemovePendingAmino {
    return o && (o.$typeUrl === MsgRemovePending.typeUrl || typeof o.sender === "string" && typeof o.validator_address === "string");
  },
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
  fromJSON(object: any): MsgRemovePending {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : ""
    };
  },
  toJSON(message: MsgRemovePending): JsonSafe<MsgRemovePending> {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    return obj;
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
GlobalDecoderRegistry.register(MsgRemovePending.typeUrl, MsgRemovePending);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgRemovePending.aminoType, MsgRemovePending.typeUrl);
function createBaseMsgRemovePendingResponse(): MsgRemovePendingResponse {
  return {};
}
export const MsgRemovePendingResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePendingResponse",
  is(o: any): o is MsgRemovePendingResponse {
    return o && o.$typeUrl === MsgRemovePendingResponse.typeUrl;
  },
  isSDK(o: any): o is MsgRemovePendingResponseSDKType {
    return o && o.$typeUrl === MsgRemovePendingResponse.typeUrl;
  },
  isAmino(o: any): o is MsgRemovePendingResponseAmino {
    return o && o.$typeUrl === MsgRemovePendingResponse.typeUrl;
  },
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
  fromJSON(_: any): MsgRemovePendingResponse {
    return {};
  },
  toJSON(_: MsgRemovePendingResponse): JsonSafe<MsgRemovePendingResponse> {
    const obj: any = {};
    return obj;
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
GlobalDecoderRegistry.register(MsgRemovePendingResponse.typeUrl, MsgRemovePendingResponse);
function createBaseMsgUpdateStakingParams(): MsgUpdateStakingParams {
  return {
    sender: "",
    params: StakingParams.fromPartial({})
  };
}
export const MsgUpdateStakingParams = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParams",
  aminoType: "poa/MsgUpdateStakingParams",
  is(o: any): o is MsgUpdateStakingParams {
    return o && (o.$typeUrl === MsgUpdateStakingParams.typeUrl || typeof o.sender === "string" && StakingParams.is(o.params));
  },
  isSDK(o: any): o is MsgUpdateStakingParamsSDKType {
    return o && (o.$typeUrl === MsgUpdateStakingParams.typeUrl || typeof o.sender === "string" && StakingParams.isSDK(o.params));
  },
  isAmino(o: any): o is MsgUpdateStakingParamsAmino {
    return o && (o.$typeUrl === MsgUpdateStakingParams.typeUrl || typeof o.sender === "string" && StakingParams.isAmino(o.params));
  },
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
  fromJSON(object: any): MsgUpdateStakingParams {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      params: isSet(object.params) ? StakingParams.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: MsgUpdateStakingParams): JsonSafe<MsgUpdateStakingParams> {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.params !== undefined && (obj.params = message.params ? StakingParams.toJSON(message.params) : undefined);
    return obj;
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
GlobalDecoderRegistry.register(MsgUpdateStakingParams.typeUrl, MsgUpdateStakingParams);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgUpdateStakingParams.aminoType, MsgUpdateStakingParams.typeUrl);
function createBaseMsgUpdateStakingParamsResponse(): MsgUpdateStakingParamsResponse {
  return {};
}
export const MsgUpdateStakingParamsResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParamsResponse",
  is(o: any): o is MsgUpdateStakingParamsResponse {
    return o && o.$typeUrl === MsgUpdateStakingParamsResponse.typeUrl;
  },
  isSDK(o: any): o is MsgUpdateStakingParamsResponseSDKType {
    return o && o.$typeUrl === MsgUpdateStakingParamsResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateStakingParamsResponseAmino {
    return o && o.$typeUrl === MsgUpdateStakingParamsResponse.typeUrl;
  },
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
  fromJSON(_: any): MsgUpdateStakingParamsResponse {
    return {};
  },
  toJSON(_: MsgUpdateStakingParamsResponse): JsonSafe<MsgUpdateStakingParamsResponse> {
    const obj: any = {};
    return obj;
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
GlobalDecoderRegistry.register(MsgUpdateStakingParamsResponse.typeUrl, MsgUpdateStakingParamsResponse);
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
  is(o: any): o is MsgCreateValidator {
    return o && (o.$typeUrl === MsgCreateValidator.typeUrl || Description.is(o.description) && CommissionRates.is(o.commission) && typeof o.minSelfDelegation === "string" && typeof o.delegatorAddress === "string" && typeof o.validatorAddress === "string");
  },
  isSDK(o: any): o is MsgCreateValidatorSDKType {
    return o && (o.$typeUrl === MsgCreateValidator.typeUrl || Description.isSDK(o.description) && CommissionRates.isSDK(o.commission) && typeof o.min_self_delegation === "string" && typeof o.delegator_address === "string" && typeof o.validator_address === "string");
  },
  isAmino(o: any): o is MsgCreateValidatorAmino {
    return o && (o.$typeUrl === MsgCreateValidator.typeUrl || Description.isAmino(o.description) && CommissionRates.isAmino(o.commission) && typeof o.min_self_delegation === "string" && typeof o.delegator_address === "string" && typeof o.validator_address === "string");
  },
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
      Any.encode(GlobalDecoderRegistry.wrapAny(message.pubkey), writer.uint32(50).fork()).ldelim();
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
          message.pubkey = GlobalDecoderRegistry.unwrapAny(reader);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateValidator {
    return {
      description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
      commission: isSet(object.commission) ? CommissionRates.fromJSON(object.commission) : undefined,
      minSelfDelegation: isSet(object.minSelfDelegation) ? String(object.minSelfDelegation) : "",
      delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      pubkey: isSet(object.pubkey) ? GlobalDecoderRegistry.fromJSON(object.pubkey) : undefined
    };
  },
  toJSON(message: MsgCreateValidator): JsonSafe<MsgCreateValidator> {
    const obj: any = {};
    message.description !== undefined && (obj.description = message.description ? Description.toJSON(message.description) : undefined);
    message.commission !== undefined && (obj.commission = message.commission ? CommissionRates.toJSON(message.commission) : undefined);
    message.minSelfDelegation !== undefined && (obj.minSelfDelegation = message.minSelfDelegation);
    message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    message.pubkey !== undefined && (obj.pubkey = message.pubkey ? GlobalDecoderRegistry.toJSON(message.pubkey) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateValidator>, I>>(object: I): MsgCreateValidator {
    const message = createBaseMsgCreateValidator();
    message.description = object.description !== undefined && object.description !== null ? Description.fromPartial(object.description) : undefined;
    message.commission = object.commission !== undefined && object.commission !== null ? CommissionRates.fromPartial(object.commission) : undefined;
    message.minSelfDelegation = object.minSelfDelegation ?? "";
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.pubkey = object.pubkey !== undefined && object.pubkey !== null ? GlobalDecoderRegistry.fromPartial(object.pubkey) : undefined;
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
GlobalDecoderRegistry.register(MsgCreateValidator.typeUrl, MsgCreateValidator);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCreateValidator.aminoType, MsgCreateValidator.typeUrl);
function createBaseMsgCreateValidatorResponse(): MsgCreateValidatorResponse {
  return {};
}
export const MsgCreateValidatorResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.MsgCreateValidatorResponse",
  is(o: any): o is MsgCreateValidatorResponse {
    return o && o.$typeUrl === MsgCreateValidatorResponse.typeUrl;
  },
  isSDK(o: any): o is MsgCreateValidatorResponseSDKType {
    return o && o.$typeUrl === MsgCreateValidatorResponse.typeUrl;
  },
  isAmino(o: any): o is MsgCreateValidatorResponseAmino {
    return o && o.$typeUrl === MsgCreateValidatorResponse.typeUrl;
  },
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
  fromJSON(_: any): MsgCreateValidatorResponse {
    return {};
  },
  toJSON(_: MsgCreateValidatorResponse): JsonSafe<MsgCreateValidatorResponse> {
    const obj: any = {};
    return obj;
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
GlobalDecoderRegistry.register(MsgCreateValidatorResponse.typeUrl, MsgCreateValidatorResponse);