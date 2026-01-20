import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Params, ParamsAmino, ParamsSDKType } from "./types";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact, toTimestamp, fromTimestamp } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
import { GlobalDecoderRegistry } from "../../../registry";
/** LeaseItemInput is the input for creating a lease item. */
export interface LeaseItemInput {
  /** sku_uuid is the UUID of the SKU to lease. */
  skuUuid: string;
  /** quantity is the number of instances. */
  quantity: bigint;
}
export interface LeaseItemInputProtoMsg {
  typeUrl: "/liftedinit.billing.v1.LeaseItemInput";
  value: Uint8Array;
}
/** LeaseItemInput is the input for creating a lease item. */
export interface LeaseItemInputAmino {
  /** sku_uuid is the UUID of the SKU to lease. */
  sku_uuid?: string;
  /** quantity is the number of instances. */
  quantity?: string;
}
export interface LeaseItemInputAminoMsg {
  type: "lifted/billing/LeaseItemInput";
  value: LeaseItemInputAmino;
}
/** LeaseItemInput is the input for creating a lease item. */
export interface LeaseItemInputSDKType {
  sku_uuid: string;
  quantity: bigint;
}
/** MsgFundCredit funds a tenant's credit account. */
export interface MsgFundCredit {
  /** sender is the address funding the credit account. */
  sender: string;
  /** tenant is the address of the tenant whose credit account to fund. */
  tenant: string;
  /** amount is the amount to fund. */
  amount: Coin;
}
export interface MsgFundCreditProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgFundCredit";
  value: Uint8Array;
}
/** MsgFundCredit funds a tenant's credit account. */
export interface MsgFundCreditAmino {
  /** sender is the address funding the credit account. */
  sender?: string;
  /** tenant is the address of the tenant whose credit account to fund. */
  tenant?: string;
  /** amount is the amount to fund. */
  amount: CoinAmino;
}
export interface MsgFundCreditAminoMsg {
  type: "lifted/billing/MsgFundCredit";
  value: MsgFundCreditAmino;
}
/** MsgFundCredit funds a tenant's credit account. */
export interface MsgFundCreditSDKType {
  sender: string;
  tenant: string;
  amount: CoinSDKType;
}
/** MsgFundCreditResponse is the response type for MsgFundCredit. */
export interface MsgFundCreditResponse {
  /** credit_address is the derived credit account address. */
  creditAddress: string;
  /** new_balance is the credit account balance after funding. */
  newBalance: Coin;
}
export interface MsgFundCreditResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgFundCreditResponse";
  value: Uint8Array;
}
/** MsgFundCreditResponse is the response type for MsgFundCredit. */
export interface MsgFundCreditResponseAmino {
  /** credit_address is the derived credit account address. */
  credit_address?: string;
  /** new_balance is the credit account balance after funding. */
  new_balance: CoinAmino;
}
export interface MsgFundCreditResponseAminoMsg {
  type: "/liftedinit.billing.v1.MsgFundCreditResponse";
  value: MsgFundCreditResponseAmino;
}
/** MsgFundCreditResponse is the response type for MsgFundCredit. */
export interface MsgFundCreditResponseSDKType {
  credit_address: string;
  new_balance: CoinSDKType;
}
/** MsgCreateLease creates a new lease. */
export interface MsgCreateLease {
  /** tenant is the address of the tenant creating the lease. */
  tenant: string;
  /**
   * items is the list of SKU items to include in the lease.
   * All SKUs must belong to the same provider.
   */
  items: LeaseItemInput[];
}
export interface MsgCreateLeaseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgCreateLease";
  value: Uint8Array;
}
/** MsgCreateLease creates a new lease. */
export interface MsgCreateLeaseAmino {
  /** tenant is the address of the tenant creating the lease. */
  tenant?: string;
  /**
   * items is the list of SKU items to include in the lease.
   * All SKUs must belong to the same provider.
   */
  items: LeaseItemInputAmino[];
}
export interface MsgCreateLeaseAminoMsg {
  type: "lifted/billing/MsgCreateLease";
  value: MsgCreateLeaseAmino;
}
/** MsgCreateLease creates a new lease. */
export interface MsgCreateLeaseSDKType {
  tenant: string;
  items: LeaseItemInputSDKType[];
}
/** MsgCreateLeaseResponse is the response type for MsgCreateLease. */
export interface MsgCreateLeaseResponse {
  /** lease_uuid is the UUID of the created lease (UUIDv7 format). */
  leaseUuid: string;
}
export interface MsgCreateLeaseResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseResponse";
  value: Uint8Array;
}
/** MsgCreateLeaseResponse is the response type for MsgCreateLease. */
export interface MsgCreateLeaseResponseAmino {
  /** lease_uuid is the UUID of the created lease (UUIDv7 format). */
  lease_uuid?: string;
}
export interface MsgCreateLeaseResponseAminoMsg {
  type: "/liftedinit.billing.v1.MsgCreateLeaseResponse";
  value: MsgCreateLeaseResponseAmino;
}
/** MsgCreateLeaseResponse is the response type for MsgCreateLease. */
export interface MsgCreateLeaseResponseSDKType {
  lease_uuid: string;
}
/**
 * MsgCreateLeaseForTenant allows authority to create a lease on behalf of a tenant.
 * This is used for migrating off-chain leases to on-chain.
 */
export interface MsgCreateLeaseForTenant {
  /** authority is the module authority address. */
  authority: string;
  /** tenant is the address of the tenant for whom the lease is created. */
  tenant: string;
  /**
   * items is the list of SKU items to include in the lease.
   * All SKUs must belong to the same provider.
   */
  items: LeaseItemInput[];
}
export interface MsgCreateLeaseForTenantProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseForTenant";
  value: Uint8Array;
}
/**
 * MsgCreateLeaseForTenant allows authority to create a lease on behalf of a tenant.
 * This is used for migrating off-chain leases to on-chain.
 */
export interface MsgCreateLeaseForTenantAmino {
  /** authority is the module authority address. */
  authority?: string;
  /** tenant is the address of the tenant for whom the lease is created. */
  tenant?: string;
  /**
   * items is the list of SKU items to include in the lease.
   * All SKUs must belong to the same provider.
   */
  items: LeaseItemInputAmino[];
}
export interface MsgCreateLeaseForTenantAminoMsg {
  type: "lifted/billing/MsgCreateLeaseForTenant";
  value: MsgCreateLeaseForTenantAmino;
}
/**
 * MsgCreateLeaseForTenant allows authority to create a lease on behalf of a tenant.
 * This is used for migrating off-chain leases to on-chain.
 */
export interface MsgCreateLeaseForTenantSDKType {
  authority: string;
  tenant: string;
  items: LeaseItemInputSDKType[];
}
/** MsgCreateLeaseForTenantResponse is the response type for MsgCreateLeaseForTenant. */
export interface MsgCreateLeaseForTenantResponse {
  /** lease_uuid is the UUID of the created lease (UUIDv7 format). */
  leaseUuid: string;
}
export interface MsgCreateLeaseForTenantResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseForTenantResponse";
  value: Uint8Array;
}
/** MsgCreateLeaseForTenantResponse is the response type for MsgCreateLeaseForTenant. */
export interface MsgCreateLeaseForTenantResponseAmino {
  /** lease_uuid is the UUID of the created lease (UUIDv7 format). */
  lease_uuid?: string;
}
export interface MsgCreateLeaseForTenantResponseAminoMsg {
  type: "/liftedinit.billing.v1.MsgCreateLeaseForTenantResponse";
  value: MsgCreateLeaseForTenantResponseAmino;
}
/** MsgCreateLeaseForTenantResponse is the response type for MsgCreateLeaseForTenant. */
export interface MsgCreateLeaseForTenantResponseSDKType {
  lease_uuid: string;
}
/**
 * MsgCloseLease closes one or more active leases.
 * All leases must be ACTIVE and sender must be authorized for each.
 * This is an atomic operation: all leases succeed or all fail.
 */
export interface MsgCloseLease {
  /** sender is the address requesting the closure (tenant, provider, or authority). */
  sender: string;
  /** lease_uuids are the UUIDs of the leases to close (1-100). */
  leaseUuids: string[];
}
export interface MsgCloseLeaseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgCloseLease";
  value: Uint8Array;
}
/**
 * MsgCloseLease closes one or more active leases.
 * All leases must be ACTIVE and sender must be authorized for each.
 * This is an atomic operation: all leases succeed or all fail.
 */
export interface MsgCloseLeaseAmino {
  /** sender is the address requesting the closure (tenant, provider, or authority). */
  sender?: string;
  /** lease_uuids are the UUIDs of the leases to close (1-100). */
  lease_uuids?: string[];
}
export interface MsgCloseLeaseAminoMsg {
  type: "lifted/billing/MsgCloseLease";
  value: MsgCloseLeaseAmino;
}
/**
 * MsgCloseLease closes one or more active leases.
 * All leases must be ACTIVE and sender must be authorized for each.
 * This is an atomic operation: all leases succeed or all fail.
 */
export interface MsgCloseLeaseSDKType {
  sender: string;
  lease_uuids: string[];
}
/** MsgCloseLeaseResponse is the response type for MsgCloseLease. */
export interface MsgCloseLeaseResponse {
  /** closed_at is the timestamp when the leases were closed. */
  closedAt: Date;
  /** closed_count is the number of leases that were closed. */
  closedCount: bigint;
  /** total_settled_amounts is the aggregated amounts settled across all leases (one per denom). */
  totalSettledAmounts: Coin[];
}
export interface MsgCloseLeaseResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgCloseLeaseResponse";
  value: Uint8Array;
}
/** MsgCloseLeaseResponse is the response type for MsgCloseLease. */
export interface MsgCloseLeaseResponseAmino {
  /** closed_at is the timestamp when the leases were closed. */
  closed_at: string;
  /** closed_count is the number of leases that were closed. */
  closed_count: string;
  /** total_settled_amounts is the aggregated amounts settled across all leases (one per denom). */
  total_settled_amounts: CoinAmino[];
}
export interface MsgCloseLeaseResponseAminoMsg {
  type: "/liftedinit.billing.v1.MsgCloseLeaseResponse";
  value: MsgCloseLeaseResponseAmino;
}
/** MsgCloseLeaseResponse is the response type for MsgCloseLease. */
export interface MsgCloseLeaseResponseSDKType {
  closed_at: Date;
  closed_count: bigint;
  total_settled_amounts: CoinSDKType[];
}
/**
 * MsgWithdraw allows a provider to withdraw from leases.
 * Two mutually exclusive modes:
 * 1. Specific leases: provide lease_uuids (1-100 UUIDs)
 * 2. Provider-wide: provide provider_uuid for paginated withdrawal from all leases
 * This is an atomic operation: all withdrawals succeed or all fail.
 */
