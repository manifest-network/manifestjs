import { TxRpc } from "../../../types";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryProviderRequest, QueryProviderResponse, QueryProvidersRequest, QueryProvidersResponse, QuerySKURequest, QuerySKUResponse, QuerySKUsRequest, QuerySKUsResponse, QuerySKUsByProviderRequest, QuerySKUsByProviderResponse, QueryProviderByAddressRequest, QueryProviderByAddressResponse } from "./query";
/** Query defines the gRPC querier service for the sku module. */
export interface Query {
  /** Params queries the module parameters. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Provider queries a provider by uuid. */
  provider(request: QueryProviderRequest): Promise<QueryProviderResponse>;
  /** Providers queries all providers. */
  providers(request: QueryProvidersRequest): Promise<QueryProvidersResponse>;
  /** SKU queries a SKU by uuid. */
  sKU(request: QuerySKURequest): Promise<QuerySKUResponse>;
  /** SKUs queries all SKUs. */
  sKUs(request: QuerySKUsRequest): Promise<QuerySKUsResponse>;
  /** SKUsByProvider queries SKUs by provider uuid. */
  sKUsByProvider(request: QuerySKUsByProviderRequest): Promise<QuerySKUsByProviderResponse>;
  /** ProviderByAddress queries a provider by management address. */
  providerByAddress(request: QueryProviderByAddressRequest): Promise<QueryProviderByAddressResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* Params queries the module parameters. */
  params = async (request: QueryParamsRequest = {}): Promise<QueryParamsResponse> => {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.sku.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  };
  /* Provider queries a provider by uuid. */
  provider = async (request: QueryProviderRequest): Promise<QueryProviderResponse> => {
    const data = QueryProviderRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.sku.v1.Query", "Provider", data);
    return promise.then(data => QueryProviderResponse.decode(new BinaryReader(data)));
  };
  /* Providers queries all providers. */
  providers = async (request: QueryProvidersRequest): Promise<QueryProvidersResponse> => {
    const data = QueryProvidersRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.sku.v1.Query", "Providers", data);
    return promise.then(data => QueryProvidersResponse.decode(new BinaryReader(data)));
  };
  /* SKU queries a SKU by uuid. */
  sKU = async (request: QuerySKURequest): Promise<QuerySKUResponse> => {
    const data = QuerySKURequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.sku.v1.Query", "SKU", data);
    return promise.then(data => QuerySKUResponse.decode(new BinaryReader(data)));
  };
  /* SKUs queries all SKUs. */
  sKUs = async (request: QuerySKUsRequest): Promise<QuerySKUsResponse> => {
    const data = QuerySKUsRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.sku.v1.Query", "SKUs", data);
    return promise.then(data => QuerySKUsResponse.decode(new BinaryReader(data)));
  };
  /* SKUsByProvider queries SKUs by provider uuid. */
  sKUsByProvider = async (request: QuerySKUsByProviderRequest): Promise<QuerySKUsByProviderResponse> => {
    const data = QuerySKUsByProviderRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.sku.v1.Query", "SKUsByProvider", data);
    return promise.then(data => QuerySKUsByProviderResponse.decode(new BinaryReader(data)));
  };
  /* ProviderByAddress queries a provider by management address. */
  providerByAddress = async (request: QueryProviderByAddressRequest): Promise<QueryProviderByAddressResponse> => {
    const data = QueryProviderByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.sku.v1.Query", "ProviderByAddress", data);
    return promise.then(data => QueryProviderByAddressResponse.decode(new BinaryReader(data)));
  };
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    provider(request: QueryProviderRequest): Promise<QueryProviderResponse> {
      return queryService.provider(request);
    },
    providers(request: QueryProvidersRequest): Promise<QueryProvidersResponse> {
      return queryService.providers(request);
    },
    sKU(request: QuerySKURequest): Promise<QuerySKUResponse> {
      return queryService.sKU(request);
    },
    sKUs(request: QuerySKUsRequest): Promise<QuerySKUsResponse> {
      return queryService.sKUs(request);
    },
    sKUsByProvider(request: QuerySKUsByProviderRequest): Promise<QuerySKUsByProviderResponse> {
      return queryService.sKUsByProvider(request);
    },
    providerByAddress(request: QueryProviderByAddressRequest): Promise<QueryProviderByAddressResponse> {
      return queryService.providerByAddress(request);
    }
  };
};