import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial } from "../../../helpers";
/** GenesisState defines the poa module's genesis state. */
export interface GenesisState {
  /** Params defines all the parameters of the module. */
  params: Params;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the poa module's genesis state. */
export interface GenesisStateAmino {
  /** Params defines all the parameters of the module. */
  params?: ParamsAmino;
}
export interface GenesisStateAminoMsg {
  type: "/strangelove_ventures.poa.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the poa module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
}
/** PowerCache is a cached block or absolute change in power for ibc-go validations. */
export interface PowerCache {
  power: bigint;
}
export interface PowerCacheProtoMsg {
  typeUrl: "/strangelove_ventures.poa.v1.PowerCache";
  value: Uint8Array;
}
/** PowerCache is a cached block or absolute change in power for ibc-go validations. */
export interface PowerCacheAmino {
  power?: string;
}
export interface PowerCacheAminoMsg {
  type: "poa/PowerCache";
  value: PowerCacheAmino;
}
/** PowerCache is a cached block or absolute change in power for ibc-go validations. */
export interface PowerCacheSDKType {
  power: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/strangelove_ventures.poa.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
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
  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBasePowerCache(): PowerCache {
  return {
    power: BigInt(0)
  };
}
export const PowerCache = {
  typeUrl: "/strangelove_ventures.poa.v1.PowerCache",
  aminoType: "poa/PowerCache",
  encode(message: PowerCache, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.power !== BigInt(0)) {
      writer.uint32(8).uint64(message.power);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PowerCache {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerCache();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.power = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<PowerCache>): PowerCache {
    const message = createBasePowerCache();
    message.power = object.power !== undefined && object.power !== null ? BigInt(object.power.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: PowerCacheAmino): PowerCache {
    const message = createBasePowerCache();
    if (object.power !== undefined && object.power !== null) {
      message.power = BigInt(object.power);
    }
    return message;
  },
  toAmino(message: PowerCache): PowerCacheAmino {
    const obj: any = {};
    obj.power = message.power !== BigInt(0) ? message.power.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: PowerCacheAminoMsg): PowerCache {
    return PowerCache.fromAmino(object.value);
  },
  toAminoMsg(message: PowerCache): PowerCacheAminoMsg {
    return {
      type: "poa/PowerCache",
      value: PowerCache.toAmino(message)
    };
  },
  fromProtoMsg(message: PowerCacheProtoMsg): PowerCache {
    return PowerCache.decode(message.value);
  },
  toProto(message: PowerCache): Uint8Array {
    return PowerCache.encode(message).finish();
  },
  toProtoMsg(message: PowerCache): PowerCacheProtoMsg {
    return {
      typeUrl: "/strangelove_ventures.poa.v1.PowerCache",
      value: PowerCache.encode(message).finish()
    };
  }
};