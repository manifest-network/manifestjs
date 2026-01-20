import { Unit, Params, ParamsAmino, ParamsSDKType, unitFromJSON, unitToJSON } from "./types";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, bytesFromBase64, base64FromBytes, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
import { GlobalDecoderRegistry } from "../../../registry";
/** MsgCreateProvider is the Msg/CreateProvider request type. */
export interface MsgCreateProvider {
  /** authority is the address of the controlling account. */
  authority: string;
  /** address is the management address of the provider. */
  address: string;
  /** payout_address is the address where payments are sent. */
  payoutAddress: string;
  /** meta_hash is a hash of the off-chain metadata. */
  metaHash: Uint8Array;
  /**
   * api_url is the HTTPS endpoint where the provider's off-chain API is hosted.
   * Must be a valid HTTPS URL.
   */
  apiUrl: string;
}
export interface MsgCreateProviderProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgCreateProvider";
  value: Uint8Array;
}
/** MsgCreateProvider is the Msg/CreateProvider request type. */
export interface MsgCreateProviderAmino {
  /** authority is the address of the controlling account. */
  authority?: string;
  /** address is the management address of the provider. */
  address?: string;
  /** payout_address is the address where payments are sent. */
  payout_address?: string;
  /** meta_hash is a hash of the off-chain metadata. */
  meta_hash?: string;
  /**
   * api_url is the HTTPS endpoint where the provider's off-chain API is hosted.
   * Must be a valid HTTPS URL.
   */
  api_url?: string;
}
export interface MsgCreateProviderAminoMsg {
  type: "lifted/sku/MsgCreateProvider";
  value: MsgCreateProviderAmino;
}
/** MsgCreateProvider is the Msg/CreateProvider request type. */
export interface MsgCreateProviderSDKType {
  authority: string;
  address: string;
  payout_address: string;
  meta_hash: Uint8Array;
  api_url: string;
}
/** MsgCreateProviderResponse is the Msg/CreateProvider response type. */
export interface MsgCreateProviderResponse {
  /** uuid is the unique identifier of the created provider (UUIDv7 format). */
  uuid: string;
}
export interface MsgCreateProviderResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgCreateProviderResponse";
  value: Uint8Array;
}
/** MsgCreateProviderResponse is the Msg/CreateProvider response type. */
export interface MsgCreateProviderResponseAmino {
  /** uuid is the unique identifier of the created provider (UUIDv7 format). */
  uuid?: string;
}
export interface MsgCreateProviderResponseAminoMsg {
  type: "/liftedinit.sku.v1.MsgCreateProviderResponse";
  value: MsgCreateProviderResponseAmino;
}
/** MsgCreateProviderResponse is the Msg/CreateProvider response type. */
export interface MsgCreateProviderResponseSDKType {
  uuid: string;
}
/** MsgUpdateProvider is the Msg/UpdateProvider request type. */
export interface MsgUpdateProvider {
  /** authority is the address of the controlling account. */
  authority: string;
  /** uuid is the unique identifier of the provider to update. */
  uuid: string;
  /** address is the management address of the provider. */
  address: string;
  /** payout_address is the address where payments are sent. */
  payoutAddress: string;
  /** meta_hash is a hash of the off-chain metadata. */
  metaHash: Uint8Array;
  /** active indicates whether the provider is active. */
  active: boolean;
  /** api_url is the HTTPS endpoint where the provider's off-chain API is hosted. */
  apiUrl: string;
}
export interface MsgUpdateProviderProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgUpdateProvider";
  value: Uint8Array;
}
/** MsgUpdateProvider is the Msg/UpdateProvider request type. */
export interface MsgUpdateProviderAmino {
  /** authority is the address of the controlling account. */
  authority?: string;
  /** uuid is the unique identifier of the provider to update. */
  uuid?: string;
  /** address is the management address of the provider. */
  address?: string;
  /** payout_address is the address where payments are sent. */
  payout_address?: string;
  /** meta_hash is a hash of the off-chain metadata. */
  meta_hash?: string;
  /** active indicates whether the provider is active. */
  active?: boolean;
  /** api_url is the HTTPS endpoint where the provider's off-chain API is hosted. */
  api_url?: string;
}
export interface MsgUpdateProviderAminoMsg {
  type: "lifted/sku/MsgUpdateProvider";
  value: MsgUpdateProviderAmino;
}
/** MsgUpdateProvider is the Msg/UpdateProvider request type. */
export interface MsgUpdateProviderSDKType {
  authority: string;
  uuid: string;
  address: string;
  payout_address: string;
  meta_hash: Uint8Array;
  active: boolean;
  api_url: string;
}
/** MsgUpdateProviderResponse is the Msg/UpdateProvider response type. */
export interface MsgUpdateProviderResponse {}
export interface MsgUpdateProviderResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgUpdateProviderResponse";
  value: Uint8Array;
}
/** MsgUpdateProviderResponse is the Msg/UpdateProvider response type. */
export interface MsgUpdateProviderResponseAmino {}
export interface MsgUpdateProviderResponseAminoMsg {
  type: "/liftedinit.sku.v1.MsgUpdateProviderResponse";
  value: MsgUpdateProviderResponseAmino;
}
/** MsgUpdateProviderResponse is the Msg/UpdateProvider response type. */
export interface MsgUpdateProviderResponseSDKType {}
/**
 * MsgDeactivateProvider is the Msg/DeactivateProvider request type.
 * This performs a soft delete - the provider remains in state but is marked inactive.
 */
export interface MsgDeactivateProvider {
  /** authority is the address of the controlling account. */
  authority: string;
  /** uuid is the unique identifier of the provider to deactivate. */
  uuid: string;
}
export interface MsgDeactivateProviderProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgDeactivateProvider";
  value: Uint8Array;
}
/**
 * MsgDeactivateProvider is the Msg/DeactivateProvider request type.
 * This performs a soft delete - the provider remains in state but is marked inactive.
 */
export interface MsgDeactivateProviderAmino {
  /** authority is the address of the controlling account. */
  authority?: string;
  /** uuid is the unique identifier of the provider to deactivate. */
  uuid?: string;
}
export interface MsgDeactivateProviderAminoMsg {
  type: "lifted/sku/MsgDeactivateProvider";
  value: MsgDeactivateProviderAmino;
}
/**
 * MsgDeactivateProvider is the Msg/DeactivateProvider request type.
 * This performs a soft delete - the provider remains in state but is marked inactive.
 */
