import { Params, ParamsAmino, ParamsSDKType, Provider, ProviderAmino, ProviderSDKType, SKU, SKUAmino, SKUSDKType } from "./types";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
import { GlobalDecoderRegistry } from "../../../registry";
/** GenesisState defines the sku module's genesis state. */
export interface GenesisState {
  /** params defines the module parameters. */
  params: Params;
  /** providers is the list of providers. */
  providers: Provider[];
  /** skus is the list of SKUs. */
  skus: SKU[];
  /**
   * provider_sequence is the sequence counter for deterministic provider UUID generation.
   * Exported via Sequence.Peek(); the next Sequence.Next() call will return this value.
   */
  providerSequence: bigint;
  /**
   * sku_sequence is the sequence counter for deterministic SKU UUID generation.
   * Exported via Sequence.Peek(); the next Sequence.Next() call will return this value.
   */
  skuSequence: bigint;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/liftedinit.sku.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the sku module's genesis state. */
export interface GenesisStateAmino {
  /** params defines the module parameters. */
  params?: ParamsAmino;
  /** providers is the list of providers. */
  providers?: ProviderAmino[];
  /** skus is the list of SKUs. */
  skus?: SKUAmino[];
  /**
   * provider_sequence is the sequence counter for deterministic provider UUID generation.
   * Exported via Sequence.Peek(); the next Sequence.Next() call will return this value.
   */
  provider_sequence?: string;
  /**
   * sku_sequence is the sequence counter for deterministic SKU UUID generation.
   * Exported via Sequence.Peek(); the next Sequence.Next() call will return this value.
   */
  sku_sequence?: string;
}
export interface GenesisStateAminoMsg {
  type: "/liftedinit.sku.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the sku module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  providers: ProviderSDKType[];
  skus: SKUSDKType[];
  provider_sequence: bigint;
  sku_sequence: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    providers: [],
    skus: [],
    providerSequence: BigInt(0),
    skuSequence: BigInt(0)
  };
}
export const GenesisState = {
  typeUrl: "/liftedinit.sku.v1.GenesisState",
  is(o: any): o is GenesisState {
    return o && (o.$typeUrl === GenesisState.typeUrl || Params.is(o.params) && Array.isArray(o.providers) && (!o.providers.length || Provider.is(o.providers[0])) && Array.isArray(o.skus) && (!o.skus.length || SKU.is(o.skus[0])) && typeof o.providerSequence === "bigint" && typeof o.skuSequence === "bigint");
  },
  isSDK(o: any): o is GenesisStateSDKType {
    return o && (o.$typeUrl === GenesisState.typeUrl || Params.isSDK(o.params) && Array.isArray(o.providers) && (!o.providers.length || Provider.isSDK(o.providers[0])) && Array.isArray(o.skus) && (!o.skus.length || SKU.isSDK(o.skus[0])) && typeof o.provider_sequence === "bigint" && typeof o.sku_sequence === "bigint");
  },
  isAmino(o: any): o is GenesisStateAmino {
    return o && (o.$typeUrl === GenesisState.typeUrl || Params.isAmino(o.params) && Array.isArray(o.providers) && (!o.providers.length || Provider.isAmino(o.providers[0])) && Array.isArray(o.skus) && (!o.skus.length || SKU.isAmino(o.skus[0])) && typeof o.provider_sequence === "bigint" && typeof o.sku_sequence === "bigint");
  },
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.providers) {
      Provider.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.skus) {
      SKU.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.providerSequence !== BigInt(0)) {
      writer.uint32(32).uint64(message.providerSequence);
    }
    if (message.skuSequence !== BigInt(0)) {
      writer.uint32(40).uint64(message.skuSequence);
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
        case 2:
          message.providers.push(Provider.decode(reader, reader.uint32()));
          break;
        case 3:
          message.skus.push(SKU.decode(reader, reader.uint32()));
          break;
        case 4:
          message.providerSequence = reader.uint64();
          break;
        case 5:
          message.skuSequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      providers: Array.isArray(object?.providers) ? object.providers.map((e: any) => Provider.fromJSON(e)) : [],
      skus: Array.isArray(object?.skus) ? object.skus.map((e: any) => SKU.fromJSON(e)) : [],
      providerSequence: isSet(object.providerSequence) ? BigInt(object.providerSequence.toString()) : BigInt(0),
      skuSequence: isSet(object.skuSequence) ? BigInt(object.skuSequence.toString()) : BigInt(0)
    };
  },
  toJSON(message: GenesisState): JsonSafe<GenesisState> {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.providers) {
      obj.providers = message.providers.map(e => e ? Provider.toJSON(e) : undefined);
    } else {
      obj.providers = [];
    }
    if (message.skus) {
      obj.skus = message.skus.map(e => e ? SKU.toJSON(e) : undefined);
    } else {
      obj.skus = [];
    }
    message.providerSequence !== undefined && (obj.providerSequence = (message.providerSequence || BigInt(0)).toString());
    message.skuSequence !== undefined && (obj.skuSequence = (message.skuSequence || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.providers = object.providers?.map(e => Provider.fromPartial(e)) || [];
    message.skus = object.skus?.map(e => SKU.fromPartial(e)) || [];
    message.providerSequence = object.providerSequence !== undefined && object.providerSequence !== null ? BigInt(object.providerSequence.toString()) : BigInt(0);
    message.skuSequence = object.skuSequence !== undefined && object.skuSequence !== null ? BigInt(object.skuSequence.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.providers = object.providers?.map(e => Provider.fromAmino(e)) || [];
    message.skus = object.skus?.map(e => SKU.fromAmino(e)) || [];
    if (object.provider_sequence !== undefined && object.provider_sequence !== null) {
      message.providerSequence = BigInt(object.provider_sequence);
    }
    if (object.sku_sequence !== undefined && object.sku_sequence !== null) {
      message.skuSequence = BigInt(object.sku_sequence);
    }
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    if (message.providers) {
      obj.providers = message.providers.map(e => e ? Provider.toAmino(e) : undefined);
    } else {
      obj.providers = message.providers;
    }
    if (message.skus) {
      obj.skus = message.skus.map(e => e ? SKU.toAmino(e) : undefined);
    } else {
      obj.skus = message.skus;
    }
    obj.provider_sequence = message.providerSequence !== BigInt(0) ? message.providerSequence?.toString() : undefined;
    obj.sku_sequence = message.skuSequence !== BigInt(0) ? message.skuSequence?.toString() : undefined;
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
      typeUrl: "/liftedinit.sku.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);