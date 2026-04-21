import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType, Provider, ProviderAmino, ProviderSDKType, SKU, SKUAmino, SKUSDKType } from "./types";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { JsonSafe } from "../../../json-safe";
import { DeepPartial, Exact, isSet } from "../../../helpers";
import { GlobalDecoderRegistry } from "../../../registry";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/liftedinit.sku.v1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the module parameters. */
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params defines the module parameters. */
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/liftedinit.sku.v1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
/** QueryProviderRequest is the request type for the Query/Provider RPC method. */
export interface QueryProviderRequest {
  /** uuid is the unique identifier of the provider. */
  uuid: string;
}
export interface QueryProviderRequestProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QueryProviderRequest";
  value: Uint8Array;
}
/** QueryProviderRequest is the request type for the Query/Provider RPC method. */
export interface QueryProviderRequestAmino {
  /** uuid is the unique identifier of the provider. */
  uuid?: string;
}
export interface QueryProviderRequestAminoMsg {
  type: "/liftedinit.sku.v1.QueryProviderRequest";
  value: QueryProviderRequestAmino;
}
/** QueryProviderRequest is the request type for the Query/Provider RPC method. */
export interface QueryProviderRequestSDKType {
  uuid: string;
}
/** QueryProviderResponse is the response type for the Query/Provider RPC method. */
export interface QueryProviderResponse {
  /** provider is the provider. */
  provider: Provider;
}
export interface QueryProviderResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QueryProviderResponse";
  value: Uint8Array;
}
/** QueryProviderResponse is the response type for the Query/Provider RPC method. */
export interface QueryProviderResponseAmino {
  /** provider is the provider. */
  provider?: ProviderAmino;
}
export interface QueryProviderResponseAminoMsg {
  type: "/liftedinit.sku.v1.QueryProviderResponse";
  value: QueryProviderResponseAmino;
}
/** QueryProviderResponse is the response type for the Query/Provider RPC method. */
export interface QueryProviderResponseSDKType {
  provider: ProviderSDKType;
}
/** QueryProvidersRequest is the request type for the Query/Providers RPC method. */
export interface QueryProvidersRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** active_only filters to return only active providers when true. */
  activeOnly: boolean;
}
export interface QueryProvidersRequestProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QueryProvidersRequest";
  value: Uint8Array;
}
/** QueryProvidersRequest is the request type for the Query/Providers RPC method. */
export interface QueryProvidersRequestAmino {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
  /** active_only filters to return only active providers when true. */
  active_only?: boolean;
}
export interface QueryProvidersRequestAminoMsg {
  type: "/liftedinit.sku.v1.QueryProvidersRequest";
  value: QueryProvidersRequestAmino;
}
/** QueryProvidersRequest is the request type for the Query/Providers RPC method. */
export interface QueryProvidersRequestSDKType {
  pagination?: PageRequestSDKType;
  active_only: boolean;
}
/** QueryProvidersResponse is the response type for the Query/Providers RPC method. */
export interface QueryProvidersResponse {
  /** providers is the list of providers. */
  providers: Provider[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface QueryProvidersResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QueryProvidersResponse";
  value: Uint8Array;
}
/** QueryProvidersResponse is the response type for the Query/Providers RPC method. */
export interface QueryProvidersResponseAmino {
  /** providers is the list of providers. */
  providers?: ProviderAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
export interface QueryProvidersResponseAminoMsg {
  type: "/liftedinit.sku.v1.QueryProvidersResponse";
  value: QueryProvidersResponseAmino;
}
/** QueryProvidersResponse is the response type for the Query/Providers RPC method. */
export interface QueryProvidersResponseSDKType {
  providers: ProviderSDKType[];
  pagination?: PageResponseSDKType;
}
/** QuerySKURequest is the request type for the Query/SKU RPC method. */
export interface QuerySKURequest {
  /** uuid is the unique identifier of the SKU. */
  uuid: string;
}
export interface QuerySKURequestProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QuerySKURequest";
  value: Uint8Array;
}
/** QuerySKURequest is the request type for the Query/SKU RPC method. */
export interface QuerySKURequestAmino {
  /** uuid is the unique identifier of the SKU. */
  uuid?: string;
}
export interface QuerySKURequestAminoMsg {
  type: "/liftedinit.sku.v1.QuerySKURequest";
  value: QuerySKURequestAmino;
}
/** QuerySKURequest is the request type for the Query/SKU RPC method. */
export interface QuerySKURequestSDKType {
  uuid: string;
}
/** QuerySKUResponse is the response type for the Query/SKU RPC method. */
export interface QuerySKUResponse {
  /** sku is the SKU. */
  sku: SKU;
}
export interface QuerySKUResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QuerySKUResponse";
  value: Uint8Array;
}
/** QuerySKUResponse is the response type for the Query/SKU RPC method. */
export interface QuerySKUResponseAmino {
  /** sku is the SKU. */
  sku?: SKUAmino;
}
export interface QuerySKUResponseAminoMsg {
  type: "/liftedinit.sku.v1.QuerySKUResponse";
  value: QuerySKUResponseAmino;
}
/** QuerySKUResponse is the response type for the Query/SKU RPC method. */
export interface QuerySKUResponseSDKType {
  sku: SKUSDKType;
}
/** QuerySKUsRequest is the request type for the Query/SKUs RPC method. */
export interface QuerySKUsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** active_only filters to return only active SKUs when true. */
  activeOnly: boolean;
}
export interface QuerySKUsRequestProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QuerySKUsRequest";
  value: Uint8Array;
}
/** QuerySKUsRequest is the request type for the Query/SKUs RPC method. */
export interface QuerySKUsRequestAmino {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
  /** active_only filters to return only active SKUs when true. */
  active_only?: boolean;
}
export interface QuerySKUsRequestAminoMsg {
  type: "/liftedinit.sku.v1.QuerySKUsRequest";
  value: QuerySKUsRequestAmino;
}
/** QuerySKUsRequest is the request type for the Query/SKUs RPC method. */
export interface QuerySKUsRequestSDKType {
  pagination?: PageRequestSDKType;
  active_only: boolean;
}
/** QuerySKUsResponse is the response type for the Query/SKUs RPC method. */
export interface QuerySKUsResponse {
  /** skus is the list of SKUs. */
  skus: SKU[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface QuerySKUsResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QuerySKUsResponse";
  value: Uint8Array;
}
/** QuerySKUsResponse is the response type for the Query/SKUs RPC method. */
export interface QuerySKUsResponseAmino {
  /** skus is the list of SKUs. */
  skus?: SKUAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
export interface QuerySKUsResponseAminoMsg {
  type: "/liftedinit.sku.v1.QuerySKUsResponse";
  value: QuerySKUsResponseAmino;
}
/** QuerySKUsResponse is the response type for the Query/SKUs RPC method. */
export interface QuerySKUsResponseSDKType {
  skus: SKUSDKType[];
  pagination?: PageResponseSDKType;
}
/**
 * QuerySKUsByProviderRequest is the request type for the Query/SKUsByProvider
 * RPC method.
 */
export interface QuerySKUsByProviderRequest {
  /** provider_uuid is the unique identifier of the SKU provider. */
  providerUuid: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** active_only filters to return only active SKUs when true. */
  activeOnly: boolean;
}
export interface QuerySKUsByProviderRequestProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QuerySKUsByProviderRequest";
  value: Uint8Array;
}
/**
 * QuerySKUsByProviderRequest is the request type for the Query/SKUsByProvider
 * RPC method.
 */
export interface QuerySKUsByProviderRequestAmino {
  /** provider_uuid is the unique identifier of the SKU provider. */
  provider_uuid?: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
  /** active_only filters to return only active SKUs when true. */
  active_only?: boolean;
}
export interface QuerySKUsByProviderRequestAminoMsg {
  type: "/liftedinit.sku.v1.QuerySKUsByProviderRequest";
  value: QuerySKUsByProviderRequestAmino;
}
/**
 * QuerySKUsByProviderRequest is the request type for the Query/SKUsByProvider
 * RPC method.
 */
export interface QuerySKUsByProviderRequestSDKType {
  provider_uuid: string;
  pagination?: PageRequestSDKType;
  active_only: boolean;
}
/**
 * QuerySKUsByProviderResponse is the response type for the Query/SKUsByProvider
 * RPC method.
 */
export interface QuerySKUsByProviderResponse {
  /** skus is the list of SKUs. */
  skus: SKU[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface QuerySKUsByProviderResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QuerySKUsByProviderResponse";
  value: Uint8Array;
}
/**
 * QuerySKUsByProviderResponse is the response type for the Query/SKUsByProvider
 * RPC method.
 */
export interface QuerySKUsByProviderResponseAmino {
  /** skus is the list of SKUs. */
  skus?: SKUAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
export interface QuerySKUsByProviderResponseAminoMsg {
  type: "/liftedinit.sku.v1.QuerySKUsByProviderResponse";
  value: QuerySKUsByProviderResponseAmino;
}
/**
 * QuerySKUsByProviderResponse is the response type for the Query/SKUsByProvider
 * RPC method.
 */
export interface QuerySKUsByProviderResponseSDKType {
  skus: SKUSDKType[];
  pagination?: PageResponseSDKType;
}
/**
 * QueryProviderByAddressRequest is the request type for the Query/ProviderByAddress
 * RPC method.
 */
export interface QueryProviderByAddressRequest {
  /** address is the management address of the provider. */
  address: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** active_only filters to return only active providers when true. */
  activeOnly: boolean;
}
export interface QueryProviderByAddressRequestProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QueryProviderByAddressRequest";
  value: Uint8Array;
}
/**
 * QueryProviderByAddressRequest is the request type for the Query/ProviderByAddress
 * RPC method.
 */
export interface QueryProviderByAddressRequestAmino {
  /** address is the management address of the provider. */
  address?: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
  /** active_only filters to return only active providers when true. */
  active_only?: boolean;
}
export interface QueryProviderByAddressRequestAminoMsg {
  type: "/liftedinit.sku.v1.QueryProviderByAddressRequest";
  value: QueryProviderByAddressRequestAmino;
}
/**
 * QueryProviderByAddressRequest is the request type for the Query/ProviderByAddress
 * RPC method.
 */
export interface QueryProviderByAddressRequestSDKType {
  address: string;
  pagination?: PageRequestSDKType;
  active_only: boolean;
}
/**
 * QueryProviderByAddressResponse is the response type for the Query/ProviderByAddress
 * RPC method.
 */
export interface QueryProviderByAddressResponse {
  /** providers is the list of providers with the given address. */
  providers: Provider[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface QueryProviderByAddressResponseProtoMsg {
  typeUrl: "/liftedinit.sku.v1.QueryProviderByAddressResponse";
  value: Uint8Array;
}
/**
 * QueryProviderByAddressResponse is the response type for the Query/ProviderByAddress
 * RPC method.
 */
export interface QueryProviderByAddressResponseAmino {
  /** providers is the list of providers with the given address. */
  providers?: ProviderAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
export interface QueryProviderByAddressResponseAminoMsg {
  type: "/liftedinit.sku.v1.QueryProviderByAddressResponse";
  value: QueryProviderByAddressResponseAmino;
}
/**
 * QueryProviderByAddressResponse is the response type for the Query/ProviderByAddress
 * RPC method.
 */
export interface QueryProviderByAddressResponseSDKType {
  providers: ProviderSDKType[];
  pagination?: PageResponseSDKType;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/liftedinit.sku.v1.QueryParamsRequest",
  is(o: any): o is QueryParamsRequest {
    return o && o.$typeUrl === QueryParamsRequest.typeUrl;
  },
  isSDK(o: any): o is QueryParamsRequestSDKType {
    return o && o.$typeUrl === QueryParamsRequest.typeUrl;
  },
  isAmino(o: any): o is QueryParamsRequestAmino {
    return o && o.$typeUrl === QueryParamsRequest.typeUrl;
  },
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
  fromJSON(_: any): QueryParamsRequest {
    return {};
  },
  toJSON(_: QueryParamsRequest): JsonSafe<QueryParamsRequest> {
    const obj: any = {};
    return obj;
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
      typeUrl: "/liftedinit.sku.v1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryParamsRequest.typeUrl, QueryParamsRequest);
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/liftedinit.sku.v1.QueryParamsResponse",
  is(o: any): o is QueryParamsResponse {
    return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.is(o.params));
  },
  isSDK(o: any): o is QueryParamsResponseSDKType {
    return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isSDK(o.params));
  },
  isAmino(o: any): o is QueryParamsResponseAmino {
    return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isAmino(o.params));
  },
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
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
  fromJSON(object: any): QueryParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: QueryParamsResponse): JsonSafe<QueryParamsResponse> {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryParamsResponse.typeUrl, QueryParamsResponse);
function createBaseQueryProviderRequest(): QueryProviderRequest {
  return {
    uuid: ""
  };
}
export const QueryProviderRequest = {
  typeUrl: "/liftedinit.sku.v1.QueryProviderRequest",
  is(o: any): o is QueryProviderRequest {
    return o && (o.$typeUrl === QueryProviderRequest.typeUrl || typeof o.uuid === "string");
  },
  isSDK(o: any): o is QueryProviderRequestSDKType {
    return o && (o.$typeUrl === QueryProviderRequest.typeUrl || typeof o.uuid === "string");
  },
  isAmino(o: any): o is QueryProviderRequestAmino {
    return o && (o.$typeUrl === QueryProviderRequest.typeUrl || typeof o.uuid === "string");
  },
  encode(message: QueryProviderRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProviderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProviderRequest();
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
  fromJSON(object: any): QueryProviderRequest {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : ""
    };
  },
  toJSON(message: QueryProviderRequest): JsonSafe<QueryProviderRequest> {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryProviderRequest>, I>>(object: I): QueryProviderRequest {
    const message = createBaseQueryProviderRequest();
    message.uuid = object.uuid ?? "";
    return message;
  },
  fromAmino(object: QueryProviderRequestAmino): QueryProviderRequest {
    const message = createBaseQueryProviderRequest();
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    }
    return message;
  },
  toAmino(message: QueryProviderRequest): QueryProviderRequestAmino {
    const obj: any = {};
    obj.uuid = message.uuid === "" ? undefined : message.uuid;
    return obj;
  },
  fromAminoMsg(object: QueryProviderRequestAminoMsg): QueryProviderRequest {
    return QueryProviderRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProviderRequestProtoMsg): QueryProviderRequest {
    return QueryProviderRequest.decode(message.value);
  },
  toProto(message: QueryProviderRequest): Uint8Array {
    return QueryProviderRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryProviderRequest): QueryProviderRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QueryProviderRequest",
      value: QueryProviderRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryProviderRequest.typeUrl, QueryProviderRequest);
function createBaseQueryProviderResponse(): QueryProviderResponse {
  return {
    provider: Provider.fromPartial({})
  };
}
export const QueryProviderResponse = {
  typeUrl: "/liftedinit.sku.v1.QueryProviderResponse",
  is(o: any): o is QueryProviderResponse {
    return o && (o.$typeUrl === QueryProviderResponse.typeUrl || Provider.is(o.provider));
  },
  isSDK(o: any): o is QueryProviderResponseSDKType {
    return o && (o.$typeUrl === QueryProviderResponse.typeUrl || Provider.isSDK(o.provider));
  },
  isAmino(o: any): o is QueryProviderResponseAmino {
    return o && (o.$typeUrl === QueryProviderResponse.typeUrl || Provider.isAmino(o.provider));
  },
  encode(message: QueryProviderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.provider !== undefined) {
      Provider.encode(message.provider, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProviderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProviderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.provider = Provider.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryProviderResponse {
    return {
      provider: isSet(object.provider) ? Provider.fromJSON(object.provider) : undefined
    };
  },
  toJSON(message: QueryProviderResponse): JsonSafe<QueryProviderResponse> {
    const obj: any = {};
    message.provider !== undefined && (obj.provider = message.provider ? Provider.toJSON(message.provider) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryProviderResponse>, I>>(object: I): QueryProviderResponse {
    const message = createBaseQueryProviderResponse();
    message.provider = object.provider !== undefined && object.provider !== null ? Provider.fromPartial(object.provider) : undefined;
    return message;
  },
  fromAmino(object: QueryProviderResponseAmino): QueryProviderResponse {
    const message = createBaseQueryProviderResponse();
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = Provider.fromAmino(object.provider);
    }
    return message;
  },
  toAmino(message: QueryProviderResponse): QueryProviderResponseAmino {
    const obj: any = {};
    obj.provider = message.provider ? Provider.toAmino(message.provider) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryProviderResponseAminoMsg): QueryProviderResponse {
    return QueryProviderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProviderResponseProtoMsg): QueryProviderResponse {
    return QueryProviderResponse.decode(message.value);
  },
  toProto(message: QueryProviderResponse): Uint8Array {
    return QueryProviderResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryProviderResponse): QueryProviderResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QueryProviderResponse",
      value: QueryProviderResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryProviderResponse.typeUrl, QueryProviderResponse);
function createBaseQueryProvidersRequest(): QueryProvidersRequest {
  return {
    pagination: undefined,
    activeOnly: false
  };
}
export const QueryProvidersRequest = {
  typeUrl: "/liftedinit.sku.v1.QueryProvidersRequest",
  is(o: any): o is QueryProvidersRequest {
    return o && (o.$typeUrl === QueryProvidersRequest.typeUrl || typeof o.activeOnly === "boolean");
  },
  isSDK(o: any): o is QueryProvidersRequestSDKType {
    return o && (o.$typeUrl === QueryProvidersRequest.typeUrl || typeof o.active_only === "boolean");
  },
  isAmino(o: any): o is QueryProvidersRequestAmino {
    return o && (o.$typeUrl === QueryProvidersRequest.typeUrl || typeof o.active_only === "boolean");
  },
  encode(message: QueryProvidersRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.activeOnly === true) {
      writer.uint32(16).bool(message.activeOnly);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProvidersRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProvidersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.activeOnly = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryProvidersRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      activeOnly: isSet(object.activeOnly) ? Boolean(object.activeOnly) : false
    };
  },
  toJSON(message: QueryProvidersRequest): JsonSafe<QueryProvidersRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.activeOnly !== undefined && (obj.activeOnly = message.activeOnly);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryProvidersRequest>, I>>(object: I): QueryProvidersRequest {
    const message = createBaseQueryProvidersRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.activeOnly = object.activeOnly ?? false;
    return message;
  },
  fromAmino(object: QueryProvidersRequestAmino): QueryProvidersRequest {
    const message = createBaseQueryProvidersRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.active_only !== undefined && object.active_only !== null) {
      message.activeOnly = object.active_only;
    }
    return message;
  },
  toAmino(message: QueryProvidersRequest): QueryProvidersRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.active_only = message.activeOnly === false ? undefined : message.activeOnly;
    return obj;
  },
  fromAminoMsg(object: QueryProvidersRequestAminoMsg): QueryProvidersRequest {
    return QueryProvidersRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProvidersRequestProtoMsg): QueryProvidersRequest {
    return QueryProvidersRequest.decode(message.value);
  },
  toProto(message: QueryProvidersRequest): Uint8Array {
    return QueryProvidersRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryProvidersRequest): QueryProvidersRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QueryProvidersRequest",
      value: QueryProvidersRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryProvidersRequest.typeUrl, QueryProvidersRequest);
function createBaseQueryProvidersResponse(): QueryProvidersResponse {
  return {
    providers: [],
    pagination: undefined
  };
}
export const QueryProvidersResponse = {
  typeUrl: "/liftedinit.sku.v1.QueryProvidersResponse",
  is(o: any): o is QueryProvidersResponse {
    return o && (o.$typeUrl === QueryProvidersResponse.typeUrl || Array.isArray(o.providers) && (!o.providers.length || Provider.is(o.providers[0])));
  },
  isSDK(o: any): o is QueryProvidersResponseSDKType {
    return o && (o.$typeUrl === QueryProvidersResponse.typeUrl || Array.isArray(o.providers) && (!o.providers.length || Provider.isSDK(o.providers[0])));
  },
  isAmino(o: any): o is QueryProvidersResponseAmino {
    return o && (o.$typeUrl === QueryProvidersResponse.typeUrl || Array.isArray(o.providers) && (!o.providers.length || Provider.isAmino(o.providers[0])));
  },
  encode(message: QueryProvidersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.providers) {
      Provider.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProvidersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProvidersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providers.push(Provider.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryProvidersResponse {
    return {
      providers: Array.isArray(object?.providers) ? object.providers.map((e: any) => Provider.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryProvidersResponse): JsonSafe<QueryProvidersResponse> {
    const obj: any = {};
    if (message.providers) {
      obj.providers = message.providers.map(e => e ? Provider.toJSON(e) : undefined);
    } else {
      obj.providers = [];
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryProvidersResponse>, I>>(object: I): QueryProvidersResponse {
    const message = createBaseQueryProvidersResponse();
    message.providers = object.providers?.map(e => Provider.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryProvidersResponseAmino): QueryProvidersResponse {
    const message = createBaseQueryProvidersResponse();
    message.providers = object.providers?.map(e => Provider.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryProvidersResponse): QueryProvidersResponseAmino {
    const obj: any = {};
    if (message.providers) {
      obj.providers = message.providers.map(e => e ? Provider.toAmino(e) : undefined);
    } else {
      obj.providers = message.providers;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryProvidersResponseAminoMsg): QueryProvidersResponse {
    return QueryProvidersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProvidersResponseProtoMsg): QueryProvidersResponse {
    return QueryProvidersResponse.decode(message.value);
  },
  toProto(message: QueryProvidersResponse): Uint8Array {
    return QueryProvidersResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryProvidersResponse): QueryProvidersResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QueryProvidersResponse",
      value: QueryProvidersResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryProvidersResponse.typeUrl, QueryProvidersResponse);
function createBaseQuerySKURequest(): QuerySKURequest {
  return {
    uuid: ""
  };
}
export const QuerySKURequest = {
  typeUrl: "/liftedinit.sku.v1.QuerySKURequest",
  is(o: any): o is QuerySKURequest {
    return o && (o.$typeUrl === QuerySKURequest.typeUrl || typeof o.uuid === "string");
  },
  isSDK(o: any): o is QuerySKURequestSDKType {
    return o && (o.$typeUrl === QuerySKURequest.typeUrl || typeof o.uuid === "string");
  },
  isAmino(o: any): o is QuerySKURequestAmino {
    return o && (o.$typeUrl === QuerySKURequest.typeUrl || typeof o.uuid === "string");
  },
  encode(message: QuerySKURequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySKURequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySKURequest();
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
  fromJSON(object: any): QuerySKURequest {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : ""
    };
  },
  toJSON(message: QuerySKURequest): JsonSafe<QuerySKURequest> {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QuerySKURequest>, I>>(object: I): QuerySKURequest {
    const message = createBaseQuerySKURequest();
    message.uuid = object.uuid ?? "";
    return message;
  },
  fromAmino(object: QuerySKURequestAmino): QuerySKURequest {
    const message = createBaseQuerySKURequest();
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    }
    return message;
  },
  toAmino(message: QuerySKURequest): QuerySKURequestAmino {
    const obj: any = {};
    obj.uuid = message.uuid === "" ? undefined : message.uuid;
    return obj;
  },
  fromAminoMsg(object: QuerySKURequestAminoMsg): QuerySKURequest {
    return QuerySKURequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySKURequestProtoMsg): QuerySKURequest {
    return QuerySKURequest.decode(message.value);
  },
  toProto(message: QuerySKURequest): Uint8Array {
    return QuerySKURequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySKURequest): QuerySKURequestProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QuerySKURequest",
      value: QuerySKURequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QuerySKURequest.typeUrl, QuerySKURequest);
function createBaseQuerySKUResponse(): QuerySKUResponse {
  return {
    sku: SKU.fromPartial({})
  };
}
export const QuerySKUResponse = {
  typeUrl: "/liftedinit.sku.v1.QuerySKUResponse",
  is(o: any): o is QuerySKUResponse {
    return o && (o.$typeUrl === QuerySKUResponse.typeUrl || SKU.is(o.sku));
  },
  isSDK(o: any): o is QuerySKUResponseSDKType {
    return o && (o.$typeUrl === QuerySKUResponse.typeUrl || SKU.isSDK(o.sku));
  },
  isAmino(o: any): o is QuerySKUResponseAmino {
    return o && (o.$typeUrl === QuerySKUResponse.typeUrl || SKU.isAmino(o.sku));
  },
  encode(message: QuerySKUResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sku !== undefined) {
      SKU.encode(message.sku, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySKUResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySKUResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sku = SKU.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySKUResponse {
    return {
      sku: isSet(object.sku) ? SKU.fromJSON(object.sku) : undefined
    };
  },
  toJSON(message: QuerySKUResponse): JsonSafe<QuerySKUResponse> {
    const obj: any = {};
    message.sku !== undefined && (obj.sku = message.sku ? SKU.toJSON(message.sku) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QuerySKUResponse>, I>>(object: I): QuerySKUResponse {
    const message = createBaseQuerySKUResponse();
    message.sku = object.sku !== undefined && object.sku !== null ? SKU.fromPartial(object.sku) : undefined;
    return message;
  },
  fromAmino(object: QuerySKUResponseAmino): QuerySKUResponse {
    const message = createBaseQuerySKUResponse();
    if (object.sku !== undefined && object.sku !== null) {
      message.sku = SKU.fromAmino(object.sku);
    }
    return message;
  },
  toAmino(message: QuerySKUResponse): QuerySKUResponseAmino {
    const obj: any = {};
    obj.sku = message.sku ? SKU.toAmino(message.sku) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySKUResponseAminoMsg): QuerySKUResponse {
    return QuerySKUResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySKUResponseProtoMsg): QuerySKUResponse {
    return QuerySKUResponse.decode(message.value);
  },
  toProto(message: QuerySKUResponse): Uint8Array {
    return QuerySKUResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySKUResponse): QuerySKUResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QuerySKUResponse",
      value: QuerySKUResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QuerySKUResponse.typeUrl, QuerySKUResponse);
function createBaseQuerySKUsRequest(): QuerySKUsRequest {
  return {
    pagination: undefined,
    activeOnly: false
  };
}
export const QuerySKUsRequest = {
  typeUrl: "/liftedinit.sku.v1.QuerySKUsRequest",
  is(o: any): o is QuerySKUsRequest {
    return o && (o.$typeUrl === QuerySKUsRequest.typeUrl || typeof o.activeOnly === "boolean");
  },
  isSDK(o: any): o is QuerySKUsRequestSDKType {
    return o && (o.$typeUrl === QuerySKUsRequest.typeUrl || typeof o.active_only === "boolean");
  },
  isAmino(o: any): o is QuerySKUsRequestAmino {
    return o && (o.$typeUrl === QuerySKUsRequest.typeUrl || typeof o.active_only === "boolean");
  },
  encode(message: QuerySKUsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.activeOnly === true) {
      writer.uint32(16).bool(message.activeOnly);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySKUsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySKUsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.activeOnly = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySKUsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      activeOnly: isSet(object.activeOnly) ? Boolean(object.activeOnly) : false
    };
  },
  toJSON(message: QuerySKUsRequest): JsonSafe<QuerySKUsRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.activeOnly !== undefined && (obj.activeOnly = message.activeOnly);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QuerySKUsRequest>, I>>(object: I): QuerySKUsRequest {
    const message = createBaseQuerySKUsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.activeOnly = object.activeOnly ?? false;
    return message;
  },
  fromAmino(object: QuerySKUsRequestAmino): QuerySKUsRequest {
    const message = createBaseQuerySKUsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.active_only !== undefined && object.active_only !== null) {
      message.activeOnly = object.active_only;
    }
    return message;
  },
  toAmino(message: QuerySKUsRequest): QuerySKUsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.active_only = message.activeOnly === false ? undefined : message.activeOnly;
    return obj;
  },
  fromAminoMsg(object: QuerySKUsRequestAminoMsg): QuerySKUsRequest {
    return QuerySKUsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySKUsRequestProtoMsg): QuerySKUsRequest {
    return QuerySKUsRequest.decode(message.value);
  },
  toProto(message: QuerySKUsRequest): Uint8Array {
    return QuerySKUsRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySKUsRequest): QuerySKUsRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QuerySKUsRequest",
      value: QuerySKUsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QuerySKUsRequest.typeUrl, QuerySKUsRequest);
function createBaseQuerySKUsResponse(): QuerySKUsResponse {
  return {
    skus: [],
    pagination: undefined
  };
}
export const QuerySKUsResponse = {
  typeUrl: "/liftedinit.sku.v1.QuerySKUsResponse",
  is(o: any): o is QuerySKUsResponse {
    return o && (o.$typeUrl === QuerySKUsResponse.typeUrl || Array.isArray(o.skus) && (!o.skus.length || SKU.is(o.skus[0])));
  },
  isSDK(o: any): o is QuerySKUsResponseSDKType {
    return o && (o.$typeUrl === QuerySKUsResponse.typeUrl || Array.isArray(o.skus) && (!o.skus.length || SKU.isSDK(o.skus[0])));
  },
  isAmino(o: any): o is QuerySKUsResponseAmino {
    return o && (o.$typeUrl === QuerySKUsResponse.typeUrl || Array.isArray(o.skus) && (!o.skus.length || SKU.isAmino(o.skus[0])));
  },
  encode(message: QuerySKUsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.skus) {
      SKU.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySKUsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySKUsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.skus.push(SKU.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySKUsResponse {
    return {
      skus: Array.isArray(object?.skus) ? object.skus.map((e: any) => SKU.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QuerySKUsResponse): JsonSafe<QuerySKUsResponse> {
    const obj: any = {};
    if (message.skus) {
      obj.skus = message.skus.map(e => e ? SKU.toJSON(e) : undefined);
    } else {
      obj.skus = [];
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QuerySKUsResponse>, I>>(object: I): QuerySKUsResponse {
    const message = createBaseQuerySKUsResponse();
    message.skus = object.skus?.map(e => SKU.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySKUsResponseAmino): QuerySKUsResponse {
    const message = createBaseQuerySKUsResponse();
    message.skus = object.skus?.map(e => SKU.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySKUsResponse): QuerySKUsResponseAmino {
    const obj: any = {};
    if (message.skus) {
      obj.skus = message.skus.map(e => e ? SKU.toAmino(e) : undefined);
    } else {
      obj.skus = message.skus;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySKUsResponseAminoMsg): QuerySKUsResponse {
    return QuerySKUsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySKUsResponseProtoMsg): QuerySKUsResponse {
    return QuerySKUsResponse.decode(message.value);
  },
  toProto(message: QuerySKUsResponse): Uint8Array {
    return QuerySKUsResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySKUsResponse): QuerySKUsResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QuerySKUsResponse",
      value: QuerySKUsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QuerySKUsResponse.typeUrl, QuerySKUsResponse);
function createBaseQuerySKUsByProviderRequest(): QuerySKUsByProviderRequest {
  return {
    providerUuid: "",
    pagination: undefined,
    activeOnly: false
  };
}
export const QuerySKUsByProviderRequest = {
  typeUrl: "/liftedinit.sku.v1.QuerySKUsByProviderRequest",
  is(o: any): o is QuerySKUsByProviderRequest {
    return o && (o.$typeUrl === QuerySKUsByProviderRequest.typeUrl || typeof o.providerUuid === "string" && typeof o.activeOnly === "boolean");
  },
  isSDK(o: any): o is QuerySKUsByProviderRequestSDKType {
    return o && (o.$typeUrl === QuerySKUsByProviderRequest.typeUrl || typeof o.provider_uuid === "string" && typeof o.active_only === "boolean");
  },
  isAmino(o: any): o is QuerySKUsByProviderRequestAmino {
    return o && (o.$typeUrl === QuerySKUsByProviderRequest.typeUrl || typeof o.provider_uuid === "string" && typeof o.active_only === "boolean");
  },
  encode(message: QuerySKUsByProviderRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerUuid !== "") {
      writer.uint32(10).string(message.providerUuid);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.activeOnly === true) {
      writer.uint32(24).bool(message.activeOnly);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySKUsByProviderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySKUsByProviderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerUuid = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 3:
          message.activeOnly = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySKUsByProviderRequest {
    return {
      providerUuid: isSet(object.providerUuid) ? String(object.providerUuid) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      activeOnly: isSet(object.activeOnly) ? Boolean(object.activeOnly) : false
    };
  },
  toJSON(message: QuerySKUsByProviderRequest): JsonSafe<QuerySKUsByProviderRequest> {
    const obj: any = {};
    message.providerUuid !== undefined && (obj.providerUuid = message.providerUuid);
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.activeOnly !== undefined && (obj.activeOnly = message.activeOnly);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QuerySKUsByProviderRequest>, I>>(object: I): QuerySKUsByProviderRequest {
    const message = createBaseQuerySKUsByProviderRequest();
    message.providerUuid = object.providerUuid ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.activeOnly = object.activeOnly ?? false;
    return message;
  },
  fromAmino(object: QuerySKUsByProviderRequestAmino): QuerySKUsByProviderRequest {
    const message = createBaseQuerySKUsByProviderRequest();
    if (object.provider_uuid !== undefined && object.provider_uuid !== null) {
      message.providerUuid = object.provider_uuid;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.active_only !== undefined && object.active_only !== null) {
      message.activeOnly = object.active_only;
    }
    return message;
  },
  toAmino(message: QuerySKUsByProviderRequest): QuerySKUsByProviderRequestAmino {
    const obj: any = {};
    obj.provider_uuid = message.providerUuid === "" ? undefined : message.providerUuid;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.active_only = message.activeOnly === false ? undefined : message.activeOnly;
    return obj;
  },
  fromAminoMsg(object: QuerySKUsByProviderRequestAminoMsg): QuerySKUsByProviderRequest {
    return QuerySKUsByProviderRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySKUsByProviderRequestProtoMsg): QuerySKUsByProviderRequest {
    return QuerySKUsByProviderRequest.decode(message.value);
  },
  toProto(message: QuerySKUsByProviderRequest): Uint8Array {
    return QuerySKUsByProviderRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySKUsByProviderRequest): QuerySKUsByProviderRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QuerySKUsByProviderRequest",
      value: QuerySKUsByProviderRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QuerySKUsByProviderRequest.typeUrl, QuerySKUsByProviderRequest);
function createBaseQuerySKUsByProviderResponse(): QuerySKUsByProviderResponse {
  return {
    skus: [],
    pagination: undefined
  };
}
export const QuerySKUsByProviderResponse = {
  typeUrl: "/liftedinit.sku.v1.QuerySKUsByProviderResponse",
  is(o: any): o is QuerySKUsByProviderResponse {
    return o && (o.$typeUrl === QuerySKUsByProviderResponse.typeUrl || Array.isArray(o.skus) && (!o.skus.length || SKU.is(o.skus[0])));
  },
  isSDK(o: any): o is QuerySKUsByProviderResponseSDKType {
    return o && (o.$typeUrl === QuerySKUsByProviderResponse.typeUrl || Array.isArray(o.skus) && (!o.skus.length || SKU.isSDK(o.skus[0])));
  },
  isAmino(o: any): o is QuerySKUsByProviderResponseAmino {
    return o && (o.$typeUrl === QuerySKUsByProviderResponse.typeUrl || Array.isArray(o.skus) && (!o.skus.length || SKU.isAmino(o.skus[0])));
  },
  encode(message: QuerySKUsByProviderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.skus) {
      SKU.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySKUsByProviderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySKUsByProviderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.skus.push(SKU.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySKUsByProviderResponse {
    return {
      skus: Array.isArray(object?.skus) ? object.skus.map((e: any) => SKU.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QuerySKUsByProviderResponse): JsonSafe<QuerySKUsByProviderResponse> {
    const obj: any = {};
    if (message.skus) {
      obj.skus = message.skus.map(e => e ? SKU.toJSON(e) : undefined);
    } else {
      obj.skus = [];
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QuerySKUsByProviderResponse>, I>>(object: I): QuerySKUsByProviderResponse {
    const message = createBaseQuerySKUsByProviderResponse();
    message.skus = object.skus?.map(e => SKU.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySKUsByProviderResponseAmino): QuerySKUsByProviderResponse {
    const message = createBaseQuerySKUsByProviderResponse();
    message.skus = object.skus?.map(e => SKU.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySKUsByProviderResponse): QuerySKUsByProviderResponseAmino {
    const obj: any = {};
    if (message.skus) {
      obj.skus = message.skus.map(e => e ? SKU.toAmino(e) : undefined);
    } else {
      obj.skus = message.skus;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySKUsByProviderResponseAminoMsg): QuerySKUsByProviderResponse {
    return QuerySKUsByProviderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySKUsByProviderResponseProtoMsg): QuerySKUsByProviderResponse {
    return QuerySKUsByProviderResponse.decode(message.value);
  },
  toProto(message: QuerySKUsByProviderResponse): Uint8Array {
    return QuerySKUsByProviderResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySKUsByProviderResponse): QuerySKUsByProviderResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QuerySKUsByProviderResponse",
      value: QuerySKUsByProviderResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QuerySKUsByProviderResponse.typeUrl, QuerySKUsByProviderResponse);
function createBaseQueryProviderByAddressRequest(): QueryProviderByAddressRequest {
  return {
    address: "",
    pagination: undefined,
    activeOnly: false
  };
}
export const QueryProviderByAddressRequest = {
  typeUrl: "/liftedinit.sku.v1.QueryProviderByAddressRequest",
  is(o: any): o is QueryProviderByAddressRequest {
    return o && (o.$typeUrl === QueryProviderByAddressRequest.typeUrl || typeof o.address === "string" && typeof o.activeOnly === "boolean");
  },
  isSDK(o: any): o is QueryProviderByAddressRequestSDKType {
    return o && (o.$typeUrl === QueryProviderByAddressRequest.typeUrl || typeof o.address === "string" && typeof o.active_only === "boolean");
  },
  isAmino(o: any): o is QueryProviderByAddressRequestAmino {
    return o && (o.$typeUrl === QueryProviderByAddressRequest.typeUrl || typeof o.address === "string" && typeof o.active_only === "boolean");
  },
  encode(message: QueryProviderByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.activeOnly === true) {
      writer.uint32(24).bool(message.activeOnly);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProviderByAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProviderByAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 3:
          message.activeOnly = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryProviderByAddressRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      activeOnly: isSet(object.activeOnly) ? Boolean(object.activeOnly) : false
    };
  },
  toJSON(message: QueryProviderByAddressRequest): JsonSafe<QueryProviderByAddressRequest> {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.activeOnly !== undefined && (obj.activeOnly = message.activeOnly);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryProviderByAddressRequest>, I>>(object: I): QueryProviderByAddressRequest {
    const message = createBaseQueryProviderByAddressRequest();
    message.address = object.address ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.activeOnly = object.activeOnly ?? false;
    return message;
  },
  fromAmino(object: QueryProviderByAddressRequestAmino): QueryProviderByAddressRequest {
    const message = createBaseQueryProviderByAddressRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.active_only !== undefined && object.active_only !== null) {
      message.activeOnly = object.active_only;
    }
    return message;
  },
  toAmino(message: QueryProviderByAddressRequest): QueryProviderByAddressRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.active_only = message.activeOnly === false ? undefined : message.activeOnly;
    return obj;
  },
  fromAminoMsg(object: QueryProviderByAddressRequestAminoMsg): QueryProviderByAddressRequest {
    return QueryProviderByAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProviderByAddressRequestProtoMsg): QueryProviderByAddressRequest {
    return QueryProviderByAddressRequest.decode(message.value);
  },
  toProto(message: QueryProviderByAddressRequest): Uint8Array {
    return QueryProviderByAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryProviderByAddressRequest): QueryProviderByAddressRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QueryProviderByAddressRequest",
      value: QueryProviderByAddressRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryProviderByAddressRequest.typeUrl, QueryProviderByAddressRequest);
function createBaseQueryProviderByAddressResponse(): QueryProviderByAddressResponse {
  return {
    providers: [],
    pagination: undefined
  };
}
export const QueryProviderByAddressResponse = {
  typeUrl: "/liftedinit.sku.v1.QueryProviderByAddressResponse",
  is(o: any): o is QueryProviderByAddressResponse {
    return o && (o.$typeUrl === QueryProviderByAddressResponse.typeUrl || Array.isArray(o.providers) && (!o.providers.length || Provider.is(o.providers[0])));
  },
  isSDK(o: any): o is QueryProviderByAddressResponseSDKType {
    return o && (o.$typeUrl === QueryProviderByAddressResponse.typeUrl || Array.isArray(o.providers) && (!o.providers.length || Provider.isSDK(o.providers[0])));
  },
  isAmino(o: any): o is QueryProviderByAddressResponseAmino {
    return o && (o.$typeUrl === QueryProviderByAddressResponse.typeUrl || Array.isArray(o.providers) && (!o.providers.length || Provider.isAmino(o.providers[0])));
  },
  encode(message: QueryProviderByAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.providers) {
      Provider.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProviderByAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProviderByAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providers.push(Provider.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryProviderByAddressResponse {
    return {
      providers: Array.isArray(object?.providers) ? object.providers.map((e: any) => Provider.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryProviderByAddressResponse): JsonSafe<QueryProviderByAddressResponse> {
    const obj: any = {};
    if (message.providers) {
      obj.providers = message.providers.map(e => e ? Provider.toJSON(e) : undefined);
    } else {
      obj.providers = [];
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryProviderByAddressResponse>, I>>(object: I): QueryProviderByAddressResponse {
    const message = createBaseQueryProviderByAddressResponse();
    message.providers = object.providers?.map(e => Provider.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryProviderByAddressResponseAmino): QueryProviderByAddressResponse {
    const message = createBaseQueryProviderByAddressResponse();
    message.providers = object.providers?.map(e => Provider.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryProviderByAddressResponse): QueryProviderByAddressResponseAmino {
    const obj: any = {};
    if (message.providers) {
      obj.providers = message.providers.map(e => e ? Provider.toAmino(e) : undefined);
    } else {
      obj.providers = message.providers;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryProviderByAddressResponseAminoMsg): QueryProviderByAddressResponse {
    return QueryProviderByAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProviderByAddressResponseProtoMsg): QueryProviderByAddressResponse {
    return QueryProviderByAddressResponse.decode(message.value);
  },
  toProto(message: QueryProviderByAddressResponse): Uint8Array {
    return QueryProviderByAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryProviderByAddressResponse): QueryProviderByAddressResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.sku.v1.QueryProviderByAddressResponse",
      value: QueryProviderByAddressResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryProviderByAddressResponse.typeUrl, QueryProviderByAddressResponse);