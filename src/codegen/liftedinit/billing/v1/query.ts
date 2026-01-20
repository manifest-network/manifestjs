import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { LeaseState, Params, ParamsAmino, ParamsSDKType, Lease, LeaseAmino, LeaseSDKType, CreditAccount, CreditAccountAmino, CreditAccountSDKType, leaseStateFromJSON, leaseStateToJSON } from "./types";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { JsonSafe } from "../../../json-safe";
import { DeepPartial, Exact, isSet } from "../../../helpers";
import { GlobalDecoderRegistry } from "../../../registry";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/liftedinit.billing.v1.QueryParamsRequest";
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
  typeUrl: "/liftedinit.billing.v1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params defines the module parameters. */
  params: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/liftedinit.billing.v1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
/** QueryLeaseRequest is the request type for the Query/Lease RPC method. */
export interface QueryLeaseRequest {
  /** lease_uuid is the UUID of the lease to query. */
  leaseUuid: string;
}
export interface QueryLeaseRequestProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryLeaseRequest";
  value: Uint8Array;
}
/** QueryLeaseRequest is the request type for the Query/Lease RPC method. */
export interface QueryLeaseRequestAmino {
  /** lease_uuid is the UUID of the lease to query. */
  lease_uuid?: string;
}
export interface QueryLeaseRequestAminoMsg {
  type: "/liftedinit.billing.v1.QueryLeaseRequest";
  value: QueryLeaseRequestAmino;
}
/** QueryLeaseRequest is the request type for the Query/Lease RPC method. */
export interface QueryLeaseRequestSDKType {
  lease_uuid: string;
}
/** QueryLeaseResponse is the response type for the Query/Lease RPC method. */
export interface QueryLeaseResponse {
  /** lease is the queried lease. */
  lease: Lease;
}
export interface QueryLeaseResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryLeaseResponse";
  value: Uint8Array;
}
/** QueryLeaseResponse is the response type for the Query/Lease RPC method. */
export interface QueryLeaseResponseAmino {
  /** lease is the queried lease. */
  lease: LeaseAmino;
}
export interface QueryLeaseResponseAminoMsg {
  type: "/liftedinit.billing.v1.QueryLeaseResponse";
  value: QueryLeaseResponseAmino;
}
/** QueryLeaseResponse is the response type for the Query/Lease RPC method. */
export interface QueryLeaseResponseSDKType {
  lease: LeaseSDKType;
}
/** QueryLeasesRequest is the request type for the Query/Leases RPC method. */
export interface QueryLeasesRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** state_filter filters leases by state. If UNSPECIFIED, returns all leases. */
  stateFilter: LeaseState;
}
export interface QueryLeasesRequestProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesRequest";
  value: Uint8Array;
}
/** QueryLeasesRequest is the request type for the Query/Leases RPC method. */
export interface QueryLeasesRequestAmino {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
  /** state_filter filters leases by state. If UNSPECIFIED, returns all leases. */
  state_filter?: LeaseState;
}
export interface QueryLeasesRequestAminoMsg {
  type: "/liftedinit.billing.v1.QueryLeasesRequest";
  value: QueryLeasesRequestAmino;
}
/** QueryLeasesRequest is the request type for the Query/Leases RPC method. */
export interface QueryLeasesRequestSDKType {
  pagination?: PageRequestSDKType;
  state_filter: LeaseState;
}
/** QueryLeasesResponse is the response type for the Query/Leases RPC method. */
export interface QueryLeasesResponse {
  /** leases is the list of leases. */
  leases: Lease[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface QueryLeasesResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesResponse";
  value: Uint8Array;
}
/** QueryLeasesResponse is the response type for the Query/Leases RPC method. */
export interface QueryLeasesResponseAmino {
  /** leases is the list of leases. */
  leases: LeaseAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
export interface QueryLeasesResponseAminoMsg {
  type: "/liftedinit.billing.v1.QueryLeasesResponse";
  value: QueryLeasesResponseAmino;
}
/** QueryLeasesResponse is the response type for the Query/Leases RPC method. */
export interface QueryLeasesResponseSDKType {
  leases: LeaseSDKType[];
  pagination?: PageResponseSDKType;
}
/**
 * QueryLeasesByTenantRequest is the request type for the Query/LeasesByTenant
 * RPC method.
 */
export interface QueryLeasesByTenantRequest {
  /** tenant is the address of the tenant. */
  tenant: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** state_filter filters leases by state. If UNSPECIFIED, returns all leases. */
  stateFilter: LeaseState;
}
export interface QueryLeasesByTenantRequestProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesByTenantRequest";
  value: Uint8Array;
}
/**
 * QueryLeasesByTenantRequest is the request type for the Query/LeasesByTenant
 * RPC method.
 */
export interface QueryLeasesByTenantRequestAmino {
  /** tenant is the address of the tenant. */
  tenant?: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
  /** state_filter filters leases by state. If UNSPECIFIED, returns all leases. */
  state_filter?: LeaseState;
}
export interface QueryLeasesByTenantRequestAminoMsg {
  type: "/liftedinit.billing.v1.QueryLeasesByTenantRequest";
  value: QueryLeasesByTenantRequestAmino;
}
/**
 * QueryLeasesByTenantRequest is the request type for the Query/LeasesByTenant
 * RPC method.
 */
export interface QueryLeasesByTenantRequestSDKType {
  tenant: string;
  pagination?: PageRequestSDKType;
  state_filter: LeaseState;
}
/**
 * QueryLeasesByTenantResponse is the response type for the Query/LeasesByTenant
 * RPC method.
 */
export interface QueryLeasesByTenantResponse {
  /** leases is the list of leases for the tenant. */
  leases: Lease[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface QueryLeasesByTenantResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesByTenantResponse";
  value: Uint8Array;
}
/**
 * QueryLeasesByTenantResponse is the response type for the Query/LeasesByTenant
 * RPC method.
 */
export interface QueryLeasesByTenantResponseAmino {
  /** leases is the list of leases for the tenant. */
  leases: LeaseAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
export interface QueryLeasesByTenantResponseAminoMsg {
  type: "/liftedinit.billing.v1.QueryLeasesByTenantResponse";
  value: QueryLeasesByTenantResponseAmino;
}
/**
 * QueryLeasesByTenantResponse is the response type for the Query/LeasesByTenant
 * RPC method.
 */
export interface QueryLeasesByTenantResponseSDKType {
  leases: LeaseSDKType[];
  pagination?: PageResponseSDKType;
}
/**
 * QueryLeasesByProviderRequest is the request type for the
 * Query/LeasesByProvider RPC method.
 */
export interface QueryLeasesByProviderRequest {
  /** provider_uuid is the provider UUID. */
  providerUuid: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** state_filter filters leases by state. If UNSPECIFIED, returns all leases. */
  stateFilter: LeaseState;
}
export interface QueryLeasesByProviderRequestProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesByProviderRequest";
  value: Uint8Array;
}
/**
 * QueryLeasesByProviderRequest is the request type for the
 * Query/LeasesByProvider RPC method.
 */
export interface QueryLeasesByProviderRequestAmino {
  /** provider_uuid is the provider UUID. */
  provider_uuid?: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
  /** state_filter filters leases by state. If UNSPECIFIED, returns all leases. */
  state_filter?: LeaseState;
}
export interface QueryLeasesByProviderRequestAminoMsg {
  type: "/liftedinit.billing.v1.QueryLeasesByProviderRequest";
  value: QueryLeasesByProviderRequestAmino;
}
/**
 * QueryLeasesByProviderRequest is the request type for the
 * Query/LeasesByProvider RPC method.
 */
export interface QueryLeasesByProviderRequestSDKType {
  provider_uuid: string;
  pagination?: PageRequestSDKType;
  state_filter: LeaseState;
}
/**
 * QueryLeasesByProviderResponse is the response type for the
 * Query/LeasesByProvider RPC method.
 */
export interface QueryLeasesByProviderResponse {
  /** leases is the list of leases for the provider. */
  leases: Lease[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface QueryLeasesByProviderResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesByProviderResponse";
  value: Uint8Array;
}
/**
 * QueryLeasesByProviderResponse is the response type for the
 * Query/LeasesByProvider RPC method.
 */
export interface QueryLeasesByProviderResponseAmino {
  /** leases is the list of leases for the provider. */
  leases: LeaseAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
export interface QueryLeasesByProviderResponseAminoMsg {
  type: "/liftedinit.billing.v1.QueryLeasesByProviderResponse";
  value: QueryLeasesByProviderResponseAmino;
}
/**
 * QueryLeasesByProviderResponse is the response type for the
 * Query/LeasesByProvider RPC method.
 */
export interface QueryLeasesByProviderResponseSDKType {
  leases: LeaseSDKType[];
  pagination?: PageResponseSDKType;
}
/**
 * QueryCreditAccountRequest is the request type for the Query/CreditAccount RPC
 * method.
 */
export interface QueryCreditAccountRequest {
  /** tenant is the address of the tenant. */
  tenant: string;
}
export interface QueryCreditAccountRequestProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryCreditAccountRequest";
  value: Uint8Array;
}
/**
 * QueryCreditAccountRequest is the request type for the Query/CreditAccount RPC
 * method.
 */
export interface QueryCreditAccountRequestAmino {
  /** tenant is the address of the tenant. */
  tenant?: string;
}
export interface QueryCreditAccountRequestAminoMsg {
  type: "/liftedinit.billing.v1.QueryCreditAccountRequest";
  value: QueryCreditAccountRequestAmino;
}
/**
 * QueryCreditAccountRequest is the request type for the Query/CreditAccount RPC
 * method.
 */
export interface QueryCreditAccountRequestSDKType {
  tenant: string;
}
/**
 * QueryCreditAccountResponse is the response type for the Query/CreditAccount
 * RPC method.
 */
export interface QueryCreditAccountResponse {
  /** credit_account is the tenant's credit account. */
  creditAccount: CreditAccount;
  /** balances is the current balances at the credit address (fetched from bank module). */
  balances: Coin[];
}
export interface QueryCreditAccountResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryCreditAccountResponse";
  value: Uint8Array;
}
/**
 * QueryCreditAccountResponse is the response type for the Query/CreditAccount
 * RPC method.
 */
export interface QueryCreditAccountResponseAmino {
  /** credit_account is the tenant's credit account. */
  credit_account: CreditAccountAmino;
  /** balances is the current balances at the credit address (fetched from bank module). */
  balances: CoinAmino[];
}
export interface QueryCreditAccountResponseAminoMsg {
  type: "/liftedinit.billing.v1.QueryCreditAccountResponse";
  value: QueryCreditAccountResponseAmino;
}
/**
 * QueryCreditAccountResponse is the response type for the Query/CreditAccount
 * RPC method.
 */
export interface QueryCreditAccountResponseSDKType {
  credit_account: CreditAccountSDKType;
  balances: CoinSDKType[];
}
/**
 * QueryCreditAddressRequest is the request type for the Query/CreditAddress RPC
 * method.
 */
export interface QueryCreditAddressRequest {
  /** tenant is the address of the tenant. */
  tenant: string;
}
export interface QueryCreditAddressRequestProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryCreditAddressRequest";
  value: Uint8Array;
}
/**
 * QueryCreditAddressRequest is the request type for the Query/CreditAddress RPC
 * method.
 */
export interface QueryCreditAddressRequestAmino {
  /** tenant is the address of the tenant. */
  tenant?: string;
}
export interface QueryCreditAddressRequestAminoMsg {
  type: "/liftedinit.billing.v1.QueryCreditAddressRequest";
  value: QueryCreditAddressRequestAmino;
}
/**
 * QueryCreditAddressRequest is the request type for the Query/CreditAddress RPC
 * method.
 */
export interface QueryCreditAddressRequestSDKType {
  tenant: string;
}
/**
 * QueryCreditAddressResponse is the response type for the Query/CreditAddress
 * RPC method.
 */
export interface QueryCreditAddressResponse {
  /** credit_address is the derived credit account address. */
  creditAddress: string;
}
export interface QueryCreditAddressResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryCreditAddressResponse";
  value: Uint8Array;
}
/**
 * QueryCreditAddressResponse is the response type for the Query/CreditAddress
 * RPC method.
 */