export interface MsgDeactivateProviderSDKType {
  authority: string;
  uuid: string;
}
/** MsgDeactivateProviderResponse is the Msg/DeactivateProvider response type. */
export interface MsgDeactivateProviderResponse {}
export interface MsgDeactivateProviderResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgDeactivateProviderResponse";
  value: Uint8Array;
}
/** MsgDeactivateProviderResponse is the Msg/DeactivateProvider response type. */
export interface MsgDeactivateProviderResponseAmino {}
export interface MsgDeactivateProviderResponseAminoMsg {
  type: "/liftedinit.sku.v1.MsgDeactivateProviderResponse";
  value: MsgDeactivateProviderResponseAmino;
}
/** MsgDeactivateProviderResponse is the Msg/DeactivateProvider response type. */
export interface MsgDeactivateProviderResponseSDKType {}
/** MsgCreateSKU is the Msg/CreateSKU request type. */
export interface MsgCreateSKU {
  /** authority is the address of the controlling account. */
  authority: string;
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
}
export interface MsgCreateSKUProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgCreateSKU";
  value: Uint8Array;
}
/** MsgCreateSKU is the Msg/CreateSKU request type. */
export interface MsgCreateSKUAmino {
  /** authority is the address of the controlling account. */
  authority?: string;
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
}
export interface MsgCreateSKUAminoMsg {
  type: "lifted/sku/MsgCreateSKU";
  value: MsgCreateSKUAmino;
}
/** MsgCreateSKU is the Msg/CreateSKU request type. */
export interface MsgCreateSKUSDKType {
  authority: string;
  provider_uuid: string;
  name: string;
  unit: Unit;
  base_price: CoinSDKType;
  meta_hash: Uint8Array;
}
/** MsgCreateSKUResponse is the Msg/CreateSKU response type. */
export interface MsgCreateSKUResponse {
  /** uuid is the unique identifier of the created SKU (UUIDv7 format). */
  uuid: string;
}
export interface MsgCreateSKUResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgCreateSKUResponse";
  value: Uint8Array;
}
/** MsgCreateSKUResponse is the Msg/CreateSKU response type. */
export interface MsgCreateSKUResponseAmino {
  /** uuid is the unique identifier of the created SKU (UUIDv7 format). */
  uuid?: string;
}
export interface MsgCreateSKUResponseAminoMsg {
  type: "/liftedinit.sku.v1.MsgCreateSKUResponse";
  value: MsgCreateSKUResponseAmino;
}
/** MsgCreateSKUResponse is the Msg/CreateSKU response type. */
export interface MsgCreateSKUResponseSDKType {
  uuid: string;
}
/** MsgUpdateSKU is the Msg/UpdateSKU request type. */
export interface MsgUpdateSKU {
  /** authority is the address of the controlling account. */
  authority: string;
  /** uuid is the unique identifier of the SKU to update. */
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
export interface MsgUpdateSKUProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgUpdateSKU";
  value: Uint8Array;
}
/** MsgUpdateSKU is the Msg/UpdateSKU request type. */
export interface MsgUpdateSKUAmino {
  /** authority is the address of the controlling account. */
  authority?: string;
  /** uuid is the unique identifier of the SKU to update. */
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
export interface MsgUpdateSKUAminoMsg {
  type: "lifted/sku/MsgUpdateSKU";
  value: MsgUpdateSKUAmino;
}
/** MsgUpdateSKU is the Msg/UpdateSKU request type. */
export interface MsgUpdateSKUSDKType {
  authority: string;
  uuid: string;
  provider_uuid: string;
  name: string;
  unit: Unit;
  base_price: CoinSDKType;
  meta_hash: Uint8Array;
  active: boolean;
}
/** MsgUpdateSKUResponse is the Msg/UpdateSKU response type. */
export interface MsgUpdateSKUResponse {}
export interface MsgUpdateSKUResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgUpdateSKUResponse";
  value: Uint8Array;
}
/** MsgUpdateSKUResponse is the Msg/UpdateSKU response type. */
export interface MsgUpdateSKUResponseAmino {}
export interface MsgUpdateSKUResponseAminoMsg {
  type: "/liftedinit.sku.v1.MsgUpdateSKUResponse";
  value: MsgUpdateSKUResponseAmino;
}
/** MsgUpdateSKUResponse is the Msg/UpdateSKU response type. */
export interface MsgUpdateSKUResponseSDKType {}
/**
 * MsgDeactivateSKU is the Msg/DeactivateSKU request type.
 * This performs a soft delete - the SKU remains in state but is marked inactive.
 */
export interface MsgDeactivateSKU {
  /** authority is the address of the controlling account. */
  authority: string;
  /** uuid is the unique identifier of the SKU to deactivate. */
  uuid: string;
}
export interface MsgDeactivateSKUProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgDeactivateSKU";
  value: Uint8Array;
}
/**
 * MsgDeactivateSKU is the Msg/DeactivateSKU request type.
 * This performs a soft delete - the SKU remains in state but is marked inactive.
 */
export interface MsgDeactivateSKUAmino {
  /** authority is the address of the controlling account. */
  authority?: string;
  /** uuid is the unique identifier of the SKU to deactivate. */
  uuid?: string;
}
export interface MsgDeactivateSKUAminoMsg {
  type: "lifted/sku/MsgDeactivateSKU";
  value: MsgDeactivateSKUAmino;
}
/**
 * MsgDeactivateSKU is the Msg/DeactivateSKU request type.
 * This performs a soft delete - the SKU remains in state but is marked inactive.
 */
