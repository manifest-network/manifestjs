import { TxRpc } from "../../../types";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryLeaseRequest, QueryLeaseResponse, QueryLeasesRequest, QueryLeasesResponse, QueryLeasesByTenantRequest, QueryLeasesByTenantResponse, QueryLeasesByProviderRequest, QueryLeasesByProviderResponse, QueryCreditAccountRequest, QueryCreditAccountResponse, QueryCreditAddressRequest, QueryCreditAddressResponse, QueryWithdrawableAmountRequest, QueryWithdrawableAmountResponse, QueryProviderWithdrawableRequest, QueryProviderWithdrawableResponse, QueryCreditAccountsRequest, QueryCreditAccountsResponse, QueryLeasesBySKURequest, QueryLeasesBySKUResponse, QueryCreditEstimateRequest, QueryCreditEstimateResponse } from "./query";
/** Query defines the gRPC querier service for the billing module. */
export interface Query {
  /** Params queries the module parameters. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Lease queries a lease by UUID. */
  lease(request: QueryLeaseRequest): Promise<QueryLeaseResponse>;
  /** Leases queries all leases with pagination. */
  leases(request: QueryLeasesRequest): Promise<QueryLeasesResponse>;
  /** LeasesByTenant queries leases by tenant address. */
  leasesByTenant(request: QueryLeasesByTenantRequest): Promise<QueryLeasesByTenantResponse>;
  /** LeasesByProvider queries leases by provider. */
  leasesByProvider(request: QueryLeasesByProviderRequest): Promise<QueryLeasesByProviderResponse>;
  /** CreditAccount queries a tenant's credit account. */
  creditAccount(request: QueryCreditAccountRequest): Promise<QueryCreditAccountResponse>;
  /** CreditAddress derives the credit address for a tenant. */
  creditAddress(request: QueryCreditAddressRequest): Promise<QueryCreditAddressResponse>;
  /** WithdrawableAmount queries the amount available for provider withdrawal from a lease. */
  withdrawableAmount(request: QueryWithdrawableAmountRequest): Promise<QueryWithdrawableAmountResponse>;
  /** ProviderWithdrawable queries the total amount available for a provider to withdraw across all leases. */
  providerWithdrawable(request: QueryProviderWithdrawableRequest): Promise<QueryProviderWithdrawableResponse>;
  /** CreditAccounts queries all credit accounts with pagination. */
  creditAccounts(request?: QueryCreditAccountsRequest): Promise<QueryCreditAccountsResponse>;
  /** LeasesBySKU queries leases by SKU UUID. */
  leasesBySKU(request: QueryLeasesBySKURequest): Promise<QueryLeasesBySKUResponse>;
  /** CreditEstimate estimates remaining lease duration for a tenant. */
  creditEstimate(request: QueryCreditEstimateRequest): Promise<QueryCreditEstimateResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* Params queries the module parameters. */
  params = async (request: QueryParamsRequest = {}): Promise<QueryParamsResponse> => {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.billing.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  };
  /* Lease queries a lease by UUID. */
  lease = async (request: QueryLeaseRequest): Promise<QueryLeaseResponse> => {
    const data = QueryLeaseRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.billing.v1.Query", "Lease", data);
    return promise.then(data => QueryLeaseResponse.decode(new BinaryReader(data)));
  };
  /* Leases queries all leases with pagination. */
  leases = async (request: QueryLeasesRequest): Promise<QueryLeasesResponse> => {
    const data = QueryLeasesRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.billing.v1.Query", "Leases", data);
    return promise.then(data => QueryLeasesResponse.decode(new BinaryReader(data)));
  };
  /* LeasesByTenant queries leases by tenant address. */
  leasesByTenant = async (request: QueryLeasesByTenantRequest): Promise<QueryLeasesByTenantResponse> => {
    const data = QueryLeasesByTenantRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.billing.v1.Query", "LeasesByTenant", data);
    return promise.then(data => QueryLeasesByTenantResponse.decode(new BinaryReader(data)));
  };
  /* LeasesByProvider queries leases by provider. */
  leasesByProvider = async (request: QueryLeasesByProviderRequest): Promise<QueryLeasesByProviderResponse> => {
    const data = QueryLeasesByProviderRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.billing.v1.Query", "LeasesByProvider", data);
    return promise.then(data => QueryLeasesByProviderResponse.decode(new BinaryReader(data)));
  };
  /* CreditAccount queries a tenant's credit account. */
  creditAccount = async (request: QueryCreditAccountRequest): Promise<QueryCreditAccountResponse> => {
    const data = QueryCreditAccountRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.billing.v1.Query", "CreditAccount", data);
    return promise.then(data => QueryCreditAccountResponse.decode(new BinaryReader(data)));
  };
  /* CreditAddress derives the credit address for a tenant. */
  creditAddress = async (request: QueryCreditAddressRequest): Promise<QueryCreditAddressResponse> => {
    const data = QueryCreditAddressRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.billing.v1.Query", "CreditAddress", data);
    return promise.then(data => QueryCreditAddressResponse.decode(new BinaryReader(data)));
  };
  /* WithdrawableAmount queries the amount available for provider withdrawal from a lease. */
  withdrawableAmount = async (request: QueryWithdrawableAmountRequest): Promise<QueryWithdrawableAmountResponse> => {
    const data = QueryWithdrawableAmountRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.billing.v1.Query", "WithdrawableAmount", data);
    return promise.then(data => QueryWithdrawableAmountResponse.decode(new BinaryReader(data)));
  };
  /* ProviderWithdrawable queries the total amount available for a provider to withdraw across all leases. */
  providerWithdrawable = async (request: QueryProviderWithdrawableRequest): Promise<QueryProviderWithdrawableResponse> => {
    const data = QueryProviderWithdrawableRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.billing.v1.Query", "ProviderWithdrawable", data);
    return promise.then(data => QueryProviderWithdrawableResponse.decode(new BinaryReader(data)));
  };
  /* CreditAccounts queries all credit accounts with pagination. */
  creditAccounts = async (request: QueryCreditAccountsRequest = {
    pagination: undefined
  }): Promise<QueryCreditAccountsResponse> => {
    const data = QueryCreditAccountsRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.billing.v1.Query", "CreditAccounts", data);
    return promise.then(data => QueryCreditAccountsResponse.decode(new BinaryReader(data)));
  };
  /* LeasesBySKU queries leases by SKU UUID. */
  leasesBySKU = async (request: QueryLeasesBySKURequest): Promise<QueryLeasesBySKUResponse> => {
    const data = QueryLeasesBySKURequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.billing.v1.Query", "LeasesBySKU", data);
    return promise.then(data => QueryLeasesBySKUResponse.decode(new BinaryReader(data)));
  };
  /* CreditEstimate estimates remaining lease duration for a tenant. */
  creditEstimate = async (request: QueryCreditEstimateRequest): Promise<QueryCreditEstimateResponse> => {
    const data = QueryCreditEstimateRequest.encode(request).finish();
    const promise = this.rpc.request("liftedinit.billing.v1.Query", "CreditEstimate", data);
    return promise.then(data => QueryCreditEstimateResponse.decode(new BinaryReader(data)));
  };
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    lease(request: QueryLeaseRequest): Promise<QueryLeaseResponse> {
      return queryService.lease(request);
    },
    leases(request: QueryLeasesRequest): Promise<QueryLeasesResponse> {
      return queryService.leases(request);
    },
    leasesByTenant(request: QueryLeasesByTenantRequest): Promise<QueryLeasesByTenantResponse> {
      return queryService.leasesByTenant(request);
    },
    leasesByProvider(request: QueryLeasesByProviderRequest): Promise<QueryLeasesByProviderResponse> {
      return queryService.leasesByProvider(request);
    },
    creditAccount(request: QueryCreditAccountRequest): Promise<QueryCreditAccountResponse> {
      return queryService.creditAccount(request);
    },
    creditAddress(request: QueryCreditAddressRequest): Promise<QueryCreditAddressResponse> {
      return queryService.creditAddress(request);
    },
    withdrawableAmount(request: QueryWithdrawableAmountRequest): Promise<QueryWithdrawableAmountResponse> {
      return queryService.withdrawableAmount(request);
    },
    providerWithdrawable(request: QueryProviderWithdrawableRequest): Promise<QueryProviderWithdrawableResponse> {
      return queryService.providerWithdrawable(request);
    },
    creditAccounts(request?: QueryCreditAccountsRequest): Promise<QueryCreditAccountsResponse> {
      return queryService.creditAccounts(request);
    },
    leasesBySKU(request: QueryLeasesBySKURequest): Promise<QueryLeasesBySKUResponse> {
      return queryService.leasesBySKU(request);
    },
    creditEstimate(request: QueryCreditEstimateRequest): Promise<QueryCreditEstimateResponse> {
      return queryService.creditEstimate(request);
    }
  };
};