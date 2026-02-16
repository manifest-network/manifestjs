import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact, toTimestamp, fromTimestamp, bytesFromBase64, base64FromBytes } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
import { GlobalDecoderRegistry } from "../../../registry";
/** LeaseState defines the state of a lease. */
export enum LeaseState {
  /** LEASE_STATE_UNSPECIFIED - LEASE_STATE_UNSPECIFIED is the default value. */
  LEASE_STATE_UNSPECIFIED = 0,
  /**
   * LEASE_STATE_PENDING - LEASE_STATE_PENDING indicates the lease is awaiting provider acknowledgement.
   * Credit is locked but billing has not started.
   */
  LEASE_STATE_PENDING = 1,
  /**
   * LEASE_STATE_ACTIVE - LEASE_STATE_ACTIVE indicates the lease is active and accruing charges.
   * Provider has acknowledged and resources are provisioned.
   */
  LEASE_STATE_ACTIVE = 2,
  /**
   * LEASE_STATE_CLOSED - LEASE_STATE_CLOSED indicates the lease has been closed normally.
   * Final settlement has occurred.
   */
  LEASE_STATE_CLOSED = 3,
  /**
   * LEASE_STATE_REJECTED - LEASE_STATE_REJECTED indicates the provider rejected the lease.
   * Credit has been unlocked and returned to tenant.
   */
  LEASE_STATE_REJECTED = 4,
  /**
   * LEASE_STATE_EXPIRED - LEASE_STATE_EXPIRED indicates the lease expired while in PENDING state.
   * Provider did not acknowledge within the timeout period.
   * Credit has been unlocked and returned to tenant.
   */
  LEASE_STATE_EXPIRED = 5,
  UNRECOGNIZED = -1,
}
export const LeaseStateSDKType = LeaseState;
export const LeaseStateAmino = LeaseState;
export function leaseStateFromJSON(object: any): LeaseState {
  switch (object) {
    case 0:
    case "LEASE_STATE_UNSPECIFIED":
      return LeaseState.LEASE_STATE_UNSPECIFIED;
    case 1:
    case "LEASE_STATE_PENDING":
      return LeaseState.LEASE_STATE_PENDING;
    case 2:
    case "LEASE_STATE_ACTIVE":
      return LeaseState.LEASE_STATE_ACTIVE;
    case 3:
    case "LEASE_STATE_CLOSED":
      return LeaseState.LEASE_STATE_CLOSED;
    case 4:
    case "LEASE_STATE_REJECTED":
      return LeaseState.LEASE_STATE_REJECTED;
    case 5:
    case "LEASE_STATE_EXPIRED":
      return LeaseState.LEASE_STATE_EXPIRED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LeaseState.UNRECOGNIZED;
  }
}
export function leaseStateToJSON(object: LeaseState): string {
  switch (object) {
    case LeaseState.LEASE_STATE_UNSPECIFIED:
      return "LEASE_STATE_UNSPECIFIED";
    case LeaseState.LEASE_STATE_PENDING:
      return "LEASE_STATE_PENDING";
    case LeaseState.LEASE_STATE_ACTIVE:
      return "LEASE_STATE_ACTIVE";
    case LeaseState.LEASE_STATE_CLOSED:
      return "LEASE_STATE_CLOSED";
    case LeaseState.LEASE_STATE_REJECTED:
      return "LEASE_STATE_REJECTED";
    case LeaseState.LEASE_STATE_EXPIRED:
      return "LEASE_STATE_EXPIRED";
    case LeaseState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Params defines the parameters for the billing module. */
export interface Params {
  /**
   * max_leases_per_tenant is the maximum number of active leases a tenant can have.
   * Must be greater than zero.
   */
  maxLeasesPerTenant: bigint;
  /**
   * allowed_list is the list of addresses allowed to create leases on behalf of tenants
   * in addition to the module authority.
   */
  allowedList: string[];
  /**
   * max_items_per_lease is the maximum number of items (SKUs) allowed in a single lease.
   * Must be greater than zero. Prevents excessive gas consumption from large leases.
   */
  maxItemsPerLease: bigint;
  /**
   * min_lease_duration is the minimum duration (in seconds) that a tenant's credit balance
   * must be able to cover when creating a lease. This prevents tenants from creating leases
   * that would immediately exhaust their credit. Default is 3600 (1 hour).
   */
  minLeaseDuration: bigint;
  /**
   * max_pending_leases_per_tenant is the maximum number of PENDING leases a tenant can have.
   * Prevents spam attacks where tenants create many leases that providers must process.
   * Default is 10.
   */
  maxPendingLeasesPerTenant: bigint;
  /**
   * pending_timeout is the duration in seconds that a lease can remain in PENDING state
   * before it expires. Applies globally to all providers. Default is 1800 (30 minutes).
   * Must be between 60 (1 minute) and 86400 (24 hours).
   */
  pendingTimeout: bigint;
}
export interface ParamsProtoMsg {
  typeUrl: "/liftedinit.billing.v1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the billing module. */
export interface ParamsAmino {
  /**
   * max_leases_per_tenant is the maximum number of active leases a tenant can have.
   * Must be greater than zero.
   */
  max_leases_per_tenant?: string;
  /**
   * allowed_list is the list of addresses allowed to create leases on behalf of tenants
   * in addition to the module authority.
   */
  allowed_list?: string[];
  /**
   * max_items_per_lease is the maximum number of items (SKUs) allowed in a single lease.
   * Must be greater than zero. Prevents excessive gas consumption from large leases.
   */
  max_items_per_lease?: string;
  /**
   * min_lease_duration is the minimum duration (in seconds) that a tenant's credit balance
   * must be able to cover when creating a lease. This prevents tenants from creating leases
   * that would immediately exhaust their credit. Default is 3600 (1 hour).
   */
  min_lease_duration?: string;
  /**
   * max_pending_leases_per_tenant is the maximum number of PENDING leases a tenant can have.
   * Prevents spam attacks where tenants create many leases that providers must process.
   * Default is 10.
   */
  max_pending_leases_per_tenant?: string;
  /**
   * pending_timeout is the duration in seconds that a lease can remain in PENDING state
   * before it expires. Applies globally to all providers. Default is 1800 (30 minutes).
   * Must be between 60 (1 minute) and 86400 (24 hours).
   */
  pending_timeout?: string;
}
export interface ParamsAminoMsg {
  type: "lifted/billing/Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the billing module. */
export interface ParamsSDKType {
  max_leases_per_tenant: bigint;
  allowed_list: string[];
  max_items_per_lease: bigint;
  min_lease_duration: bigint;
  max_pending_leases_per_tenant: bigint;
  pending_timeout: bigint;
}
/** LeaseItem represents a single SKU item within a lease. */
export interface LeaseItem {
  /** sku_uuid is the UUID of the SKU being leased. */
  skuUuid: string;
  /** quantity is the number of instances of this SKU. */
  quantity: bigint;
  /**
   * locked_price is the price per unit locked at lease creation (per second).
   * The denom comes from the SKU's base_price at lease creation time.
   */
  lockedPrice: Coin;
  /**
   * service_name is an optional DNS-label identifier for this item within a stack deployment.
   * Must be a valid RFC 1123 DNS label: 1-63 lowercase alphanumeric characters or hyphens,
   * must not start or end with a hyphen (e.g., "web", "db", "my-service-1").
   * When used, all items must have a service_name and uniqueness shifts from sku_uuid to service_name,
   * allowing the same SKU to appear multiple times (e.g., "web" and "db" both using docker-small).
   */
  serviceName: string;
}
export interface LeaseItemProtoMsg {
  typeUrl: "/liftedinit.billing.v1.LeaseItem";
  value: Uint8Array;
}
/** LeaseItem represents a single SKU item within a lease. */
export interface LeaseItemAmino {
  /** sku_uuid is the UUID of the SKU being leased. */
  sku_uuid?: string;
  /** quantity is the number of instances of this SKU. */
  quantity?: string;
  /**
   * locked_price is the price per unit locked at lease creation (per second).
   * The denom comes from the SKU's base_price at lease creation time.
   */
  locked_price: CoinAmino;
  /**
   * service_name is an optional DNS-label identifier for this item within a stack deployment.
   * Must be a valid RFC 1123 DNS label: 1-63 lowercase alphanumeric characters or hyphens,
   * must not start or end with a hyphen (e.g., "web", "db", "my-service-1").
   * When used, all items must have a service_name and uniqueness shifts from sku_uuid to service_name,
   * allowing the same SKU to appear multiple times (e.g., "web" and "db" both using docker-small).
   */
  service_name?: string;
}
export interface LeaseItemAminoMsg {
  type: "lifted/billing/LeaseItem";
  value: LeaseItemAmino;
}
/** LeaseItem represents a single SKU item within a lease. */
export interface LeaseItemSDKType {
  sku_uuid: string;
  quantity: bigint;
  locked_price: CoinSDKType;
  service_name: string;
}
/** Lease represents a billing lease between a tenant and provider. */
export interface Lease {
  /** uuid is the unique identifier of the lease (UUIDv7 format). */
  uuid: string;
  /** tenant is the address of the tenant who owns this lease. */
  tenant: string;
  /** provider_uuid is the provider UUID (denormalized from SKUs for efficient querying). */
  providerUuid: string;
  /** items is the list of SKU items in this lease. */
  items: LeaseItem[];
  /** state is the current state of the lease. */
  state: LeaseState;
  /**
   * created_at is the timestamp when the lease was created.
   * Credit is locked at this time.
   */
  createdAt: Date;
  /** closed_at is the timestamp when the lease was closed (if CLOSED state). */
  closedAt?: Date;
  /**
   * last_settled_at is the timestamp of the last settlement/withdrawal.
   * Only applicable for ACTIVE and CLOSED states.
   */
  lastSettledAt: Date;
  /**
   * acknowledged_at is the timestamp when the provider acknowledged the lease.
   * Only set when state transitions from PENDING to ACTIVE.
   * Billing starts from this timestamp.
   */
  acknowledgedAt?: Date;
  /**
   * rejected_at is the timestamp when the provider rejected the lease.
   * Only set when state is REJECTED.
   */
  rejectedAt?: Date;
  /**
   * rejection_reason is a free-form explanation for why the lease was rejected.
   * Only set when state is REJECTED. Maximum 256 characters.
   */
  rejectionReason: string;
  /**
   * expired_at is the timestamp when the lease expired while in PENDING state.
   * Only set when state is EXPIRED.
   */
  expiredAt?: Date;
  /**
   * closure_reason is a free-form explanation for why the lease was closed.
   * Only set when state is CLOSED. Maximum 256 characters.
   */
  closureReason: string;
  /**
   * meta_hash is an optional hash/reference to off-chain deployment data.
   * Set once at lease creation and immutable. Maximum 64 bytes.
   */
  metaHash: Uint8Array;
  /**
   * min_lease_duration_at_creation stores the min_lease_duration parameter value
   * at the time this lease was created. This ensures consistent reservation
   * calculation regardless of subsequent parameter changes.
   * reservation = sum(locked_price × quantity) × min_lease_duration_at_creation
   */
  minLeaseDurationAtCreation: bigint;
}
export interface LeaseProtoMsg {
  typeUrl: "/liftedinit.billing.v1.Lease";
  value: Uint8Array;
}
/** Lease represents a billing lease between a tenant and provider. */
export interface LeaseAmino {
  /** uuid is the unique identifier of the lease (UUIDv7 format). */
  uuid?: string;
  /** tenant is the address of the tenant who owns this lease. */
  tenant?: string;
  /** provider_uuid is the provider UUID (denormalized from SKUs for efficient querying). */
  provider_uuid?: string;
  /** items is the list of SKU items in this lease. */
  items: LeaseItemAmino[];
  /** state is the current state of the lease. */
  state?: LeaseState;
  /**
   * created_at is the timestamp when the lease was created.
   * Credit is locked at this time.
   */
  created_at: string;
  /** closed_at is the timestamp when the lease was closed (if CLOSED state). */
  closed_at?: string;
  /**
   * last_settled_at is the timestamp of the last settlement/withdrawal.
   * Only applicable for ACTIVE and CLOSED states.
   */
  last_settled_at: string;
  /**
   * acknowledged_at is the timestamp when the provider acknowledged the lease.
   * Only set when state transitions from PENDING to ACTIVE.
   * Billing starts from this timestamp.
   */
  acknowledged_at?: string;
  /**
   * rejected_at is the timestamp when the provider rejected the lease.
   * Only set when state is REJECTED.
   */
  rejected_at?: string;
  /**
   * rejection_reason is a free-form explanation for why the lease was rejected.
   * Only set when state is REJECTED. Maximum 256 characters.
   */
  rejection_reason?: string;
  /**
   * expired_at is the timestamp when the lease expired while in PENDING state.
   * Only set when state is EXPIRED.
   */
  expired_at?: string;
  /**
   * closure_reason is a free-form explanation for why the lease was closed.
   * Only set when state is CLOSED. Maximum 256 characters.
   */
  closure_reason?: string;
  /**
   * meta_hash is an optional hash/reference to off-chain deployment data.
   * Set once at lease creation and immutable. Maximum 64 bytes.
   */
  meta_hash?: string;
  /**
   * min_lease_duration_at_creation stores the min_lease_duration parameter value
   * at the time this lease was created. This ensures consistent reservation
   * calculation regardless of subsequent parameter changes.
   * reservation = sum(locked_price × quantity) × min_lease_duration_at_creation
   */
  min_lease_duration_at_creation?: string;
}
export interface LeaseAminoMsg {
  type: "lifted/billing/Lease";
  value: LeaseAmino;
}
/** Lease represents a billing lease between a tenant and provider. */
export interface LeaseSDKType {
  uuid: string;
  tenant: string;
  provider_uuid: string;
  items: LeaseItemSDKType[];
  state: LeaseState;
  created_at: Date;
  closed_at?: Date;
  last_settled_at: Date;
  acknowledged_at?: Date;
  rejected_at?: Date;
  rejection_reason: string;
  expired_at?: Date;
  closure_reason: string;
  meta_hash: Uint8Array;
  min_lease_duration_at_creation: bigint;
}
/**
 * CreditAccount represents a tenant's credit account.
 * The actual balance is tracked by the bank module at the credit_address.
 */
export interface CreditAccount {
  /** tenant is the address of the tenant who owns this credit account. */
  tenant: string;
  /** credit_address is the derived address where credit funds are held. */
  creditAddress: string;
  /** active_lease_count tracks the number of active leases for O(1) count queries. */
  activeLeaseCount: bigint;
  /**
   * pending_lease_count tracks the number of pending leases for O(1) count queries.
   * Used to enforce max_pending_leases_per_tenant limit.
   */
  pendingLeaseCount: bigint;
  /**
   * reserved_amounts holds the sum of all credit reservations for active and pending leases.
   * Each lease reserves: rate_per_second × min_lease_duration for each denom.
   * This prevents overbooking by ensuring credit availability before lease creation.
   */
  reservedAmounts: Coin[];
}
export interface CreditAccountProtoMsg {
  typeUrl: "/liftedinit.billing.v1.CreditAccount";
  value: Uint8Array;
}
/**
 * CreditAccount represents a tenant's credit account.
 * The actual balance is tracked by the bank module at the credit_address.
 */
export interface CreditAccountAmino {
  /** tenant is the address of the tenant who owns this credit account. */
  tenant?: string;
  /** credit_address is the derived address where credit funds are held. */
  credit_address?: string;
  /** active_lease_count tracks the number of active leases for O(1) count queries. */
  active_lease_count?: string;
  /**
   * pending_lease_count tracks the number of pending leases for O(1) count queries.
   * Used to enforce max_pending_leases_per_tenant limit.
   */
  pending_lease_count?: string;
  /**
   * reserved_amounts holds the sum of all credit reservations for active and pending leases.
   * Each lease reserves: rate_per_second × min_lease_duration for each denom.
   * This prevents overbooking by ensuring credit availability before lease creation.
   */
  reserved_amounts: CoinAmino[];
}
export interface CreditAccountAminoMsg {
  type: "lifted/billing/CreditAccount";
  value: CreditAccountAmino;
}
/**
 * CreditAccount represents a tenant's credit account.
 * The actual balance is tracked by the bank module at the credit_address.
 */
export interface CreditAccountSDKType {
  tenant: string;
  credit_address: string;
  active_lease_count: bigint;
  pending_lease_count: bigint;
  reserved_amounts: CoinSDKType[];
}
function createBaseParams(): Params {
  return {
    maxLeasesPerTenant: BigInt(0),
    allowedList: [],
    maxItemsPerLease: BigInt(0),
    minLeaseDuration: BigInt(0),
    maxPendingLeasesPerTenant: BigInt(0),
    pendingTimeout: BigInt(0)
  };
}
export const Params = {
  typeUrl: "/liftedinit.billing.v1.Params",
  aminoType: "lifted/billing/Params",
  is(o: any): o is Params {
    return o && (o.$typeUrl === Params.typeUrl || typeof o.maxLeasesPerTenant === "bigint" && Array.isArray(o.allowedList) && (!o.allowedList.length || typeof o.allowedList[0] === "string") && typeof o.maxItemsPerLease === "bigint" && typeof o.minLeaseDuration === "bigint" && typeof o.maxPendingLeasesPerTenant === "bigint" && typeof o.pendingTimeout === "bigint");
  },
  isSDK(o: any): o is ParamsSDKType {
    return o && (o.$typeUrl === Params.typeUrl || typeof o.max_leases_per_tenant === "bigint" && Array.isArray(o.allowed_list) && (!o.allowed_list.length || typeof o.allowed_list[0] === "string") && typeof o.max_items_per_lease === "bigint" && typeof o.min_lease_duration === "bigint" && typeof o.max_pending_leases_per_tenant === "bigint" && typeof o.pending_timeout === "bigint");
  },
  isAmino(o: any): o is ParamsAmino {
    return o && (o.$typeUrl === Params.typeUrl || typeof o.max_leases_per_tenant === "bigint" && Array.isArray(o.allowed_list) && (!o.allowed_list.length || typeof o.allowed_list[0] === "string") && typeof o.max_items_per_lease === "bigint" && typeof o.min_lease_duration === "bigint" && typeof o.max_pending_leases_per_tenant === "bigint" && typeof o.pending_timeout === "bigint");
  },
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.maxLeasesPerTenant !== BigInt(0)) {
      writer.uint32(8).uint64(message.maxLeasesPerTenant);
    }
    for (const v of message.allowedList) {
      writer.uint32(18).string(v!);
    }
    if (message.maxItemsPerLease !== BigInt(0)) {
      writer.uint32(24).uint64(message.maxItemsPerLease);
    }
    if (message.minLeaseDuration !== BigInt(0)) {
      writer.uint32(32).uint64(message.minLeaseDuration);
    }
    if (message.maxPendingLeasesPerTenant !== BigInt(0)) {
      writer.uint32(40).uint64(message.maxPendingLeasesPerTenant);
    }
    if (message.pendingTimeout !== BigInt(0)) {
      writer.uint32(48).uint64(message.pendingTimeout);
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
          message.maxLeasesPerTenant = reader.uint64();
          break;
        case 2:
          message.allowedList.push(reader.string());
          break;
        case 3:
          message.maxItemsPerLease = reader.uint64();
          break;
        case 4:
          message.minLeaseDuration = reader.uint64();
          break;
        case 5:
          message.maxPendingLeasesPerTenant = reader.uint64();
          break;
        case 6:
          message.pendingTimeout = reader.uint64();
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
      maxLeasesPerTenant: isSet(object.maxLeasesPerTenant) ? BigInt(object.maxLeasesPerTenant.toString()) : BigInt(0),
      allowedList: Array.isArray(object?.allowedList) ? object.allowedList.map((e: any) => String(e)) : [],
      maxItemsPerLease: isSet(object.maxItemsPerLease) ? BigInt(object.maxItemsPerLease.toString()) : BigInt(0),
      minLeaseDuration: isSet(object.minLeaseDuration) ? BigInt(object.minLeaseDuration.toString()) : BigInt(0),
      maxPendingLeasesPerTenant: isSet(object.maxPendingLeasesPerTenant) ? BigInt(object.maxPendingLeasesPerTenant.toString()) : BigInt(0),
      pendingTimeout: isSet(object.pendingTimeout) ? BigInt(object.pendingTimeout.toString()) : BigInt(0)
    };
  },
  toJSON(message: Params): JsonSafe<Params> {
    const obj: any = {};
    message.maxLeasesPerTenant !== undefined && (obj.maxLeasesPerTenant = (message.maxLeasesPerTenant || BigInt(0)).toString());
    if (message.allowedList) {
      obj.allowedList = message.allowedList.map(e => e);
    } else {
      obj.allowedList = [];
    }
    message.maxItemsPerLease !== undefined && (obj.maxItemsPerLease = (message.maxItemsPerLease || BigInt(0)).toString());
    message.minLeaseDuration !== undefined && (obj.minLeaseDuration = (message.minLeaseDuration || BigInt(0)).toString());
    message.maxPendingLeasesPerTenant !== undefined && (obj.maxPendingLeasesPerTenant = (message.maxPendingLeasesPerTenant || BigInt(0)).toString());
    message.pendingTimeout !== undefined && (obj.pendingTimeout = (message.pendingTimeout || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.maxLeasesPerTenant = object.maxLeasesPerTenant !== undefined && object.maxLeasesPerTenant !== null ? BigInt(object.maxLeasesPerTenant.toString()) : BigInt(0);
    message.allowedList = object.allowedList?.map(e => e) || [];
    message.maxItemsPerLease = object.maxItemsPerLease !== undefined && object.maxItemsPerLease !== null ? BigInt(object.maxItemsPerLease.toString()) : BigInt(0);
    message.minLeaseDuration = object.minLeaseDuration !== undefined && object.minLeaseDuration !== null ? BigInt(object.minLeaseDuration.toString()) : BigInt(0);
    message.maxPendingLeasesPerTenant = object.maxPendingLeasesPerTenant !== undefined && object.maxPendingLeasesPerTenant !== null ? BigInt(object.maxPendingLeasesPerTenant.toString()) : BigInt(0);
    message.pendingTimeout = object.pendingTimeout !== undefined && object.pendingTimeout !== null ? BigInt(object.pendingTimeout.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.max_leases_per_tenant !== undefined && object.max_leases_per_tenant !== null) {
      message.maxLeasesPerTenant = BigInt(object.max_leases_per_tenant);
    }
    message.allowedList = object.allowed_list?.map(e => e) || [];
    if (object.max_items_per_lease !== undefined && object.max_items_per_lease !== null) {
      message.maxItemsPerLease = BigInt(object.max_items_per_lease);
    }
    if (object.min_lease_duration !== undefined && object.min_lease_duration !== null) {
      message.minLeaseDuration = BigInt(object.min_lease_duration);
    }
    if (object.max_pending_leases_per_tenant !== undefined && object.max_pending_leases_per_tenant !== null) {
      message.maxPendingLeasesPerTenant = BigInt(object.max_pending_leases_per_tenant);
    }
    if (object.pending_timeout !== undefined && object.pending_timeout !== null) {
      message.pendingTimeout = BigInt(object.pending_timeout);
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.max_leases_per_tenant = message.maxLeasesPerTenant !== BigInt(0) ? message.maxLeasesPerTenant?.toString() : undefined;
    if (message.allowedList) {
      obj.allowed_list = message.allowedList.map(e => e);
    } else {
      obj.allowed_list = message.allowedList;
    }
    obj.max_items_per_lease = message.maxItemsPerLease !== BigInt(0) ? message.maxItemsPerLease?.toString() : undefined;
    obj.min_lease_duration = message.minLeaseDuration !== BigInt(0) ? message.minLeaseDuration?.toString() : undefined;
    obj.max_pending_leases_per_tenant = message.maxPendingLeasesPerTenant !== BigInt(0) ? message.maxPendingLeasesPerTenant?.toString() : undefined;
    obj.pending_timeout = message.pendingTimeout !== BigInt(0) ? message.pendingTimeout?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  toAminoMsg(message: Params): ParamsAminoMsg {
    return {
      type: "lifted/billing/Params",
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
      typeUrl: "/liftedinit.billing.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(Params.typeUrl, Params);
GlobalDecoderRegistry.registerAminoProtoMapping(Params.aminoType, Params.typeUrl);
function createBaseLeaseItem(): LeaseItem {
  return {
    skuUuid: "",
    quantity: BigInt(0),
    lockedPrice: Coin.fromPartial({}),
    serviceName: ""
  };
}
export const LeaseItem = {
  typeUrl: "/liftedinit.billing.v1.LeaseItem",
  aminoType: "lifted/billing/LeaseItem",
  is(o: any): o is LeaseItem {
    return o && (o.$typeUrl === LeaseItem.typeUrl || typeof o.skuUuid === "string" && typeof o.quantity === "bigint" && Coin.is(o.lockedPrice) && typeof o.serviceName === "string");
  },
  isSDK(o: any): o is LeaseItemSDKType {
    return o && (o.$typeUrl === LeaseItem.typeUrl || typeof o.sku_uuid === "string" && typeof o.quantity === "bigint" && Coin.isSDK(o.locked_price) && typeof o.service_name === "string");
  },
  isAmino(o: any): o is LeaseItemAmino {
    return o && (o.$typeUrl === LeaseItem.typeUrl || typeof o.sku_uuid === "string" && typeof o.quantity === "bigint" && Coin.isAmino(o.locked_price) && typeof o.service_name === "string");
  },
  encode(message: LeaseItem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.skuUuid !== "") {
      writer.uint32(10).string(message.skuUuid);
    }
    if (message.quantity !== BigInt(0)) {
      writer.uint32(16).uint64(message.quantity);
    }
    if (message.lockedPrice !== undefined) {
      Coin.encode(message.lockedPrice, writer.uint32(26).fork()).ldelim();
    }
    if (message.serviceName !== "") {
      writer.uint32(34).string(message.serviceName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LeaseItem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaseItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.skuUuid = reader.string();
          break;
        case 2:
          message.quantity = reader.uint64();
          break;
        case 3:
          message.lockedPrice = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.serviceName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): LeaseItem {
    return {
      skuUuid: isSet(object.skuUuid) ? String(object.skuUuid) : "",
      quantity: isSet(object.quantity) ? BigInt(object.quantity.toString()) : BigInt(0),
      lockedPrice: isSet(object.lockedPrice) ? Coin.fromJSON(object.lockedPrice) : undefined,
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : ""
    };
  },
  toJSON(message: LeaseItem): JsonSafe<LeaseItem> {
    const obj: any = {};
    message.skuUuid !== undefined && (obj.skuUuid = message.skuUuid);
    message.quantity !== undefined && (obj.quantity = (message.quantity || BigInt(0)).toString());
    message.lockedPrice !== undefined && (obj.lockedPrice = message.lockedPrice ? Coin.toJSON(message.lockedPrice) : undefined);
    message.serviceName !== undefined && (obj.serviceName = message.serviceName);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<LeaseItem>, I>>(object: I): LeaseItem {
    const message = createBaseLeaseItem();
    message.skuUuid = object.skuUuid ?? "";
    message.quantity = object.quantity !== undefined && object.quantity !== null ? BigInt(object.quantity.toString()) : BigInt(0);
    message.lockedPrice = object.lockedPrice !== undefined && object.lockedPrice !== null ? Coin.fromPartial(object.lockedPrice) : undefined;
    message.serviceName = object.serviceName ?? "";
    return message;
  },
  fromAmino(object: LeaseItemAmino): LeaseItem {
    const message = createBaseLeaseItem();
    if (object.sku_uuid !== undefined && object.sku_uuid !== null) {
      message.skuUuid = object.sku_uuid;
    }
    if (object.quantity !== undefined && object.quantity !== null) {
      message.quantity = BigInt(object.quantity);
    }
    if (object.locked_price !== undefined && object.locked_price !== null) {
      message.lockedPrice = Coin.fromAmino(object.locked_price);
    }
    if (object.service_name !== undefined && object.service_name !== null) {
      message.serviceName = object.service_name;
    }
    return message;
  },
  toAmino(message: LeaseItem): LeaseItemAmino {
    const obj: any = {};
    obj.sku_uuid = message.skuUuid === "" ? undefined : message.skuUuid;
    obj.quantity = message.quantity !== BigInt(0) ? message.quantity?.toString() : undefined;
    obj.locked_price = message.lockedPrice ? Coin.toAmino(message.lockedPrice) : Coin.toAmino(Coin.fromPartial({}));
    obj.service_name = message.serviceName === "" ? undefined : message.serviceName;
    return obj;
  },
  fromAminoMsg(object: LeaseItemAminoMsg): LeaseItem {
    return LeaseItem.fromAmino(object.value);
  },
  toAminoMsg(message: LeaseItem): LeaseItemAminoMsg {
    return {
      type: "lifted/billing/LeaseItem",
      value: LeaseItem.toAmino(message)
    };
  },
  fromProtoMsg(message: LeaseItemProtoMsg): LeaseItem {
    return LeaseItem.decode(message.value);
  },
  toProto(message: LeaseItem): Uint8Array {
    return LeaseItem.encode(message).finish();
  },
  toProtoMsg(message: LeaseItem): LeaseItemProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.LeaseItem",
      value: LeaseItem.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(LeaseItem.typeUrl, LeaseItem);
GlobalDecoderRegistry.registerAminoProtoMapping(LeaseItem.aminoType, LeaseItem.typeUrl);
function createBaseLease(): Lease {
  return {
    uuid: "",
    tenant: "",
    providerUuid: "",
    items: [],
    state: 0,
    createdAt: new Date(),
    closedAt: undefined,
    lastSettledAt: new Date(),
    acknowledgedAt: undefined,
    rejectedAt: undefined,
    rejectionReason: "",
    expiredAt: undefined,
    closureReason: "",
    metaHash: new Uint8Array(),
    minLeaseDurationAtCreation: BigInt(0)
  };
}
export const Lease = {
  typeUrl: "/liftedinit.billing.v1.Lease",
  aminoType: "lifted/billing/Lease",
  is(o: any): o is Lease {
    return o && (o.$typeUrl === Lease.typeUrl || typeof o.uuid === "string" && typeof o.tenant === "string" && typeof o.providerUuid === "string" && Array.isArray(o.items) && (!o.items.length || LeaseItem.is(o.items[0])) && isSet(o.state) && Timestamp.is(o.createdAt) && Timestamp.is(o.lastSettledAt) && typeof o.rejectionReason === "string" && typeof o.closureReason === "string" && (o.metaHash instanceof Uint8Array || typeof o.metaHash === "string") && typeof o.minLeaseDurationAtCreation === "bigint");
  },
  isSDK(o: any): o is LeaseSDKType {
    return o && (o.$typeUrl === Lease.typeUrl || typeof o.uuid === "string" && typeof o.tenant === "string" && typeof o.provider_uuid === "string" && Array.isArray(o.items) && (!o.items.length || LeaseItem.isSDK(o.items[0])) && isSet(o.state) && Timestamp.isSDK(o.created_at) && Timestamp.isSDK(o.last_settled_at) && typeof o.rejection_reason === "string" && typeof o.closure_reason === "string" && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string") && typeof o.min_lease_duration_at_creation === "bigint");
  },
  isAmino(o: any): o is LeaseAmino {
    return o && (o.$typeUrl === Lease.typeUrl || typeof o.uuid === "string" && typeof o.tenant === "string" && typeof o.provider_uuid === "string" && Array.isArray(o.items) && (!o.items.length || LeaseItem.isAmino(o.items[0])) && isSet(o.state) && Timestamp.isAmino(o.created_at) && Timestamp.isAmino(o.last_settled_at) && typeof o.rejection_reason === "string" && typeof o.closure_reason === "string" && (o.meta_hash instanceof Uint8Array || typeof o.meta_hash === "string") && typeof o.min_lease_duration_at_creation === "bigint");
  },
  encode(message: Lease, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.tenant !== "") {
      writer.uint32(18).string(message.tenant);
    }
    if (message.providerUuid !== "") {
      writer.uint32(26).string(message.providerUuid);
    }
    for (const v of message.items) {
      LeaseItem.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(40).int32(message.state);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(50).fork()).ldelim();
    }
    if (message.closedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.closedAt), writer.uint32(58).fork()).ldelim();
    }
    if (message.lastSettledAt !== undefined) {
      Timestamp.encode(toTimestamp(message.lastSettledAt), writer.uint32(66).fork()).ldelim();
    }
    if (message.acknowledgedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.acknowledgedAt), writer.uint32(74).fork()).ldelim();
    }
    if (message.rejectedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.rejectedAt), writer.uint32(82).fork()).ldelim();
    }
    if (message.rejectionReason !== "") {
      writer.uint32(90).string(message.rejectionReason);
    }
    if (message.expiredAt !== undefined) {
      Timestamp.encode(toTimestamp(message.expiredAt), writer.uint32(98).fork()).ldelim();
    }
    if (message.closureReason !== "") {
      writer.uint32(106).string(message.closureReason);
    }
    if (message.metaHash.length !== 0) {
      writer.uint32(114).bytes(message.metaHash);
    }
    if (message.minLeaseDurationAtCreation !== BigInt(0)) {
      writer.uint32(120).uint64(message.minLeaseDurationAtCreation);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Lease {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        case 2:
          message.tenant = reader.string();
          break;
        case 3:
          message.providerUuid = reader.string();
          break;
        case 4:
          message.items.push(LeaseItem.decode(reader, reader.uint32()));
          break;
        case 5:
          message.state = reader.int32() as any;
          break;
        case 6:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.closedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.lastSettledAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 9:
          message.acknowledgedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 10:
          message.rejectedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 11:
          message.rejectionReason = reader.string();
          break;
        case 12:
          message.expiredAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 13:
          message.closureReason = reader.string();
          break;
        case 14:
          message.metaHash = reader.bytes();
          break;
        case 15:
          message.minLeaseDurationAtCreation = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Lease {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : "",
      tenant: isSet(object.tenant) ? String(object.tenant) : "",
      providerUuid: isSet(object.providerUuid) ? String(object.providerUuid) : "",
      items: Array.isArray(object?.items) ? object.items.map((e: any) => LeaseItem.fromJSON(e)) : [],
      state: isSet(object.state) ? leaseStateFromJSON(object.state) : -1,
      createdAt: isSet(object.createdAt) ? new Date(object.createdAt) : undefined,
      closedAt: isSet(object.closedAt) ? new Date(object.closedAt) : undefined,
      lastSettledAt: isSet(object.lastSettledAt) ? new Date(object.lastSettledAt) : undefined,
      acknowledgedAt: isSet(object.acknowledgedAt) ? new Date(object.acknowledgedAt) : undefined,
      rejectedAt: isSet(object.rejectedAt) ? new Date(object.rejectedAt) : undefined,
      rejectionReason: isSet(object.rejectionReason) ? String(object.rejectionReason) : "",
      expiredAt: isSet(object.expiredAt) ? new Date(object.expiredAt) : undefined,
      closureReason: isSet(object.closureReason) ? String(object.closureReason) : "",
      metaHash: isSet(object.metaHash) ? bytesFromBase64(object.metaHash) : new Uint8Array(),
      minLeaseDurationAtCreation: isSet(object.minLeaseDurationAtCreation) ? BigInt(object.minLeaseDurationAtCreation.toString()) : BigInt(0)
    };
  },
  toJSON(message: Lease): JsonSafe<Lease> {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.tenant !== undefined && (obj.tenant = message.tenant);
    message.providerUuid !== undefined && (obj.providerUuid = message.providerUuid);
    if (message.items) {
      obj.items = message.items.map(e => e ? LeaseItem.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    message.state !== undefined && (obj.state = leaseStateToJSON(message.state));
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.closedAt !== undefined && (obj.closedAt = message.closedAt.toISOString());
    message.lastSettledAt !== undefined && (obj.lastSettledAt = message.lastSettledAt.toISOString());
    message.acknowledgedAt !== undefined && (obj.acknowledgedAt = message.acknowledgedAt.toISOString());
    message.rejectedAt !== undefined && (obj.rejectedAt = message.rejectedAt.toISOString());
    message.rejectionReason !== undefined && (obj.rejectionReason = message.rejectionReason);
    message.expiredAt !== undefined && (obj.expiredAt = message.expiredAt.toISOString());
    message.closureReason !== undefined && (obj.closureReason = message.closureReason);
    message.metaHash !== undefined && (obj.metaHash = base64FromBytes(message.metaHash !== undefined ? message.metaHash : new Uint8Array()));
    message.minLeaseDurationAtCreation !== undefined && (obj.minLeaseDurationAtCreation = (message.minLeaseDurationAtCreation || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Lease>, I>>(object: I): Lease {
    const message = createBaseLease();
    message.uuid = object.uuid ?? "";
    message.tenant = object.tenant ?? "";
    message.providerUuid = object.providerUuid ?? "";
    message.items = object.items?.map(e => LeaseItem.fromPartial(e)) || [];
    message.state = object.state ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.closedAt = object.closedAt ?? undefined;
    message.lastSettledAt = object.lastSettledAt ?? undefined;
    message.acknowledgedAt = object.acknowledgedAt ?? undefined;
    message.rejectedAt = object.rejectedAt ?? undefined;
    message.rejectionReason = object.rejectionReason ?? "";
    message.expiredAt = object.expiredAt ?? undefined;
    message.closureReason = object.closureReason ?? "";
    message.metaHash = object.metaHash ?? new Uint8Array();
    message.minLeaseDurationAtCreation = object.minLeaseDurationAtCreation !== undefined && object.minLeaseDurationAtCreation !== null ? BigInt(object.minLeaseDurationAtCreation.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: LeaseAmino): Lease {
    const message = createBaseLease();
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    }
    if (object.tenant !== undefined && object.tenant !== null) {
      message.tenant = object.tenant;
    }
    if (object.provider_uuid !== undefined && object.provider_uuid !== null) {
      message.providerUuid = object.provider_uuid;
    }
    message.items = object.items?.map(e => LeaseItem.fromAmino(e)) || [];
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    }
    if (object.created_at !== undefined && object.created_at !== null) {
      message.createdAt = fromTimestamp(Timestamp.fromAmino(object.created_at));
    }
    if (object.closed_at !== undefined && object.closed_at !== null) {
      message.closedAt = fromTimestamp(Timestamp.fromAmino(object.closed_at));
    }
    if (object.last_settled_at !== undefined && object.last_settled_at !== null) {
      message.lastSettledAt = fromTimestamp(Timestamp.fromAmino(object.last_settled_at));
    }
    if (object.acknowledged_at !== undefined && object.acknowledged_at !== null) {
      message.acknowledgedAt = fromTimestamp(Timestamp.fromAmino(object.acknowledged_at));
    }
    if (object.rejected_at !== undefined && object.rejected_at !== null) {
      message.rejectedAt = fromTimestamp(Timestamp.fromAmino(object.rejected_at));
    }
    if (object.rejection_reason !== undefined && object.rejection_reason !== null) {
      message.rejectionReason = object.rejection_reason;
    }
    if (object.expired_at !== undefined && object.expired_at !== null) {
      message.expiredAt = fromTimestamp(Timestamp.fromAmino(object.expired_at));
    }
    if (object.closure_reason !== undefined && object.closure_reason !== null) {
      message.closureReason = object.closure_reason;
    }
    if (object.meta_hash !== undefined && object.meta_hash !== null) {
      message.metaHash = bytesFromBase64(object.meta_hash);
    }
    if (object.min_lease_duration_at_creation !== undefined && object.min_lease_duration_at_creation !== null) {
      message.minLeaseDurationAtCreation = BigInt(object.min_lease_duration_at_creation);
    }
    return message;
  },
  toAmino(message: Lease): LeaseAmino {
    const obj: any = {};
    obj.uuid = message.uuid === "" ? undefined : message.uuid;
    obj.tenant = message.tenant === "" ? undefined : message.tenant;
    obj.provider_uuid = message.providerUuid === "" ? undefined : message.providerUuid;
    if (message.items) {
      obj.items = message.items.map(e => e ? LeaseItem.toAmino(e) : undefined);
    } else {
      obj.items = message.items;
    }
    obj.state = message.state === 0 ? undefined : message.state;
    obj.created_at = message.createdAt ? Timestamp.toAmino(toTimestamp(message.createdAt)) : new Date();
    obj.closed_at = message.closedAt ? Timestamp.toAmino(toTimestamp(message.closedAt)) : undefined;
    obj.last_settled_at = message.lastSettledAt ? Timestamp.toAmino(toTimestamp(message.lastSettledAt)) : new Date();
    obj.acknowledged_at = message.acknowledgedAt ? Timestamp.toAmino(toTimestamp(message.acknowledgedAt)) : undefined;
    obj.rejected_at = message.rejectedAt ? Timestamp.toAmino(toTimestamp(message.rejectedAt)) : undefined;
    obj.rejection_reason = message.rejectionReason === "" ? undefined : message.rejectionReason;
    obj.expired_at = message.expiredAt ? Timestamp.toAmino(toTimestamp(message.expiredAt)) : undefined;
    obj.closure_reason = message.closureReason === "" ? undefined : message.closureReason;
    obj.meta_hash = message.metaHash ? base64FromBytes(message.metaHash) : undefined;
    obj.min_lease_duration_at_creation = message.minLeaseDurationAtCreation !== BigInt(0) ? message.minLeaseDurationAtCreation?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: LeaseAminoMsg): Lease {
    return Lease.fromAmino(object.value);
  },
  toAminoMsg(message: Lease): LeaseAminoMsg {
    return {
      type: "lifted/billing/Lease",
      value: Lease.toAmino(message)
    };
  },
  fromProtoMsg(message: LeaseProtoMsg): Lease {
    return Lease.decode(message.value);
  },
  toProto(message: Lease): Uint8Array {
    return Lease.encode(message).finish();
  },
  toProtoMsg(message: Lease): LeaseProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.Lease",
      value: Lease.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(Lease.typeUrl, Lease);
GlobalDecoderRegistry.registerAminoProtoMapping(Lease.aminoType, Lease.typeUrl);
function createBaseCreditAccount(): CreditAccount {
  return {
    tenant: "",
    creditAddress: "",
    activeLeaseCount: BigInt(0),
    pendingLeaseCount: BigInt(0),
    reservedAmounts: []
  };
}
export const CreditAccount = {
  typeUrl: "/liftedinit.billing.v1.CreditAccount",
  aminoType: "lifted/billing/CreditAccount",
  is(o: any): o is CreditAccount {
    return o && (o.$typeUrl === CreditAccount.typeUrl || typeof o.tenant === "string" && typeof o.creditAddress === "string" && typeof o.activeLeaseCount === "bigint" && typeof o.pendingLeaseCount === "bigint" && Array.isArray(o.reservedAmounts) && (!o.reservedAmounts.length || Coin.is(o.reservedAmounts[0])));
  },
  isSDK(o: any): o is CreditAccountSDKType {
    return o && (o.$typeUrl === CreditAccount.typeUrl || typeof o.tenant === "string" && typeof o.credit_address === "string" && typeof o.active_lease_count === "bigint" && typeof o.pending_lease_count === "bigint" && Array.isArray(o.reserved_amounts) && (!o.reserved_amounts.length || Coin.isSDK(o.reserved_amounts[0])));
  },
  isAmino(o: any): o is CreditAccountAmino {
    return o && (o.$typeUrl === CreditAccount.typeUrl || typeof o.tenant === "string" && typeof o.credit_address === "string" && typeof o.active_lease_count === "bigint" && typeof o.pending_lease_count === "bigint" && Array.isArray(o.reserved_amounts) && (!o.reserved_amounts.length || Coin.isAmino(o.reserved_amounts[0])));
  },
  encode(message: CreditAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tenant !== "") {
      writer.uint32(10).string(message.tenant);
    }
    if (message.creditAddress !== "") {
      writer.uint32(18).string(message.creditAddress);
    }
    if (message.activeLeaseCount !== BigInt(0)) {
      writer.uint32(24).uint64(message.activeLeaseCount);
    }
    if (message.pendingLeaseCount !== BigInt(0)) {
      writer.uint32(32).uint64(message.pendingLeaseCount);
    }
    for (const v of message.reservedAmounts) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CreditAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreditAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tenant = reader.string();
          break;
        case 2:
          message.creditAddress = reader.string();
          break;
        case 3:
          message.activeLeaseCount = reader.uint64();
          break;
        case 4:
          message.pendingLeaseCount = reader.uint64();
          break;
        case 5:
          message.reservedAmounts.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreditAccount {
    return {
      tenant: isSet(object.tenant) ? String(object.tenant) : "",
      creditAddress: isSet(object.creditAddress) ? String(object.creditAddress) : "",
      activeLeaseCount: isSet(object.activeLeaseCount) ? BigInt(object.activeLeaseCount.toString()) : BigInt(0),
      pendingLeaseCount: isSet(object.pendingLeaseCount) ? BigInt(object.pendingLeaseCount.toString()) : BigInt(0),
      reservedAmounts: Array.isArray(object?.reservedAmounts) ? object.reservedAmounts.map((e: any) => Coin.fromJSON(e)) : []
    };
  },
  toJSON(message: CreditAccount): JsonSafe<CreditAccount> {
    const obj: any = {};
    message.tenant !== undefined && (obj.tenant = message.tenant);
    message.creditAddress !== undefined && (obj.creditAddress = message.creditAddress);
    message.activeLeaseCount !== undefined && (obj.activeLeaseCount = (message.activeLeaseCount || BigInt(0)).toString());
    message.pendingLeaseCount !== undefined && (obj.pendingLeaseCount = (message.pendingLeaseCount || BigInt(0)).toString());
    if (message.reservedAmounts) {
      obj.reservedAmounts = message.reservedAmounts.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.reservedAmounts = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<CreditAccount>, I>>(object: I): CreditAccount {
    const message = createBaseCreditAccount();
    message.tenant = object.tenant ?? "";
    message.creditAddress = object.creditAddress ?? "";
    message.activeLeaseCount = object.activeLeaseCount !== undefined && object.activeLeaseCount !== null ? BigInt(object.activeLeaseCount.toString()) : BigInt(0);
    message.pendingLeaseCount = object.pendingLeaseCount !== undefined && object.pendingLeaseCount !== null ? BigInt(object.pendingLeaseCount.toString()) : BigInt(0);
    message.reservedAmounts = object.reservedAmounts?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: CreditAccountAmino): CreditAccount {
    const message = createBaseCreditAccount();
    if (object.tenant !== undefined && object.tenant !== null) {
      message.tenant = object.tenant;
    }
    if (object.credit_address !== undefined && object.credit_address !== null) {
      message.creditAddress = object.credit_address;
    }
    if (object.active_lease_count !== undefined && object.active_lease_count !== null) {
      message.activeLeaseCount = BigInt(object.active_lease_count);
    }
    if (object.pending_lease_count !== undefined && object.pending_lease_count !== null) {
      message.pendingLeaseCount = BigInt(object.pending_lease_count);
    }
    message.reservedAmounts = object.reserved_amounts?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: CreditAccount): CreditAccountAmino {
    const obj: any = {};
    obj.tenant = message.tenant === "" ? undefined : message.tenant;
    obj.credit_address = message.creditAddress === "" ? undefined : message.creditAddress;
    obj.active_lease_count = message.activeLeaseCount !== BigInt(0) ? message.activeLeaseCount?.toString() : undefined;
    obj.pending_lease_count = message.pendingLeaseCount !== BigInt(0) ? message.pendingLeaseCount?.toString() : undefined;
    if (message.reservedAmounts) {
      obj.reserved_amounts = message.reservedAmounts.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.reserved_amounts = message.reservedAmounts;
    }
    return obj;
  },
  fromAminoMsg(object: CreditAccountAminoMsg): CreditAccount {
    return CreditAccount.fromAmino(object.value);
  },
  toAminoMsg(message: CreditAccount): CreditAccountAminoMsg {
    return {
      type: "lifted/billing/CreditAccount",
      value: CreditAccount.toAmino(message)
    };
  },
  fromProtoMsg(message: CreditAccountProtoMsg): CreditAccount {
    return CreditAccount.decode(message.value);
  },
  toProto(message: CreditAccount): Uint8Array {
    return CreditAccount.encode(message).finish();
  },
  toProtoMsg(message: CreditAccount): CreditAccountProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.CreditAccount",
      value: CreditAccount.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(CreditAccount.typeUrl, CreditAccount);
GlobalDecoderRegistry.registerAminoProtoMapping(CreditAccount.aminoType, CreditAccount.typeUrl);