export interface MsgDeactivateSKUSDKType {
  authority: string;
  uuid: string;
}
/** MsgDeactivateSKUResponse is the Msg/DeactivateSKU response type. */
export interface MsgDeactivateSKUResponse {}
export interface MsgDeactivateSKUResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgDeactivateSKUResponse";
  value: Uint8Array;
}
/** MsgDeactivateSKUResponse is the Msg/DeactivateSKU response type. */
export interface MsgDeactivateSKUResponseAmino {}
export interface MsgDeactivateSKUResponseAminoMsg {
  type: "/liftedinit.sku.v1.MsgDeactivateSKUResponse";
  value: MsgDeactivateSKUResponseAmino;
}
/** MsgDeactivateSKUResponse is the Msg/DeactivateSKU response type. */
export interface MsgDeactivateSKUResponseSDKType {}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address of the governance account. */
  authority: string;
  /** params defines the module parameters to update. */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgUpdateParams";
  value: Uint8Array;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParamsAmino {
  /** authority is the address of the governance account. */
  authority?: string;
  /** params defines the module parameters to update. */
  params?: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "lifted/sku/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType;
}
/** MsgUpdateParamsResponse is the Msg/UpdateParams response type. */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/** MsgUpdateParamsResponse is the Msg/UpdateParams response type. */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/liftedinit.sku.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/** MsgUpdateParamsResponse is the Msg/UpdateParams response type. */
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgCreateProvider(): MsgCreateProvider {
  return {
    authority: "",
    address: "",
    payoutAddress: "",
    metaHash: new Uint8Array(),
    apiUrl: ""
  };
}
export const MsgCreateProvider = {
  typeUrl: "/liftedinit.sku.v1.MsgCreateProvider",
  aminoType: "lifted/sku/MsgCreateProvider",
  is(o: any): o is MsgCreateProvider {
    return o && (o.$typeUrl === MsgCreateProvider.typeUrl || typeof o.authority === "string" && typeof o.address === "string" && typeof o.payoutAddress === "string" && (o.metaHash instanceof Uint8Array || typeof o.metaHash === "string") && typeof o.apiUrl === "string");
  },
  isSDK(o: any): o is MsgCreateProviderSDKType {
    return o && (o.$typeUrl === MsgCreateProvider.typeUrl || typeof o.authority === "string" && typeof o.address === "string" && typeof o.payout_address === "string" && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string") && typeof o.api_url === "string");
  },
  isAmino(o: any): o is MsgCreateProviderAmino {
    return o && (o.$typeUrl === MsgCreateProvider.typeUrl || typeof o.authority === "string" && typeof o.address === "string" && typeof o.payout_address === "string" && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string") && typeof o.api_url === "string");
  },
  encode(message: MsgCreateProvider, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
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
    if (message.apiUrl !== "") {
      writer.uint32(42).string(message.apiUrl);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateProvider {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateProvider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
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
          message.apiUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateProvider {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      address: isSet(object.address) ? String(object.address) : "",
      payoutAddress: isSet(object.payoutAddress) ? String(object.payoutAddress) : "",
      metaHash: isSet(object.metaHash) ? bytesFromBase64(object.metaHash) : new Uint8Array(),
      apiUrl: isSet(object.apiUrl) ? String(object.apiUrl) : ""
    };
  },
  toJSON(message: MsgCreateProvider): JsonSafe<MsgCreateProvider> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.address !== undefined && (obj.address = message.address);
    message.payoutAddress !== undefined && (obj.payoutAddress = message.payoutAddress);
    message.metaHash !== undefined && (obj.metaHash = base64FromBytes(message.metaHash !== undefined ? message.metaHash : new Uint8Array()));
    message.apiUrl !== undefined && (obj.apiUrl = message.apiUrl);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateProvider>, I>>(object: I): MsgCreateProvider {
    const message = createBaseMsgCreateProvider();
    message.authority = object.authority ?? "";
    message.address = object.address ?? "";
    message.payoutAddress = object.payoutAddress ?? "";
    message.metaHash = object.metaHash ?? new Uint8Array();
    message.apiUrl = object.apiUrl ?? "";
    return message;
  },
  fromAmino(object: MsgCreateProviderAmino): MsgCreateProvider {
    const message = createBaseMsgCreateProvider();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
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
    if (object.api_url !== undefined && object.api_url !== null) {
      message.apiUrl = object.api_url;
    }
    return message;
  },
  toAmino(message: MsgCreateProvider): MsgCreateProviderAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.address = message.address === "" ? undefined : message.address;
    obj.payout_address = message.payoutAddress === "" ? undefined : message.payoutAddress;
    obj.meta_hash = message.metaHash ? base64FromBytes(message.metaHash) : undefined;
    obj.api_url = message.apiUrl === "" ? undefined : message.apiUrl;
    return obj;
  },
  fromAminoMsg(object: MsgCreateProviderAminoMsg): MsgCreateProvider {
    return MsgCreateProvider.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateProvider): MsgCreateProviderAminoMsg {
    return {
      type: "lifted/sku/MsgCreateProvider",
      value: MsgCreateProvider.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgCreateProviderProtoMsg): MsgCreateProvider {
    return MsgCreateProvider.decode(message.value);
  },
  toProto(message: MsgCreateProvider): Uint8Array {
    return MsgCreateProvider.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateProvider): MsgCreateProviderProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.MsgCreateProvider",
      value: MsgCreateProvider.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateProvider.typeUrl, MsgCreateProvider);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCreateProvider.aminoType, MsgCreateProvider.typeUrl);
function createBaseMsgCreateProviderResponse(): MsgCreateProviderResponse {
  return {
    uuid: ""
  };
}
export const MsgCreateProviderResponse = {
  typeUrl: "/liftedinit.sku.v1.MsgCreateProviderResponse",
  is(o: any): o is MsgCreateProviderResponse {
    return o && (o.$typeUrl === MsgCreateProviderResponse.typeUrl || typeof o.uuid === "string");
  },
  isSDK(o: any): o is MsgCreateProviderResponseSDKType {
    return o && (o.$typeUrl === MsgCreateProviderResponse.typeUrl || typeof o.uuid === "string");
  },
  isAmino(o: any): o is MsgCreateProviderResponseAmino {
    return o && (o.$typeUrl === MsgCreateProviderResponse.typeUrl || typeof o.uuid === "string");
  },
  encode(message: MsgCreateProviderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateProviderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateProviderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateProviderResponse {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : ""
    };
  },
  toJSON(message: MsgCreateProviderResponse): JsonSafe<MsgCreateProviderResponse> {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateProviderResponse>, I>>(object: I): MsgCreateProviderResponse {
    const message = createBaseMsgCreateProviderResponse();
    message.uuid = object.uuid ?? "";
    return message;
  },
  fromAmino(object: MsgCreateProviderResponseAmino): MsgCreateProviderResponse {
    const message = createBaseMsgCreateProviderResponse();
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    }
    return message;
  },
  toAmino(message: MsgCreateProviderResponse): MsgCreateProviderResponseAmino {
    const obj: any = {};
    obj.uuid = message.uuid === "" ? undefined : message.uuid;
    return obj;
  },
  fromAminoMsg(object: MsgCreateProviderResponseAminoMsg): MsgCreateProviderResponse {
    return MsgCreateProviderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateProviderResponseProtoMsg): MsgCreateProviderResponse {
    return MsgCreateProviderResponse.decode(message.value);
  },
  toProto(message: MsgCreateProviderResponse): Uint8Array {
    return MsgCreateProviderResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateProviderResponse): MsgCreateProviderResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.MsgCreateProviderResponse",
      value: MsgCreateProviderResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateProviderResponse.typeUrl, MsgCreateProviderResponse);
function createBaseMsgUpdateProvider(): MsgUpdateProvider {
  return {
    authority: "",
    uuid: "",
    address: "",
    payoutAddress: "",
    metaHash: new Uint8Array(),
    active: false,
    apiUrl: ""
  };
}
export const MsgUpdateProvider = {
  typeUrl: "/liftedinit.sku.v1.MsgUpdateProvider",
  aminoType: "lifted/sku/MsgUpdateProvider",
  is(o: any): o is MsgUpdateProvider {
    return o && (o.$typeUrl === MsgUpdateProvider.typeUrl || typeof o.authority === "string" && typeof o.uuid === "string" && typeof o.address === "string" && typeof o.payoutAddress === "string" && (o.metaHash instanceof Uint8Array || typeof o.metaHash === "string") && typeof o.active === "boolean" && typeof o.apiUrl === "string");
  },
  isSDK(o: any): o is MsgUpdateProviderSDKType {
    return o && (o.$typeUrl === MsgUpdateProvider.typeUrl || typeof o.authority === "string" && typeof o.uuid === "string" && typeof o.address === "string" && typeof o.payout_address === "string" && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string") && typeof o.active === "boolean" && typeof o.api_url === "string");
  },
  isAmino(o: any): o is MsgUpdateProviderAmino {
    return o && (o.$typeUrl === MsgUpdateProvider.typeUrl || typeof o.authority === "string" && typeof o.uuid === "string" && typeof o.address === "string" && typeof o.payout_address === "string" && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string") && typeof o.active === "boolean" && typeof o.api_url === "string");
  },
  encode(message: MsgUpdateProvider, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.payoutAddress !== "") {
      writer.uint32(34).string(message.payoutAddress);
    }
    if (message.metaHash.length !== 0) {
      writer.uint32(42).bytes(message.metaHash);
    }
    if (message.active === true) {
      writer.uint32(48).bool(message.active);
    }
    if (message.apiUrl !== "") {
      writer.uint32(58).string(message.apiUrl);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateProvider {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateProvider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.payoutAddress = reader.string();
          break;
        case 5:
          message.metaHash = reader.bytes();
          break;
        case 6:
          message.active = reader.bool();
          break;
        case 7:
          message.apiUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateProvider {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      uuid: isSet(object.uuid) ? String(object.uuid) : "",
      address: isSet(object.address) ? String(object.address) : "",
      payoutAddress: isSet(object.payoutAddress) ? String(object.payoutAddress) : "",
      metaHash: isSet(object.metaHash) ? bytesFromBase64(object.metaHash) : new Uint8Array(),
      active: isSet(object.active) ? Boolean(object.active) : false,
      apiUrl: isSet(object.apiUrl) ? String(object.apiUrl) : ""
    };
  },
  toJSON(message: MsgUpdateProvider): JsonSafe<MsgUpdateProvider> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.address !== undefined && (obj.address = message.address);
    message.payoutAddress !== undefined && (obj.payoutAddress = message.payoutAddress);
    message.metaHash !== undefined && (obj.metaHash = base64FromBytes(message.metaHash !== undefined ? message.metaHash : new Uint8Array()));
    message.active !== undefined && (obj.active = message.active);
    message.apiUrl !== undefined && (obj.apiUrl = message.apiUrl);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateProvider>, I>>(object: I): MsgUpdateProvider {
    const message = createBaseMsgUpdateProvider();
    message.authority = object.authority ?? "";
    message.uuid = object.uuid ?? "";
    message.address = object.address ?? "";
    message.payoutAddress = object.payoutAddress ?? "";
    message.metaHash = object.metaHash ?? new Uint8Array();
    message.active = object.active ?? false;
    message.apiUrl = object.apiUrl ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateProviderAmino): MsgUpdateProvider {
    const message = createBaseMsgUpdateProvider();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
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
  toAmino(message: MsgUpdateProvider): MsgUpdateProviderAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.uuid = message.uuid === "" ? undefined : message.uuid;
    obj.address = message.address === "" ? undefined : message.address;
    obj.payout_address = message.payoutAddress === "" ? undefined : message.payoutAddress;
    obj.meta_hash = message.metaHash ? base64FromBytes(message.metaHash) : undefined;
    obj.active = message.active === false ? undefined : message.active;
    obj.api_url = message.apiUrl === "" ? undefined : message.apiUrl;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateProviderAminoMsg): MsgUpdateProvider {
    return MsgUpdateProvider.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateProvider): MsgUpdateProviderAminoMsg {
    return {
      type: "lifted/sku/MsgUpdateProvider",
      value: MsgUpdateProvider.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgUpdateProviderProtoMsg): MsgUpdateProvider {
    return MsgUpdateProvider.decode(message.value);
  },
  toProto(message: MsgUpdateProvider): Uint8Array {
    return MsgUpdateProvider.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateProvider): MsgUpdateProviderProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.MsgUpdateProvider",
      value: MsgUpdateProvider.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateProvider.typeUrl, MsgUpdateProvider);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgUpdateProvider.aminoType, MsgUpdateProvider.typeUrl);
function createBaseMsgUpdateProviderResponse(): MsgUpdateProviderResponse {
  return {};
}
export const MsgUpdateProviderResponse = {
  typeUrl: "/liftedinit.sku.v1.MsgUpdateProviderResponse",
  is(o: any): o is MsgUpdateProviderResponse {
    return o && o.$typeUrl === MsgUpdateProviderResponse.typeUrl;
  },
  isSDK(o: any): o is MsgUpdateProviderResponseSDKType {
    return o && o.$typeUrl === MsgUpdateProviderResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateProviderResponseAmino {
    return o && o.$typeUrl === MsgUpdateProviderResponse.typeUrl;
  },
  encode(_: MsgUpdateProviderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateProviderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateProviderResponse();
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
  fromJSON(_: any): MsgUpdateProviderResponse {
    return {};
  },
  toJSON(_: MsgUpdateProviderResponse): JsonSafe<MsgUpdateProviderResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateProviderResponse>, I>>(_: I): MsgUpdateProviderResponse {
    const message = createBaseMsgUpdateProviderResponse();
    return message;
  },
  fromAmino(_: MsgUpdateProviderResponseAmino): MsgUpdateProviderResponse {
    const message = createBaseMsgUpdateProviderResponse();
    return message;
  },
  toAmino(_: MsgUpdateProviderResponse): MsgUpdateProviderResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateProviderResponseAminoMsg): MsgUpdateProviderResponse {
    return MsgUpdateProviderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateProviderResponseProtoMsg): MsgUpdateProviderResponse {
    return MsgUpdateProviderResponse.decode(message.value);
  },
  toProto(message: MsgUpdateProviderResponse): Uint8Array {
    return MsgUpdateProviderResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateProviderResponse): MsgUpdateProviderResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.MsgUpdateProviderResponse",
      value: MsgUpdateProviderResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateProviderResponse.typeUrl, MsgUpdateProviderResponse);
function createBaseMsgDeactivateProvider(): MsgDeactivateProvider {
  return {
    authority: "",
    uuid: ""
  };
}
export const MsgDeactivateProvider = {
  typeUrl: "/liftedinit.sku.v1.MsgDeactivateProvider",
  aminoType: "lifted/sku/MsgDeactivateProvider",
  is(o: any): o is MsgDeactivateProvider {
    return o && (o.$typeUrl === MsgDeactivateProvider.typeUrl || typeof o.authority === "string" && typeof o.uuid === "string");
  },
  isSDK(o: any): o is MsgDeactivateProviderSDKType {
    return o && (o.$typeUrl === MsgDeactivateProvider.typeUrl || typeof o.authority === "string" && typeof o.uuid === "string");
  },
  isAmino(o: any): o is MsgDeactivateProviderAmino {
    return o && (o.$typeUrl === MsgDeactivateProvider.typeUrl || typeof o.authority === "string" && typeof o.uuid === "string");
  },
  encode(message: MsgDeactivateProvider, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDeactivateProvider {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeactivateProvider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgDeactivateProvider {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      uuid: isSet(object.uuid) ? String(object.uuid) : ""
    };
  },
  toJSON(message: MsgDeactivateProvider): JsonSafe<MsgDeactivateProvider> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeactivateProvider>, I>>(object: I): MsgDeactivateProvider {
    const message = createBaseMsgDeactivateProvider();
    message.authority = object.authority ?? "";
    message.uuid = object.uuid ?? "";
    return message;
  },
  fromAmino(object: MsgDeactivateProviderAmino): MsgDeactivateProvider {
    const message = createBaseMsgDeactivateProvider();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    }
    return message;
  },
  toAmino(message: MsgDeactivateProvider): MsgDeactivateProviderAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.uuid = message.uuid === "" ? undefined : message.uuid;
    return obj;
  },
  fromAminoMsg(object: MsgDeactivateProviderAminoMsg): MsgDeactivateProvider {
    return MsgDeactivateProvider.fromAmino(object.value);
  },
  toAminoMsg(message: MsgDeactivateProvider): MsgDeactivateProviderAminoMsg {
    return {
      type: "lifted/sku/MsgDeactivateProvider",
      value: MsgDeactivateProvider.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgDeactivateProviderProtoMsg): MsgDeactivateProvider {
    return MsgDeactivateProvider.decode(message.value);
  },
  toProto(message: MsgDeactivateProvider): Uint8Array {
    return MsgDeactivateProvider.encode(message).finish();
  },
  toProtoMsg(message: MsgDeactivateProvider): MsgDeactivateProviderProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.MsgDeactivateProvider",
      value: MsgDeactivateProvider.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgDeactivateProvider.typeUrl, MsgDeactivateProvider);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgDeactivateProvider.aminoType, MsgDeactivateProvider.typeUrl);
function createBaseMsgDeactivateProviderResponse(): MsgDeactivateProviderResponse {
  return {};
}
export const MsgDeactivateProviderResponse = {
  typeUrl: "/liftedinit.sku.v1.MsgDeactivateProviderResponse",
  is(o: any): o is MsgDeactivateProviderResponse {
    return o && o.$typeUrl === MsgDeactivateProviderResponse.typeUrl;
  },
  isSDK(o: any): o is MsgDeactivateProviderResponseSDKType {
    return o && o.$typeUrl === MsgDeactivateProviderResponse.typeUrl;
  },
  isAmino(o: any): o is MsgDeactivateProviderResponseAmino {
    return o && o.$typeUrl === MsgDeactivateProviderResponse.typeUrl;
  },
  encode(_: MsgDeactivateProviderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDeactivateProviderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeactivateProviderResponse();
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
  fromJSON(_: any): MsgDeactivateProviderResponse {
    return {};
  },
  toJSON(_: MsgDeactivateProviderResponse): JsonSafe<MsgDeactivateProviderResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeactivateProviderResponse>, I>>(_: I): MsgDeactivateProviderResponse {
    const message = createBaseMsgDeactivateProviderResponse();
    return message;
  },
  fromAmino(_: MsgDeactivateProviderResponseAmino): MsgDeactivateProviderResponse {
    const message = createBaseMsgDeactivateProviderResponse();
    return message;
  },
  toAmino(_: MsgDeactivateProviderResponse): MsgDeactivateProviderResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDeactivateProviderResponseAminoMsg): MsgDeactivateProviderResponse {
    return MsgDeactivateProviderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDeactivateProviderResponseProtoMsg): MsgDeactivateProviderResponse {
    return MsgDeactivateProviderResponse.decode(message.value);
  },
  toProto(message: MsgDeactivateProviderResponse): Uint8Array {
    return MsgDeactivateProviderResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDeactivateProviderResponse): MsgDeactivateProviderResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.MsgDeactivateProviderResponse",
      value: MsgDeactivateProviderResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgDeactivateProviderResponse.typeUrl, MsgDeactivateProviderResponse);
function createBaseMsgCreateSKU(): MsgCreateSKU {
  return {
    authority: "",
    providerUuid: "",
    name: "",
    unit: 0,
    basePrice: Coin.fromPartial({}),
    metaHash: new Uint8Array()
  };
}
export const MsgCreateSKU = {
  typeUrl: "/liftedinit.sku.v1.MsgCreateSKU",
  aminoType: "lifted/sku/MsgCreateSKU",
  is(o: any): o is MsgCreateSKU {
    return o && (o.$typeUrl === MsgCreateSKU.typeUrl || typeof o.authority === "string" && typeof o.providerUuid === "string" && typeof o.name === "string" && isSet(o.unit) && Coin.is(o.basePrice) && (o.metaHash instanceof Uint8Array || typeof o.metaHash === "string"));
  },
  isSDK(o: any): o is MsgCreateSKUSDKType {
    return o && (o.$typeUrl === MsgCreateSKU.typeUrl || typeof o.authority === "string" && typeof o.provider_uuid === "string" && typeof o.name === "string" && isSet(o.unit) && Coin.isSDK(o.base_price) && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string"));
  },
  isAmino(o: any): o is MsgCreateSKUAmino {
    return o && (o.$typeUrl === MsgCreateSKU.typeUrl || typeof o.authority === "string" && typeof o.provider_uuid === "string" && typeof o.name === "string" && isSet(o.unit) && Coin.isAmino(o.base_price) && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string"));
  },
  encode(message: MsgCreateSKU, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
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
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateSKU {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateSKU();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateSKU {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      providerUuid: isSet(object.providerUuid) ? String(object.providerUuid) : "",
      name: isSet(object.name) ? String(object.name) : "",
      unit: isSet(object.unit) ? unitFromJSON(object.unit) : -1,
      basePrice: isSet(object.basePrice) ? Coin.fromJSON(object.basePrice) : undefined,
      metaHash: isSet(object.metaHash) ? bytesFromBase64(object.metaHash) : new Uint8Array()
    };
  },
  toJSON(message: MsgCreateSKU): JsonSafe<MsgCreateSKU> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.providerUuid !== undefined && (obj.providerUuid = message.providerUuid);
    message.name !== undefined && (obj.name = message.name);
    message.unit !== undefined && (obj.unit = unitToJSON(message.unit));
    message.basePrice !== undefined && (obj.basePrice = message.basePrice ? Coin.toJSON(message.basePrice) : undefined);
    message.metaHash !== undefined && (obj.metaHash = base64FromBytes(message.metaHash !== undefined ? message.metaHash : new Uint8Array()));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateSKU>, I>>(object: I): MsgCreateSKU {
    const message = createBaseMsgCreateSKU();
    message.authority = object.authority ?? "";
    message.providerUuid = object.providerUuid ?? "";
    message.name = object.name ?? "";
    message.unit = object.unit ?? 0;
    message.basePrice = object.basePrice !== undefined && object.basePrice !== null ? Coin.fromPartial(object.basePrice) : undefined;
    message.metaHash = object.metaHash ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgCreateSKUAmino): MsgCreateSKU {
    const message = createBaseMsgCreateSKU();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
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
    return message;
  },
  toAmino(message: MsgCreateSKU): MsgCreateSKUAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.provider_uuid = message.providerUuid === "" ? undefined : message.providerUuid;
    obj.name = message.name === "" ? undefined : message.name;
    obj.unit = message.unit === 0 ? undefined : message.unit;
    obj.base_price = message.basePrice ? Coin.toAmino(message.basePrice) : Coin.toAmino(Coin.fromPartial({}));
    obj.meta_hash = message.metaHash ? base64FromBytes(message.metaHash) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCreateSKUAminoMsg): MsgCreateSKU {
    return MsgCreateSKU.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateSKU): MsgCreateSKUAminoMsg {
    return {
      type: "lifted/sku/MsgCreateSKU",
      value: MsgCreateSKU.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgCreateSKUProtoMsg): MsgCreateSKU {
    return MsgCreateSKU.decode(message.value);
  },
  toProto(message: MsgCreateSKU): Uint8Array {
    return MsgCreateSKU.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateSKU): MsgCreateSKUProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.MsgCreateSKU",
      value: MsgCreateSKU.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateSKU.typeUrl, MsgCreateSKU);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCreateSKU.aminoType, MsgCreateSKU.typeUrl);
function createBaseMsgCreateSKUResponse(): MsgCreateSKUResponse {
  return {
    uuid: ""
  };
}
export const MsgCreateSKUResponse = {
  typeUrl: "/liftedinit.sku.v1.MsgCreateSKUResponse",
  is(o: any): o is MsgCreateSKUResponse {
    return o && (o.$typeUrl === MsgCreateSKUResponse.typeUrl || typeof o.uuid === "string");
  },
  isSDK(o: any): o is MsgCreateSKUResponseSDKType {
    return o && (o.$typeUrl === MsgCreateSKUResponse.typeUrl || typeof o.uuid === "string");
  },
  isAmino(o: any): o is MsgCreateSKUResponseAmino {
    return o && (o.$typeUrl === MsgCreateSKUResponse.typeUrl || typeof o.uuid === "string");
  },
  encode(message: MsgCreateSKUResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateSKUResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateSKUResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateSKUResponse {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : ""
    };
  },
  toJSON(message: MsgCreateSKUResponse): JsonSafe<MsgCreateSKUResponse> {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateSKUResponse>, I>>(object: I): MsgCreateSKUResponse {
    const message = createBaseMsgCreateSKUResponse();
    message.uuid = object.uuid ?? "";
    return message;
  },
  fromAmino(object: MsgCreateSKUResponseAmino): MsgCreateSKUResponse {
    const message = createBaseMsgCreateSKUResponse();
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    }
    return message;
  },
  toAmino(message: MsgCreateSKUResponse): MsgCreateSKUResponseAmino {
    const obj: any = {};
    obj.uuid = message.uuid === "" ? undefined : message.uuid;
    return obj;
  },
  fromAminoMsg(object: MsgCreateSKUResponseAminoMsg): MsgCreateSKUResponse {
    return MsgCreateSKUResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateSKUResponseProtoMsg): MsgCreateSKUResponse {
    return MsgCreateSKUResponse.decode(message.value);
  },
  toProto(message: MsgCreateSKUResponse): Uint8Array {
    return MsgCreateSKUResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateSKUResponse): MsgCreateSKUResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.MsgCreateSKUResponse",
      value: MsgCreateSKUResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateSKUResponse.typeUrl, MsgCreateSKUResponse);
function createBaseMsgUpdateSKU(): MsgUpdateSKU {
  return {
    authority: "",
    uuid: "",
    providerUuid: "",
    name: "",
    unit: 0,
    basePrice: Coin.fromPartial({}),
    metaHash: new Uint8Array(),
    active: false
  };
}
export const MsgUpdateSKU = {
  typeUrl: "/liftedinit.sku.v1.MsgUpdateSKU",
  aminoType: "lifted/sku/MsgUpdateSKU",
  is(o: any): o is MsgUpdateSKU {
    return o && (o.$typeUrl === MsgUpdateSKU.typeUrl || typeof o.authority === "string" && typeof o.uuid === "string" && typeof o.providerUuid === "string" && typeof o.name === "string" && isSet(o.unit) && Coin.is(o.basePrice) && (o.metaHash instanceof Uint8Array || typeof o.metaHash === "string") && typeof o.active === "boolean");
  },
  isSDK(o: any): o is MsgUpdateSKUSDKType {
    return o && (o.$typeUrl === MsgUpdateSKU.typeUrl || typeof o.authority === "string" && typeof o.uuid === "string" && typeof o.provider_uuid === "string" && typeof o.name === "string" && isSet(o.unit) && Coin.isSDK(o.base_price) && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string") && typeof o.active === "boolean");
  },
  isAmino(o: any): o is MsgUpdateSKUAmino {
    return o && (o.$typeUrl === MsgUpdateSKU.typeUrl || typeof o.authority === "string" && typeof o.uuid === "string" && typeof o.provider_uuid === "string" && typeof o.name === "string" && isSet(o.unit) && Coin.isAmino(o.base_price) && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string") && typeof o.active === "boolean");
  },
  encode(message: MsgUpdateSKU, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    if (message.providerUuid !== "") {
      writer.uint32(26).string(message.providerUuid);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.unit !== 0) {
      writer.uint32(40).int32(message.unit);
    }
    if (message.basePrice !== undefined) {
      Coin.encode(message.basePrice, writer.uint32(50).fork()).ldelim();
    }
    if (message.metaHash.length !== 0) {
      writer.uint32(58).bytes(message.metaHash);
    }
    if (message.active === true) {
      writer.uint32(64).bool(message.active);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateSKU {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSKU();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        case 3:
          message.providerUuid = reader.string();
          break;
        case 4:
          message.name = reader.string();
          break;
        case 5:
          message.unit = reader.int32() as any;
          break;
        case 6:
          message.basePrice = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.metaHash = reader.bytes();
          break;
        case 8:
          message.active = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateSKU {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      uuid: isSet(object.uuid) ? String(object.uuid) : "",
      providerUuid: isSet(object.providerUuid) ? String(object.providerUuid) : "",
      name: isSet(object.name) ? String(object.name) : "",
      unit: isSet(object.unit) ? unitFromJSON(object.unit) : -1,
      basePrice: isSet(object.basePrice) ? Coin.fromJSON(object.basePrice) : undefined,
      metaHash: isSet(object.metaHash) ? bytesFromBase64(object.metaHash) : new Uint8Array(),
      active: isSet(object.active) ? Boolean(object.active) : false
    };
  },
  toJSON(message: MsgUpdateSKU): JsonSafe<MsgUpdateSKU> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.providerUuid !== undefined && (obj.providerUuid = message.providerUuid);
    message.name !== undefined && (obj.name = message.name);
    message.unit !== undefined && (obj.unit = unitToJSON(message.unit));
    message.basePrice !== undefined && (obj.basePrice = message.basePrice ? Coin.toJSON(message.basePrice) : undefined);
    message.metaHash !== undefined && (obj.metaHash = base64FromBytes(message.metaHash !== undefined ? message.metaHash : new Uint8Array()));
    message.active !== undefined && (obj.active = message.active);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateSKU>, I>>(object: I): MsgUpdateSKU {
    const message = createBaseMsgUpdateSKU();
    message.authority = object.authority ?? "";
    message.uuid = object.uuid ?? "";
    message.providerUuid = object.providerUuid ?? "";
    message.name = object.name ?? "";
    message.unit = object.unit ?? 0;
    message.basePrice = object.basePrice !== undefined && object.basePrice !== null ? Coin.fromPartial(object.basePrice) : undefined;
    message.metaHash = object.metaHash ?? new Uint8Array();
    message.active = object.active ?? false;
    return message;
  },
  fromAmino(object: MsgUpdateSKUAmino): MsgUpdateSKU {
    const message = createBaseMsgUpdateSKU();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
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
  toAmino(message: MsgUpdateSKU): MsgUpdateSKUAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.uuid = message.uuid === "" ? undefined : message.uuid;
    obj.provider_uuid = message.providerUuid === "" ? undefined : message.providerUuid;
    obj.name = message.name === "" ? undefined : message.name;
    obj.unit = message.unit === 0 ? undefined : message.unit;
    obj.base_price = message.basePrice ? Coin.toAmino(message.basePrice) : Coin.toAmino(Coin.fromPartial({}));
    obj.meta_hash = message.metaHash ? base64FromBytes(message.metaHash) : undefined;
    obj.active = message.active === false ? undefined : message.active;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateSKUAminoMsg): MsgUpdateSKU {
    return MsgUpdateSKU.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateSKU): MsgUpdateSKUAminoMsg {
    return {
      type: "lifted/sku/MsgUpdateSKU",
      value: MsgUpdateSKU.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgUpdateSKUProtoMsg): MsgUpdateSKU {
    return MsgUpdateSKU.decode(message.value);
  },
  toProto(message: MsgUpdateSKU): Uint8Array {
    return MsgUpdateSKU.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateSKU): MsgUpdateSKUProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.MsgUpdateSKU",
      value: MsgUpdateSKU.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateSKU.typeUrl, MsgUpdateSKU);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgUpdateSKU.aminoType, MsgUpdateSKU.typeUrl);
function createBaseMsgUpdateSKUResponse(): MsgUpdateSKUResponse {
  return {};
}
export const MsgUpdateSKUResponse = {
  typeUrl: "/liftedinit.sku.v1.MsgUpdateSKUResponse",
  is(o: any): o is MsgUpdateSKUResponse {
    return o && o.$typeUrl === MsgUpdateSKUResponse.typeUrl;
  },
  isSDK(o: any): o is MsgUpdateSKUResponseSDKType {
    return o && o.$typeUrl === MsgUpdateSKUResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateSKUResponseAmino {
    return o && o.$typeUrl === MsgUpdateSKUResponse.typeUrl;
  },
  encode(_: MsgUpdateSKUResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateSKUResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSKUResponse();
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
  fromJSON(_: any): MsgUpdateSKUResponse {
    return {};
  },
  toJSON(_: MsgUpdateSKUResponse): JsonSafe<MsgUpdateSKUResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateSKUResponse>, I>>(_: I): MsgUpdateSKUResponse {
    const message = createBaseMsgUpdateSKUResponse();
    return message;
  },
  fromAmino(_: MsgUpdateSKUResponseAmino): MsgUpdateSKUResponse {
    const message = createBaseMsgUpdateSKUResponse();
    return message;
  },
  toAmino(_: MsgUpdateSKUResponse): MsgUpdateSKUResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateSKUResponseAminoMsg): MsgUpdateSKUResponse {
    return MsgUpdateSKUResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateSKUResponseProtoMsg): MsgUpdateSKUResponse {
    return MsgUpdateSKUResponse.decode(message.value);
  },
  toProto(message: MsgUpdateSKUResponse): Uint8Array {
    return MsgUpdateSKUResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateSKUResponse): MsgUpdateSKUResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.MsgUpdateSKUResponse",
      value: MsgUpdateSKUResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateSKUResponse.typeUrl, MsgUpdateSKUResponse);
function createBaseMsgDeactivateSKU(): MsgDeactivateSKU {
  return {
    authority: "",
    uuid: ""
  };
}
export const MsgDeactivateSKU = {
  typeUrl: "/liftedinit.sku.v1.MsgDeactivateSKU",
  aminoType: "lifted/sku/MsgDeactivateSKU",
  is(o: any): o is MsgDeactivateSKU {
    return o && (o.$typeUrl === MsgDeactivateSKU.typeUrl || typeof o.authority === "string" && typeof o.uuid === "string");
  },
  isSDK(o: any): o is MsgDeactivateSKUSDKType {
    return o && (o.$typeUrl === MsgDeactivateSKU.typeUrl || typeof o.authority === "string" && typeof o.uuid === "string");
  },
  isAmino(o: any): o is MsgDeactivateSKUAmino {
    return o && (o.$typeUrl === MsgDeactivateSKU.typeUrl || typeof o.authority === "string" && typeof o.uuid === "string");
  },
  encode(message: MsgDeactivateSKU, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDeactivateSKU {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeactivateSKU();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgDeactivateSKU {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      uuid: isSet(object.uuid) ? String(object.uuid) : ""
    };
  },
  toJSON(message: MsgDeactivateSKU): JsonSafe<MsgDeactivateSKU> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeactivateSKU>, I>>(object: I): MsgDeactivateSKU {
    const message = createBaseMsgDeactivateSKU();
    message.authority = object.authority ?? "";
    message.uuid = object.uuid ?? "";
    return message;
  },
  fromAmino(object: MsgDeactivateSKUAmino): MsgDeactivateSKU {
    const message = createBaseMsgDeactivateSKU();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    }
    return message;
  },
  toAmino(message: MsgDeactivateSKU): MsgDeactivateSKUAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.uuid = message.uuid === "" ? undefined : message.uuid;
    return obj;
  },
  fromAminoMsg(object: MsgDeactivateSKUAminoMsg): MsgDeactivateSKU {
    return MsgDeactivateSKU.fromAmino(object.value);
  },
  toAminoMsg(message: MsgDeactivateSKU): MsgDeactivateSKUAminoMsg {
    return {
      type: "lifted/sku/MsgDeactivateSKU",
      value: MsgDeactivateSKU.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgDeactivateSKUProtoMsg): MsgDeactivateSKU {
    return MsgDeactivateSKU.decode(message.value);
  },
  toProto(message: MsgDeactivateSKU): Uint8Array {
    return MsgDeactivateSKU.encode(message).finish();
  },
  toProtoMsg(message: MsgDeactivateSKU): MsgDeactivateSKUProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.MsgDeactivateSKU",
      value: MsgDeactivateSKU.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgDeactivateSKU.typeUrl, MsgDeactivateSKU);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgDeactivateSKU.aminoType, MsgDeactivateSKU.typeUrl);
function createBaseMsgDeactivateSKUResponse(): MsgDeactivateSKUResponse {
  return {};
}
export const MsgDeactivateSKUResponse = {
  typeUrl: "/liftedinit.sku.v1.MsgDeactivateSKUResponse",
  is(o: any): o is MsgDeactivateSKUResponse {
    return o && o.$typeUrl === MsgDeactivateSKUResponse.typeUrl;
  },
  isSDK(o: any): o is MsgDeactivateSKUResponseSDKType {
    return o && o.$typeUrl === MsgDeactivateSKUResponse.typeUrl;
  },
  isAmino(o: any): o is MsgDeactivateSKUResponseAmino {
    return o && o.$typeUrl === MsgDeactivateSKUResponse.typeUrl;
  },
  encode(_: MsgDeactivateSKUResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDeactivateSKUResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeactivateSKUResponse();
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
  fromJSON(_: any): MsgDeactivateSKUResponse {
    return {};
  },
  toJSON(_: MsgDeactivateSKUResponse): JsonSafe<MsgDeactivateSKUResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeactivateSKUResponse>, I>>(_: I): MsgDeactivateSKUResponse {
    const message = createBaseMsgDeactivateSKUResponse();
    return message;
  },
  fromAmino(_: MsgDeactivateSKUResponseAmino): MsgDeactivateSKUResponse {
    const message = createBaseMsgDeactivateSKUResponse();
    return message;
  },
  toAmino(_: MsgDeactivateSKUResponse): MsgDeactivateSKUResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDeactivateSKUResponseAminoMsg): MsgDeactivateSKUResponse {
    return MsgDeactivateSKUResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDeactivateSKUResponseProtoMsg): MsgDeactivateSKUResponse {
    return MsgDeactivateSKUResponse.decode(message.value);
  },
  toProto(message: MsgDeactivateSKUResponse): Uint8Array {
    return MsgDeactivateSKUResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDeactivateSKUResponse): MsgDeactivateSKUResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.MsgDeactivateSKUResponse",
      value: MsgDeactivateSKUResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgDeactivateSKUResponse.typeUrl, MsgDeactivateSKUResponse);
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/liftedinit.sku.v1.MsgUpdateParams",
  aminoType: "lifted/sku/MsgUpdateParams",
  is(o: any): o is MsgUpdateParams {
    return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.is(o.params));
  },
  isSDK(o: any): o is MsgUpdateParamsSDKType {
    return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.isSDK(o.params));
  },
  isAmino(o: any): o is MsgUpdateParamsAmino {
    return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.isAmino(o.params));
  },
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
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
          message.authority = reader.string();
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
  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: MsgUpdateParams): JsonSafe<MsgUpdateParams> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams): MsgUpdateParamsAminoMsg {
    return {
      type: "lifted/sku/MsgUpdateParams",
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
      typeUrl: "/liftedinit.sku.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateParams.typeUrl, MsgUpdateParams);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgUpdateParams.aminoType, MsgUpdateParams.typeUrl);
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/liftedinit.sku.v1.MsgUpdateParamsResponse",
  is(o: any): o is MsgUpdateParamsResponse {
    return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
  },
  isSDK(o: any): o is MsgUpdateParamsResponseSDKType {
    return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateParamsResponseAmino {
    return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
  },
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
  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },
  toJSON(_: MsgUpdateParamsResponse): JsonSafe<MsgUpdateParamsResponse> {
    const obj: any = {};
    return obj;
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
      typeUrl: "/liftedinit.sku.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateParamsResponse.typeUrl, MsgUpdateParamsResponse);