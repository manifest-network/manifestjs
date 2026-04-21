import { Params, ParamsAmino, ParamsSDKType, Lease, LeaseAmino, LeaseSDKType, CreditAccount, CreditAccountAmino, CreditAccountSDKType } from "./types";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
import { GlobalDecoderRegistry } from "../../../registry";
/** GenesisState defines the billing module's genesis state. */
export interface GenesisState {
  /** params defines the module parameters. */
  params: Params;
  /** leases is the list of all leases. */
  leases: Lease[];
  /** credit_accounts is the list of all credit accounts. */
  creditAccounts: CreditAccount[];
  /**
   * lease_sequence is the sequence counter for deterministic lease UUID generation.
   * Exported via Sequence.Peek(); the next Sequence.Next() call will return this value.
   */
  leaseSequence: bigint;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/liftedinit.billing.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the billing module's genesis state. */
export interface GenesisStateAmino {
  /** params defines the module parameters. */
  params: ParamsAmino;
  /** leases is the list of all leases. */
  leases: LeaseAmino[];
  /** credit_accounts is the list of all credit accounts. */
  credit_accounts: CreditAccountAmino[];
  /**
   * lease_sequence is the sequence counter for deterministic lease UUID generation.
   * Exported via Sequence.Peek(); the next Sequence.Next() call will return this value.
   */
  lease_sequence: string;
}
export interface GenesisStateAminoMsg {
  type: "lifted/billing/GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the billing module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  leases: LeaseSDKType[];
  credit_accounts: CreditAccountSDKType[];
  lease_sequence: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    leases: [],
    creditAccounts: [],
    leaseSequence: BigInt(0)
  };
}
export const GenesisState = {
  typeUrl: "/liftedinit.billing.v1.GenesisState",
  aminoType: "lifted/billing/GenesisState",
  is(o: any): o is GenesisState {
    return o && (o.$typeUrl === GenesisState.typeUrl || Params.is(o.params) && Array.isArray(o.leases) && (!o.leases.length || Lease.is(o.leases[0])) && Array.isArray(o.creditAccounts) && (!o.creditAccounts.length || CreditAccount.is(o.creditAccounts[0])) && typeof o.leaseSequence === "bigint");
  },
  isSDK(o: any): o is GenesisStateSDKType {
    return o && (o.$typeUrl === GenesisState.typeUrl || Params.isSDK(o.params) && Array.isArray(o.leases) && (!o.leases.length || Lease.isSDK(o.leases[0])) && Array.isArray(o.credit_accounts) && (!o.credit_accounts.length || CreditAccount.isSDK(o.credit_accounts[0])) && typeof o.lease_sequence === "bigint");
  },
  isAmino(o: any): o is GenesisStateAmino {
    return o && (o.$typeUrl === GenesisState.typeUrl || Params.isAmino(o.params) && Array.isArray(o.leases) && (!o.leases.length || Lease.isAmino(o.leases[0])) && Array.isArray(o.credit_accounts) && (!o.credit_accounts.length || CreditAccount.isAmino(o.credit_accounts[0])) && typeof o.lease_sequence === "bigint");
  },
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.creditAccounts) {
      CreditAccount.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.leaseSequence !== BigInt(0)) {
      writer.uint32(32).uint64(message.leaseSequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.leases.push(Lease.decode(reader, reader.uint32()));
          break;
        case 3:
          message.creditAccounts.push(CreditAccount.decode(reader, reader.uint32()));
          break;
        case 4:
          message.leaseSequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      leases: Array.isArray(object?.leases) ? object.leases.map((e: any) => Lease.fromJSON(e)) : [],
      creditAccounts: Array.isArray(object?.creditAccounts) ? object.creditAccounts.map((e: any) => CreditAccount.fromJSON(e)) : [],
      leaseSequence: isSet(object.leaseSequence) ? BigInt(object.leaseSequence.toString()) : BigInt(0)
    };
  },
  toJSON(message: GenesisState): JsonSafe<GenesisState> {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.leases) {
      obj.leases = message.leases.map(e => e ? Lease.toJSON(e) : undefined);
    } else {
      obj.leases = [];
    }
    if (message.creditAccounts) {
      obj.creditAccounts = message.creditAccounts.map(e => e ? CreditAccount.toJSON(e) : undefined);
    } else {
      obj.creditAccounts = [];
    }
    message.leaseSequence !== undefined && (obj.leaseSequence = (message.leaseSequence || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.leases = object.leases?.map(e => Lease.fromPartial(e)) || [];
    message.creditAccounts = object.creditAccounts?.map(e => CreditAccount.fromPartial(e)) || [];
    message.leaseSequence = object.leaseSequence !== undefined && object.leaseSequence !== null ? BigInt(object.leaseSequence.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.leases = object.leases?.map(e => Lease.fromAmino(e)) || [];
    message.creditAccounts = object.credit_accounts?.map(e => CreditAccount.fromAmino(e)) || [];
    if (object.lease_sequence !== undefined && object.lease_sequence !== null) {
      message.leaseSequence = BigInt(object.lease_sequence);
    }
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    if (message.leases) {
      obj.leases = message.leases.map(e => e ? Lease.toAmino(e) : undefined);
    } else {
      obj.leases = message.leases;
    }
    if (message.creditAccounts) {
      obj.credit_accounts = message.creditAccounts.map(e => e ? CreditAccount.toAmino(e) : undefined);
    } else {
      obj.credit_accounts = message.creditAccounts;
    }
    obj.lease_sequence = message.leaseSequence ? message.leaseSequence?.toString() : "0";
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  toAminoMsg(message: GenesisState): GenesisStateAminoMsg {
    return {
      type: "lifted/billing/GenesisState",
      value: GenesisState.toAmino(message)
    };
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/liftedinit.billing.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);
GlobalDecoderRegistry.registerAminoProtoMapping(GenesisState.aminoType, GenesisState.typeUrl);