export interface MsgWithdraw {
  /** sender is the provider's address or authority. */
  sender: string;
  /**
   * lease_uuids are the UUIDs of the leases to withdraw from (1-100).
   * Mutually exclusive with provider_uuid.
   */
  leaseUuids: string[];
  /**
   * provider_uuid enables provider-wide withdrawal mode.
   * When set, withdraws from all active leases for this provider with pagination.
   * Mutually exclusive with lease_uuids.
   */
  providerUuid: string;
  /**
   * limit is the maximum number of leases to process in provider-wide mode.
   * When 0, defaults to 50. Maximum allowed is 100.
   * Ignored when lease_uuids is specified.
   */
  limit: bigint;
}
export interface MsgWithdrawProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgWithdraw";
  value: Uint8Array;
}
/**
 * MsgWithdraw allows a provider to withdraw from leases.
 * Two mutually exclusive modes:
 * 1. Specific leases: provide lease_uuids (1-100 UUIDs)
 * 2. Provider-wide: provide provider_uuid for paginated withdrawal from all leases
 * This is an atomic operation: all withdrawals succeed or all fail.
 */
export interface MsgWithdrawAmino {
  /** sender is the provider's address or authority. */
  sender?: string;
  /**
   * lease_uuids are the UUIDs of the leases to withdraw from (1-100).
   * Mutually exclusive with provider_uuid.
   */
  lease_uuids?: string[];
  /**
   * provider_uuid enables provider-wide withdrawal mode.
   * When set, withdraws from all active leases for this provider with pagination.
   * Mutually exclusive with lease_uuids.
   */
  provider_uuid?: string;
  /**
   * limit is the maximum number of leases to process in provider-wide mode.
   * When 0, defaults to 50. Maximum allowed is 100.
   * Ignored when lease_uuids is specified.
   */
  limit?: string;
}
export interface MsgWithdrawAminoMsg {
  type: "lifted/billing/MsgWithdraw";
  value: MsgWithdrawAmino;
}
/**
 * MsgWithdraw allows a provider to withdraw from leases.
 * Two mutually exclusive modes:
 * 1. Specific leases: provide lease_uuids (1-100 UUIDs)
 * 2. Provider-wide: provide provider_uuid for paginated withdrawal from all leases
 * This is an atomic operation: all withdrawals succeed or all fail.
 */
export interface MsgWithdrawSDKType {
  sender: string;
  lease_uuids: string[];
  provider_uuid: string;
  limit: bigint;
}
/** MsgWithdrawResponse is the response type for MsgWithdraw. */
export interface MsgWithdrawResponse {
  /** total_amounts is the total amounts withdrawn across all leases (one per denom). */
  totalAmounts: Coin[];
  /** payout_address is the address that received the funds. */
  payoutAddress: string;
  /** withdrawal_count is the number of leases withdrawn from. */
  withdrawalCount: bigint;
  /**
   * has_more indicates if there are more leases to process in provider-wide mode.
   * Always false when using lease_uuids mode.
   */
  hasMore: boolean;
}
export interface MsgWithdrawResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgWithdrawResponse";
  value: Uint8Array;
}
/** MsgWithdrawResponse is the response type for MsgWithdraw. */
export interface MsgWithdrawResponseAmino {
  /** total_amounts is the total amounts withdrawn across all leases (one per denom). */
  total_amounts: CoinAmino[];
  /** payout_address is the address that received the funds. */
  payout_address?: string;
  /** withdrawal_count is the number of leases withdrawn from. */
  withdrawal_count?: string;
  /**
   * has_more indicates if there are more leases to process in provider-wide mode.
   * Always false when using lease_uuids mode.
   */
  has_more?: boolean;
}
export interface MsgWithdrawResponseAminoMsg {
  type: "/liftedinit.billing.v1.MsgWithdrawResponse";
  value: MsgWithdrawResponseAmino;
}
/** MsgWithdrawResponse is the response type for MsgWithdraw. */
export interface MsgWithdrawResponseSDKType {
  total_amounts: CoinSDKType[];
  payout_address: string;
  withdrawal_count: bigint;
  has_more: boolean;
}
/** MsgUpdateParams updates the module parameters. */
export interface MsgUpdateParams {
  /** authority is the address of the module authority. */
  authority: string;
  /** params are the new parameters. */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgUpdateParams";
  value: Uint8Array;
}
/** MsgUpdateParams updates the module parameters. */
export interface MsgUpdateParamsAmino {
  /** authority is the address of the module authority. */
  authority?: string;
  /** params are the new parameters. */
  params: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "lifted/billing/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/** MsgUpdateParams updates the module parameters. */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType;
}
/** MsgUpdateParamsResponse is the response type for MsgUpdateParams. */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/** MsgUpdateParamsResponse is the response type for MsgUpdateParams. */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/liftedinit.billing.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/** MsgUpdateParamsResponse is the response type for MsgUpdateParams. */
export interface MsgUpdateParamsResponseSDKType {}
/**
 * MsgAcknowledgeLease allows a provider to acknowledge one or more PENDING leases.
 * All leases must belong to the same provider and be in PENDING state.
 * This is an atomic operation: all leases succeed or all fail.
 */
export interface MsgAcknowledgeLease {
  /** sender is the provider's address or authority. */
  sender: string;
  /** lease_uuids are the UUIDs of the leases to acknowledge (1-100). */
  leaseUuids: string[];
}
export interface MsgAcknowledgeLeaseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgAcknowledgeLease";
  value: Uint8Array;
}
/**
 * MsgAcknowledgeLease allows a provider to acknowledge one or more PENDING leases.
 * All leases must belong to the same provider and be in PENDING state.
 * This is an atomic operation: all leases succeed or all fail.
 */
export interface MsgAcknowledgeLeaseAmino {
  /** sender is the provider's address or authority. */
  sender?: string;
  /** lease_uuids are the UUIDs of the leases to acknowledge (1-100). */
  lease_uuids?: string[];
}
export interface MsgAcknowledgeLeaseAminoMsg {
  type: "lifted/billing/MsgAcknowledgeLease";
  value: MsgAcknowledgeLeaseAmino;
}
/**
 * MsgAcknowledgeLease allows a provider to acknowledge one or more PENDING leases.
 * All leases must belong to the same provider and be in PENDING state.
 * This is an atomic operation: all leases succeed or all fail.
 */
export interface MsgAcknowledgeLeaseSDKType {
  sender: string;
  lease_uuids: string[];
}
/** MsgAcknowledgeLeaseResponse is the response type for MsgAcknowledgeLease. */
export interface MsgAcknowledgeLeaseResponse {
  /**
   * acknowledged_at is the timestamp when the leases were acknowledged.
   * Billing starts from this timestamp.
   */
  acknowledgedAt: Date;
  /** acknowledged_count is the number of leases that were acknowledged. */
  acknowledgedCount: bigint;
}
export interface MsgAcknowledgeLeaseResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgAcknowledgeLeaseResponse";
  value: Uint8Array;
}
/** MsgAcknowledgeLeaseResponse is the response type for MsgAcknowledgeLease. */
export interface MsgAcknowledgeLeaseResponseAmino {
  /**
   * acknowledged_at is the timestamp when the leases were acknowledged.
   * Billing starts from this timestamp.
   */
  acknowledged_at: string;
  /** acknowledged_count is the number of leases that were acknowledged. */
  acknowledged_count: string;
}
export interface MsgAcknowledgeLeaseResponseAminoMsg {
  type: "/liftedinit.billing.v1.MsgAcknowledgeLeaseResponse";
  value: MsgAcknowledgeLeaseResponseAmino;
}
/** MsgAcknowledgeLeaseResponse is the response type for MsgAcknowledgeLease. */
export interface MsgAcknowledgeLeaseResponseSDKType {
  acknowledged_at: Date;
  acknowledged_count: bigint;
}
/**
 * MsgRejectLease allows a provider to reject one or more PENDING leases.
 * All leases must belong to the same provider and be in PENDING state.
 * This is an atomic operation: all leases succeed or all fail.
 */
export interface MsgRejectLease {
  /** sender is the provider's address or authority. */
  sender: string;
  /** lease_uuids are the UUIDs of the leases to reject (1-100). */
  leaseUuids: string[];
  /**
   * reason is an optional explanation for the rejection (applied to all leases).
   * Maximum 256 characters.
   */
  reason: string;
}
export interface MsgRejectLeaseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgRejectLease";
  value: Uint8Array;
}
/**
 * MsgRejectLease allows a provider to reject one or more PENDING leases.
 * All leases must belong to the same provider and be in PENDING state.
 * This is an atomic operation: all leases succeed or all fail.
 */
export interface MsgRejectLeaseAmino {
  /** sender is the provider's address or authority. */
  sender?: string;
  /** lease_uuids are the UUIDs of the leases to reject (1-100). */
  lease_uuids?: string[];
  /**
   * reason is an optional explanation for the rejection (applied to all leases).
   * Maximum 256 characters.
   */
  reason?: string;
}
export interface MsgRejectLeaseAminoMsg {
  type: "lifted/billing/MsgRejectLease";
  value: MsgRejectLeaseAmino;
}
/**
 * MsgRejectLease allows a provider to reject one or more PENDING leases.
 * All leases must belong to the same provider and be in PENDING state.
 * This is an atomic operation: all leases succeed or all fail.
 */
export interface MsgRejectLeaseSDKType {
  sender: string;
  lease_uuids: string[];
  reason: string;
}
/** MsgRejectLeaseResponse is the response type for MsgRejectLease. */
export interface MsgRejectLeaseResponse {
  /** rejected_at is the timestamp when the leases were rejected. */
  rejectedAt: Date;
  /** rejected_count is the number of leases that were rejected. */
  rejectedCount: bigint;
}
export interface MsgRejectLeaseResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgRejectLeaseResponse";
  value: Uint8Array;
}
/** MsgRejectLeaseResponse is the response type for MsgRejectLease. */
export interface MsgRejectLeaseResponseAmino {
  /** rejected_at is the timestamp when the leases were rejected. */
  rejected_at: string;
  /** rejected_count is the number of leases that were rejected. */
  rejected_count: string;
}
export interface MsgRejectLeaseResponseAminoMsg {
  type: "/liftedinit.billing.v1.MsgRejectLeaseResponse";
  value: MsgRejectLeaseResponseAmino;
}
/** MsgRejectLeaseResponse is the response type for MsgRejectLease. */
export interface MsgRejectLeaseResponseSDKType {
  rejected_at: Date;
  rejected_count: bigint;
}
/**
 * MsgCancelLease allows a tenant to cancel one or more of their own PENDING leases.
 * All leases must belong to the tenant. This is an atomic operation:
 * all leases succeed or all fail.
 */
export interface MsgCancelLease {
  /** tenant is the address of the tenant who owns the leases. */
  tenant: string;
  /** lease_uuids are the UUIDs of the leases to cancel (1-100). */
  leaseUuids: string[];
}
export interface MsgCancelLeaseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgCancelLease";
  value: Uint8Array;
}
/**
 * MsgCancelLease allows a tenant to cancel one or more of their own PENDING leases.
 * All leases must belong to the tenant. This is an atomic operation:
 * all leases succeed or all fail.
 */
