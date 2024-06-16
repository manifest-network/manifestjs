import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Validator, ValidatorAmino, ValidatorSDKType } from "./validator";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial, Exact } from "../../../helpers";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/strangelove_ventures.poa.v1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponse {
  /** params is the returned parameter from the module */
  params: Params;
}
export interface ParamsResponseProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.ParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponseAmino {
  /** params is the returned parameter from the module */
  params?: ParamsAmino;
}
export interface ParamsResponseAminoMsg {
  type: "/strangelove_ventures.poa.v1.ParamsResponse";
  value: ParamsResponseAmino;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponseSDKType {
  params: ParamsSDKType;
}
/** QueryPendingValidatorsRequest is the request type for the Query/PendingValidators RPC method. */
export interface QueryPendingValidatorsRequest {}
export interface QueryPendingValidatorsRequestProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.QueryPendingValidatorsRequest";
  value: Uint8Array;
}
/** QueryPendingValidatorsRequest is the request type for the Query/PendingValidators RPC method. */
export interface QueryPendingValidatorsRequestAmino {}
export interface QueryPendingValidatorsRequestAminoMsg {
  type: "/strangelove_ventures.poa.v1.QueryPendingValidatorsRequest";
  value: QueryPendingValidatorsRequestAmino;
}
/** QueryPendingValidatorsRequest is the request type for the Query/PendingValidators RPC method. */
export interface QueryPendingValidatorsRequestSDKType {}
/** QueryPendingValidatorResponse is the response type for the Query/PendingValidators RPC method. */
export interface PendingValidatorsResponse {
  /** Pending is the returned pending validators from the module */
  pending: Validator[];
}
export interface PendingValidatorsResponseProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.PendingValidatorsResponse";
  value: Uint8Array;
}
/** QueryPendingValidatorResponse is the response type for the Query/PendingValidators RPC method. */
export interface PendingValidatorsResponseAmino {
  /** Pending is the returned pending validators from the module */
  pending?: ValidatorAmino[];
}
export interface PendingValidatorsResponseAminoMsg {
  type: "/strangelove_ventures.poa.v1.PendingValidatorsResponse";
  value: PendingValidatorsResponseAmino;
}
/** QueryPendingValidatorResponse is the response type for the Query/PendingValidators RPC method. */
export interface PendingValidatorsResponseSDKType {
  pending: ValidatorSDKType[];
}
/** QueryConsensusPowerRequest is the request type for the Query/ConsensusPower RPC method. */
export interface QueryConsensusPowerRequest {
  /** validator_address is the address of the validator */
  validatorAddress: string;
}
export interface QueryConsensusPowerRequestProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.QueryConsensusPowerRequest";
  value: Uint8Array;
}
/** QueryConsensusPowerRequest is the request type for the Query/ConsensusPower RPC method. */
export interface QueryConsensusPowerRequestAmino {
  /** validator_address is the address of the validator */
  validator_address?: string;
}
export interface QueryConsensusPowerRequestAminoMsg {
  type: "/strangelove_ventures.poa.v1.QueryConsensusPowerRequest";
  value: QueryConsensusPowerRequestAmino;
}
/** QueryConsensusPowerRequest is the request type for the Query/ConsensusPower RPC method. */
export interface QueryConsensusPowerRequestSDKType {
  validator_address: string;
}
/** QueryConsensusPowerResponse is the response type for the Query/ConsensusPowerRequest RPC method. */
export interface QueryConsensusPowerResponse {
  /** consensus_power is the returned consensus power from the BFT consensus mechanism */
  consensusPower: bigint;
}
export interface QueryConsensusPowerResponseProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.QueryConsensusPowerResponse";
  value: Uint8Array;
}
/** QueryConsensusPowerResponse is the response type for the Query/ConsensusPowerRequest RPC method. */
export interface QueryConsensusPowerResponseAmino {
  /** consensus_power is the returned consensus power from the BFT consensus mechanism */
  consensus_power?: string;
}
export interface QueryConsensusPowerResponseAminoMsg {
  type: "/strangelove_ventures.poa.v1.QueryConsensusPowerResponse";
  value: QueryConsensusPowerResponseAmino;
}
/** QueryConsensusPowerResponse is the response type for the Query/ConsensusPowerRequest RPC method. */
export interface QueryConsensusPowerResponseSDKType {
  consensus_power: bigint;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/strangelove_ventures.poa.v1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseParamsResponse(): ParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const ParamsResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.ParamsResponse",
  encode(message: ParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<ParamsResponse>, I>>(object: I): ParamsResponse {
    const message = createBaseParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: ParamsResponseAmino): ParamsResponse {
    const message = createBaseParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: ParamsResponse): ParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsResponseAminoMsg): ParamsResponse {
    return ParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsResponseProtoMsg): ParamsResponse {
    return ParamsResponse.decode(message.value);
  },
  toProto(message: ParamsResponse): Uint8Array {
    return ParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: ParamsResponse): ParamsResponseProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.ParamsResponse",
      value: ParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPendingValidatorsRequest(): QueryPendingValidatorsRequest {
  return {};
}
export const QueryPendingValidatorsRequest = {
  typeUrl: "/strangelove_ventures.poa.v1.QueryPendingValidatorsRequest",
  encode(_: QueryPendingValidatorsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingValidatorsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingValidatorsRequest();
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
  fromPartial<I extends Exact<DeepPartial<QueryPendingValidatorsRequest>, I>>(_: I): QueryPendingValidatorsRequest {
    const message = createBaseQueryPendingValidatorsRequest();
    return message;
  },
  fromAmino(_: QueryPendingValidatorsRequestAmino): QueryPendingValidatorsRequest {
    const message = createBaseQueryPendingValidatorsRequest();
    return message;
  },
  toAmino(_: QueryPendingValidatorsRequest): QueryPendingValidatorsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryPendingValidatorsRequestAminoMsg): QueryPendingValidatorsRequest {
    return QueryPendingValidatorsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingValidatorsRequestProtoMsg): QueryPendingValidatorsRequest {
    return QueryPendingValidatorsRequest.decode(message.value);
  },
  toProto(message: QueryPendingValidatorsRequest): Uint8Array {
    return QueryPendingValidatorsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingValidatorsRequest): QueryPendingValidatorsRequestProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.QueryPendingValidatorsRequest",
      value: QueryPendingValidatorsRequest.encode(message).finish()
    };
  }
};
function createBasePendingValidatorsResponse(): PendingValidatorsResponse {
  return {
    pending: []
  };
}
export const PendingValidatorsResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.PendingValidatorsResponse",
  encode(message: PendingValidatorsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pending) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PendingValidatorsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePendingValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pending.push(Validator.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<PendingValidatorsResponse>, I>>(object: I): PendingValidatorsResponse {
    const message = createBasePendingValidatorsResponse();
    message.pending = object.pending?.map(e => Validator.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: PendingValidatorsResponseAmino): PendingValidatorsResponse {
    const message = createBasePendingValidatorsResponse();
    message.pending = object.pending?.map(e => Validator.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: PendingValidatorsResponse): PendingValidatorsResponseAmino {
    const obj: any = {};
    if (message.pending) {
      obj.pending = message.pending.map(e => e ? Validator.toAmino(e) : undefined);
    } else {
      obj.pending = message.pending;
    }
    return obj;
  },
  fromAminoMsg(object: PendingValidatorsResponseAminoMsg): PendingValidatorsResponse {
    return PendingValidatorsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: PendingValidatorsResponseProtoMsg): PendingValidatorsResponse {
    return PendingValidatorsResponse.decode(message.value);
  },
  toProto(message: PendingValidatorsResponse): Uint8Array {
    return PendingValidatorsResponse.encode(message).finish();
  },
  toProtoMsg(message: PendingValidatorsResponse): PendingValidatorsResponseProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.PendingValidatorsResponse",
      value: PendingValidatorsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsensusPowerRequest(): QueryConsensusPowerRequest {
  return {
    validatorAddress: ""
  };
}
export const QueryConsensusPowerRequest = {
  typeUrl: "/strangelove_ventures.poa.v1.QueryConsensusPowerRequest",
  encode(message: QueryConsensusPowerRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsensusPowerRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusPowerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<QueryConsensusPowerRequest>, I>>(object: I): QueryConsensusPowerRequest {
    const message = createBaseQueryConsensusPowerRequest();
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  },
  fromAmino(object: QueryConsensusPowerRequestAmino): QueryConsensusPowerRequest {
    const message = createBaseQueryConsensusPowerRequest();
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    return message;
  },
  toAmino(message: QueryConsensusPowerRequest): QueryConsensusPowerRequestAmino {
    const obj: any = {};
    obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
    return obj;
  },
  fromAminoMsg(object: QueryConsensusPowerRequestAminoMsg): QueryConsensusPowerRequest {
    return QueryConsensusPowerRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsensusPowerRequestProtoMsg): QueryConsensusPowerRequest {
    return QueryConsensusPowerRequest.decode(message.value);
  },
  toProto(message: QueryConsensusPowerRequest): Uint8Array {
    return QueryConsensusPowerRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsensusPowerRequest): QueryConsensusPowerRequestProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.QueryConsensusPowerRequest",
      value: QueryConsensusPowerRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsensusPowerResponse(): QueryConsensusPowerResponse {
  return {
    consensusPower: BigInt(0)
  };
}
export const QueryConsensusPowerResponse = {
  typeUrl: "/strangelove_ventures.poa.v1.QueryConsensusPowerResponse",
  encode(message: QueryConsensusPowerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consensusPower !== BigInt(0)) {
      writer.uint32(8).int64(message.consensusPower);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsensusPowerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusPowerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensusPower = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<DeepPartial<QueryConsensusPowerResponse>, I>>(object: I): QueryConsensusPowerResponse {
    const message = createBaseQueryConsensusPowerResponse();
    message.consensusPower = object.consensusPower !== undefined && object.consensusPower !== null ? BigInt(object.consensusPower.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryConsensusPowerResponseAmino): QueryConsensusPowerResponse {
    const message = createBaseQueryConsensusPowerResponse();
    if (object.consensus_power !== undefined && object.consensus_power !== null) {
      message.consensusPower = BigInt(object.consensus_power);
    }
    return message;
  },
  toAmino(message: QueryConsensusPowerResponse): QueryConsensusPowerResponseAmino {
    const obj: any = {};
    obj.consensus_power = message.consensusPower !== BigInt(0) ? message.consensusPower.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsensusPowerResponseAminoMsg): QueryConsensusPowerResponse {
    return QueryConsensusPowerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsensusPowerResponseProtoMsg): QueryConsensusPowerResponse {
    return QueryConsensusPowerResponse.decode(message.value);
  },
  toProto(message: QueryConsensusPowerResponse): Uint8Array {
    return QueryConsensusPowerResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsensusPowerResponse): QueryConsensusPowerResponseProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.QueryConsensusPowerResponse",
      value: QueryConsensusPowerResponse.encode(message).finish()
    };
  }
};