export interface QueryCreditAddressResponseAmino {
  /** credit_address is the derived credit account address. */
  credit_address?: string;
}
export interface QueryCreditAddressResponseAminoMsg {
  type: "/liftedinit.billing.v1.QueryCreditAddressResponse";
  value: QueryCreditAddressResponseAmino;
}
/**
 * QueryCreditAddressResponse is the response type for the Query/CreditAddress
 * RPC method.
 */
export interface QueryCreditAddressResponseSDKType {
  credit_address: string;
}
/**
 * QueryWithdrawableAmountRequest is the request type for the
 * Query/WithdrawableAmount RPC method.
 */
export interface QueryWithdrawableAmountRequest {
  /** lease_uuid is the UUID of the lease. */
  leaseUuid: string;
}
export interface QueryWithdrawableAmountRequestProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryWithdrawableAmountRequest";
  value: Uint8Array;
}
/**
 * QueryWithdrawableAmountRequest is the request type for the
 * Query/WithdrawableAmount RPC method.
 */
export interface QueryWithdrawableAmountRequestAmino {
  /** lease_uuid is the UUID of the lease. */
  lease_uuid?: string;
}
export interface QueryWithdrawableAmountRequestAminoMsg {
  type: "/liftedinit.billing.v1.QueryWithdrawableAmountRequest";
  value: QueryWithdrawableAmountRequestAmino;
}
/**
 * QueryWithdrawableAmountRequest is the request type for the
 * Query/WithdrawableAmount RPC method.
 */
export interface QueryWithdrawableAmountRequestSDKType {
  lease_uuid: string;
}
/**
 * QueryWithdrawableAmountResponse is the response type for the
 * Query/WithdrawableAmount RPC method.
 */
export interface QueryWithdrawableAmountResponse {
  /** amounts is the amounts available for withdrawal (one per denom). */
  amounts: Coin[];
}
export interface QueryWithdrawableAmountResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryWithdrawableAmountResponse";
  value: Uint8Array;
}
/**
 * QueryWithdrawableAmountResponse is the response type for the
 * Query/WithdrawableAmount RPC method.
 */
export interface QueryWithdrawableAmountResponseAmino {
  /** amounts is the amounts available for withdrawal (one per denom). */
  amounts: CoinAmino[];
}
export interface QueryWithdrawableAmountResponseAminoMsg {
  type: "/liftedinit.billing.v1.QueryWithdrawableAmountResponse";
  value: QueryWithdrawableAmountResponseAmino;
}
/**
 * QueryWithdrawableAmountResponse is the response type for the
 * Query/WithdrawableAmount RPC method.
 */
export interface QueryWithdrawableAmountResponseSDKType {
  amounts: CoinSDKType[];
}
/**
 * QueryProviderWithdrawableRequest is the request type for the
 * Query/ProviderWithdrawable RPC method.
 */
export interface QueryProviderWithdrawableRequest {
  /** provider_uuid is the UUID of the provider. */
  providerUuid: string;
  /**
   * limit is the maximum number of leases to process (default: 100, max: 1000).
   * Use this to prevent query timeouts for providers with many leases.
   */
  limit: bigint;
}
export interface QueryProviderWithdrawableRequestProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryProviderWithdrawableRequest";
  value: Uint8Array;
}
/**
 * QueryProviderWithdrawableRequest is the request type for the
 * Query/ProviderWithdrawable RPC method.
 */
export interface QueryProviderWithdrawableRequestAmino {
  /** provider_uuid is the UUID of the provider. */
  provider_uuid?: string;
  /**
   * limit is the maximum number of leases to process (default: 100, max: 1000).
   * Use this to prevent query timeouts for providers with many leases.
   */
  limit?: string;
}
export interface QueryProviderWithdrawableRequestAminoMsg {
  type: "/liftedinit.billing.v1.QueryProviderWithdrawableRequest";
  value: QueryProviderWithdrawableRequestAmino;
}
/**
 * QueryProviderWithdrawableRequest is the request type for the
 * Query/ProviderWithdrawable RPC method.
 */
export interface QueryProviderWithdrawableRequestSDKType {
  provider_uuid: string;
  limit: bigint;
}
/**
 * QueryProviderWithdrawableResponse is the response type for the
 * Query/ProviderWithdrawable RPC method.
 */
export interface QueryProviderWithdrawableResponse {
  /** amounts is the total amounts available for withdrawal across all leases (one per denom). */
  amounts: Coin[];
  /** lease_count is the number of leases included in the withdrawable amount. */
  leaseCount: bigint;
  /**
   * has_more indicates whether there are more leases beyond the limit.
   * If true, the amounts represent a partial total and there are more leases to query.
   */
  hasMore: boolean;
}
export interface QueryProviderWithdrawableResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryProviderWithdrawableResponse";
  value: Uint8Array;
}
/**
 * QueryProviderWithdrawableResponse is the response type for the
 * Query/ProviderWithdrawable RPC method.
 */
export interface QueryProviderWithdrawableResponseAmino {
  /** amounts is the total amounts available for withdrawal across all leases (one per denom). */
  amounts: CoinAmino[];
  /** lease_count is the number of leases included in the withdrawable amount. */
  lease_count?: string;
  /**
   * has_more indicates whether there are more leases beyond the limit.
   * If true, the amounts represent a partial total and there are more leases to query.
   */
  has_more?: boolean;
}
export interface QueryProviderWithdrawableResponseAminoMsg {
  type: "/liftedinit.billing.v1.QueryProviderWithdrawableResponse";
  value: QueryProviderWithdrawableResponseAmino;
}
/**
 * QueryProviderWithdrawableResponse is the response type for the
 * Query/ProviderWithdrawable RPC method.
 */
export interface QueryProviderWithdrawableResponseSDKType {
  amounts: CoinSDKType[];
  lease_count: bigint;
  has_more: boolean;
}
/**
 * QueryCreditAccountsRequest is the request type for the Query/CreditAccounts
 * RPC method.
 */
export interface QueryCreditAccountsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
export interface QueryCreditAccountsRequestProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryCreditAccountsRequest";
  value: Uint8Array;
}
/**
 * QueryCreditAccountsRequest is the request type for the Query/CreditAccounts
 * RPC method.
 */
export interface QueryCreditAccountsRequestAmino {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
}
export interface QueryCreditAccountsRequestAminoMsg {
  type: "/liftedinit.billing.v1.QueryCreditAccountsRequest";
  value: QueryCreditAccountsRequestAmino;
}
/**
 * QueryCreditAccountsRequest is the request type for the Query/CreditAccounts
 * RPC method.
 */
export interface QueryCreditAccountsRequestSDKType {
  pagination?: PageRequestSDKType;
}
/**
 * QueryCreditAccountsResponse is the response type for the Query/CreditAccounts
 * RPC method.
 */
