import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { JsonSafe } from "../../../json-safe";
import { DeepPartial, Exact, isSet, bytesFromBase64, base64FromBytes } from "../../../helpers";
import { GlobalDecoderRegistry } from "../../../registry";
/** Unit defines the billing unit for a SKU. */
export enum Unit {
  /** UNIT_UNSPECIFIED - UNIT_UNSPECIFIED is the default unspecified unit. */
  UNIT_UNSPECIFIED = 0,
  /** UNIT_PER_HOUR - UNIT_PER_HOUR is a per-hour billing unit. */
  UNIT_PER_HOUR = 1,
  /** UNIT_PER_DAY - UNIT_PER_DAY is a per-day billing unit. */
  UNIT_PER_DAY = 2,
  UNRECOGNIZED = -1,
}
export const UnitSDKType = Unit;
export const UnitAmino = Unit;
export function unitFromJSON(object: any): Unit {
  switch (object) {
    case 0:
    case "UNIT_UNSPECIFIED":
      return Unit.UNIT_UNSPECIFIED;
    case 1:
    case "UNIT_PER_HOUR":
      return Unit.UNIT_PER_HOUR;
    case 2:
    case "UNIT_PER_DAY":
      return Unit.UNIT_PER_DAY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Unit.UNRECOGNIZED;
  }
}
export function unitToJSON(object: Unit): string {
  switch (object) {
    case Unit.UNIT_UNSPECIFIED:
      return "UNIT_UNSPECIFIED";
    case Unit.UNIT_PER_HOUR:
      return "UNIT_PER_HOUR";
    case Unit.UNIT_PER_DAY:
      return "UNIT_PER_DAY";
    case Unit.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Params defines the parameters for the sku module. */
export interface Params {
  /**
   * allowed_list is the list of addresses allowed to manage SKUs
   * in addition to the module authority.
   */
  allowedList: string[];
}
export interface ParamsProtoMsg {
  typeUrl: "/liftedinit.sku.v1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the sku module. */
export interface ParamsAmino {
  /**
   * allowed_list is the list of addresses allowed to manage SKUs
   * in addition to the module authority.
   */
  allowed_list?: string[];
}
export interface ParamsAminoMsg {
  type: "lifted/sku/Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the sku module. */
export interface ParamsSDKType {
  allowed_list: string[];
}
/** Provider defines a SKU provider entity. */
export interface Provider {
  /** uuid is the unique identifier for the provider (UUIDv7 format). */
  uuid: string;
  /** address is the management address of the provider. */
  address: string;
  /** payout_address is the address where payments are sent. */
  payoutAddress: string;
  /** meta_hash is a hash of the off-chain metadata (name, description, etc.). */
  metaHash: Uint8Array;
  /** active indicates whether the provider is active. */
  active: boolean;
  /**
   * api_url is the HTTPS endpoint where the provider's off-chain API is hosted.
   * Tenants use this URL to retrieve connection details for their leases.
   * Must be a valid HTTPS URL.
   */
  apiUrl: string;
}
export interface ProviderProtoMsg {
  typeUrl: "/liftedinit.sku.v1.Provider";
  value: Uint8Array;
}
/** Provider defines a SKU provider entity. */
export interface ProviderAmino {
  /** uuid is the unique identifier for the provider (UUIDv7 format). */
  uuid?: string;
  /** address is the management address of the provider. */
  address?: string;
  /** payout_address is the address where payments are sent. */
  payout_address?: string;
  /** meta_hash is a hash of the off-chain metadata (name, description, etc.). */
  meta_hash?: string;
  /** active indicates whether the provider is active. */
  active?: boolean;
  /**
   * api_url is the HTTPS endpoint where the provider's off-chain API is hosted.
   * Tenants use this URL to retrieve connection details for their leases.
   * Must be a valid HTTPS URL.
   */
  api_url?: string;
}
export interface ProviderAminoMsg {
  type: "lifted/sku/Provider";
  value: ProviderAmino;
}
/** Provider defines a SKU provider entity. */
export interface ProviderSDKType {
  uuid: string;
  address: string;
  payout_address: string;
  meta_hash: Uint8Array;
  active: boolean;
  api_url: string;
}
/** SKU defines a stock keeping unit for on-chain billing. */
export interface SKU {
  /** uuid is the unique identifier for the SKU (UUIDv7 format). */
  uuid: string;
  /** provider_uuid is the unique identifier of the SKU provider. */
  providerUuid: string;
  /** name is the human-readable name of the SKU. */
  name: string;
  /** unit is the billing unit for the SKU. */
  unit: Unit;
  /** base_price is the base price for the SKU. */
  basePrice: Coin;
  /** meta_hash is a hash of the off-chain metadata. */
  metaHash: Uint8Array;
  /** active indicates whether the SKU is active. */
  active: boolean;
}
export interface SKUProtoMsg {
  typeUrl: "/liftedinit.sku.v1.SKU";
  value: Uint8Array;
}
/** SKU defines a stock keeping unit for on-chain billing. */
export interface SKUAmino {
  /** uuid is the unique identifier for the SKU (UUIDv7 format). */
  uuid?: string;
  /** provider_uuid is the unique identifier of the SKU provider. */
  provider_uuid?: string;
  /** name is the human-readable name of the SKU. */
  name?: string;
  /** unit is the billing unit for the SKU. */
  unit?: Unit;
  /** base_price is the base price for the SKU. */
  base_price: CoinAmino;
  /** meta_hash is a hash of the off-chain metadata. */
  meta_hash?: string;
  /** active indicates whether the SKU is active. */
  active?: boolean;
}
export interface SKUAminoMsg {
  type: "lifted/sku/SKU";
  value: SKUAmino;
}
/** SKU defines a stock keeping unit for on-chain billing. */
export interface SKUSDKType {
  uuid: string;
  provider_uuid: string;
  name: string;
  unit: Unit;
  base_price: CoinSDKType;
  meta_hash: Uint8Array;
  active: boolean;
}
function createBaseParams(): Params {
  return {
    allowedList: []
  };
}
export const Params = {
  typeUrl: "/liftedinit.sku.v1.Params",
  aminoType: "lifted/sku/Params",
  is(o: any): o is Params {
    return o && (o.$typeUrl === Params.typeUrl || Array.isArray(o.allowedList) && (!o.allowedList.length || typeof o.allowedList[0] === "string"));
  },
  isSDK(o: any): o is ParamsSDKType {
    return o && (o.$typeUrl === Params.typeUrl || Array.isArray(o.allowed_list) && (!o.allowed_list.length || typeof o.allowed_list[0] === "string"));
  },
  isAmino(o: any): o is ParamsAmino {
    return o && (o.$typeUrl === Params.typeUrl || Array.isArray(o.allowed_list) && (!o.allowed_list.length || typeof o.allowed_list[0] === "string"));
  },
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.allowedList) {
      writer.uint32(10).string(v!);
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
          message.allowedList.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Params {
    return {
      allowedList: Array.isArray(object?.allowedList) ? object.allowedList.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: Params): JsonSafe<Params> {
    const obj: any = {};
    if (message.allowedList) {
      obj.allowedList = message.allowedList.map(e => e);
    } else {
      obj.allowedList = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.allowedList = object.allowedList?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    message.allowedList = object.allowed_list?.map(e => e) || [];
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    if (message.allowedList) {
      obj.allowed_list = message.allowedList.map(e => e);
    } else {
      obj.allowed_list = message.allowedList;
    }
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  toAminoMsg(message: Params): ParamsAminoMsg {
    return {
      type: "lifted/sku/Params",
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
      typeUrl: "/liftedinit.sku.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(Params.typeUrl, Params);
GlobalDecoderRegistry.registerAminoProtoMapping(Params.aminoType, Params.typeUrl);
function createBaseProvider(): Provider {
  return {
    uuid: "",
    address: "",
    payoutAddress: "",
    metaHash: new Uint8Array(),
    active: false,
    apiUrl: ""
  };
}
export const Provider = {
  typeUrl: "/liftedinit.sku.v1.Provider",
  aminoType: "lifted/sku/Provider",
  is(o: any): o is Provider {
    return o && (o.$typeUrl === Provider.typeUrl || typeof o.uuid === "string" && typeof o.address === "string" && typeof o.payoutAddress === "string" && (o.metaHash instanceof Uint8Array || typeof o.metaHash === "string") && typeof o.active === "boolean" && typeof o.apiUrl === "string");
  },
  isSDK(o: any): o is ProviderSDKType {
    return o && (o.$typeUrl === Provider.typeUrl || typeof o.uuid === "string" && typeof o.address === "string" && typeof o.payout_address === "string" && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string") && typeof o.active === "boolean" && typeof o.api_url === "string");
  },
  isAmino(o: any): o is ProviderAmino {
    return o && (o.$typeUrl === Provider.typeUrl || typeof o.uuid === "string" && typeof o.address === "string" && typeof o.payout_address === "string" && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string") && typeof o.active === "boolean" && typeof o.api_url === "string");
  },
  encode(message: Provider, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.payoutAddress !== "") {
      writer.uint32(26).string(message.payoutAddress);
    }
    if (message.metaHash.length !== 0) {
      writer.uint32(34).bytes(message.metaHash);
    }
    if (message.active === true) {
      writer.uint32(40).bool(message.active);
    }
    if (message.apiUrl !== "") {
      writer.uint32(50).string(message.apiUrl);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Provider {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProvider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.payoutAddress = reader.string();
          break;
        case 4:
          message.metaHash = reader.bytes();
          break;
        case 5:
          message.active = reader.bool();
          break;
        case 6:
          message.apiUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Provider {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : "",
      address: isSet(object.address) ? String(object.address) : "",
      payoutAddress: isSet(object.payoutAddress) ? String(object.payoutAddress) : "",
      metaHash: isSet(object.metaHash) ? bytesFromBase64(object.metaHash) : new Uint8Array(),
      active: isSet(object.active) ? Boolean(object.active) : false,
      apiUrl: isSet(object.apiUrl) ? String(object.apiUrl) : ""
    };
  },
  toJSON(message: Provider): JsonSafe<Provider> {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.address !== undefined && (obj.address = message.address);
    message.payoutAddress !== undefined && (obj.payoutAddress = message.payoutAddress);
    message.metaHash !== undefined && (obj.metaHash = base64FromBytes(message.metaHash !== undefined ? message.metaHash : new Uint8Array()));
    message.active !== undefined && (obj.active = message.active);
    message.apiUrl !== undefined && (obj.apiUrl = message.apiUrl);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Provider>, I>>(object: I): Provider {
    const message = createBaseProvider();
    message.uuid = object.uuid ?? "";
    message.address = object.address ?? "";
    message.payoutAddress = object.payoutAddress ?? "";
    message.metaHash = object.metaHash ?? new Uint8Array();
    message.active = object.active ?? false;
    message.apiUrl = object.apiUrl ?? "";
    return message;
  },
  fromAmino(object: ProviderAmino): Provider {
    const message = createBaseProvider();
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.payout_address !== undefined && object.payout_address !== null) {
      message.payoutAddress = object.payout_address;
    }
    if (object.meta_hash !== undefined && object.meta_hash !== null) {
      message.metaHash = bytesFromBase64(object.meta_hash);
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = object.active;
    }
    if (object.api_url !== undefined && object.api_url !== null) {
      message.apiUrl = object.api_url;
    }
    return message;
  },
  toAmino(message: Provider): ProviderAmino {
    const obj: any = {};
    obj.uuid = message.uuid === "" ? undefined : message.uuid;
    obj.address = message.address === "" ? undefined : message.address;
    obj.payout_address = message.payoutAddress === "" ? undefined : message.payoutAddress;
    obj.meta_hash = message.metaHash ? base64FromBytes(message.metaHash) : undefined;
    obj.active = message.active === false ? undefined : message.active;
    obj.api_url = message.apiUrl === "" ? undefined : message.apiUrl;
    return obj;
  },
  fromAminoMsg(object: ProviderAminoMsg): Provider {
    return Provider.fromAmino(object.value);
  },
  toAminoMsg(message: Provider): ProviderAminoMsg {
    return {
      type: "lifted/sku/Provider",
      value: Provider.toAmino(message)
    };
  },
  fromProtoMsg(message: ProviderProtoMsg): Provider {
    return Provider.decode(message.value);
  },
  toProto(message: Provider): Uint8Array {
    return Provider.encode(message).finish();
  },
  toProtoMsg(message: Provider): ProviderProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.Provider",
      value: Provider.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(Provider.typeUrl, Provider);
GlobalDecoderRegistry.registerAminoProtoMapping(Provider.aminoType, Provider.typeUrl);
function createBaseSKU(): SKU {
  return {
    uuid: "",
    providerUuid: "",
    name: "",
    unit: 0,
    basePrice: Coin.fromPartial({}),
    metaHash: new Uint8Array(),
    active: false
  };
}
export const SKU = {
  typeUrl: "/liftedinit.sku.v1.SKU",
  aminoType: "lifted/sku/SKU",
  is(o: any): o is SKU {
    return o && (o.$typeUrl === SKU.typeUrl || typeof o.uuid === "string" && typeof o.providerUuid === "string" && typeof o.name === "string" && isSet(o.unit) && Coin.is(o.basePrice) && (o.metaHash instanceof Uint8Array || typeof o.metaHash === "string") && typeof o.active === "boolean");
  },
  isSDK(o: any): o is SKUSDKType {
    return o && (o.$typeUrl === SKU.typeUrl || typeof o.uuid === "string" && typeof o.provider_uuid === "string" && typeof o.name === "string" && isSet(o.unit) && Coin.isSDK(o.base_price) && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string") && typeof o.active === "boolean");
  },
  isAmino(o: any): o is SKUAmino {
    return o && (o.$typeUrl === SKU.typeUrl || typeof o.uuid === "string" && typeof o.provider_uuid === "string" && typeof o.name === "string" && isSet(o.unit) && Coin.isAmino(o.base_price) && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string") && typeof o.active === "boolean");
  },
  encode(message: SKU, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.providerUuid !== "") {
      writer.uint32(18).string(message.providerUuid);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.unit !== 0) {
      writer.uint32(32).int32(message.unit);
    }
    if (message.basePrice !== undefined) {
      Coin.encode(message.basePrice, writer.uint32(42).fork()).ldelim();
    }
    if (message.metaHash.length !== 0) {
      writer.uint32(50).bytes(message.metaHash);
    }
    if (message.active === true) {
      writer.uint32(56).bool(message.active);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SKU {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSKU();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        case 2:
          message.providerUuid = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.unit = reader.int32() as any;
          break;
        case 5:
          message.basePrice = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.metaHash = reader.bytes();
          break;
        case 7:
          message.active = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SKU {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : "",
      providerUuid: isSet(object.providerUuid) ? String(object.providerUuid) : "",
      name: isSet(object.name) ? String(object.name) : "",
      unit: isSet(object.unit) ? unitFromJSON(object.unit) : -1,
      basePrice: isSet(object.basePrice) ? Coin.fromJSON(object.basePrice) : undefined,
      metaHash: isSet(object.metaHash) ? bytesFromBase64(object.metaHash) : new Uint8Array(),
      active: isSet(object.active) ? Boolean(object.active) : false
    };
  },
  toJSON(message: SKU): JsonSafe<SKU> {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.providerUuid !== undefined && (obj.providerUuid = message.providerUuid);
    message.name !== undefined && (obj.name = message.name);
    message.unit !== undefined && (obj.unit = unitToJSON(message.unit));
    message.basePrice !== undefined && (obj.basePrice = message.basePrice ? Coin.toJSON(message.basePrice) : undefined);
    message.metaHash !== undefined && (obj.metaHash = base64FromBytes(message.metaHash !== undefined ? message.metaHash : new Uint8Array()));
    message.active !== undefined && (obj.active = message.active);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<SKU>, I>>(object: I): SKU {
    const message = createBaseSKU();
    message.uuid = object.uuid ?? "";
    message.providerUuid = object.providerUuid ?? "";
    message.name = object.name ?? "";
    message.unit = object.unit ?? 0;
    message.basePrice = object.basePrice !== undefined && object.basePrice !== null ? Coin.fromPartial(object.basePrice) : undefined;
    message.metaHash = object.metaHash ?? new Uint8Array();
    message.active = object.active ?? false;
    return message;
  },
  fromAmino(object: SKUAmino): SKU {
    const message = createBaseSKU();
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    }
    if (object.provider_uuid !== undefined && object.provider_uuid !== null) {
      message.providerUuid = object.provider_uuid;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.unit !== undefined && object.unit !== null) {
      message.unit = object.unit;
    }
    if (object.base_price !== undefined && object.base_price !== null) {
      message.basePrice = Coin.fromAmino(object.base_price);
    }
    if (object.meta_hash !== undefined && object.meta_hash !== null) {
      message.metaHash = bytesFromBase64(object.meta_hash);
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = object.active;
    }
    return message;
  },
  toAmino(message: SKU): SKUAmino {
    const obj: any = {};
    obj.uuid = message.uuid === "" ? undefined : message.uuid;
    obj.provider_uuid = message.providerUuid === "" ? undefined : message.providerUuid;
    obj.name = message.name === "" ? undefined : message.name;
    obj.unit = message.unit === 0 ? undefined : message.unit;
    obj.base_price = message.basePrice ? Coin.toAmino(message.basePrice) : Coin.toAmino(Coin.fromPartial({}));
    obj.meta_hash = message.metaHash ? base64FromBytes(message.metaHash) : undefined;
    obj.active = message.active === false ? undefined : message.active;
    return obj;
  },
  fromAminoMsg(object: SKUAminoMsg): SKU {
    return SKU.fromAmino(object.value);
  },
  toAminoMsg(message: SKU): SKUAminoMsg {
    return {
      type: "lifted/sku/SKU",
      value: SKU.toAmino(message)
    };
  },
  fromProtoMsg(message: SKUProtoMsg): SKU {
    return SKU.decode(message.value);
  },
  toProto(message: SKU): Uint8Array {
    return SKU.encode(message).finish();
  },
  toProtoMsg(message: SKU): SKUProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.SKU",
      value: SKU.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(SKU.typeUrl, SKU);
GlobalDecoderRegistry.registerAminoProtoMapping(SKU.aminoType, SKU.typeUrl);