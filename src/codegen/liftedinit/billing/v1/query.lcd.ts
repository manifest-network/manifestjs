import { setPaginationParams } from "../../../helpers";
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryLeaseRequest, QueryLeaseResponseSDKType, QueryLeasesRequest, QueryLeasesResponseSDKType, QueryLeasesByTenantRequest, QueryLeasesByTenantResponseSDKType, QueryLeasesByProviderRequest, QueryLeasesByProviderResponseSDKType, QueryCreditAccountRequest, QueryCreditAccountResponseSDKType, QueryCreditAddressRequest, QueryCreditAddressResponseSDKType, QueryWithdrawableAmountRequest, QueryWithdrawableAmountResponseSDKType, QueryProviderWithdrawableRequest, QueryProviderWithdrawableResponseSDKType, QueryCreditAccountsRequest, QueryCreditAccountsResponseSDKType, QueryLeasesBySKURequest, QueryLeasesBySKUResponseSDKType, QueryCreditEstimateRequest, QueryCreditEstimateResponseSDKType } from "./query";
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
    const endpoint = `liftedinit/billing/v1/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  };
  /* Lease queries a lease by UUID. */
  lease = async (params: QueryLeaseRequest): Promise<QueryLeaseResponseSDKType> => {
    const endpoint = `liftedinit/billing/v1/lease/${params.leaseUuid}`;
    return await this.req.get<QueryLeaseResponseSDKType>(endpoint);
  };
  /* Leases queries all leases with pagination. */
  leases = async (params: QueryLeasesRequest): Promise<QueryLeasesResponseSDKType> => {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.stateFilter !== "undefined") {
      options.params.state_filter = params.stateFilter;
    }
    const endpoint = `liftedinit/billing/v1/leases`;
    return await this.req.get<QueryLeasesResponseSDKType>(endpoint, options);
  };
  /* LeasesByTenant queries leases by tenant address. */
  leasesByTenant = async (params: QueryLeasesByTenantRequest): Promise<QueryLeasesByTenantResponseSDKType> => {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.stateFilter !== "undefined") {
      options.params.state_filter = params.stateFilter;
    }
    const endpoint = `liftedinit/billing/v1/leases/tenant/${params.tenant}`;
    return await this.req.get<QueryLeasesByTenantResponseSDKType>(endpoint, options);
  };
  /* LeasesByProvider queries leases by provider. */
  leasesByProvider = async (params: QueryLeasesByProviderRequest): Promise<QueryLeasesByProviderResponseSDKType> => {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.stateFilter !== "undefined") {
      options.params.state_filter = params.stateFilter;
    }
    const endpoint = `liftedinit/billing/v1/leases/provider/${params.providerUuid}`;
    return await this.req.get<QueryLeasesByProviderResponseSDKType>(endpoint, options);
  };
  /* CreditAccount queries a tenant's credit account. */
  creditAccount = async (params: QueryCreditAccountRequest): Promise<QueryCreditAccountResponseSDKType> => {
    const endpoint = `liftedinit/billing/v1/credit/${params.tenant}`;
    return await this.req.get<QueryCreditAccountResponseSDKType>(endpoint);
  };
  /* CreditAddress derives the credit address for a tenant. */
  creditAddress = async (params: QueryCreditAddressRequest): Promise<QueryCreditAddressResponseSDKType> => {
    const endpoint = `liftedinit/billing/v1/credit-address/${params.tenant}`;
    return await this.req.get<QueryCreditAddressResponseSDKType>(endpoint);
  };
  /* WithdrawableAmount queries the amount available for provider withdrawal from a lease. */
  withdrawableAmount = async (params: QueryWithdrawableAmountRequest): Promise<QueryWithdrawableAmountResponseSDKType> => {
    const endpoint = `liftedinit/billing/v1/lease/${params.leaseUuid}/withdrawable`;
    return await this.req.get<QueryWithdrawableAmountResponseSDKType>(endpoint);
  };
  /* ProviderWithdrawable queries the total amount available for a provider to withdraw across all leases. */
  providerWithdrawable = async (params: QueryProviderWithdrawableRequest): Promise<QueryProviderWithdrawableResponseSDKType> => {
    const options: any = {
      params: {}
    };
    if (typeof params?.limit !== "undefined") {
      options.params.limit = params.limit;
    }
    const endpoint = `liftedinit/billing/v1/provider/${params.providerUuid}/withdrawable`;
    return await this.req.get<QueryProviderWithdrawableResponseSDKType>(endpoint, options);
  };
  /* CreditAccounts queries all credit accounts with pagination. */
  creditAccounts = async (params: QueryCreditAccountsRequest = {
    pagination: undefined
  }): Promise<QueryCreditAccountsResponseSDKType> => {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `liftedinit/billing/v1/credits`;
    return await this.req.get<QueryCreditAccountsResponseSDKType>(endpoint, options);
  };
  /* LeasesBySKU queries leases by SKU UUID. */
  leasesBySKU = async (params: QueryLeasesBySKURequest): Promise<QueryLeasesBySKUResponseSDKType> => {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.stateFilter !== "undefined") {
      options.params.state_filter = params.stateFilter;
    }
    const endpoint = `liftedinit/billing/v1/leases/sku/${params.skuUuid}`;
    return await this.req.get<QueryLeasesBySKUResponseSDKType>(endpoint, options);
  };
  /* CreditEstimate estimates remaining lease duration for a tenant. */
  creditEstimate = async (params: QueryCreditEstimateRequest): Promise<QueryCreditEstimateResponseSDKType> => {
    const endpoint = `liftedinit/billing/v1/credit/${params.tenant}/estimate`;
    return await this.req.get<QueryCreditEstimateResponseSDKType>(endpoint);
  };
}