export interface QueryCreditAccountsResponse {
  /** credit_accounts is the list of credit accounts. */
  creditAccounts: CreditAccount[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface QueryCreditAccountsResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryCreditAccountsResponse";
  value: Uint8Array;
}
/**
 * QueryCreditAccountsResponse is the response type for the Query/CreditAccounts
 * RPC method.
 */
export interface QueryCreditAccountsResponseAmino {
  /** credit_accounts is the list of credit accounts. */
  credit_accounts: CreditAccountAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
export interface QueryCreditAccountsResponseAminoMsg {
  type: "/liftedinit.billing.v1.QueryCreditAccountsResponse";
  value: QueryCreditAccountsResponseAmino;
}
/**
 * QueryCreditAccountsResponse is the response type for the Query/CreditAccounts
 * RPC method.
 */
export interface QueryCreditAccountsResponseSDKType {
  credit_accounts: CreditAccountSDKType[];
  pagination?: PageResponseSDKType;
}
/**
 * QueryLeasesBySKURequest is the request type for the Query/LeasesBySKU
 * RPC method.
 */
export interface QueryLeasesBySKURequest {
  /** sku_uuid is the UUID of the SKU. */
  skuUuid: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** state_filter filters leases by state. If UNSPECIFIED, returns all leases. */
  stateFilter: LeaseState;
}
export interface QueryLeasesBySKURequestProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesBySKURequest";
  value: Uint8Array;
}
/**
 * QueryLeasesBySKURequest is the request type for the Query/LeasesBySKU
 * RPC method.
 */
export interface QueryLeasesBySKURequestAmino {
  /** sku_uuid is the UUID of the SKU. */
  sku_uuid?: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
  /** state_filter filters leases by state. If UNSPECIFIED, returns all leases. */
  state_filter?: LeaseState;
}
export interface QueryLeasesBySKURequestAminoMsg {
  type: "/liftedinit.billing.v1.QueryLeasesBySKURequest";
  value: QueryLeasesBySKURequestAmino;
}
/**
 * QueryLeasesBySKURequest is the request type for the Query/LeasesBySKU
 * RPC method.
 */
export interface QueryLeasesBySKURequestSDKType {
  sku_uuid: string;
  pagination?: PageRequestSDKType;
  state_filter: LeaseState;
}
/**
 * QueryLeasesBySKUResponse is the response type for the Query/LeasesBySKU
 * RPC method.
 */
export interface QueryLeasesBySKUResponse {
  /** leases is the list of leases containing the SKU. */
  leases: Lease[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface QueryLeasesBySKUResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesBySKUResponse";
  value: Uint8Array;
}
/**
 * QueryLeasesBySKUResponse is the response type for the Query/LeasesBySKU
 * RPC method.
 */
export interface QueryLeasesBySKUResponseAmino {
  /** leases is the list of leases containing the SKU. */
  leases: LeaseAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
export interface QueryLeasesBySKUResponseAminoMsg {
  type: "/liftedinit.billing.v1.QueryLeasesBySKUResponse";
  value: QueryLeasesBySKUResponseAmino;
}
/**
 * QueryLeasesBySKUResponse is the response type for the Query/LeasesBySKU
 * RPC method.
 */
export interface QueryLeasesBySKUResponseSDKType {
  leases: LeaseSDKType[];
  pagination?: PageResponseSDKType;
}
/**
 * QueryCreditEstimateRequest is the request type for the Query/CreditEstimate
 * RPC method.
 */
export interface QueryCreditEstimateRequest {
  /** tenant is the address of the tenant. */
  tenant: string;
}
export interface QueryCreditEstimateRequestProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryCreditEstimateRequest";
  value: Uint8Array;
}
/**
 * QueryCreditEstimateRequest is the request type for the Query/CreditEstimate
 * RPC method.
 */
export interface QueryCreditEstimateRequestAmino {
  /** tenant is the address of the tenant. */
  tenant?: string;
}
export interface QueryCreditEstimateRequestAminoMsg {
  type: "/liftedinit.billing.v1.QueryCreditEstimateRequest";
  value: QueryCreditEstimateRequestAmino;
}
/**
 * QueryCreditEstimateRequest is the request type for the Query/CreditEstimate
 * RPC method.
 */
export interface QueryCreditEstimateRequestSDKType {
  tenant: string;
}
/**
 * QueryCreditEstimateResponse is the response type for the Query/CreditEstimate
 * RPC method.
 */
export interface QueryCreditEstimateResponse {
  /** current_balance is the tenant's current credit balance. */
  currentBalance: Coin[];
  /** total_rate_per_second is the combined rate of all active leases (per denom). */
  totalRatePerSecond: Coin[];
  /**
   * estimated_duration_seconds is the estimated time until credit exhaustion.
   * Calculated as min(balance[denom] / rate[denom]) across all denoms.
   * Returns 0 if no active leases or no matching denoms.
   */
  estimatedDurationSeconds: bigint;
  /** active_lease_count is the number of active leases for this tenant. */
  activeLeaseCount: bigint;
}
export interface QueryCreditEstimateResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.QueryCreditEstimateResponse";
  value: Uint8Array;
}
/**
 * QueryCreditEstimateResponse is the response type for the Query/CreditEstimate
 * RPC method.
 */
export interface QueryCreditEstimateResponseAmino {
  /** current_balance is the tenant's current credit balance. */
  current_balance: CoinAmino[];
  /** total_rate_per_second is the combined rate of all active leases (per denom). */
  total_rate_per_second: CoinAmino[];
  /**
   * estimated_duration_seconds is the estimated time until credit exhaustion.
   * Calculated as min(balance[denom] / rate[denom]) across all denoms.
   * Returns 0 if no active leases or no matching denoms.
   */
  estimated_duration_seconds?: string;
  /** active_lease_count is the number of active leases for this tenant. */
  active_lease_count?: string;
}
export interface QueryCreditEstimateResponseAminoMsg {
  type: "/liftedinit.billing.v1.QueryCreditEstimateResponse";
  value: QueryCreditEstimateResponseAmino;
}
/**
 * QueryCreditEstimateResponse is the response type for the Query/CreditEstimate
 * RPC method.
 */
export interface QueryCreditEstimateResponseSDKType {
  current_balance: CoinSDKType[];
  total_rate_per_second: CoinSDKType[];
  estimated_duration_seconds: bigint;
  active_lease_count: bigint;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/liftedinit.billing.v1.QueryParamsRequest",
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
      typeUrl: "/liftedinit.billing.v1.QueryParamsRequest",
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
  typeUrl: "/liftedinit.billing.v1.QueryParamsResponse",
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
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
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
      typeUrl: "/liftedinit.billing.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryParamsResponse.typeUrl, QueryParamsResponse);
function createBaseQueryLeaseRequest(): QueryLeaseRequest {
  return {
    leaseUuid: ""
  };
}
export const QueryLeaseRequest = {
  typeUrl: "/liftedinit.billing.v1.QueryLeaseRequest",
  is(o: any): o is QueryLeaseRequest {
    return o && (o.$typeUrl === QueryLeaseRequest.typeUrl || typeof o.leaseUuid === "string");
  },
  isSDK(o: any): o is QueryLeaseRequestSDKType {
    return o && (o.$typeUrl === QueryLeaseRequest.typeUrl || typeof o.lease_uuid === "string");
  },
  isAmino(o: any): o is QueryLeaseRequestAmino {
    return o && (o.$typeUrl === QueryLeaseRequest.typeUrl || typeof o.lease_uuid === "string");
  },
  encode(message: QueryLeaseRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.leaseUuid !== "") {
      writer.uint32(10).string(message.leaseUuid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLeaseRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLeaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leaseUuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLeaseRequest {
    return {
      leaseUuid: isSet(object.leaseUuid) ? String(object.leaseUuid) : ""
    };
  },
  toJSON(message: QueryLeaseRequest): JsonSafe<QueryLeaseRequest> {
    const obj: any = {};
    message.leaseUuid !== undefined && (obj.leaseUuid = message.leaseUuid);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLeaseRequest>, I>>(object: I): QueryLeaseRequest {
    const message = createBaseQueryLeaseRequest();
    message.leaseUuid = object.leaseUuid ?? "";
    return message;
  },
  fromAmino(object: QueryLeaseRequestAmino): QueryLeaseRequest {
    const message = createBaseQueryLeaseRequest();
    if (object.lease_uuid !== undefined && object.lease_uuid !== null) {
      message.leaseUuid = object.lease_uuid;
    }
    return message;
  },
  toAmino(message: QueryLeaseRequest): QueryLeaseRequestAmino {
    const obj: any = {};
    obj.lease_uuid = message.leaseUuid === "" ? undefined : message.leaseUuid;
    return obj;
  },
  fromAminoMsg(object: QueryLeaseRequestAminoMsg): QueryLeaseRequest {
    return QueryLeaseRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLeaseRequestProtoMsg): QueryLeaseRequest {
    return QueryLeaseRequest.decode(message.value);
  },
  toProto(message: QueryLeaseRequest): Uint8Array {
    return QueryLeaseRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLeaseRequest): QueryLeaseRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryLeaseRequest",
      value: QueryLeaseRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryLeaseRequest.typeUrl, QueryLeaseRequest);
function createBaseQueryLeaseResponse(): QueryLeaseResponse {
  return {
    lease: Lease.fromPartial({})
  };
}
export const QueryLeaseResponse = {
  typeUrl: "/liftedinit.billing.v1.QueryLeaseResponse",
  is(o: any): o is QueryLeaseResponse {
    return o && (o.$typeUrl === QueryLeaseResponse.typeUrl || Lease.is(o.lease));
  },
  isSDK(o: any): o is QueryLeaseResponseSDKType {
    return o && (o.$typeUrl === QueryLeaseResponse.typeUrl || Lease.isSDK(o.lease));
  },
  isAmino(o: any): o is QueryLeaseResponseAmino {
    return o && (o.$typeUrl === QueryLeaseResponse.typeUrl || Lease.isAmino(o.lease));
  },
  encode(message: QueryLeaseResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLeaseResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLeaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLeaseResponse {
    return {
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined
    };
  },
  toJSON(message: QueryLeaseResponse): JsonSafe<QueryLeaseResponse> {
    const obj: any = {};
    message.lease !== undefined && (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLeaseResponse>, I>>(object: I): QueryLeaseResponse {
    const message = createBaseQueryLeaseResponse();
    message.lease = object.lease !== undefined && object.lease !== null ? Lease.fromPartial(object.lease) : undefined;
    return message;
  },
  fromAmino(object: QueryLeaseResponseAmino): QueryLeaseResponse {
    const message = createBaseQueryLeaseResponse();
    if (object.lease !== undefined && object.lease !== null) {
      message.lease = Lease.fromAmino(object.lease);
    }
    return message;
  },
  toAmino(message: QueryLeaseResponse): QueryLeaseResponseAmino {
    const obj: any = {};
    obj.lease = message.lease ? Lease.toAmino(message.lease) : Lease.toAmino(Lease.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: QueryLeaseResponseAminoMsg): QueryLeaseResponse {
    return QueryLeaseResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLeaseResponseProtoMsg): QueryLeaseResponse {
    return QueryLeaseResponse.decode(message.value);
  },
  toProto(message: QueryLeaseResponse): Uint8Array {
    return QueryLeaseResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLeaseResponse): QueryLeaseResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryLeaseResponse",
      value: QueryLeaseResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryLeaseResponse.typeUrl, QueryLeaseResponse);
function createBaseQueryLeasesRequest(): QueryLeasesRequest {
  return {
    pagination: undefined,
    stateFilter: 0
  };
}
export const QueryLeasesRequest = {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesRequest",
  is(o: any): o is QueryLeasesRequest {
    return o && (o.$typeUrl === QueryLeasesRequest.typeUrl || isSet(o.stateFilter));
  },
  isSDK(o: any): o is QueryLeasesRequestSDKType {
    return o && (o.$typeUrl === QueryLeasesRequest.typeUrl || isSet(o.state_filter));
  },
  isAmino(o: any): o is QueryLeasesRequestAmino {
    return o && (o.$typeUrl === QueryLeasesRequest.typeUrl || isSet(o.state_filter));
  },
  encode(message: QueryLeasesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.stateFilter !== 0) {
      writer.uint32(16).int32(message.stateFilter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLeasesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLeasesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.stateFilter = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLeasesRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      stateFilter: isSet(object.stateFilter) ? leaseStateFromJSON(object.stateFilter) : -1
    };
  },
  toJSON(message: QueryLeasesRequest): JsonSafe<QueryLeasesRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.stateFilter !== undefined && (obj.stateFilter = leaseStateToJSON(message.stateFilter));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLeasesRequest>, I>>(object: I): QueryLeasesRequest {
    const message = createBaseQueryLeasesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.stateFilter = object.stateFilter ?? 0;
    return message;
  },
  fromAmino(object: QueryLeasesRequestAmino): QueryLeasesRequest {
    const message = createBaseQueryLeasesRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.state_filter !== undefined && object.state_filter !== null) {
      message.stateFilter = object.state_filter;
    }
    return message;
  },
  toAmino(message: QueryLeasesRequest): QueryLeasesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.state_filter = message.stateFilter === 0 ? undefined : message.stateFilter;
    return obj;
  },
  fromAminoMsg(object: QueryLeasesRequestAminoMsg): QueryLeasesRequest {
    return QueryLeasesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLeasesRequestProtoMsg): QueryLeasesRequest {
    return QueryLeasesRequest.decode(message.value);
  },
  toProto(message: QueryLeasesRequest): Uint8Array {
    return QueryLeasesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLeasesRequest): QueryLeasesRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryLeasesRequest",
      value: QueryLeasesRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryLeasesRequest.typeUrl, QueryLeasesRequest);
function createBaseQueryLeasesResponse(): QueryLeasesResponse {
  return {
    leases: [],
    pagination: undefined
  };
}
export const QueryLeasesResponse = {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesResponse",
  is(o: any): o is QueryLeasesResponse {
    return o && (o.$typeUrl === QueryLeasesResponse.typeUrl || Array.isArray(o.leases) && (!o.leases.length || Lease.is(o.leases[0])));
  },
  isSDK(o: any): o is QueryLeasesResponseSDKType {
    return o && (o.$typeUrl === QueryLeasesResponse.typeUrl || Array.isArray(o.leases) && (!o.leases.length || Lease.isSDK(o.leases[0])));
  },
  isAmino(o: any): o is QueryLeasesResponseAmino {
    return o && (o.$typeUrl === QueryLeasesResponse.typeUrl || Array.isArray(o.leases) && (!o.leases.length || Lease.isAmino(o.leases[0])));
  },
  encode(message: QueryLeasesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLeasesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLeasesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leases.push(Lease.decode(reader, reader.uint32()));
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
  fromJSON(object: any): QueryLeasesResponse {
    return {
      leases: Array.isArray(object?.leases) ? object.leases.map((e: any) => Lease.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryLeasesResponse): JsonSafe<QueryLeasesResponse> {
    const obj: any = {};
    if (message.leases) {
      obj.leases = message.leases.map(e => e ? Lease.toJSON(e) : undefined);
    } else {
      obj.leases = [];
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLeasesResponse>, I>>(object: I): QueryLeasesResponse {
    const message = createBaseQueryLeasesResponse();
    message.leases = object.leases?.map(e => Lease.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryLeasesResponseAmino): QueryLeasesResponse {
    const message = createBaseQueryLeasesResponse();
    message.leases = object.leases?.map(e => Lease.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryLeasesResponse): QueryLeasesResponseAmino {
    const obj: any = {};
    if (message.leases) {
      obj.leases = message.leases.map(e => e ? Lease.toAmino(e) : undefined);
    } else {
      obj.leases = message.leases;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLeasesResponseAminoMsg): QueryLeasesResponse {
    return QueryLeasesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLeasesResponseProtoMsg): QueryLeasesResponse {
    return QueryLeasesResponse.decode(message.value);
  },
  toProto(message: QueryLeasesResponse): Uint8Array {
    return QueryLeasesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLeasesResponse): QueryLeasesResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryLeasesResponse",
      value: QueryLeasesResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryLeasesResponse.typeUrl, QueryLeasesResponse);
function createBaseQueryLeasesByTenantRequest(): QueryLeasesByTenantRequest {
  return {
    tenant: "",
    pagination: undefined,
    stateFilter: 0
  };
}
export const QueryLeasesByTenantRequest = {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesByTenantRequest",
  is(o: any): o is QueryLeasesByTenantRequest {
    return o && (o.$typeUrl === QueryLeasesByTenantRequest.typeUrl || typeof o.tenant === "string" && isSet(o.stateFilter));
  },
  isSDK(o: any): o is QueryLeasesByTenantRequestSDKType {
    return o && (o.$typeUrl === QueryLeasesByTenantRequest.typeUrl || typeof o.tenant === "string" && isSet(o.state_filter));
  },
  isAmino(o: any): o is QueryLeasesByTenantRequestAmino {
    return o && (o.$typeUrl === QueryLeasesByTenantRequest.typeUrl || typeof o.tenant === "string" && isSet(o.state_filter));
  },
  encode(message: QueryLeasesByTenantRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tenant !== "") {
      writer.uint32(10).string(message.tenant);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.stateFilter !== 0) {
      writer.uint32(24).int32(message.stateFilter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLeasesByTenantRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLeasesByTenantRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tenant = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 3:
          message.stateFilter = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLeasesByTenantRequest {
    return {
      tenant: isSet(object.tenant) ? String(object.tenant) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      stateFilter: isSet(object.stateFilter) ? leaseStateFromJSON(object.stateFilter) : -1
    };
  },
  toJSON(message: QueryLeasesByTenantRequest): JsonSafe<QueryLeasesByTenantRequest> {
    const obj: any = {};
    message.tenant !== undefined && (obj.tenant = message.tenant);
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.stateFilter !== undefined && (obj.stateFilter = leaseStateToJSON(message.stateFilter));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLeasesByTenantRequest>, I>>(object: I): QueryLeasesByTenantRequest {
    const message = createBaseQueryLeasesByTenantRequest();
    message.tenant = object.tenant ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.stateFilter = object.stateFilter ?? 0;
    return message;
  },
  fromAmino(object: QueryLeasesByTenantRequestAmino): QueryLeasesByTenantRequest {
    const message = createBaseQueryLeasesByTenantRequest();
    if (object.tenant !== undefined && object.tenant !== null) {
      message.tenant = object.tenant;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.state_filter !== undefined && object.state_filter !== null) {
      message.stateFilter = object.state_filter;
    }
    return message;
  },
  toAmino(message: QueryLeasesByTenantRequest): QueryLeasesByTenantRequestAmino {
    const obj: any = {};
    obj.tenant = message.tenant === "" ? undefined : message.tenant;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.state_filter = message.stateFilter === 0 ? undefined : message.stateFilter;
    return obj;
  },
  fromAminoMsg(object: QueryLeasesByTenantRequestAminoMsg): QueryLeasesByTenantRequest {
    return QueryLeasesByTenantRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLeasesByTenantRequestProtoMsg): QueryLeasesByTenantRequest {
    return QueryLeasesByTenantRequest.decode(message.value);
  },
  toProto(message: QueryLeasesByTenantRequest): Uint8Array {
    return QueryLeasesByTenantRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLeasesByTenantRequest): QueryLeasesByTenantRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryLeasesByTenantRequest",
      value: QueryLeasesByTenantRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryLeasesByTenantRequest.typeUrl, QueryLeasesByTenantRequest);
function createBaseQueryLeasesByTenantResponse(): QueryLeasesByTenantResponse {
  return {
    leases: [],
    pagination: undefined
  };
}
export const QueryLeasesByTenantResponse = {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesByTenantResponse",
  is(o: any): o is QueryLeasesByTenantResponse {
    return o && (o.$typeUrl === QueryLeasesByTenantResponse.typeUrl || Array.isArray(o.leases) && (!o.leases.length || Lease.is(o.leases[0])));
  },
  isSDK(o: any): o is QueryLeasesByTenantResponseSDKType {
    return o && (o.$typeUrl === QueryLeasesByTenantResponse.typeUrl || Array.isArray(o.leases) && (!o.leases.length || Lease.isSDK(o.leases[0])));
  },
  isAmino(o: any): o is QueryLeasesByTenantResponseAmino {
    return o && (o.$typeUrl === QueryLeasesByTenantResponse.typeUrl || Array.isArray(o.leases) && (!o.leases.length || Lease.isAmino(o.leases[0])));
  },
  encode(message: QueryLeasesByTenantResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLeasesByTenantResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLeasesByTenantResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leases.push(Lease.decode(reader, reader.uint32()));
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
  fromJSON(object: any): QueryLeasesByTenantResponse {
    return {
      leases: Array.isArray(object?.leases) ? object.leases.map((e: any) => Lease.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryLeasesByTenantResponse): JsonSafe<QueryLeasesByTenantResponse> {
    const obj: any = {};
    if (message.leases) {
      obj.leases = message.leases.map(e => e ? Lease.toJSON(e) : undefined);
    } else {
      obj.leases = [];
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLeasesByTenantResponse>, I>>(object: I): QueryLeasesByTenantResponse {
    const message = createBaseQueryLeasesByTenantResponse();
    message.leases = object.leases?.map(e => Lease.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryLeasesByTenantResponseAmino): QueryLeasesByTenantResponse {
    const message = createBaseQueryLeasesByTenantResponse();
    message.leases = object.leases?.map(e => Lease.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryLeasesByTenantResponse): QueryLeasesByTenantResponseAmino {
    const obj: any = {};
    if (message.leases) {
      obj.leases = message.leases.map(e => e ? Lease.toAmino(e) : undefined);
    } else {
      obj.leases = message.leases;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLeasesByTenantResponseAminoMsg): QueryLeasesByTenantResponse {
    return QueryLeasesByTenantResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLeasesByTenantResponseProtoMsg): QueryLeasesByTenantResponse {
    return QueryLeasesByTenantResponse.decode(message.value);
  },
  toProto(message: QueryLeasesByTenantResponse): Uint8Array {
    return QueryLeasesByTenantResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLeasesByTenantResponse): QueryLeasesByTenantResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryLeasesByTenantResponse",
      value: QueryLeasesByTenantResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryLeasesByTenantResponse.typeUrl, QueryLeasesByTenantResponse);
function createBaseQueryLeasesByProviderRequest(): QueryLeasesByProviderRequest {
  return {
    providerUuid: "",
    pagination: undefined,
    stateFilter: 0
  };
}
export const QueryLeasesByProviderRequest = {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesByProviderRequest",
  is(o: any): o is QueryLeasesByProviderRequest {
    return o && (o.$typeUrl === QueryLeasesByProviderRequest.typeUrl || typeof o.providerUuid === "string" && isSet(o.stateFilter));
  },
  isSDK(o: any): o is QueryLeasesByProviderRequestSDKType {
    return o && (o.$typeUrl === QueryLeasesByProviderRequest.typeUrl || typeof o.provider_uuid === "string" && isSet(o.state_filter));
  },
  isAmino(o: any): o is QueryLeasesByProviderRequestAmino {
    return o && (o.$typeUrl === QueryLeasesByProviderRequest.typeUrl || typeof o.provider_uuid === "string" && isSet(o.state_filter));
  },
  encode(message: QueryLeasesByProviderRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerUuid !== "") {
      writer.uint32(10).string(message.providerUuid);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.stateFilter !== 0) {
      writer.uint32(24).int32(message.stateFilter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLeasesByProviderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLeasesByProviderRequest();
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
          message.stateFilter = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLeasesByProviderRequest {
    return {
      providerUuid: isSet(object.providerUuid) ? String(object.providerUuid) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      stateFilter: isSet(object.stateFilter) ? leaseStateFromJSON(object.stateFilter) : -1
    };
  },
  toJSON(message: QueryLeasesByProviderRequest): JsonSafe<QueryLeasesByProviderRequest> {
    const obj: any = {};
    message.providerUuid !== undefined && (obj.providerUuid = message.providerUuid);
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.stateFilter !== undefined && (obj.stateFilter = leaseStateToJSON(message.stateFilter));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLeasesByProviderRequest>, I>>(object: I): QueryLeasesByProviderRequest {
    const message = createBaseQueryLeasesByProviderRequest();
    message.providerUuid = object.providerUuid ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.stateFilter = object.stateFilter ?? 0;
    return message;
  },
  fromAmino(object: QueryLeasesByProviderRequestAmino): QueryLeasesByProviderRequest {
    const message = createBaseQueryLeasesByProviderRequest();
    if (object.provider_uuid !== undefined && object.provider_uuid !== null) {
      message.providerUuid = object.provider_uuid;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.state_filter !== undefined && object.state_filter !== null) {
      message.stateFilter = object.state_filter;
    }
    return message;
  },
  toAmino(message: QueryLeasesByProviderRequest): QueryLeasesByProviderRequestAmino {
    const obj: any = {};
    obj.provider_uuid = message.providerUuid === "" ? undefined : message.providerUuid;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.state_filter = message.stateFilter === 0 ? undefined : message.stateFilter;
    return obj;
  },
  fromAminoMsg(object: QueryLeasesByProviderRequestAminoMsg): QueryLeasesByProviderRequest {
    return QueryLeasesByProviderRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLeasesByProviderRequestProtoMsg): QueryLeasesByProviderRequest {
    return QueryLeasesByProviderRequest.decode(message.value);
  },
  toProto(message: QueryLeasesByProviderRequest): Uint8Array {
    return QueryLeasesByProviderRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLeasesByProviderRequest): QueryLeasesByProviderRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryLeasesByProviderRequest",
      value: QueryLeasesByProviderRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryLeasesByProviderRequest.typeUrl, QueryLeasesByProviderRequest);
function createBaseQueryLeasesByProviderResponse(): QueryLeasesByProviderResponse {
  return {
    leases: [],
    pagination: undefined
  };
}
export const QueryLeasesByProviderResponse = {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesByProviderResponse",
  is(o: any): o is QueryLeasesByProviderResponse {
    return o && (o.$typeUrl === QueryLeasesByProviderResponse.typeUrl || Array.isArray(o.leases) && (!o.leases.length || Lease.is(o.leases[0])));
  },
  isSDK(o: any): o is QueryLeasesByProviderResponseSDKType {
    return o && (o.$typeUrl === QueryLeasesByProviderResponse.typeUrl || Array.isArray(o.leases) && (!o.leases.length || Lease.isSDK(o.leases[0])));
  },
  isAmino(o: any): o is QueryLeasesByProviderResponseAmino {
    return o && (o.$typeUrl === QueryLeasesByProviderResponse.typeUrl || Array.isArray(o.leases) && (!o.leases.length || Lease.isAmino(o.leases[0])));
  },
  encode(message: QueryLeasesByProviderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLeasesByProviderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLeasesByProviderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leases.push(Lease.decode(reader, reader.uint32()));
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
  fromJSON(object: any): QueryLeasesByProviderResponse {
    return {
      leases: Array.isArray(object?.leases) ? object.leases.map((e: any) => Lease.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryLeasesByProviderResponse): JsonSafe<QueryLeasesByProviderResponse> {
    const obj: any = {};
    if (message.leases) {
      obj.leases = message.leases.map(e => e ? Lease.toJSON(e) : undefined);
    } else {
      obj.leases = [];
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLeasesByProviderResponse>, I>>(object: I): QueryLeasesByProviderResponse {
    const message = createBaseQueryLeasesByProviderResponse();
    message.leases = object.leases?.map(e => Lease.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryLeasesByProviderResponseAmino): QueryLeasesByProviderResponse {
    const message = createBaseQueryLeasesByProviderResponse();
    message.leases = object.leases?.map(e => Lease.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryLeasesByProviderResponse): QueryLeasesByProviderResponseAmino {
    const obj: any = {};
    if (message.leases) {
      obj.leases = message.leases.map(e => e ? Lease.toAmino(e) : undefined);
    } else {
      obj.leases = message.leases;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLeasesByProviderResponseAminoMsg): QueryLeasesByProviderResponse {
    return QueryLeasesByProviderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLeasesByProviderResponseProtoMsg): QueryLeasesByProviderResponse {
    return QueryLeasesByProviderResponse.decode(message.value);
  },
  toProto(message: QueryLeasesByProviderResponse): Uint8Array {
    return QueryLeasesByProviderResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLeasesByProviderResponse): QueryLeasesByProviderResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryLeasesByProviderResponse",
      value: QueryLeasesByProviderResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryLeasesByProviderResponse.typeUrl, QueryLeasesByProviderResponse);
function createBaseQueryCreditAccountRequest(): QueryCreditAccountRequest {
  return {
    tenant: ""
  };
}
export const QueryCreditAccountRequest = {
  typeUrl: "/liftedinit.billing.v1.QueryCreditAccountRequest",
  is(o: any): o is QueryCreditAccountRequest {
    return o && (o.$typeUrl === QueryCreditAccountRequest.typeUrl || typeof o.tenant === "string");
  },
  isSDK(o: any): o is QueryCreditAccountRequestSDKType {
    return o && (o.$typeUrl === QueryCreditAccountRequest.typeUrl || typeof o.tenant === "string");
  },
  isAmino(o: any): o is QueryCreditAccountRequestAmino {
    return o && (o.$typeUrl === QueryCreditAccountRequest.typeUrl || typeof o.tenant === "string");
  },
  encode(message: QueryCreditAccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tenant !== "") {
      writer.uint32(10).string(message.tenant);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCreditAccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCreditAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tenant = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCreditAccountRequest {
    return {
      tenant: isSet(object.tenant) ? String(object.tenant) : ""
    };
  },
  toJSON(message: QueryCreditAccountRequest): JsonSafe<QueryCreditAccountRequest> {
    const obj: any = {};
    message.tenant !== undefined && (obj.tenant = message.tenant);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCreditAccountRequest>, I>>(object: I): QueryCreditAccountRequest {
    const message = createBaseQueryCreditAccountRequest();
    message.tenant = object.tenant ?? "";
    return message;
  },
  fromAmino(object: QueryCreditAccountRequestAmino): QueryCreditAccountRequest {
    const message = createBaseQueryCreditAccountRequest();
    if (object.tenant !== undefined && object.tenant !== null) {
      message.tenant = object.tenant;
    }
    return message;
  },
  toAmino(message: QueryCreditAccountRequest): QueryCreditAccountRequestAmino {
    const obj: any = {};
    obj.tenant = message.tenant === "" ? undefined : message.tenant;
    return obj;
  },
  fromAminoMsg(object: QueryCreditAccountRequestAminoMsg): QueryCreditAccountRequest {
    return QueryCreditAccountRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCreditAccountRequestProtoMsg): QueryCreditAccountRequest {
    return QueryCreditAccountRequest.decode(message.value);
  },
  toProto(message: QueryCreditAccountRequest): Uint8Array {
    return QueryCreditAccountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCreditAccountRequest): QueryCreditAccountRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryCreditAccountRequest",
      value: QueryCreditAccountRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryCreditAccountRequest.typeUrl, QueryCreditAccountRequest);
function createBaseQueryCreditAccountResponse(): QueryCreditAccountResponse {
  return {
    creditAccount: CreditAccount.fromPartial({}),
    balances: []
  };
}
export const QueryCreditAccountResponse = {
  typeUrl: "/liftedinit.billing.v1.QueryCreditAccountResponse",
  is(o: any): o is QueryCreditAccountResponse {
    return o && (o.$typeUrl === QueryCreditAccountResponse.typeUrl || CreditAccount.is(o.creditAccount) && Array.isArray(o.balances) && (!o.balances.length || Coin.is(o.balances[0])));
  },
  isSDK(o: any): o is QueryCreditAccountResponseSDKType {
    return o && (o.$typeUrl === QueryCreditAccountResponse.typeUrl || CreditAccount.isSDK(o.credit_account) && Array.isArray(o.balances) && (!o.balances.length || Coin.isSDK(o.balances[0])));
  },
  isAmino(o: any): o is QueryCreditAccountResponseAmino {
    return o && (o.$typeUrl === QueryCreditAccountResponse.typeUrl || CreditAccount.isAmino(o.credit_account) && Array.isArray(o.balances) && (!o.balances.length || Coin.isAmino(o.balances[0])));
  },
  encode(message: QueryCreditAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creditAccount !== undefined) {
      CreditAccount.encode(message.creditAccount, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.balances) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCreditAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCreditAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creditAccount = CreditAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.balances.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCreditAccountResponse {
    return {
      creditAccount: isSet(object.creditAccount) ? CreditAccount.fromJSON(object.creditAccount) : undefined,
      balances: Array.isArray(object?.balances) ? object.balances.map((e: any) => Coin.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryCreditAccountResponse): JsonSafe<QueryCreditAccountResponse> {
    const obj: any = {};
    message.creditAccount !== undefined && (obj.creditAccount = message.creditAccount ? CreditAccount.toJSON(message.creditAccount) : undefined);
    if (message.balances) {
      obj.balances = message.balances.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.balances = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCreditAccountResponse>, I>>(object: I): QueryCreditAccountResponse {
    const message = createBaseQueryCreditAccountResponse();
    message.creditAccount = object.creditAccount !== undefined && object.creditAccount !== null ? CreditAccount.fromPartial(object.creditAccount) : undefined;
    message.balances = object.balances?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryCreditAccountResponseAmino): QueryCreditAccountResponse {
    const message = createBaseQueryCreditAccountResponse();
    if (object.credit_account !== undefined && object.credit_account !== null) {
      message.creditAccount = CreditAccount.fromAmino(object.credit_account);
    }
    message.balances = object.balances?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryCreditAccountResponse): QueryCreditAccountResponseAmino {
    const obj: any = {};
    obj.credit_account = message.creditAccount ? CreditAccount.toAmino(message.creditAccount) : CreditAccount.toAmino(CreditAccount.fromPartial({}));
    if (message.balances) {
      obj.balances = message.balances.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.balances = message.balances;
    }
    return obj;
  },
  fromAminoMsg(object: QueryCreditAccountResponseAminoMsg): QueryCreditAccountResponse {
    return QueryCreditAccountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCreditAccountResponseProtoMsg): QueryCreditAccountResponse {
    return QueryCreditAccountResponse.decode(message.value);
  },
  toProto(message: QueryCreditAccountResponse): Uint8Array {
    return QueryCreditAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCreditAccountResponse): QueryCreditAccountResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryCreditAccountResponse",
      value: QueryCreditAccountResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryCreditAccountResponse.typeUrl, QueryCreditAccountResponse);
function createBaseQueryCreditAddressRequest(): QueryCreditAddressRequest {
  return {
    tenant: ""
  };
}
export const QueryCreditAddressRequest = {
  typeUrl: "/liftedinit.billing.v1.QueryCreditAddressRequest",
  is(o: any): o is QueryCreditAddressRequest {
    return o && (o.$typeUrl === QueryCreditAddressRequest.typeUrl || typeof o.tenant === "string");
  },
  isSDK(o: any): o is QueryCreditAddressRequestSDKType {
    return o && (o.$typeUrl === QueryCreditAddressRequest.typeUrl || typeof o.tenant === "string");
  },
  isAmino(o: any): o is QueryCreditAddressRequestAmino {
    return o && (o.$typeUrl === QueryCreditAddressRequest.typeUrl || typeof o.tenant === "string");
  },
  encode(message: QueryCreditAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tenant !== "") {
      writer.uint32(10).string(message.tenant);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCreditAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCreditAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tenant = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCreditAddressRequest {
    return {
      tenant: isSet(object.tenant) ? String(object.tenant) : ""
    };
  },
  toJSON(message: QueryCreditAddressRequest): JsonSafe<QueryCreditAddressRequest> {
    const obj: any = {};
    message.tenant !== undefined && (obj.tenant = message.tenant);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCreditAddressRequest>, I>>(object: I): QueryCreditAddressRequest {
    const message = createBaseQueryCreditAddressRequest();
    message.tenant = object.tenant ?? "";
    return message;
  },
  fromAmino(object: QueryCreditAddressRequestAmino): QueryCreditAddressRequest {
    const message = createBaseQueryCreditAddressRequest();
    if (object.tenant !== undefined && object.tenant !== null) {
      message.tenant = object.tenant;
    }
    return message;
  },
  toAmino(message: QueryCreditAddressRequest): QueryCreditAddressRequestAmino {
    const obj: any = {};
    obj.tenant = message.tenant === "" ? undefined : message.tenant;
    return obj;
  },
  fromAminoMsg(object: QueryCreditAddressRequestAminoMsg): QueryCreditAddressRequest {
    return QueryCreditAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCreditAddressRequestProtoMsg): QueryCreditAddressRequest {
    return QueryCreditAddressRequest.decode(message.value);
  },
  toProto(message: QueryCreditAddressRequest): Uint8Array {
    return QueryCreditAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCreditAddressRequest): QueryCreditAddressRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryCreditAddressRequest",
      value: QueryCreditAddressRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryCreditAddressRequest.typeUrl, QueryCreditAddressRequest);
function createBaseQueryCreditAddressResponse(): QueryCreditAddressResponse {
  return {
    creditAddress: ""
  };
}
export const QueryCreditAddressResponse = {
  typeUrl: "/liftedinit.billing.v1.QueryCreditAddressResponse",
  is(o: any): o is QueryCreditAddressResponse {
    return o && (o.$typeUrl === QueryCreditAddressResponse.typeUrl || typeof o.creditAddress === "string");
  },
  isSDK(o: any): o is QueryCreditAddressResponseSDKType {
    return o && (o.$typeUrl === QueryCreditAddressResponse.typeUrl || typeof o.credit_address === "string");
  },
  isAmino(o: any): o is QueryCreditAddressResponseAmino {
    return o && (o.$typeUrl === QueryCreditAddressResponse.typeUrl || typeof o.credit_address === "string");
  },
  encode(message: QueryCreditAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creditAddress !== "") {
      writer.uint32(10).string(message.creditAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCreditAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCreditAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creditAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCreditAddressResponse {
    return {
      creditAddress: isSet(object.creditAddress) ? String(object.creditAddress) : ""
    };
  },
  toJSON(message: QueryCreditAddressResponse): JsonSafe<QueryCreditAddressResponse> {
    const obj: any = {};
    message.creditAddress !== undefined && (obj.creditAddress = message.creditAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCreditAddressResponse>, I>>(object: I): QueryCreditAddressResponse {
    const message = createBaseQueryCreditAddressResponse();
    message.creditAddress = object.creditAddress ?? "";
    return message;
  },
  fromAmino(object: QueryCreditAddressResponseAmino): QueryCreditAddressResponse {
    const message = createBaseQueryCreditAddressResponse();
    if (object.credit_address !== undefined && object.credit_address !== null) {
      message.creditAddress = object.credit_address;
    }
    return message;
  },
  toAmino(message: QueryCreditAddressResponse): QueryCreditAddressResponseAmino {
    const obj: any = {};
    obj.credit_address = message.creditAddress === "" ? undefined : message.creditAddress;
    return obj;
  },
  fromAminoMsg(object: QueryCreditAddressResponseAminoMsg): QueryCreditAddressResponse {
    return QueryCreditAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCreditAddressResponseProtoMsg): QueryCreditAddressResponse {
    return QueryCreditAddressResponse.decode(message.value);
  },
  toProto(message: QueryCreditAddressResponse): Uint8Array {
    return QueryCreditAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCreditAddressResponse): QueryCreditAddressResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryCreditAddressResponse",
      value: QueryCreditAddressResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryCreditAddressResponse.typeUrl, QueryCreditAddressResponse);
function createBaseQueryWithdrawableAmountRequest(): QueryWithdrawableAmountRequest {
  return {
    leaseUuid: ""
  };
}
export const QueryWithdrawableAmountRequest = {
  typeUrl: "/liftedinit.billing.v1.QueryWithdrawableAmountRequest",
  is(o: any): o is QueryWithdrawableAmountRequest {
    return o && (o.$typeUrl === QueryWithdrawableAmountRequest.typeUrl || typeof o.leaseUuid === "string");
  },
  isSDK(o: any): o is QueryWithdrawableAmountRequestSDKType {
    return o && (o.$typeUrl === QueryWithdrawableAmountRequest.typeUrl || typeof o.lease_uuid === "string");
  },
  isAmino(o: any): o is QueryWithdrawableAmountRequestAmino {
    return o && (o.$typeUrl === QueryWithdrawableAmountRequest.typeUrl || typeof o.lease_uuid === "string");
  },
  encode(message: QueryWithdrawableAmountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.leaseUuid !== "") {
      writer.uint32(10).string(message.leaseUuid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryWithdrawableAmountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWithdrawableAmountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leaseUuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryWithdrawableAmountRequest {
    return {
      leaseUuid: isSet(object.leaseUuid) ? String(object.leaseUuid) : ""
    };
  },
  toJSON(message: QueryWithdrawableAmountRequest): JsonSafe<QueryWithdrawableAmountRequest> {
    const obj: any = {};
    message.leaseUuid !== undefined && (obj.leaseUuid = message.leaseUuid);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryWithdrawableAmountRequest>, I>>(object: I): QueryWithdrawableAmountRequest {
    const message = createBaseQueryWithdrawableAmountRequest();
    message.leaseUuid = object.leaseUuid ?? "";
    return message;
  },
  fromAmino(object: QueryWithdrawableAmountRequestAmino): QueryWithdrawableAmountRequest {
    const message = createBaseQueryWithdrawableAmountRequest();
    if (object.lease_uuid !== undefined && object.lease_uuid !== null) {
      message.leaseUuid = object.lease_uuid;
    }
    return message;
  },
  toAmino(message: QueryWithdrawableAmountRequest): QueryWithdrawableAmountRequestAmino {
    const obj: any = {};
    obj.lease_uuid = message.leaseUuid === "" ? undefined : message.leaseUuid;
    return obj;
  },
  fromAminoMsg(object: QueryWithdrawableAmountRequestAminoMsg): QueryWithdrawableAmountRequest {
    return QueryWithdrawableAmountRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryWithdrawableAmountRequestProtoMsg): QueryWithdrawableAmountRequest {
    return QueryWithdrawableAmountRequest.decode(message.value);
  },
  toProto(message: QueryWithdrawableAmountRequest): Uint8Array {
    return QueryWithdrawableAmountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryWithdrawableAmountRequest): QueryWithdrawableAmountRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryWithdrawableAmountRequest",
      value: QueryWithdrawableAmountRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryWithdrawableAmountRequest.typeUrl, QueryWithdrawableAmountRequest);
function createBaseQueryWithdrawableAmountResponse(): QueryWithdrawableAmountResponse {
  return {
    amounts: []
  };
}
export const QueryWithdrawableAmountResponse = {
  typeUrl: "/liftedinit.billing.v1.QueryWithdrawableAmountResponse",
  is(o: any): o is QueryWithdrawableAmountResponse {
    return o && (o.$typeUrl === QueryWithdrawableAmountResponse.typeUrl || Array.isArray(o.amounts) && (!o.amounts.length || Coin.is(o.amounts[0])));
  },
  isSDK(o: any): o is QueryWithdrawableAmountResponseSDKType {
    return o && (o.$typeUrl === QueryWithdrawableAmountResponse.typeUrl || Array.isArray(o.amounts) && (!o.amounts.length || Coin.isSDK(o.amounts[0])));
  },
  isAmino(o: any): o is QueryWithdrawableAmountResponseAmino {
    return o && (o.$typeUrl === QueryWithdrawableAmountResponse.typeUrl || Array.isArray(o.amounts) && (!o.amounts.length || Coin.isAmino(o.amounts[0])));
  },
  encode(message: QueryWithdrawableAmountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.amounts) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryWithdrawableAmountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWithdrawableAmountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amounts.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryWithdrawableAmountResponse {
    return {
      amounts: Array.isArray(object?.amounts) ? object.amounts.map((e: any) => Coin.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryWithdrawableAmountResponse): JsonSafe<QueryWithdrawableAmountResponse> {
    const obj: any = {};
    if (message.amounts) {
      obj.amounts = message.amounts.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.amounts = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryWithdrawableAmountResponse>, I>>(object: I): QueryWithdrawableAmountResponse {
    const message = createBaseQueryWithdrawableAmountResponse();
    message.amounts = object.amounts?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryWithdrawableAmountResponseAmino): QueryWithdrawableAmountResponse {
    const message = createBaseQueryWithdrawableAmountResponse();
    message.amounts = object.amounts?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryWithdrawableAmountResponse): QueryWithdrawableAmountResponseAmino {
    const obj: any = {};
    if (message.amounts) {
      obj.amounts = message.amounts.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.amounts = message.amounts;
    }
    return obj;
  },
  fromAminoMsg(object: QueryWithdrawableAmountResponseAminoMsg): QueryWithdrawableAmountResponse {
    return QueryWithdrawableAmountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryWithdrawableAmountResponseProtoMsg): QueryWithdrawableAmountResponse {
    return QueryWithdrawableAmountResponse.decode(message.value);
  },
  toProto(message: QueryWithdrawableAmountResponse): Uint8Array {
    return QueryWithdrawableAmountResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryWithdrawableAmountResponse): QueryWithdrawableAmountResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryWithdrawableAmountResponse",
      value: QueryWithdrawableAmountResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryWithdrawableAmountResponse.typeUrl, QueryWithdrawableAmountResponse);
function createBaseQueryProviderWithdrawableRequest(): QueryProviderWithdrawableRequest {
  return {
    providerUuid: "",
    limit: BigInt(0)
  };
}
export const QueryProviderWithdrawableRequest = {
  typeUrl: "/liftedinit.billing.v1.QueryProviderWithdrawableRequest",
  is(o: any): o is QueryProviderWithdrawableRequest {
    return o && (o.$typeUrl === QueryProviderWithdrawableRequest.typeUrl || typeof o.providerUuid === "string" && typeof o.limit === "bigint");
  },
  isSDK(o: any): o is QueryProviderWithdrawableRequestSDKType {
    return o && (o.$typeUrl === QueryProviderWithdrawableRequest.typeUrl || typeof o.provider_uuid === "string" && typeof o.limit === "bigint");
  },
  isAmino(o: any): o is QueryProviderWithdrawableRequestAmino {
    return o && (o.$typeUrl === QueryProviderWithdrawableRequest.typeUrl || typeof o.provider_uuid === "string" && typeof o.limit === "bigint");
  },
  encode(message: QueryProviderWithdrawableRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerUuid !== "") {
      writer.uint32(10).string(message.providerUuid);
    }
    if (message.limit !== BigInt(0)) {
      writer.uint32(16).uint64(message.limit);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProviderWithdrawableRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProviderWithdrawableRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerUuid = reader.string();
          break;
        case 2:
          message.limit = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryProviderWithdrawableRequest {
    return {
      providerUuid: isSet(object.providerUuid) ? String(object.providerUuid) : "",
      limit: isSet(object.limit) ? BigInt(object.limit.toString()) : BigInt(0)
    };
  },
  toJSON(message: QueryProviderWithdrawableRequest): JsonSafe<QueryProviderWithdrawableRequest> {
    const obj: any = {};
    message.providerUuid !== undefined && (obj.providerUuid = message.providerUuid);
    message.limit !== undefined && (obj.limit = (message.limit || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryProviderWithdrawableRequest>, I>>(object: I): QueryProviderWithdrawableRequest {
    const message = createBaseQueryProviderWithdrawableRequest();
    message.providerUuid = object.providerUuid ?? "";
    message.limit = object.limit !== undefined && object.limit !== null ? BigInt(object.limit.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryProviderWithdrawableRequestAmino): QueryProviderWithdrawableRequest {
    const message = createBaseQueryProviderWithdrawableRequest();
    if (object.provider_uuid !== undefined && object.provider_uuid !== null) {
      message.providerUuid = object.provider_uuid;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = BigInt(object.limit);
    }
    return message;
  },
  toAmino(message: QueryProviderWithdrawableRequest): QueryProviderWithdrawableRequestAmino {
    const obj: any = {};
    obj.provider_uuid = message.providerUuid === "" ? undefined : message.providerUuid;
    obj.limit = message.limit !== BigInt(0) ? message.limit?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryProviderWithdrawableRequestAminoMsg): QueryProviderWithdrawableRequest {
    return QueryProviderWithdrawableRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProviderWithdrawableRequestProtoMsg): QueryProviderWithdrawableRequest {
    return QueryProviderWithdrawableRequest.decode(message.value);
  },
  toProto(message: QueryProviderWithdrawableRequest): Uint8Array {
    return QueryProviderWithdrawableRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryProviderWithdrawableRequest): QueryProviderWithdrawableRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryProviderWithdrawableRequest",
      value: QueryProviderWithdrawableRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryProviderWithdrawableRequest.typeUrl, QueryProviderWithdrawableRequest);
function createBaseQueryProviderWithdrawableResponse(): QueryProviderWithdrawableResponse {
  return {
    amounts: [],
    leaseCount: BigInt(0),
    hasMore: false
  };
}
export const QueryProviderWithdrawableResponse = {
  typeUrl: "/liftedinit.billing.v1.QueryProviderWithdrawableResponse",
  is(o: any): o is QueryProviderWithdrawableResponse {
    return o && (o.$typeUrl === QueryProviderWithdrawableResponse.typeUrl || Array.isArray(o.amounts) && (!o.amounts.length || Coin.is(o.amounts[0])) && typeof o.leaseCount === "bigint" && typeof o.hasMore === "boolean");
  },
  isSDK(o: any): o is QueryProviderWithdrawableResponseSDKType {
    return o && (o.$typeUrl === QueryProviderWithdrawableResponse.typeUrl || Array.isArray(o.amounts) && (!o.amounts.length || Coin.isSDK(o.amounts[0])) && typeof o.lease_count === "bigint" && typeof o.has_more === "boolean");
  },
  isAmino(o: any): o is QueryProviderWithdrawableResponseAmino {
    return o && (o.$typeUrl === QueryProviderWithdrawableResponse.typeUrl || Array.isArray(o.amounts) && (!o.amounts.length || Coin.isAmino(o.amounts[0])) && typeof o.lease_count === "bigint" && typeof o.has_more === "boolean");
  },
  encode(message: QueryProviderWithdrawableResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.amounts) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.leaseCount !== BigInt(0)) {
      writer.uint32(16).uint64(message.leaseCount);
    }
    if (message.hasMore === true) {
      writer.uint32(24).bool(message.hasMore);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProviderWithdrawableResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProviderWithdrawableResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amounts.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.leaseCount = reader.uint64();
          break;
        case 3:
          message.hasMore = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryProviderWithdrawableResponse {
    return {
      amounts: Array.isArray(object?.amounts) ? object.amounts.map((e: any) => Coin.fromJSON(e)) : [],
      leaseCount: isSet(object.leaseCount) ? BigInt(object.leaseCount.toString()) : BigInt(0),
      hasMore: isSet(object.hasMore) ? Boolean(object.hasMore) : false
    };
  },
  toJSON(message: QueryProviderWithdrawableResponse): JsonSafe<QueryProviderWithdrawableResponse> {
    const obj: any = {};
    if (message.amounts) {
      obj.amounts = message.amounts.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.amounts = [];
    }
    message.leaseCount !== undefined && (obj.leaseCount = (message.leaseCount || BigInt(0)).toString());
    message.hasMore !== undefined && (obj.hasMore = message.hasMore);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryProviderWithdrawableResponse>, I>>(object: I): QueryProviderWithdrawableResponse {
    const message = createBaseQueryProviderWithdrawableResponse();
    message.amounts = object.amounts?.map(e => Coin.fromPartial(e)) || [];
    message.leaseCount = object.leaseCount !== undefined && object.leaseCount !== null ? BigInt(object.leaseCount.toString()) : BigInt(0);
    message.hasMore = object.hasMore ?? false;
    return message;
  },
  fromAmino(object: QueryProviderWithdrawableResponseAmino): QueryProviderWithdrawableResponse {
    const message = createBaseQueryProviderWithdrawableResponse();
    message.amounts = object.amounts?.map(e => Coin.fromAmino(e)) || [];
    if (object.lease_count !== undefined && object.lease_count !== null) {
      message.leaseCount = BigInt(object.lease_count);
    }
    if (object.has_more !== undefined && object.has_more !== null) {
      message.hasMore = object.has_more;
    }
    return message;
  },
  toAmino(message: QueryProviderWithdrawableResponse): QueryProviderWithdrawableResponseAmino {
    const obj: any = {};
    if (message.amounts) {
      obj.amounts = message.amounts.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.amounts = message.amounts;
    }
    obj.lease_count = message.leaseCount !== BigInt(0) ? message.leaseCount?.toString() : undefined;
    obj.has_more = message.hasMore === false ? undefined : message.hasMore;
    return obj;
  },
  fromAminoMsg(object: QueryProviderWithdrawableResponseAminoMsg): QueryProviderWithdrawableResponse {
    return QueryProviderWithdrawableResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProviderWithdrawableResponseProtoMsg): QueryProviderWithdrawableResponse {
    return QueryProviderWithdrawableResponse.decode(message.value);
  },
  toProto(message: QueryProviderWithdrawableResponse): Uint8Array {
    return QueryProviderWithdrawableResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryProviderWithdrawableResponse): QueryProviderWithdrawableResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryProviderWithdrawableResponse",
      value: QueryProviderWithdrawableResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryProviderWithdrawableResponse.typeUrl, QueryProviderWithdrawableResponse);
function createBaseQueryCreditAccountsRequest(): QueryCreditAccountsRequest {
  return {
    pagination: undefined
  };
}
export const QueryCreditAccountsRequest = {
  typeUrl: "/liftedinit.billing.v1.QueryCreditAccountsRequest",
  is(o: any): o is QueryCreditAccountsRequest {
    return o && o.$typeUrl === QueryCreditAccountsRequest.typeUrl;
  },
  isSDK(o: any): o is QueryCreditAccountsRequestSDKType {
    return o && o.$typeUrl === QueryCreditAccountsRequest.typeUrl;
  },
  isAmino(o: any): o is QueryCreditAccountsRequestAmino {
    return o && o.$typeUrl === QueryCreditAccountsRequest.typeUrl;
  },
  encode(message: QueryCreditAccountsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCreditAccountsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCreditAccountsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCreditAccountsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryCreditAccountsRequest): JsonSafe<QueryCreditAccountsRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCreditAccountsRequest>, I>>(object: I): QueryCreditAccountsRequest {
    const message = createBaseQueryCreditAccountsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryCreditAccountsRequestAmino): QueryCreditAccountsRequest {
    const message = createBaseQueryCreditAccountsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryCreditAccountsRequest): QueryCreditAccountsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCreditAccountsRequestAminoMsg): QueryCreditAccountsRequest {
    return QueryCreditAccountsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCreditAccountsRequestProtoMsg): QueryCreditAccountsRequest {
    return QueryCreditAccountsRequest.decode(message.value);
  },
  toProto(message: QueryCreditAccountsRequest): Uint8Array {
    return QueryCreditAccountsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCreditAccountsRequest): QueryCreditAccountsRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryCreditAccountsRequest",
      value: QueryCreditAccountsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryCreditAccountsRequest.typeUrl, QueryCreditAccountsRequest);
function createBaseQueryCreditAccountsResponse(): QueryCreditAccountsResponse {
  return {
    creditAccounts: [],
    pagination: undefined
  };
}
export const QueryCreditAccountsResponse = {
  typeUrl: "/liftedinit.billing.v1.QueryCreditAccountsResponse",
  is(o: any): o is QueryCreditAccountsResponse {
    return o && (o.$typeUrl === QueryCreditAccountsResponse.typeUrl || Array.isArray(o.creditAccounts) && (!o.creditAccounts.length || CreditAccount.is(o.creditAccounts[0])));
  },
  isSDK(o: any): o is QueryCreditAccountsResponseSDKType {
    return o && (o.$typeUrl === QueryCreditAccountsResponse.typeUrl || Array.isArray(o.credit_accounts) && (!o.credit_accounts.length || CreditAccount.isSDK(o.credit_accounts[0])));
  },
  isAmino(o: any): o is QueryCreditAccountsResponseAmino {
    return o && (o.$typeUrl === QueryCreditAccountsResponse.typeUrl || Array.isArray(o.credit_accounts) && (!o.credit_accounts.length || CreditAccount.isAmino(o.credit_accounts[0])));
  },
  encode(message: QueryCreditAccountsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.creditAccounts) {
      CreditAccount.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCreditAccountsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCreditAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creditAccounts.push(CreditAccount.decode(reader, reader.uint32()));
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
  fromJSON(object: any): QueryCreditAccountsResponse {
    return {
      creditAccounts: Array.isArray(object?.creditAccounts) ? object.creditAccounts.map((e: any) => CreditAccount.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryCreditAccountsResponse): JsonSafe<QueryCreditAccountsResponse> {
    const obj: any = {};
    if (message.creditAccounts) {
      obj.creditAccounts = message.creditAccounts.map(e => e ? CreditAccount.toJSON(e) : undefined);
    } else {
      obj.creditAccounts = [];
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCreditAccountsResponse>, I>>(object: I): QueryCreditAccountsResponse {
    const message = createBaseQueryCreditAccountsResponse();
    message.creditAccounts = object.creditAccounts?.map(e => CreditAccount.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryCreditAccountsResponseAmino): QueryCreditAccountsResponse {
    const message = createBaseQueryCreditAccountsResponse();
    message.creditAccounts = object.credit_accounts?.map(e => CreditAccount.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryCreditAccountsResponse): QueryCreditAccountsResponseAmino {
    const obj: any = {};
    if (message.creditAccounts) {
      obj.credit_accounts = message.creditAccounts.map(e => e ? CreditAccount.toAmino(e) : undefined);
    } else {
      obj.credit_accounts = message.creditAccounts;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCreditAccountsResponseAminoMsg): QueryCreditAccountsResponse {
    return QueryCreditAccountsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCreditAccountsResponseProtoMsg): QueryCreditAccountsResponse {
    return QueryCreditAccountsResponse.decode(message.value);
  },
  toProto(message: QueryCreditAccountsResponse): Uint8Array {
    return QueryCreditAccountsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCreditAccountsResponse): QueryCreditAccountsResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryCreditAccountsResponse",
      value: QueryCreditAccountsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryCreditAccountsResponse.typeUrl, QueryCreditAccountsResponse);
function createBaseQueryLeasesBySKURequest(): QueryLeasesBySKURequest {
  return {
    skuUuid: "",
    pagination: undefined,
    stateFilter: 0
  };
}
export const QueryLeasesBySKURequest = {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesBySKURequest",
  is(o: any): o is QueryLeasesBySKURequest {
    return o && (o.$typeUrl === QueryLeasesBySKURequest.typeUrl || typeof o.skuUuid === "string" && isSet(o.stateFilter));
  },
  isSDK(o: any): o is QueryLeasesBySKURequestSDKType {
    return o && (o.$typeUrl === QueryLeasesBySKURequest.typeUrl || typeof o.sku_uuid === "string" && isSet(o.state_filter));
  },
  isAmino(o: any): o is QueryLeasesBySKURequestAmino {
    return o && (o.$typeUrl === QueryLeasesBySKURequest.typeUrl || typeof o.sku_uuid === "string" && isSet(o.state_filter));
  },
  encode(message: QueryLeasesBySKURequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.skuUuid !== "") {
      writer.uint32(10).string(message.skuUuid);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.stateFilter !== 0) {
      writer.uint32(24).int32(message.stateFilter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLeasesBySKURequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLeasesBySKURequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.skuUuid = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 3:
          message.stateFilter = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLeasesBySKURequest {
    return {
      skuUuid: isSet(object.skuUuid) ? String(object.skuUuid) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      stateFilter: isSet(object.stateFilter) ? leaseStateFromJSON(object.stateFilter) : -1
    };
  },
  toJSON(message: QueryLeasesBySKURequest): JsonSafe<QueryLeasesBySKURequest> {
    const obj: any = {};
    message.skuUuid !== undefined && (obj.skuUuid = message.skuUuid);
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.stateFilter !== undefined && (obj.stateFilter = leaseStateToJSON(message.stateFilter));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLeasesBySKURequest>, I>>(object: I): QueryLeasesBySKURequest {
    const message = createBaseQueryLeasesBySKURequest();
    message.skuUuid = object.skuUuid ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.stateFilter = object.stateFilter ?? 0;
    return message;
  },
  fromAmino(object: QueryLeasesBySKURequestAmino): QueryLeasesBySKURequest {
    const message = createBaseQueryLeasesBySKURequest();
    if (object.sku_uuid !== undefined && object.sku_uuid !== null) {
      message.skuUuid = object.sku_uuid;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.state_filter !== undefined && object.state_filter !== null) {
      message.stateFilter = object.state_filter;
    }
    return message;
  },
  toAmino(message: QueryLeasesBySKURequest): QueryLeasesBySKURequestAmino {
    const obj: any = {};
    obj.sku_uuid = message.skuUuid === "" ? undefined : message.skuUuid;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.state_filter = message.stateFilter === 0 ? undefined : message.stateFilter;
    return obj;
  },
  fromAminoMsg(object: QueryLeasesBySKURequestAminoMsg): QueryLeasesBySKURequest {
    return QueryLeasesBySKURequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLeasesBySKURequestProtoMsg): QueryLeasesBySKURequest {
    return QueryLeasesBySKURequest.decode(message.value);
  },
  toProto(message: QueryLeasesBySKURequest): Uint8Array {
    return QueryLeasesBySKURequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLeasesBySKURequest): QueryLeasesBySKURequestProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryLeasesBySKURequest",
      value: QueryLeasesBySKURequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryLeasesBySKURequest.typeUrl, QueryLeasesBySKURequest);
function createBaseQueryLeasesBySKUResponse(): QueryLeasesBySKUResponse {
  return {
    leases: [],
    pagination: undefined
  };
}
export const QueryLeasesBySKUResponse = {
  typeUrl: "/liftedinit.billing.v1.QueryLeasesBySKUResponse",
  is(o: any): o is QueryLeasesBySKUResponse {
    return o && (o.$typeUrl === QueryLeasesBySKUResponse.typeUrl || Array.isArray(o.leases) && (!o.leases.length || Lease.is(o.leases[0])));
  },
  isSDK(o: any): o is QueryLeasesBySKUResponseSDKType {
    return o && (o.$typeUrl === QueryLeasesBySKUResponse.typeUrl || Array.isArray(o.leases) && (!o.leases.length || Lease.isSDK(o.leases[0])));
  },
  isAmino(o: any): o is QueryLeasesBySKUResponseAmino {
    return o && (o.$typeUrl === QueryLeasesBySKUResponse.typeUrl || Array.isArray(o.leases) && (!o.leases.length || Lease.isAmino(o.leases[0])));
  },
  encode(message: QueryLeasesBySKUResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLeasesBySKUResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLeasesBySKUResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leases.push(Lease.decode(reader, reader.uint32()));
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
  fromJSON(object: any): QueryLeasesBySKUResponse {
    return {
      leases: Array.isArray(object?.leases) ? object.leases.map((e: any) => Lease.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryLeasesBySKUResponse): JsonSafe<QueryLeasesBySKUResponse> {
    const obj: any = {};
    if (message.leases) {
      obj.leases = message.leases.map(e => e ? Lease.toJSON(e) : undefined);
    } else {
      obj.leases = [];
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLeasesBySKUResponse>, I>>(object: I): QueryLeasesBySKUResponse {
    const message = createBaseQueryLeasesBySKUResponse();
    message.leases = object.leases?.map(e => Lease.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryLeasesBySKUResponseAmino): QueryLeasesBySKUResponse {
    const message = createBaseQueryLeasesBySKUResponse();
    message.leases = object.leases?.map(e => Lease.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryLeasesBySKUResponse): QueryLeasesBySKUResponseAmino {
    const obj: any = {};
    if (message.leases) {
      obj.leases = message.leases.map(e => e ? Lease.toAmino(e) : undefined);
    } else {
      obj.leases = message.leases;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLeasesBySKUResponseAminoMsg): QueryLeasesBySKUResponse {
    return QueryLeasesBySKUResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLeasesBySKUResponseProtoMsg): QueryLeasesBySKUResponse {
    return QueryLeasesBySKUResponse.decode(message.value);
  },
  toProto(message: QueryLeasesBySKUResponse): Uint8Array {
    return QueryLeasesBySKUResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLeasesBySKUResponse): QueryLeasesBySKUResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryLeasesBySKUResponse",
      value: QueryLeasesBySKUResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryLeasesBySKUResponse.typeUrl, QueryLeasesBySKUResponse);
function createBaseQueryCreditEstimateRequest(): QueryCreditEstimateRequest {
  return {
    tenant: ""
  };
}
export const QueryCreditEstimateRequest = {
  typeUrl: "/liftedinit.billing.v1.QueryCreditEstimateRequest",
  is(o: any): o is QueryCreditEstimateRequest {
    return o && (o.$typeUrl === QueryCreditEstimateRequest.typeUrl || typeof o.tenant === "string");
  },
  isSDK(o: any): o is QueryCreditEstimateRequestSDKType {
    return o && (o.$typeUrl === QueryCreditEstimateRequest.typeUrl || typeof o.tenant === "string");
  },
  isAmino(o: any): o is QueryCreditEstimateRequestAmino {
    return o && (o.$typeUrl === QueryCreditEstimateRequest.typeUrl || typeof o.tenant === "string");
  },
  encode(message: QueryCreditEstimateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tenant !== "") {
      writer.uint32(10).string(message.tenant);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCreditEstimateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCreditEstimateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tenant = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCreditEstimateRequest {
    return {
      tenant: isSet(object.tenant) ? String(object.tenant) : ""
    };
  },
  toJSON(message: QueryCreditEstimateRequest): JsonSafe<QueryCreditEstimateRequest> {
    const obj: any = {};
    message.tenant !== undefined && (obj.tenant = message.tenant);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCreditEstimateRequest>, I>>(object: I): QueryCreditEstimateRequest {
    const message = createBaseQueryCreditEstimateRequest();
    message.tenant = object.tenant ?? "";
    return message;
  },
  fromAmino(object: QueryCreditEstimateRequestAmino): QueryCreditEstimateRequest {
    const message = createBaseQueryCreditEstimateRequest();
    if (object.tenant !== undefined && object.tenant !== null) {
      message.tenant = object.tenant;
    }
    return message;
  },
  toAmino(message: QueryCreditEstimateRequest): QueryCreditEstimateRequestAmino {
    const obj: any = {};
    obj.tenant = message.tenant === "" ? undefined : message.tenant;
    return obj;
  },
  fromAminoMsg(object: QueryCreditEstimateRequestAminoMsg): QueryCreditEstimateRequest {
    return QueryCreditEstimateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCreditEstimateRequestProtoMsg): QueryCreditEstimateRequest {
    return QueryCreditEstimateRequest.decode(message.value);
  },
  toProto(message: QueryCreditEstimateRequest): Uint8Array {
    return QueryCreditEstimateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCreditEstimateRequest): QueryCreditEstimateRequestProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryCreditEstimateRequest",
      value: QueryCreditEstimateRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryCreditEstimateRequest.typeUrl, QueryCreditEstimateRequest);
function createBaseQueryCreditEstimateResponse(): QueryCreditEstimateResponse {
  return {
    currentBalance: [],
    totalRatePerSecond: [],
    estimatedDurationSeconds: BigInt(0),
    activeLeaseCount: BigInt(0)
  };
}
export const QueryCreditEstimateResponse = {
  typeUrl: "/liftedinit.billing.v1.QueryCreditEstimateResponse",
  is(o: any): o is QueryCreditEstimateResponse {
    return o && (o.$typeUrl === QueryCreditEstimateResponse.typeUrl || Array.isArray(o.currentBalance) && (!o.currentBalance.length || Coin.is(o.currentBalance[0])) && Array.isArray(o.totalRatePerSecond) && (!o.totalRatePerSecond.length || Coin.is(o.totalRatePerSecond[0])) && typeof o.estimatedDurationSeconds === "bigint" && typeof o.activeLeaseCount === "bigint");
  },
  isSDK(o: any): o is QueryCreditEstimateResponseSDKType {
    return o && (o.$typeUrl === QueryCreditEstimateResponse.typeUrl || Array.isArray(o.current_balance) && (!o.current_balance.length || Coin.isSDK(o.current_balance[0])) && Array.isArray(o.total_rate_per_second) && (!o.total_rate_per_second.length || Coin.isSDK(o.total_rate_per_second[0])) && typeof o.estimated_duration_seconds === "bigint" && typeof o.active_lease_count === "bigint");
  },
  isAmino(o: any): o is QueryCreditEstimateResponseAmino {
    return o && (o.$typeUrl === QueryCreditEstimateResponse.typeUrl || Array.isArray(o.current_balance) && (!o.current_balance.length || Coin.isAmino(o.current_balance[0])) && Array.isArray(o.total_rate_per_second) && (!o.total_rate_per_second.length || Coin.isAmino(o.total_rate_per_second[0])) && typeof o.estimated_duration_seconds === "bigint" && typeof o.active_lease_count === "bigint");
  },
  encode(message: QueryCreditEstimateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.currentBalance) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.totalRatePerSecond) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.estimatedDurationSeconds !== BigInt(0)) {
      writer.uint32(24).uint64(message.estimatedDurationSeconds);
    }
    if (message.activeLeaseCount !== BigInt(0)) {
      writer.uint32(32).uint64(message.activeLeaseCount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCreditEstimateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCreditEstimateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currentBalance.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.totalRatePerSecond.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.estimatedDurationSeconds = reader.uint64();
          break;
        case 4:
          message.activeLeaseCount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCreditEstimateResponse {
    return {
      currentBalance: Array.isArray(object?.currentBalance) ? object.currentBalance.map((e: any) => Coin.fromJSON(e)) : [],
      totalRatePerSecond: Array.isArray(object?.totalRatePerSecond) ? object.totalRatePerSecond.map((e: any) => Coin.fromJSON(e)) : [],
      estimatedDurationSeconds: isSet(object.estimatedDurationSeconds) ? BigInt(object.estimatedDurationSeconds.toString()) : BigInt(0),
      activeLeaseCount: isSet(object.activeLeaseCount) ? BigInt(object.activeLeaseCount.toString()) : BigInt(0)
    };
  },
  toJSON(message: QueryCreditEstimateResponse): JsonSafe<QueryCreditEstimateResponse> {
    const obj: any = {};
    if (message.currentBalance) {
      obj.currentBalance = message.currentBalance.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.currentBalance = [];
    }
    if (message.totalRatePerSecond) {
      obj.totalRatePerSecond = message.totalRatePerSecond.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.totalRatePerSecond = [];
    }
    message.estimatedDurationSeconds !== undefined && (obj.estimatedDurationSeconds = (message.estimatedDurationSeconds || BigInt(0)).toString());
    message.activeLeaseCount !== undefined && (obj.activeLeaseCount = (message.activeLeaseCount || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCreditEstimateResponse>, I>>(object: I): QueryCreditEstimateResponse {
    const message = createBaseQueryCreditEstimateResponse();
    message.currentBalance = object.currentBalance?.map(e => Coin.fromPartial(e)) || [];
    message.totalRatePerSecond = object.totalRatePerSecond?.map(e => Coin.fromPartial(e)) || [];
    message.estimatedDurationSeconds = object.estimatedDurationSeconds !== undefined && object.estimatedDurationSeconds !== null ? BigInt(object.estimatedDurationSeconds.toString()) : BigInt(0);
    message.activeLeaseCount = object.activeLeaseCount !== undefined && object.activeLeaseCount !== null ? BigInt(object.activeLeaseCount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryCreditEstimateResponseAmino): QueryCreditEstimateResponse {
    const message = createBaseQueryCreditEstimateResponse();
    message.currentBalance = object.current_balance?.map(e => Coin.fromAmino(e)) || [];
    message.totalRatePerSecond = object.total_rate_per_second?.map(e => Coin.fromAmino(e)) || [];
    if (object.estimated_duration_seconds !== undefined && object.estimated_duration_seconds !== null) {
      message.estimatedDurationSeconds = BigInt(object.estimated_duration_seconds);
    }
    if (object.active_lease_count !== undefined && object.active_lease_count !== null) {
      message.activeLeaseCount = BigInt(object.active_lease_count);
    }
    return message;
  },
  toAmino(message: QueryCreditEstimateResponse): QueryCreditEstimateResponseAmino {
    const obj: any = {};
    if (message.currentBalance) {
      obj.current_balance = message.currentBalance.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.current_balance = message.currentBalance;
    }
    if (message.totalRatePerSecond) {
      obj.total_rate_per_second = message.totalRatePerSecond.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.total_rate_per_second = message.totalRatePerSecond;
    }
    obj.estimated_duration_seconds = message.estimatedDurationSeconds !== BigInt(0) ? message.estimatedDurationSeconds?.toString() : undefined;
    obj.active_lease_count = message.activeLeaseCount !== BigInt(0) ? message.activeLeaseCount?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCreditEstimateResponseAminoMsg): QueryCreditEstimateResponse {
    return QueryCreditEstimateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCreditEstimateResponseProtoMsg): QueryCreditEstimateResponse {
    return QueryCreditEstimateResponse.decode(message.value);
  },
  toProto(message: QueryCreditEstimateResponse): Uint8Array {
    return QueryCreditEstimateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCreditEstimateResponse): QueryCreditEstimateResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.QueryCreditEstimateResponse",
      value: QueryCreditEstimateResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryCreditEstimateResponse.typeUrl, QueryCreditEstimateResponse);