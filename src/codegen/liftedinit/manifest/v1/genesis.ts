import { BinaryReader, BinaryWriter } from "../../../binary";
import { JsonSafe } from "../../../json-safe";
import { DeepPartial, Exact } from "../../../helpers";
import { GlobalDecoderRegistry } from "../../../registry";
/** GenesisState defines the module genesis state */
export interface GenesisState {}
export interface GenesisStateProtoMsg {
  typeUrl: "/liftedinit.manifest.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the module genesis state */
export interface GenesisStateAmino {}
export interface GenesisStateAminoMsg {
  type: "/liftedinit.manifest.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the module genesis state */
export interface GenesisStateSDKType {}
function createBaseGenesisState(): GenesisState {
  return {};
}
export const GenesisState = {
  typeUrl: "/liftedinit.manifest.v1.GenesisState",
  is(o: any): o is GenesisState {
    return o && o.$typeUrl === GenesisState.typeUrl;
  },
  isSDK(o: any): o is GenesisStateSDKType {
    return o && o.$typeUrl === GenesisState.typeUrl;
  },
  isAmino(o: any): o is GenesisStateAmino {
    return o && o.$typeUrl === GenesisState.typeUrl;
  },
  encode(_: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
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
  fromJSON(_: any): GenesisState {
    return {};
  },
  toJSON(_: GenesisState): JsonSafe<GenesisState> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(_: I): GenesisState {
    const message = createBaseGenesisState();
    return message;
  },
  fromAmino(_: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    return message;
  },
  toAmino(_: GenesisState): GenesisStateAmino {
    const obj: any = {};
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
      typeUrl: "/liftedinit.manifest.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);