export interface MsgCancelLeaseAmino {
  /** tenant is the address of the tenant who owns the leases. */
  tenant?: string;
  /** lease_uuids are the UUIDs of the leases to cancel (1-100). */
  lease_uuids?: string[];
}
export interface MsgCancelLeaseAminoMsg {
  type: "lifted/billing/MsgCancelLease";
  value: MsgCancelLeaseAmino;
}
/**
 * MsgCancelLease allows a tenant to cancel one or more of their own PENDING leases.
 * All leases must belong to the tenant. This is an atomic operation:
 * all leases succeed or all fail.
 */
export interface MsgCancelLeaseSDKType {
  tenant: string;
  lease_uuids: string[];
}
/** MsgCancelLeaseResponse is the response type for MsgCancelLease. */
export interface MsgCancelLeaseResponse {
  /** cancelled_at is the timestamp when the leases were cancelled. */
  cancelledAt: Date;
  /** cancelled_count is the number of leases that were cancelled. */
  cancelledCount: bigint;
}
export interface MsgCancelLeaseResponseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.MsgCancelLeaseResponse";
  value: Uint8Array;
}
/** MsgCancelLeaseResponse is the response type for MsgCancelLease. */
export interface MsgCancelLeaseResponseAmino {
  /** cancelled_at is the timestamp when the leases were cancelled. */
  cancelled_at: string;
  /** cancelled_count is the number of leases that were cancelled. */
  cancelled_count?: string;
}
export interface MsgCancelLeaseResponseAminoMsg {
  type: "/liftedinit.billing.v1.MsgCancelLeaseResponse";
  value: MsgCancelLeaseResponseAmino;
}
/** MsgCancelLeaseResponse is the response type for MsgCancelLease. */
export interface MsgCancelLeaseResponseSDKType {
  cancelled_at: Date;
  cancelled_count: bigint;
}
function createBaseLeaseItemInput(): LeaseItemInput {
  return {
    skuUuid: "",
    quantity: BigInt(0)
  };
}
export const LeaseItemInput = {
  typeUrl: "/liftedinit.billing.v1.LeaseItemInput",
  aminoType: "lifted/billing/LeaseItemInput",
  is(o: any): o is LeaseItemInput {
    return o && (o.$typeUrl === LeaseItemInput.typeUrl || typeof o.skuUuid === "string" && typeof o.quantity === "bigint");
  },
  isSDK(o: any): o is LeaseItemInputSDKType {
    return o && (o.$typeUrl === LeaseItemInput.typeUrl || typeof o.sku_uuid === "string" && typeof o.quantity === "bigint");
  },
  isAmino(o: any): o is LeaseItemInputAmino {
    return o && (o.$typeUrl === LeaseItemInput.typeUrl || typeof o.sku_uuid === "string" && typeof o.quantity === "bigint");
  },
  encode(message: LeaseItemInput, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.skuUuid !== "") {
      writer.uint32(10).string(message.skuUuid);
    }
    if (message.quantity !== BigInt(0)) {
      writer.uint32(16).uint64(message.quantity);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LeaseItemInput {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaseItemInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.skuUuid = reader.string();
          break;
        case 2:
          message.quantity = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): LeaseItemInput {
    return {
      skuUuid: isSet(object.skuUuid) ? String(object.skuUuid) : "",
      quantity: isSet(object.quantity) ? BigInt(object.quantity.toString()) : BigInt(0)
    };
  },
  toJSON(message: LeaseItemInput): JsonSafe<LeaseItemInput> {
    const obj: any = {};
    message.skuUuid !== undefined && (obj.skuUuid = message.skuUuid);
    message.quantity !== undefined && (obj.quantity = (message.quantity || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<LeaseItemInput>, I>>(object: I): LeaseItemInput {
    const message = createBaseLeaseItemInput();
    message.skuUuid = object.skuUuid ?? "";
    message.quantity = object.quantity !== undefined && object.quantity !== null ? BigInt(object.quantity.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: LeaseItemInputAmino): LeaseItemInput {
    const message = createBaseLeaseItemInput();
    if (object.sku_uuid !== undefined && object.sku_uuid !== null) {
      message.skuUuid = object.sku_uuid;
    }
    if (object.quantity !== undefined && object.quantity !== null) {
      message.quantity = BigInt(object.quantity);
    }
    return message;
  },
  toAmino(message: LeaseItemInput): LeaseItemInputAmino {
    const obj: any = {};
    obj.sku_uuid = message.skuUuid === "" ? undefined : message.skuUuid;
    obj.quantity = message.quantity !== BigInt(0) ? message.quantity?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: LeaseItemInputAminoMsg): LeaseItemInput {
    return LeaseItemInput.fromAmino(object.value);
  },
  toAminoMsg(message: LeaseItemInput): LeaseItemInputAminoMsg {
    return {
      type: "lifted/billing/LeaseItemInput",
      value: LeaseItemInput.toAmino(message)
    };
  },
  fromProtoMsg(message: LeaseItemInputProtoMsg): LeaseItemInput {
    return LeaseItemInput.decode(message.value);
  },
  toProto(message: LeaseItemInput): Uint8Array {
    return LeaseItemInput.encode(message).finish();
  },
  toProtoMsg(message: LeaseItemInput): LeaseItemInputProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.LeaseItemInput",
      value: LeaseItemInput.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(LeaseItemInput.typeUrl, LeaseItemInput);
GlobalDecoderRegistry.registerAminoProtoMapping(LeaseItemInput.aminoType, LeaseItemInput.typeUrl);
function createBaseMsgFundCredit(): MsgFundCredit {
  return {
    sender: "",
    tenant: "",
    amount: Coin.fromPartial({})
  };
}
export const MsgFundCredit = {
  typeUrl: "/liftedinit.billing.v1.MsgFundCredit",
  aminoType: "lifted/billing/MsgFundCredit",
  is(o: any): o is MsgFundCredit {
    return o && (o.$typeUrl === MsgFundCredit.typeUrl || typeof o.sender === "string" && typeof o.tenant === "string" && Coin.is(o.amount));
  },
  isSDK(o: any): o is MsgFundCreditSDKType {
    return o && (o.$typeUrl === MsgFundCredit.typeUrl || typeof o.sender === "string" && typeof o.tenant === "string" && Coin.isSDK(o.amount));
  },
  isAmino(o: any): o is MsgFundCreditAmino {
    return o && (o.$typeUrl === MsgFundCredit.typeUrl || typeof o.sender === "string" && typeof o.tenant === "string" && Coin.isAmino(o.amount));
  },
  encode(message: MsgFundCredit, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.tenant !== "") {
      writer.uint32(18).string(message.tenant);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgFundCredit {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundCredit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.tenant = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgFundCredit {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      tenant: isSet(object.tenant) ? String(object.tenant) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined
    };
  },
  toJSON(message: MsgFundCredit): JsonSafe<MsgFundCredit> {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.tenant !== undefined && (obj.tenant = message.tenant);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgFundCredit>, I>>(object: I): MsgFundCredit {
    const message = createBaseMsgFundCredit();
    message.sender = object.sender ?? "";
    message.tenant = object.tenant ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: MsgFundCreditAmino): MsgFundCredit {
    const message = createBaseMsgFundCredit();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.tenant !== undefined && object.tenant !== null) {
      message.tenant = object.tenant;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: MsgFundCredit): MsgFundCreditAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.tenant = message.tenant === "" ? undefined : message.tenant;
    obj.amount = message.amount ? Coin.toAmino(message.amount) : Coin.toAmino(Coin.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgFundCreditAminoMsg): MsgFundCredit {
    return MsgFundCredit.fromAmino(object.value);
  },
  toAminoMsg(message: MsgFundCredit): MsgFundCreditAminoMsg {
    return {
      type: "lifted/billing/MsgFundCredit",
      value: MsgFundCredit.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgFundCreditProtoMsg): MsgFundCredit {
    return MsgFundCredit.decode(message.value);
  },
  toProto(message: MsgFundCredit): Uint8Array {
    return MsgFundCredit.encode(message).finish();
  },
  toProtoMsg(message: MsgFundCredit): MsgFundCreditProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgFundCredit",
      value: MsgFundCredit.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgFundCredit.typeUrl, MsgFundCredit);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgFundCredit.aminoType, MsgFundCredit.typeUrl);
function createBaseMsgFundCreditResponse(): MsgFundCreditResponse {
  return {
    creditAddress: "",
    newBalance: Coin.fromPartial({})
  };
}
export const MsgFundCreditResponse = {
  typeUrl: "/liftedinit.billing.v1.MsgFundCreditResponse",
  is(o: any): o is MsgFundCreditResponse {
    return o && (o.$typeUrl === MsgFundCreditResponse.typeUrl || typeof o.creditAddress === "string" && Coin.is(o.newBalance));
  },
  isSDK(o: any): o is MsgFundCreditResponseSDKType {
    return o && (o.$typeUrl === MsgFundCreditResponse.typeUrl || typeof o.credit_address === "string" && Coin.isSDK(o.new_balance));
  },
  isAmino(o: any): o is MsgFundCreditResponseAmino {
    return o && (o.$typeUrl === MsgFundCreditResponse.typeUrl || typeof o.credit_address === "string" && Coin.isAmino(o.new_balance));
  },
  encode(message: MsgFundCreditResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creditAddress !== "") {
      writer.uint32(10).string(message.creditAddress);
    }
    if (message.newBalance !== undefined) {
      Coin.encode(message.newBalance, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgFundCreditResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundCreditResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creditAddress = reader.string();
          break;
        case 2:
          message.newBalance = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgFundCreditResponse {
    return {
      creditAddress: isSet(object.creditAddress) ? String(object.creditAddress) : "",
      newBalance: isSet(object.newBalance) ? Coin.fromJSON(object.newBalance) : undefined
    };
  },
  toJSON(message: MsgFundCreditResponse): JsonSafe<MsgFundCreditResponse> {
    const obj: any = {};
    message.creditAddress !== undefined && (obj.creditAddress = message.creditAddress);
    message.newBalance !== undefined && (obj.newBalance = message.newBalance ? Coin.toJSON(message.newBalance) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgFundCreditResponse>, I>>(object: I): MsgFundCreditResponse {
    const message = createBaseMsgFundCreditResponse();
    message.creditAddress = object.creditAddress ?? "";
    message.newBalance = object.newBalance !== undefined && object.newBalance !== null ? Coin.fromPartial(object.newBalance) : undefined;
    return message;
  },
  fromAmino(object: MsgFundCreditResponseAmino): MsgFundCreditResponse {
    const message = createBaseMsgFundCreditResponse();
    if (object.credit_address !== undefined && object.credit_address !== null) {
      message.creditAddress = object.credit_address;
    }
    if (object.new_balance !== undefined && object.new_balance !== null) {
      message.newBalance = Coin.fromAmino(object.new_balance);
    }
    return message;
  },
  toAmino(message: MsgFundCreditResponse): MsgFundCreditResponseAmino {
    const obj: any = {};
    obj.credit_address = message.creditAddress === "" ? undefined : message.creditAddress;
    obj.new_balance = message.newBalance ? Coin.toAmino(message.newBalance) : Coin.toAmino(Coin.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgFundCreditResponseAminoMsg): MsgFundCreditResponse {
    return MsgFundCreditResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgFundCreditResponseProtoMsg): MsgFundCreditResponse {
    return MsgFundCreditResponse.decode(message.value);
  },
  toProto(message: MsgFundCreditResponse): Uint8Array {
    return MsgFundCreditResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgFundCreditResponse): MsgFundCreditResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgFundCreditResponse",
      value: MsgFundCreditResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgFundCreditResponse.typeUrl, MsgFundCreditResponse);
function createBaseMsgCreateLease(): MsgCreateLease {
  return {
    tenant: "",
    items: []
  };
}
export const MsgCreateLease = {
  typeUrl: "/liftedinit.billing.v1.MsgCreateLease",
  aminoType: "lifted/billing/MsgCreateLease",
  is(o: any): o is MsgCreateLease {
    return o && (o.$typeUrl === MsgCreateLease.typeUrl || typeof o.tenant === "string" && Array.isArray(o.items) && (!o.items.length || LeaseItemInput.is(o.items[0])));
  },
  isSDK(o: any): o is MsgCreateLeaseSDKType {
    return o && (o.$typeUrl === MsgCreateLease.typeUrl || typeof o.tenant === "string" && Array.isArray(o.items) && (!o.items.length || LeaseItemInput.isSDK(o.items[0])));
  },
  isAmino(o: any): o is MsgCreateLeaseAmino {
    return o && (o.$typeUrl === MsgCreateLease.typeUrl || typeof o.tenant === "string" && Array.isArray(o.items) && (!o.items.length || LeaseItemInput.isAmino(o.items[0])));
  },
  encode(message: MsgCreateLease, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tenant !== "") {
      writer.uint32(10).string(message.tenant);
    }
    for (const v of message.items) {
      LeaseItemInput.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateLease {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateLease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tenant = reader.string();
          break;
        case 2:
          message.items.push(LeaseItemInput.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateLease {
    return {
      tenant: isSet(object.tenant) ? String(object.tenant) : "",
      items: Array.isArray(object?.items) ? object.items.map((e: any) => LeaseItemInput.fromJSON(e)) : []
    };
  },
  toJSON(message: MsgCreateLease): JsonSafe<MsgCreateLease> {
    const obj: any = {};
    message.tenant !== undefined && (obj.tenant = message.tenant);
    if (message.items) {
      obj.items = message.items.map(e => e ? LeaseItemInput.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateLease>, I>>(object: I): MsgCreateLease {
    const message = createBaseMsgCreateLease();
    message.tenant = object.tenant ?? "";
    message.items = object.items?.map(e => LeaseItemInput.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgCreateLeaseAmino): MsgCreateLease {
    const message = createBaseMsgCreateLease();
    if (object.tenant !== undefined && object.tenant !== null) {
      message.tenant = object.tenant;
    }
    message.items = object.items?.map(e => LeaseItemInput.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgCreateLease): MsgCreateLeaseAmino {
    const obj: any = {};
    obj.tenant = message.tenant === "" ? undefined : message.tenant;
    if (message.items) {
      obj.items = message.items.map(e => e ? LeaseItemInput.toAmino(e) : undefined);
    } else {
      obj.items = message.items;
    }
    return obj;
  },
  fromAminoMsg(object: MsgCreateLeaseAminoMsg): MsgCreateLease {
    return MsgCreateLease.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateLease): MsgCreateLeaseAminoMsg {
    return {
      type: "lifted/billing/MsgCreateLease",
      value: MsgCreateLease.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgCreateLeaseProtoMsg): MsgCreateLease {
    return MsgCreateLease.decode(message.value);
  },
  toProto(message: MsgCreateLease): Uint8Array {
    return MsgCreateLease.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateLease): MsgCreateLeaseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgCreateLease",
      value: MsgCreateLease.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateLease.typeUrl, MsgCreateLease);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCreateLease.aminoType, MsgCreateLease.typeUrl);
function createBaseMsgCreateLeaseResponse(): MsgCreateLeaseResponse {
  return {
    leaseUuid: ""
  };
}
export const MsgCreateLeaseResponse = {
  typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseResponse",
  is(o: any): o is MsgCreateLeaseResponse {
    return o && (o.$typeUrl === MsgCreateLeaseResponse.typeUrl || typeof o.leaseUuid === "string");
  },
  isSDK(o: any): o is MsgCreateLeaseResponseSDKType {
    return o && (o.$typeUrl === MsgCreateLeaseResponse.typeUrl || typeof o.lease_uuid === "string");
  },
  isAmino(o: any): o is MsgCreateLeaseResponseAmino {
    return o && (o.$typeUrl === MsgCreateLeaseResponse.typeUrl || typeof o.lease_uuid === "string");
  },
  encode(message: MsgCreateLeaseResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.leaseUuid !== "") {
      writer.uint32(10).string(message.leaseUuid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateLeaseResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateLeaseResponse();
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
  fromJSON(object: any): MsgCreateLeaseResponse {
    return {
      leaseUuid: isSet(object.leaseUuid) ? String(object.leaseUuid) : ""
    };
  },
  toJSON(message: MsgCreateLeaseResponse): JsonSafe<MsgCreateLeaseResponse> {
    const obj: any = {};
    message.leaseUuid !== undefined && (obj.leaseUuid = message.leaseUuid);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateLeaseResponse>, I>>(object: I): MsgCreateLeaseResponse {
    const message = createBaseMsgCreateLeaseResponse();
    message.leaseUuid = object.leaseUuid ?? "";
    return message;
  },
  fromAmino(object: MsgCreateLeaseResponseAmino): MsgCreateLeaseResponse {
    const message = createBaseMsgCreateLeaseResponse();
    if (object.lease_uuid !== undefined && object.lease_uuid !== null) {
      message.leaseUuid = object.lease_uuid;
    }
    return message;
  },
  toAmino(message: MsgCreateLeaseResponse): MsgCreateLeaseResponseAmino {
    const obj: any = {};
    obj.lease_uuid = message.leaseUuid === "" ? undefined : message.leaseUuid;
    return obj;
  },
  fromAminoMsg(object: MsgCreateLeaseResponseAminoMsg): MsgCreateLeaseResponse {
    return MsgCreateLeaseResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateLeaseResponseProtoMsg): MsgCreateLeaseResponse {
    return MsgCreateLeaseResponse.decode(message.value);
  },
  toProto(message: MsgCreateLeaseResponse): Uint8Array {
    return MsgCreateLeaseResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateLeaseResponse): MsgCreateLeaseResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseResponse",
      value: MsgCreateLeaseResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateLeaseResponse.typeUrl, MsgCreateLeaseResponse);
function createBaseMsgCreateLeaseForTenant(): MsgCreateLeaseForTenant {
  return {
    authority: "",
    tenant: "",
    items: []
  };
}
export const MsgCreateLeaseForTenant = {
  typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseForTenant",
  aminoType: "lifted/billing/MsgCreateLeaseForTenant",
  is(o: any): o is MsgCreateLeaseForTenant {
    return o && (o.$typeUrl === MsgCreateLeaseForTenant.typeUrl || typeof o.authority === "string" && typeof o.tenant === "string" && Array.isArray(o.items) && (!o.items.length || LeaseItemInput.is(o.items[0])));
  },
  isSDK(o: any): o is MsgCreateLeaseForTenantSDKType {
    return o && (o.$typeUrl === MsgCreateLeaseForTenant.typeUrl || typeof o.authority === "string" && typeof o.tenant === "string" && Array.isArray(o.items) && (!o.items.length || LeaseItemInput.isSDK(o.items[0])));
  },
  isAmino(o: any): o is MsgCreateLeaseForTenantAmino {
    return o && (o.$typeUrl === MsgCreateLeaseForTenant.typeUrl || typeof o.authority === "string" && typeof o.tenant === "string" && Array.isArray(o.items) && (!o.items.length || LeaseItemInput.isAmino(o.items[0])));
  },
  encode(message: MsgCreateLeaseForTenant, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.tenant !== "") {
      writer.uint32(18).string(message.tenant);
    }
    for (const v of message.items) {
      LeaseItemInput.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateLeaseForTenant {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateLeaseForTenant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.tenant = reader.string();
          break;
        case 3:
          message.items.push(LeaseItemInput.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateLeaseForTenant {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      tenant: isSet(object.tenant) ? String(object.tenant) : "",
      items: Array.isArray(object?.items) ? object.items.map((e: any) => LeaseItemInput.fromJSON(e)) : []
    };
  },
  toJSON(message: MsgCreateLeaseForTenant): JsonSafe<MsgCreateLeaseForTenant> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.tenant !== undefined && (obj.tenant = message.tenant);
    if (message.items) {
      obj.items = message.items.map(e => e ? LeaseItemInput.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateLeaseForTenant>, I>>(object: I): MsgCreateLeaseForTenant {
    const message = createBaseMsgCreateLeaseForTenant();
    message.authority = object.authority ?? "";
    message.tenant = object.tenant ?? "";
    message.items = object.items?.map(e => LeaseItemInput.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgCreateLeaseForTenantAmino): MsgCreateLeaseForTenant {
    const message = createBaseMsgCreateLeaseForTenant();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.tenant !== undefined && object.tenant !== null) {
      message.tenant = object.tenant;
    }
    message.items = object.items?.map(e => LeaseItemInput.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgCreateLeaseForTenant): MsgCreateLeaseForTenantAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.tenant = message.tenant === "" ? undefined : message.tenant;
    if (message.items) {
      obj.items = message.items.map(e => e ? LeaseItemInput.toAmino(e) : undefined);
    } else {
      obj.items = message.items;
    }
    return obj;
  },
  fromAminoMsg(object: MsgCreateLeaseForTenantAminoMsg): MsgCreateLeaseForTenant {
    return MsgCreateLeaseForTenant.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateLeaseForTenant): MsgCreateLeaseForTenantAminoMsg {
    return {
      type: "lifted/billing/MsgCreateLeaseForTenant",
      value: MsgCreateLeaseForTenant.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgCreateLeaseForTenantProtoMsg): MsgCreateLeaseForTenant {
    return MsgCreateLeaseForTenant.decode(message.value);
  },
  toProto(message: MsgCreateLeaseForTenant): Uint8Array {
    return MsgCreateLeaseForTenant.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateLeaseForTenant): MsgCreateLeaseForTenantProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseForTenant",
      value: MsgCreateLeaseForTenant.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateLeaseForTenant.typeUrl, MsgCreateLeaseForTenant);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCreateLeaseForTenant.aminoType, MsgCreateLeaseForTenant.typeUrl);
function createBaseMsgCreateLeaseForTenantResponse(): MsgCreateLeaseForTenantResponse {
  return {
    leaseUuid: ""
  };
}
export const MsgCreateLeaseForTenantResponse = {
  typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseForTenantResponse",
  is(o: any): o is MsgCreateLeaseForTenantResponse {
    return o && (o.$typeUrl === MsgCreateLeaseForTenantResponse.typeUrl || typeof o.leaseUuid === "string");
  },
  isSDK(o: any): o is MsgCreateLeaseForTenantResponseSDKType {
    return o && (o.$typeUrl === MsgCreateLeaseForTenantResponse.typeUrl || typeof o.lease_uuid === "string");
  },
  isAmino(o: any): o is MsgCreateLeaseForTenantResponseAmino {
    return o && (o.$typeUrl === MsgCreateLeaseForTenantResponse.typeUrl || typeof o.lease_uuid === "string");
  },
  encode(message: MsgCreateLeaseForTenantResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.leaseUuid !== "") {
      writer.uint32(10).string(message.leaseUuid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateLeaseForTenantResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateLeaseForTenantResponse();
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
  fromJSON(object: any): MsgCreateLeaseForTenantResponse {
    return {
      leaseUuid: isSet(object.leaseUuid) ? String(object.leaseUuid) : ""
    };
  },
  toJSON(message: MsgCreateLeaseForTenantResponse): JsonSafe<MsgCreateLeaseForTenantResponse> {
    const obj: any = {};
    message.leaseUuid !== undefined && (obj.leaseUuid = message.leaseUuid);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateLeaseForTenantResponse>, I>>(object: I): MsgCreateLeaseForTenantResponse {
    const message = createBaseMsgCreateLeaseForTenantResponse();
    message.leaseUuid = object.leaseUuid ?? "";
    return message;
  },
  fromAmino(object: MsgCreateLeaseForTenantResponseAmino): MsgCreateLeaseForTenantResponse {
    const message = createBaseMsgCreateLeaseForTenantResponse();
    if (object.lease_uuid !== undefined && object.lease_uuid !== null) {
      message.leaseUuid = object.lease_uuid;
    }
    return message;
  },
  toAmino(message: MsgCreateLeaseForTenantResponse): MsgCreateLeaseForTenantResponseAmino {
    const obj: any = {};
    obj.lease_uuid = message.leaseUuid === "" ? undefined : message.leaseUuid;
    return obj;
  },
  fromAminoMsg(object: MsgCreateLeaseForTenantResponseAminoMsg): MsgCreateLeaseForTenantResponse {
    return MsgCreateLeaseForTenantResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateLeaseForTenantResponseProtoMsg): MsgCreateLeaseForTenantResponse {
    return MsgCreateLeaseForTenantResponse.decode(message.value);
  },
  toProto(message: MsgCreateLeaseForTenantResponse): Uint8Array {
    return MsgCreateLeaseForTenantResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateLeaseForTenantResponse): MsgCreateLeaseForTenantResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseForTenantResponse",
      value: MsgCreateLeaseForTenantResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateLeaseForTenantResponse.typeUrl, MsgCreateLeaseForTenantResponse);
function createBaseMsgCloseLease(): MsgCloseLease {
  return {
    sender: "",
    leaseUuids: []
  };
}
export const MsgCloseLease = {
  typeUrl: "/liftedinit.billing.v1.MsgCloseLease",
  aminoType: "lifted/billing/MsgCloseLease",
  is(o: any): o is MsgCloseLease {
    return o && (o.$typeUrl === MsgCloseLease.typeUrl || typeof o.sender === "string" && Array.isArray(o.leaseUuids) && (!o.leaseUuids.length || typeof o.leaseUuids[0] === "string"));
  },
  isSDK(o: any): o is MsgCloseLeaseSDKType {
    return o && (o.$typeUrl === MsgCloseLease.typeUrl || typeof o.sender === "string" && Array.isArray(o.lease_uuids) && (!o.lease_uuids.length || typeof o.lease_uuids[0] === "string"));
  },
  isAmino(o: any): o is MsgCloseLeaseAmino {
    return o && (o.$typeUrl === MsgCloseLease.typeUrl || typeof o.sender === "string" && Array.isArray(o.lease_uuids) && (!o.lease_uuids.length || typeof o.lease_uuids[0] === "string"));
  },
  encode(message: MsgCloseLease, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.leaseUuids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCloseLease {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCloseLease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.leaseUuids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCloseLease {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      leaseUuids: Array.isArray(object?.leaseUuids) ? object.leaseUuids.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: MsgCloseLease): JsonSafe<MsgCloseLease> {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    if (message.leaseUuids) {
      obj.leaseUuids = message.leaseUuids.map(e => e);
    } else {
      obj.leaseUuids = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCloseLease>, I>>(object: I): MsgCloseLease {
    const message = createBaseMsgCloseLease();
    message.sender = object.sender ?? "";
    message.leaseUuids = object.leaseUuids?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgCloseLeaseAmino): MsgCloseLease {
    const message = createBaseMsgCloseLease();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.leaseUuids = object.lease_uuids?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgCloseLease): MsgCloseLeaseAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.leaseUuids) {
      obj.lease_uuids = message.leaseUuids.map(e => e);
    } else {
      obj.lease_uuids = message.leaseUuids;
    }
    return obj;
  },
  fromAminoMsg(object: MsgCloseLeaseAminoMsg): MsgCloseLease {
    return MsgCloseLease.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCloseLease): MsgCloseLeaseAminoMsg {
    return {
      type: "lifted/billing/MsgCloseLease",
      value: MsgCloseLease.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgCloseLeaseProtoMsg): MsgCloseLease {
    return MsgCloseLease.decode(message.value);
  },
  toProto(message: MsgCloseLease): Uint8Array {
    return MsgCloseLease.encode(message).finish();
  },
  toProtoMsg(message: MsgCloseLease): MsgCloseLeaseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgCloseLease",
      value: MsgCloseLease.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCloseLease.typeUrl, MsgCloseLease);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCloseLease.aminoType, MsgCloseLease.typeUrl);
function createBaseMsgCloseLeaseResponse(): MsgCloseLeaseResponse {
  return {
    closedAt: new Date(),
    closedCount: BigInt(0),
    totalSettledAmounts: []
  };
}
export const MsgCloseLeaseResponse = {
  typeUrl: "/liftedinit.billing.v1.MsgCloseLeaseResponse",
  is(o: any): o is MsgCloseLeaseResponse {
    return o && (o.$typeUrl === MsgCloseLeaseResponse.typeUrl || Timestamp.is(o.closedAt) && typeof o.closedCount === "bigint" && Array.isArray(o.totalSettledAmounts) && (!o.totalSettledAmounts.length || Coin.is(o.totalSettledAmounts[0])));
  },
  isSDK(o: any): o is MsgCloseLeaseResponseSDKType {
    return o && (o.$typeUrl === MsgCloseLeaseResponse.typeUrl || Timestamp.isSDK(o.closed_at) && typeof o.closed_count === "bigint" && Array.isArray(o.total_settled_amounts) && (!o.total_settled_amounts.length || Coin.isSDK(o.total_settled_amounts[0])));
  },
  isAmino(o: any): o is MsgCloseLeaseResponseAmino {
    return o && (o.$typeUrl === MsgCloseLeaseResponse.typeUrl || Timestamp.isAmino(o.closed_at) && typeof o.closed_count === "bigint" && Array.isArray(o.total_settled_amounts) && (!o.total_settled_amounts.length || Coin.isAmino(o.total_settled_amounts[0])));
  },
  encode(message: MsgCloseLeaseResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.closedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.closedAt), writer.uint32(10).fork()).ldelim();
    }
    if (message.closedCount !== BigInt(0)) {
      writer.uint32(16).uint64(message.closedCount);
    }
    for (const v of message.totalSettledAmounts) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCloseLeaseResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCloseLeaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.closedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.closedCount = reader.uint64();
          break;
        case 3:
          message.totalSettledAmounts.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCloseLeaseResponse {
    return {
      closedAt: isSet(object.closedAt) ? new Date(object.closedAt) : undefined,
      closedCount: isSet(object.closedCount) ? BigInt(object.closedCount.toString()) : BigInt(0),
      totalSettledAmounts: Array.isArray(object?.totalSettledAmounts) ? object.totalSettledAmounts.map((e: any) => Coin.fromJSON(e)) : []
    };
  },
  toJSON(message: MsgCloseLeaseResponse): JsonSafe<MsgCloseLeaseResponse> {
    const obj: any = {};
    message.closedAt !== undefined && (obj.closedAt = message.closedAt.toISOString());
    message.closedCount !== undefined && (obj.closedCount = (message.closedCount || BigInt(0)).toString());
    if (message.totalSettledAmounts) {
      obj.totalSettledAmounts = message.totalSettledAmounts.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.totalSettledAmounts = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCloseLeaseResponse>, I>>(object: I): MsgCloseLeaseResponse {
    const message = createBaseMsgCloseLeaseResponse();
    message.closedAt = object.closedAt ?? undefined;
    message.closedCount = object.closedCount !== undefined && object.closedCount !== null ? BigInt(object.closedCount.toString()) : BigInt(0);
    message.totalSettledAmounts = object.totalSettledAmounts?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgCloseLeaseResponseAmino): MsgCloseLeaseResponse {
    const message = createBaseMsgCloseLeaseResponse();
    if (object.closed_at !== undefined && object.closed_at !== null) {
      message.closedAt = fromTimestamp(Timestamp.fromAmino(object.closed_at));
    }
    if (object.closed_count !== undefined && object.closed_count !== null) {
      message.closedCount = BigInt(object.closed_count);
    }
    message.totalSettledAmounts = object.total_settled_amounts?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgCloseLeaseResponse): MsgCloseLeaseResponseAmino {
    const obj: any = {};
    obj.closed_at = message.closedAt ? Timestamp.toAmino(toTimestamp(message.closedAt)) : new Date();
    obj.closed_count = message.closedCount ? message.closedCount?.toString() : "0";
    if (message.totalSettledAmounts) {
      obj.total_settled_amounts = message.totalSettledAmounts.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.total_settled_amounts = message.totalSettledAmounts;
    }
    return obj;
  },
  fromAminoMsg(object: MsgCloseLeaseResponseAminoMsg): MsgCloseLeaseResponse {
    return MsgCloseLeaseResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCloseLeaseResponseProtoMsg): MsgCloseLeaseResponse {
    return MsgCloseLeaseResponse.decode(message.value);
  },
  toProto(message: MsgCloseLeaseResponse): Uint8Array {
    return MsgCloseLeaseResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCloseLeaseResponse): MsgCloseLeaseResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgCloseLeaseResponse",
      value: MsgCloseLeaseResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCloseLeaseResponse.typeUrl, MsgCloseLeaseResponse);
function createBaseMsgWithdraw(): MsgWithdraw {
  return {
    sender: "",
    leaseUuids: [],
    providerUuid: "",
    limit: BigInt(0)
  };
}
export const MsgWithdraw = {
  typeUrl: "/liftedinit.billing.v1.MsgWithdraw",
  aminoType: "lifted/billing/MsgWithdraw",
  is(o: any): o is MsgWithdraw {
    return o && (o.$typeUrl === MsgWithdraw.typeUrl || typeof o.sender === "string" && Array.isArray(o.leaseUuids) && (!o.leaseUuids.length || typeof o.leaseUuids[0] === "string") && typeof o.providerUuid === "string" && typeof o.limit === "bigint");
  },
  isSDK(o: any): o is MsgWithdrawSDKType {
    return o && (o.$typeUrl === MsgWithdraw.typeUrl || typeof o.sender === "string" && Array.isArray(o.lease_uuids) && (!o.lease_uuids.length || typeof o.lease_uuids[0] === "string") && typeof o.provider_uuid === "string" && typeof o.limit === "bigint");
  },
  isAmino(o: any): o is MsgWithdrawAmino {
    return o && (o.$typeUrl === MsgWithdraw.typeUrl || typeof o.sender === "string" && Array.isArray(o.lease_uuids) && (!o.lease_uuids.length || typeof o.lease_uuids[0] === "string") && typeof o.provider_uuid === "string" && typeof o.limit === "bigint");
  },
  encode(message: MsgWithdraw, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.leaseUuids) {
      writer.uint32(18).string(v!);
    }
    if (message.providerUuid !== "") {
      writer.uint32(26).string(message.providerUuid);
    }
    if (message.limit !== BigInt(0)) {
      writer.uint32(32).uint64(message.limit);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgWithdraw {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdraw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.leaseUuids.push(reader.string());
          break;
        case 3:
          message.providerUuid = reader.string();
          break;
        case 4:
          message.limit = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgWithdraw {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      leaseUuids: Array.isArray(object?.leaseUuids) ? object.leaseUuids.map((e: any) => String(e)) : [],
      providerUuid: isSet(object.providerUuid) ? String(object.providerUuid) : "",
      limit: isSet(object.limit) ? BigInt(object.limit.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgWithdraw): JsonSafe<MsgWithdraw> {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    if (message.leaseUuids) {
      obj.leaseUuids = message.leaseUuids.map(e => e);
    } else {
      obj.leaseUuids = [];
    }
    message.providerUuid !== undefined && (obj.providerUuid = message.providerUuid);
    message.limit !== undefined && (obj.limit = (message.limit || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgWithdraw>, I>>(object: I): MsgWithdraw {
    const message = createBaseMsgWithdraw();
    message.sender = object.sender ?? "";
    message.leaseUuids = object.leaseUuids?.map(e => e) || [];
    message.providerUuid = object.providerUuid ?? "";
    message.limit = object.limit !== undefined && object.limit !== null ? BigInt(object.limit.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgWithdrawAmino): MsgWithdraw {
    const message = createBaseMsgWithdraw();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.leaseUuids = object.lease_uuids?.map(e => e) || [];
    if (object.provider_uuid !== undefined && object.provider_uuid !== null) {
      message.providerUuid = object.provider_uuid;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = BigInt(object.limit);
    }
    return message;
  },
  toAmino(message: MsgWithdraw): MsgWithdrawAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.leaseUuids) {
      obj.lease_uuids = message.leaseUuids.map(e => e);
    } else {
      obj.lease_uuids = message.leaseUuids;
    }
    obj.provider_uuid = message.providerUuid === "" ? undefined : message.providerUuid;
    obj.limit = message.limit !== BigInt(0) ? message.limit?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawAminoMsg): MsgWithdraw {
    return MsgWithdraw.fromAmino(object.value);
  },
  toAminoMsg(message: MsgWithdraw): MsgWithdrawAminoMsg {
    return {
      type: "lifted/billing/MsgWithdraw",
      value: MsgWithdraw.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgWithdrawProtoMsg): MsgWithdraw {
    return MsgWithdraw.decode(message.value);
  },
  toProto(message: MsgWithdraw): Uint8Array {
    return MsgWithdraw.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdraw): MsgWithdrawProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgWithdraw",
      value: MsgWithdraw.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgWithdraw.typeUrl, MsgWithdraw);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgWithdraw.aminoType, MsgWithdraw.typeUrl);
function createBaseMsgWithdrawResponse(): MsgWithdrawResponse {
  return {
    totalAmounts: [],
    payoutAddress: "",
    withdrawalCount: BigInt(0),
    hasMore: false
  };
}
export const MsgWithdrawResponse = {
  typeUrl: "/liftedinit.billing.v1.MsgWithdrawResponse",
  is(o: any): o is MsgWithdrawResponse {
    return o && (o.$typeUrl === MsgWithdrawResponse.typeUrl || Array.isArray(o.totalAmounts) && (!o.totalAmounts.length || Coin.is(o.totalAmounts[0])) && typeof o.payoutAddress === "string" && typeof o.withdrawalCount === "bigint" && typeof o.hasMore === "boolean");
  },
  isSDK(o: any): o is MsgWithdrawResponseSDKType {
    return o && (o.$typeUrl === MsgWithdrawResponse.typeUrl || Array.isArray(o.total_amounts) && (!o.total_amounts.length || Coin.isSDK(o.total_amounts[0])) && typeof o.payout_address === "string" && typeof o.withdrawal_count === "bigint" && typeof o.has_more === "boolean");
  },
  isAmino(o: any): o is MsgWithdrawResponseAmino {
    return o && (o.$typeUrl === MsgWithdrawResponse.typeUrl || Array.isArray(o.total_amounts) && (!o.total_amounts.length || Coin.isAmino(o.total_amounts[0])) && typeof o.payout_address === "string" && typeof o.withdrawal_count === "bigint" && typeof o.has_more === "boolean");
  },
  encode(message: MsgWithdrawResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.totalAmounts) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.payoutAddress !== "") {
      writer.uint32(18).string(message.payoutAddress);
    }
    if (message.withdrawalCount !== BigInt(0)) {
      writer.uint32(24).uint64(message.withdrawalCount);
    }
    if (message.hasMore === true) {
      writer.uint32(32).bool(message.hasMore);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgWithdrawResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalAmounts.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.payoutAddress = reader.string();
          break;
        case 3:
          message.withdrawalCount = reader.uint64();
          break;
        case 4:
          message.hasMore = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgWithdrawResponse {
    return {
      totalAmounts: Array.isArray(object?.totalAmounts) ? object.totalAmounts.map((e: any) => Coin.fromJSON(e)) : [],
      payoutAddress: isSet(object.payoutAddress) ? String(object.payoutAddress) : "",
      withdrawalCount: isSet(object.withdrawalCount) ? BigInt(object.withdrawalCount.toString()) : BigInt(0),
      hasMore: isSet(object.hasMore) ? Boolean(object.hasMore) : false
    };
  },
  toJSON(message: MsgWithdrawResponse): JsonSafe<MsgWithdrawResponse> {
    const obj: any = {};
    if (message.totalAmounts) {
      obj.totalAmounts = message.totalAmounts.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.totalAmounts = [];
    }
    message.payoutAddress !== undefined && (obj.payoutAddress = message.payoutAddress);
    message.withdrawalCount !== undefined && (obj.withdrawalCount = (message.withdrawalCount || BigInt(0)).toString());
    message.hasMore !== undefined && (obj.hasMore = message.hasMore);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgWithdrawResponse>, I>>(object: I): MsgWithdrawResponse {
    const message = createBaseMsgWithdrawResponse();
    message.totalAmounts = object.totalAmounts?.map(e => Coin.fromPartial(e)) || [];
    message.payoutAddress = object.payoutAddress ?? "";
    message.withdrawalCount = object.withdrawalCount !== undefined && object.withdrawalCount !== null ? BigInt(object.withdrawalCount.toString()) : BigInt(0);
    message.hasMore = object.hasMore ?? false;
    return message;
  },
  fromAmino(object: MsgWithdrawResponseAmino): MsgWithdrawResponse {
    const message = createBaseMsgWithdrawResponse();
    message.totalAmounts = object.total_amounts?.map(e => Coin.fromAmino(e)) || [];
    if (object.payout_address !== undefined && object.payout_address !== null) {
      message.payoutAddress = object.payout_address;
    }
    if (object.withdrawal_count !== undefined && object.withdrawal_count !== null) {
      message.withdrawalCount = BigInt(object.withdrawal_count);
    }
    if (object.has_more !== undefined && object.has_more !== null) {
      message.hasMore = object.has_more;
    }
    return message;
  },
  toAmino(message: MsgWithdrawResponse): MsgWithdrawResponseAmino {
    const obj: any = {};
    if (message.totalAmounts) {
      obj.total_amounts = message.totalAmounts.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.total_amounts = message.totalAmounts;
    }
    obj.payout_address = message.payoutAddress === "" ? undefined : message.payoutAddress;
    obj.withdrawal_count = message.withdrawalCount !== BigInt(0) ? message.withdrawalCount?.toString() : undefined;
    obj.has_more = message.hasMore === false ? undefined : message.hasMore;
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawResponseAminoMsg): MsgWithdrawResponse {
    return MsgWithdrawResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgWithdrawResponseProtoMsg): MsgWithdrawResponse {
    return MsgWithdrawResponse.decode(message.value);
  },
  toProto(message: MsgWithdrawResponse): Uint8Array {
    return MsgWithdrawResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawResponse): MsgWithdrawResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgWithdrawResponse",
      value: MsgWithdrawResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgWithdrawResponse.typeUrl, MsgWithdrawResponse);
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/liftedinit.billing.v1.MsgUpdateParams",
  aminoType: "lifted/billing/MsgUpdateParams",
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
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams): MsgUpdateParamsAminoMsg {
    return {
      type: "lifted/billing/MsgUpdateParams",
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
      typeUrl: "/liftedinit.billing.v1.MsgUpdateParams",
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
  typeUrl: "/liftedinit.billing.v1.MsgUpdateParamsResponse",
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
      typeUrl: "/liftedinit.billing.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateParamsResponse.typeUrl, MsgUpdateParamsResponse);
function createBaseMsgAcknowledgeLease(): MsgAcknowledgeLease {
  return {
    sender: "",
    leaseUuids: []
  };
}
export const MsgAcknowledgeLease = {
  typeUrl: "/liftedinit.billing.v1.MsgAcknowledgeLease",
  aminoType: "lifted/billing/MsgAcknowledgeLease",
  is(o: any): o is MsgAcknowledgeLease {
    return o && (o.$typeUrl === MsgAcknowledgeLease.typeUrl || typeof o.sender === "string" && Array.isArray(o.leaseUuids) && (!o.leaseUuids.length || typeof o.leaseUuids[0] === "string"));
  },
  isSDK(o: any): o is MsgAcknowledgeLeaseSDKType {
    return o && (o.$typeUrl === MsgAcknowledgeLease.typeUrl || typeof o.sender === "string" && Array.isArray(o.lease_uuids) && (!o.lease_uuids.length || typeof o.lease_uuids[0] === "string"));
  },
  isAmino(o: any): o is MsgAcknowledgeLeaseAmino {
    return o && (o.$typeUrl === MsgAcknowledgeLease.typeUrl || typeof o.sender === "string" && Array.isArray(o.lease_uuids) && (!o.lease_uuids.length || typeof o.lease_uuids[0] === "string"));
  },
  encode(message: MsgAcknowledgeLease, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.leaseUuids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAcknowledgeLease {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcknowledgeLease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.leaseUuids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgAcknowledgeLease {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      leaseUuids: Array.isArray(object?.leaseUuids) ? object.leaseUuids.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: MsgAcknowledgeLease): JsonSafe<MsgAcknowledgeLease> {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    if (message.leaseUuids) {
      obj.leaseUuids = message.leaseUuids.map(e => e);
    } else {
      obj.leaseUuids = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgAcknowledgeLease>, I>>(object: I): MsgAcknowledgeLease {
    const message = createBaseMsgAcknowledgeLease();
    message.sender = object.sender ?? "";
    message.leaseUuids = object.leaseUuids?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgAcknowledgeLeaseAmino): MsgAcknowledgeLease {
    const message = createBaseMsgAcknowledgeLease();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.leaseUuids = object.lease_uuids?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgAcknowledgeLease): MsgAcknowledgeLeaseAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.leaseUuids) {
      obj.lease_uuids = message.leaseUuids.map(e => e);
    } else {
      obj.lease_uuids = message.leaseUuids;
    }
    return obj;
  },
  fromAminoMsg(object: MsgAcknowledgeLeaseAminoMsg): MsgAcknowledgeLease {
    return MsgAcknowledgeLease.fromAmino(object.value);
  },
  toAminoMsg(message: MsgAcknowledgeLease): MsgAcknowledgeLeaseAminoMsg {
    return {
      type: "lifted/billing/MsgAcknowledgeLease",
      value: MsgAcknowledgeLease.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgAcknowledgeLeaseProtoMsg): MsgAcknowledgeLease {
    return MsgAcknowledgeLease.decode(message.value);
  },
  toProto(message: MsgAcknowledgeLease): Uint8Array {
    return MsgAcknowledgeLease.encode(message).finish();
  },
  toProtoMsg(message: MsgAcknowledgeLease): MsgAcknowledgeLeaseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgAcknowledgeLease",
      value: MsgAcknowledgeLease.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgAcknowledgeLease.typeUrl, MsgAcknowledgeLease);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgAcknowledgeLease.aminoType, MsgAcknowledgeLease.typeUrl);
function createBaseMsgAcknowledgeLeaseResponse(): MsgAcknowledgeLeaseResponse {
  return {
    acknowledgedAt: new Date(),
    acknowledgedCount: BigInt(0)
  };
}
export const MsgAcknowledgeLeaseResponse = {
  typeUrl: "/liftedinit.billing.v1.MsgAcknowledgeLeaseResponse",
  is(o: any): o is MsgAcknowledgeLeaseResponse {
    return o && (o.$typeUrl === MsgAcknowledgeLeaseResponse.typeUrl || Timestamp.is(o.acknowledgedAt) && typeof o.acknowledgedCount === "bigint");
  },
  isSDK(o: any): o is MsgAcknowledgeLeaseResponseSDKType {
    return o && (o.$typeUrl === MsgAcknowledgeLeaseResponse.typeUrl || Timestamp.isSDK(o.acknowledged_at) && typeof o.acknowledged_count === "bigint");
  },
  isAmino(o: any): o is MsgAcknowledgeLeaseResponseAmino {
    return o && (o.$typeUrl === MsgAcknowledgeLeaseResponse.typeUrl || Timestamp.isAmino(o.acknowledged_at) && typeof o.acknowledged_count === "bigint");
  },
  encode(message: MsgAcknowledgeLeaseResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.acknowledgedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.acknowledgedAt), writer.uint32(10).fork()).ldelim();
    }
    if (message.acknowledgedCount !== BigInt(0)) {
      writer.uint32(16).uint64(message.acknowledgedCount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAcknowledgeLeaseResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcknowledgeLeaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.acknowledgedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.acknowledgedCount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgAcknowledgeLeaseResponse {
    return {
      acknowledgedAt: isSet(object.acknowledgedAt) ? new Date(object.acknowledgedAt) : undefined,
      acknowledgedCount: isSet(object.acknowledgedCount) ? BigInt(object.acknowledgedCount.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgAcknowledgeLeaseResponse): JsonSafe<MsgAcknowledgeLeaseResponse> {
    const obj: any = {};
    message.acknowledgedAt !== undefined && (obj.acknowledgedAt = message.acknowledgedAt.toISOString());
    message.acknowledgedCount !== undefined && (obj.acknowledgedCount = (message.acknowledgedCount || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgAcknowledgeLeaseResponse>, I>>(object: I): MsgAcknowledgeLeaseResponse {
    const message = createBaseMsgAcknowledgeLeaseResponse();
    message.acknowledgedAt = object.acknowledgedAt ?? undefined;
    message.acknowledgedCount = object.acknowledgedCount !== undefined && object.acknowledgedCount !== null ? BigInt(object.acknowledgedCount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgAcknowledgeLeaseResponseAmino): MsgAcknowledgeLeaseResponse {
    const message = createBaseMsgAcknowledgeLeaseResponse();
    if (object.acknowledged_at !== undefined && object.acknowledged_at !== null) {
      message.acknowledgedAt = fromTimestamp(Timestamp.fromAmino(object.acknowledged_at));
    }
    if (object.acknowledged_count !== undefined && object.acknowledged_count !== null) {
      message.acknowledgedCount = BigInt(object.acknowledged_count);
    }
    return message;
  },
  toAmino(message: MsgAcknowledgeLeaseResponse): MsgAcknowledgeLeaseResponseAmino {
    const obj: any = {};
    obj.acknowledged_at = message.acknowledgedAt ? Timestamp.toAmino(toTimestamp(message.acknowledgedAt)) : new Date();
    obj.acknowledged_count = message.acknowledgedCount ? message.acknowledgedCount?.toString() : "0";
    return obj;
  },
  fromAminoMsg(object: MsgAcknowledgeLeaseResponseAminoMsg): MsgAcknowledgeLeaseResponse {
    return MsgAcknowledgeLeaseResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAcknowledgeLeaseResponseProtoMsg): MsgAcknowledgeLeaseResponse {
    return MsgAcknowledgeLeaseResponse.decode(message.value);
  },
  toProto(message: MsgAcknowledgeLeaseResponse): Uint8Array {
    return MsgAcknowledgeLeaseResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAcknowledgeLeaseResponse): MsgAcknowledgeLeaseResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgAcknowledgeLeaseResponse",
      value: MsgAcknowledgeLeaseResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgAcknowledgeLeaseResponse.typeUrl, MsgAcknowledgeLeaseResponse);
function createBaseMsgRejectLease(): MsgRejectLease {
  return {
    sender: "",
    leaseUuids: [],
    reason: ""
  };
}
export const MsgRejectLease = {
  typeUrl: "/liftedinit.billing.v1.MsgRejectLease",
  aminoType: "lifted/billing/MsgRejectLease",
  is(o: any): o is MsgRejectLease {
    return o && (o.$typeUrl === MsgRejectLease.typeUrl || typeof o.sender === "string" && Array.isArray(o.leaseUuids) && (!o.leaseUuids.length || typeof o.leaseUuids[0] === "string") && typeof o.reason === "string");
  },
  isSDK(o: any): o is MsgRejectLeaseSDKType {
    return o && (o.$typeUrl === MsgRejectLease.typeUrl || typeof o.sender === "string" && Array.isArray(o.lease_uuids) && (!o.lease_uuids.length || typeof o.lease_uuids[0] === "string") && typeof o.reason === "string");
  },
  isAmino(o: any): o is MsgRejectLeaseAmino {
    return o && (o.$typeUrl === MsgRejectLease.typeUrl || typeof o.sender === "string" && Array.isArray(o.lease_uuids) && (!o.lease_uuids.length || typeof o.lease_uuids[0] === "string") && typeof o.reason === "string");
  },
  encode(message: MsgRejectLease, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.leaseUuids) {
      writer.uint32(18).string(v!);
    }
    if (message.reason !== "") {
      writer.uint32(26).string(message.reason);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRejectLease {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRejectLease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.leaseUuids.push(reader.string());
          break;
        case 3:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRejectLease {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      leaseUuids: Array.isArray(object?.leaseUuids) ? object.leaseUuids.map((e: any) => String(e)) : [],
      reason: isSet(object.reason) ? String(object.reason) : ""
    };
  },
  toJSON(message: MsgRejectLease): JsonSafe<MsgRejectLease> {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    if (message.leaseUuids) {
      obj.leaseUuids = message.leaseUuids.map(e => e);
    } else {
      obj.leaseUuids = [];
    }
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgRejectLease>, I>>(object: I): MsgRejectLease {
    const message = createBaseMsgRejectLease();
    message.sender = object.sender ?? "";
    message.leaseUuids = object.leaseUuids?.map(e => e) || [];
    message.reason = object.reason ?? "";
    return message;
  },
  fromAmino(object: MsgRejectLeaseAmino): MsgRejectLease {
    const message = createBaseMsgRejectLease();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.leaseUuids = object.lease_uuids?.map(e => e) || [];
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = object.reason;
    }
    return message;
  },
  toAmino(message: MsgRejectLease): MsgRejectLeaseAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.leaseUuids) {
      obj.lease_uuids = message.leaseUuids.map(e => e);
    } else {
      obj.lease_uuids = message.leaseUuids;
    }
    obj.reason = message.reason === "" ? undefined : message.reason;
    return obj;
  },
  fromAminoMsg(object: MsgRejectLeaseAminoMsg): MsgRejectLease {
    return MsgRejectLease.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRejectLease): MsgRejectLeaseAminoMsg {
    return {
      type: "lifted/billing/MsgRejectLease",
      value: MsgRejectLease.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgRejectLeaseProtoMsg): MsgRejectLease {
    return MsgRejectLease.decode(message.value);
  },
  toProto(message: MsgRejectLease): Uint8Array {
    return MsgRejectLease.encode(message).finish();
  },
  toProtoMsg(message: MsgRejectLease): MsgRejectLeaseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgRejectLease",
      value: MsgRejectLease.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgRejectLease.typeUrl, MsgRejectLease);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgRejectLease.aminoType, MsgRejectLease.typeUrl);
function createBaseMsgRejectLeaseResponse(): MsgRejectLeaseResponse {
  return {
    rejectedAt: new Date(),
    rejectedCount: BigInt(0)
  };
}
export const MsgRejectLeaseResponse = {
  typeUrl: "/liftedinit.billing.v1.MsgRejectLeaseResponse",
  is(o: any): o is MsgRejectLeaseResponse {
    return o && (o.$typeUrl === MsgRejectLeaseResponse.typeUrl || Timestamp.is(o.rejectedAt) && typeof o.rejectedCount === "bigint");
  },
  isSDK(o: any): o is MsgRejectLeaseResponseSDKType {
    return o && (o.$typeUrl === MsgRejectLeaseResponse.typeUrl || Timestamp.isSDK(o.rejected_at) && typeof o.rejected_count === "bigint");
  },
  isAmino(o: any): o is MsgRejectLeaseResponseAmino {
    return o && (o.$typeUrl === MsgRejectLeaseResponse.typeUrl || Timestamp.isAmino(o.rejected_at) && typeof o.rejected_count === "bigint");
  },
  encode(message: MsgRejectLeaseResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rejectedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.rejectedAt), writer.uint32(10).fork()).ldelim();
    }
    if (message.rejectedCount !== BigInt(0)) {
      writer.uint32(16).uint64(message.rejectedCount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRejectLeaseResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRejectLeaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rejectedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.rejectedCount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRejectLeaseResponse {
    return {
      rejectedAt: isSet(object.rejectedAt) ? new Date(object.rejectedAt) : undefined,
      rejectedCount: isSet(object.rejectedCount) ? BigInt(object.rejectedCount.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgRejectLeaseResponse): JsonSafe<MsgRejectLeaseResponse> {
    const obj: any = {};
    message.rejectedAt !== undefined && (obj.rejectedAt = message.rejectedAt.toISOString());
    message.rejectedCount !== undefined && (obj.rejectedCount = (message.rejectedCount || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgRejectLeaseResponse>, I>>(object: I): MsgRejectLeaseResponse {
    const message = createBaseMsgRejectLeaseResponse();
    message.rejectedAt = object.rejectedAt ?? undefined;
    message.rejectedCount = object.rejectedCount !== undefined && object.rejectedCount !== null ? BigInt(object.rejectedCount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgRejectLeaseResponseAmino): MsgRejectLeaseResponse {
    const message = createBaseMsgRejectLeaseResponse();
    if (object.rejected_at !== undefined && object.rejected_at !== null) {
      message.rejectedAt = fromTimestamp(Timestamp.fromAmino(object.rejected_at));
    }
    if (object.rejected_count !== undefined && object.rejected_count !== null) {
      message.rejectedCount = BigInt(object.rejected_count);
    }
    return message;
  },
  toAmino(message: MsgRejectLeaseResponse): MsgRejectLeaseResponseAmino {
    const obj: any = {};
    obj.rejected_at = message.rejectedAt ? Timestamp.toAmino(toTimestamp(message.rejectedAt)) : new Date();
    obj.rejected_count = message.rejectedCount ? message.rejectedCount?.toString() : "0";
    return obj;
  },
  fromAminoMsg(object: MsgRejectLeaseResponseAminoMsg): MsgRejectLeaseResponse {
    return MsgRejectLeaseResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRejectLeaseResponseProtoMsg): MsgRejectLeaseResponse {
    return MsgRejectLeaseResponse.decode(message.value);
  },
  toProto(message: MsgRejectLeaseResponse): Uint8Array {
    return MsgRejectLeaseResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRejectLeaseResponse): MsgRejectLeaseResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgRejectLeaseResponse",
      value: MsgRejectLeaseResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgRejectLeaseResponse.typeUrl, MsgRejectLeaseResponse);
function createBaseMsgCancelLease(): MsgCancelLease {
  return {
    tenant: "",
    leaseUuids: []
  };
}
export const MsgCancelLease = {
  typeUrl: "/liftedinit.billing.v1.MsgCancelLease",
  aminoType: "lifted/billing/MsgCancelLease",
  is(o: any): o is MsgCancelLease {
    return o && (o.$typeUrl === MsgCancelLease.typeUrl || typeof o.tenant === "string" && Array.isArray(o.leaseUuids) && (!o.leaseUuids.length || typeof o.leaseUuids[0] === "string"));
  },
  isSDK(o: any): o is MsgCancelLeaseSDKType {
    return o && (o.$typeUrl === MsgCancelLease.typeUrl || typeof o.tenant === "string" && Array.isArray(o.lease_uuids) && (!o.lease_uuids.length || typeof o.lease_uuids[0] === "string"));
  },
  isAmino(o: any): o is MsgCancelLeaseAmino {
    return o && (o.$typeUrl === MsgCancelLease.typeUrl || typeof o.tenant === "string" && Array.isArray(o.lease_uuids) && (!o.lease_uuids.length || typeof o.lease_uuids[0] === "string"));
  },
  encode(message: MsgCancelLease, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tenant !== "") {
      writer.uint32(10).string(message.tenant);
    }
    for (const v of message.leaseUuids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelLease {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelLease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tenant = reader.string();
          break;
        case 2:
          message.leaseUuids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCancelLease {
    return {
      tenant: isSet(object.tenant) ? String(object.tenant) : "",
      leaseUuids: Array.isArray(object?.leaseUuids) ? object.leaseUuids.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: MsgCancelLease): JsonSafe<MsgCancelLease> {
    const obj: any = {};
    message.tenant !== undefined && (obj.tenant = message.tenant);
    if (message.leaseUuids) {
      obj.leaseUuids = message.leaseUuids.map(e => e);
    } else {
      obj.leaseUuids = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCancelLease>, I>>(object: I): MsgCancelLease {
    const message = createBaseMsgCancelLease();
    message.tenant = object.tenant ?? "";
    message.leaseUuids = object.leaseUuids?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgCancelLeaseAmino): MsgCancelLease {
    const message = createBaseMsgCancelLease();
    if (object.tenant !== undefined && object.tenant !== null) {
      message.tenant = object.tenant;
    }
    message.leaseUuids = object.lease_uuids?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgCancelLease): MsgCancelLeaseAmino {
    const obj: any = {};
    obj.tenant = message.tenant === "" ? undefined : message.tenant;
    if (message.leaseUuids) {
      obj.lease_uuids = message.leaseUuids.map(e => e);
    } else {
      obj.lease_uuids = message.leaseUuids;
    }
    return obj;
  },
  fromAminoMsg(object: MsgCancelLeaseAminoMsg): MsgCancelLease {
    return MsgCancelLease.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCancelLease): MsgCancelLeaseAminoMsg {
    return {
      type: "lifted/billing/MsgCancelLease",
      value: MsgCancelLease.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgCancelLeaseProtoMsg): MsgCancelLease {
    return MsgCancelLease.decode(message.value);
  },
  toProto(message: MsgCancelLease): Uint8Array {
    return MsgCancelLease.encode(message).finish();
  },
  toProtoMsg(message: MsgCancelLease): MsgCancelLeaseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgCancelLease",
      value: MsgCancelLease.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCancelLease.typeUrl, MsgCancelLease);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCancelLease.aminoType, MsgCancelLease.typeUrl);
function createBaseMsgCancelLeaseResponse(): MsgCancelLeaseResponse {
  return {
    cancelledAt: new Date(),
    cancelledCount: BigInt(0)
  };
}
export const MsgCancelLeaseResponse = {
  typeUrl: "/liftedinit.billing.v1.MsgCancelLeaseResponse",
  is(o: any): o is MsgCancelLeaseResponse {
    return o && (o.$typeUrl === MsgCancelLeaseResponse.typeUrl || Timestamp.is(o.cancelledAt) && typeof o.cancelledCount === "bigint");
  },
  isSDK(o: any): o is MsgCancelLeaseResponseSDKType {
    return o && (o.$typeUrl === MsgCancelLeaseResponse.typeUrl || Timestamp.isSDK(o.cancelled_at) && typeof o.cancelled_count === "bigint");
  },
  isAmino(o: any): o is MsgCancelLeaseResponseAmino {
    return o && (o.$typeUrl === MsgCancelLeaseResponse.typeUrl || Timestamp.isAmino(o.cancelled_at) && typeof o.cancelled_count === "bigint");
  },
  encode(message: MsgCancelLeaseResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.cancelledAt !== undefined) {
      Timestamp.encode(toTimestamp(message.cancelledAt), writer.uint32(10).fork()).ldelim();
    }
    if (message.cancelledCount !== BigInt(0)) {
      writer.uint32(16).uint64(message.cancelledCount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelLeaseResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelLeaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cancelledAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cancelledCount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCancelLeaseResponse {
    return {
      cancelledAt: isSet(object.cancelledAt) ? new Date(object.cancelledAt) : undefined,
      cancelledCount: isSet(object.cancelledCount) ? BigInt(object.cancelledCount.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgCancelLeaseResponse): JsonSafe<MsgCancelLeaseResponse> {
    const obj: any = {};
    message.cancelledAt !== undefined && (obj.cancelledAt = message.cancelledAt.toISOString());
    message.cancelledCount !== undefined && (obj.cancelledCount = (message.cancelledCount || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCancelLeaseResponse>, I>>(object: I): MsgCancelLeaseResponse {
    const message = createBaseMsgCancelLeaseResponse();
    message.cancelledAt = object.cancelledAt ?? undefined;
    message.cancelledCount = object.cancelledCount !== undefined && object.cancelledCount !== null ? BigInt(object.cancelledCount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgCancelLeaseResponseAmino): MsgCancelLeaseResponse {
    const message = createBaseMsgCancelLeaseResponse();
    if (object.cancelled_at !== undefined && object.cancelled_at !== null) {
      message.cancelledAt = fromTimestamp(Timestamp.fromAmino(object.cancelled_at));
    }
    if (object.cancelled_count !== undefined && object.cancelled_count !== null) {
      message.cancelledCount = BigInt(object.cancelled_count);
    }
    return message;
  },
  toAmino(message: MsgCancelLeaseResponse): MsgCancelLeaseResponseAmino {
    const obj: any = {};
    obj.cancelled_at = message.cancelledAt ? Timestamp.toAmino(toTimestamp(message.cancelledAt)) : new Date();
    obj.cancelled_count = message.cancelledCount !== BigInt(0) ? message.cancelledCount?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCancelLeaseResponseAminoMsg): MsgCancelLeaseResponse {
    return MsgCancelLeaseResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCancelLeaseResponseProtoMsg): MsgCancelLeaseResponse {
    return MsgCancelLeaseResponse.decode(message.value);
  },
  toProto(message: MsgCancelLeaseResponse): Uint8Array {
    return MsgCancelLeaseResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCancelLeaseResponse): MsgCancelLeaseResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.MsgCancelLeaseResponse",
      value: MsgCancelLeaseResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCancelLeaseResponse.typeUrl, MsgCancelLeaseResponse);