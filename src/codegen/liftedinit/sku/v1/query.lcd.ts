import { setPaginationParams } from "../../../helpers";
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryProviderRequest, QueryProviderResponseSDKType, QueryProvidersRequest, QueryProvidersResponseSDKType, QuerySKURequest, QuerySKUResponseSDKType, QuerySKUsRequest, QuerySKUsResponseSDKType, QuerySKUsByProviderRequest, QuerySKUsByProviderResponseSDKType, QueryProviderByAddressRequest, QueryProviderByAddressResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
  }
  /* Params queries the module parameters. */
  params = async (_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> => {
    const endpoint = `liftedinit/sku/v1/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  };
  /* Provider queries a provider by uuid. */
  provider = async (params: QueryProviderRequest): Promise<QueryProviderResponseSDKType> => {
    const endpoint = `liftedinit/sku/v1/provider/${params.uuid}`;
    return await this.req.get<QueryProviderResponseSDKType>(endpoint);
  };
  /* Providers queries all providers. */
  providers = async (params: QueryProvidersRequest): Promise<QueryProvidersResponseSDKType> => {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.activeOnly !== "undefined") {
      options.params.active_only = params.activeOnly;
    }
    const endpoint = `liftedinit/sku/v1/providers`;
    return await this.req.get<QueryProvidersResponseSDKType>(endpoint, options);
  };
  /* SKU queries a SKU by uuid. */
  sKU = async (params: QuerySKURequest): Promise<QuerySKUResponseSDKType> => {
    const endpoint = `liftedinit/sku/v1/sku/${params.uuid}`;
    return await this.req.get<QuerySKUResponseSDKType>(endpoint);
  };
  /* SKUs queries all SKUs. */
  sKUs = async (params: QuerySKUsRequest): Promise<QuerySKUsResponseSDKType> => {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.activeOnly !== "undefined") {
      options.params.active_only = params.activeOnly;
    }
    const endpoint = `liftedinit/sku/v1/skus`;
    return await this.req.get<QuerySKUsResponseSDKType>(endpoint, options);
  };
  /* SKUsByProvider queries SKUs by provider uuid. */
  sKUsByProvider = async (params: QuerySKUsByProviderRequest): Promise<QuerySKUsByProviderResponseSDKType> => {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.activeOnly !== "undefined") {
      options.params.active_only = params.activeOnly;
    }
    const endpoint = `liftedinit/sku/v1/skus/provider/${params.providerUuid}`;
    return await this.req.get<QuerySKUsByProviderResponseSDKType>(endpoint, options);
  };
  /* ProviderByAddress queries a provider by management address. */
  providerByAddress = async (params: QueryProviderByAddressRequest): Promise<QueryProviderByAddressResponseSDKType> => {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.activeOnly !== "undefined") {
      options.params.active_only = params.activeOnly;
    }
    const endpoint = `liftedinit/sku/v1/provider/address/${params.address}`;
    return await this.req.get<QueryProviderByAddressResponseSDKType>(endpoint, options);
  };
}