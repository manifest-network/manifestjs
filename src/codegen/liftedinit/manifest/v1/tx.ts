import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
import { GlobalDecoderRegistry } from "../../../registry";
/** MsgPayout is the Msg/Payout request type. */
export interface MsgPayout {
  /** authority is the address of the controlling account. */
  authority: string;
  /** payout_pairs are the pairs of addresses and coins to be paid out. */
  payoutPairs: PayoutPair[];
}
export interface MsgPayoutProtoMsg {
  typeUrl: "/liftedinit.manifest.v1.MsgPayout";
  value: Uint8Array;
}
/** MsgPayout is the Msg/Payout request type. */
export interface MsgPayoutAmino {
  /** authority is the address of the controlling account. */
  authority?: string;
  /** payout_pairs are the pairs of addresses and coins to be paid out. */
  payout_pairs: PayoutPairAmino[];
}
export interface MsgPayoutAminoMsg {
  type: "lifted/manifest/MsgPayout";
  value: MsgPayoutAmino;
}
/** MsgPayout is the Msg/Payout request type. */
export interface MsgPayoutSDKType {
  authority: string;
  payout_pairs: PayoutPairSDKType[];
}
/** PayoutPair is the object that pairs an address with a coin to be paid out. */
export interface PayoutPair {
  address: string;
  coin: Coin;
}
export interface PayoutPairProtoMsg {
  typeUrl: "/liftedinit.manifest.v1.PayoutPair";
  value: Uint8Array;
}
/** PayoutPair is the object that pairs an address with a coin to be paid out. */
export interface PayoutPairAmino {
  address?: string;
  coin: CoinAmino;
}
export interface PayoutPairAminoMsg {
  type: "lifted/manifest/payout-pair";
  value: PayoutPairAmino;
}
/** PayoutPair is the object that pairs an address with a coin to be paid out. */
export interface PayoutPairSDKType {
  address: string;
  coin: CoinSDKType;
}
/**
 * MsgPayoutResponse defines the response structure for executing a MsgPayout
 * message.
 */
export interface MsgPayoutResponse {}
export interface MsgPayoutResponseProtoMsg {
  typeUrl: "/liftedinit.manifest.v1.MsgPayoutResponse";
  value: Uint8Array;
}
/**
 * MsgPayoutResponse defines the response structure for executing a MsgPayout
 * message.
 */
export interface MsgPayoutResponseAmino {}
export interface MsgPayoutResponseAminoMsg {
  type: "/liftedinit.manifest.v1.MsgPayoutResponse";
  value: MsgPayoutResponseAmino;
}
/**
 * MsgPayoutResponse defines the response structure for executing a MsgPayout
 * message.
 */
export interface MsgPayoutResponseSDKType {}
/** MsgPayout is the Msg/BurnHeldBalance request type. */
export interface MsgBurnHeldBalance {
  /** sender is the address of the tokenholder. */
  authority: string;
  /** burn_coins are the coins to be burned by the tokenholder. */
  burnCoins: Coin[];
}
export interface MsgBurnHeldBalanceProtoMsg {
  typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalance";
  value: Uint8Array;
}
/** MsgPayout is the Msg/BurnHeldBalance request type. */
export interface MsgBurnHeldBalanceAmino {
  /** sender is the address of the tokenholder. */
  authority?: string;
  /** burn_coins are the coins to be burned by the tokenholder. */
  burn_coins: CoinAmino[];
}
export interface MsgBurnHeldBalanceAminoMsg {
  type: "lifted/manifest/MsgBurnHeldBalance";
  value: MsgBurnHeldBalanceAmino;
}
/** MsgPayout is the Msg/BurnHeldBalance request type. */
export interface MsgBurnHeldBalanceSDKType {
  authority: string;
  burn_coins: CoinSDKType[];
}
/**
 * MsgBurnHeldBalanceResponse defines the response structure for executing a
 * MsgBurnHeldBalance message.
 */
export interface MsgBurnHeldBalanceResponse {}
export interface MsgBurnHeldBalanceResponseProtoMsg {
  typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalanceResponse";
  value: Uint8Array;
}
/**
 * MsgBurnHeldBalanceResponse defines the response structure for executing a
 * MsgBurnHeldBalance message.
 */
export interface MsgBurnHeldBalanceResponseAmino {}
export interface MsgBurnHeldBalanceResponseAminoMsg {
  type: "/liftedinit.manifest.v1.MsgBurnHeldBalanceResponse";
  value: MsgBurnHeldBalanceResponseAmino;
}
/**
 * MsgBurnHeldBalanceResponse defines the response structure for executing a
 * MsgBurnHeldBalance message.
 */
export interface MsgBurnHeldBalanceResponseSDKType {}
function createBaseMsgPayout(): MsgPayout {
  return {
    authority: "",
    payoutPairs: []
  };
}
export const MsgPayout = {
  typeUrl: "/liftedinit.manifest.v1.MsgPayout",
  aminoType: "lifted/manifest/MsgPayout",
  is(o: any): o is MsgPayout {
    return o && (o.$typeUrl === MsgPayout.typeUrl || typeof o.authority === "string" && Array.isArray(o.payoutPairs) && (!o.payoutPairs.length || PayoutPair.is(o.payoutPairs[0])));
  },
  isSDK(o: any): o is MsgPayoutSDKType {
    return o && (o.$typeUrl === MsgPayout.typeUrl || typeof o.authority === "string" && Array.isArray(o.payout_pairs) && (!o.payout_pairs.length || PayoutPair.isSDK(o.payout_pairs[0])));
  },
  isAmino(o: any): o is MsgPayoutAmino {
    return o && (o.$typeUrl === MsgPayout.typeUrl || typeof o.authority === "string" && Array.isArray(o.payout_pairs) && (!o.payout_pairs.length || PayoutPair.isAmino(o.payout_pairs[0])));
  },
  encode(message: MsgPayout, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.payoutPairs) {
      PayoutPair.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgPayout {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPayout();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.payoutPairs.push(PayoutPair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgPayout {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      payoutPairs: Array.isArray(object?.payoutPairs) ? object.payoutPairs.map((e: any) => PayoutPair.fromJSON(e)) : []
    };
  },
  toJSON(message: MsgPayout): JsonSafe<MsgPayout> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    if (message.payoutPairs) {
      obj.payoutPairs = message.payoutPairs.map(e => e ? PayoutPair.toJSON(e) : undefined);
    } else {
      obj.payoutPairs = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgPayout>, I>>(object: I): MsgPayout {
    const message = createBaseMsgPayout();
    message.authority = object.authority ?? "";
    message.payoutPairs = object.payoutPairs?.map(e => PayoutPair.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgPayoutAmino): MsgPayout {
    const message = createBaseMsgPayout();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    message.payoutPairs = object.payout_pairs?.map(e => PayoutPair.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgPayout): MsgPayoutAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    if (message.payoutPairs) {
      obj.payout_pairs = message.payoutPairs.map(e => e ? PayoutPair.toAmino(e) : undefined);
    } else {
      obj.payout_pairs = message.payoutPairs;
    }
    return obj;
  },
  fromAminoMsg(object: MsgPayoutAminoMsg): MsgPayout {
    return MsgPayout.fromAmino(object.value);
  },
  toAminoMsg(message: MsgPayout): MsgPayoutAminoMsg {
    return {
      type: "lifted/manifest/MsgPayout",
      value: MsgPayout.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgPayoutProtoMsg): MsgPayout {
    return MsgPayout.decode(message.value);
  },
  toProto(message: MsgPayout): Uint8Array {
    return MsgPayout.encode(message).finish();
  },
  toProtoMsg(message: MsgPayout): MsgPayoutProtoMsg {
    return {
      typeUrl: "/liftedinit.manifest.v1.MsgPayout",
      value: MsgPayout.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgPayout.typeUrl, MsgPayout);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgPayout.aminoType, MsgPayout.typeUrl);
function createBasePayoutPair(): PayoutPair {
  return {
    address: "",
    coin: Coin.fromPartial({})
  };
}
export const PayoutPair = {
  typeUrl: "/liftedinit.manifest.v1.PayoutPair",
  aminoType: "lifted/manifest/payout-pair",
  is(o: any): o is PayoutPair {
    return o && (o.$typeUrl === PayoutPair.typeUrl || typeof o.address === "string" && Coin.is(o.coin));
  },
  isSDK(o: any): o is PayoutPairSDKType {
    return o && (o.$typeUrl === PayoutPair.typeUrl || typeof o.address === "string" && Coin.isSDK(o.coin));
  },
  isAmino(o: any): o is PayoutPairAmino {
    return o && (o.$typeUrl === PayoutPair.typeUrl || typeof o.address === "string" && Coin.isAmino(o.coin));
  },
  encode(message: PayoutPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PayoutPair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayoutPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.coin = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PayoutPair {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined
    };
  },
  toJSON(message: PayoutPair): JsonSafe<PayoutPair> {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<PayoutPair>, I>>(object: I): PayoutPair {
    const message = createBasePayoutPair();
    message.address = object.address ?? "";
    message.coin = object.coin !== undefined && object.coin !== null ? Coin.fromPartial(object.coin) : undefined;
    return message;
  },
  fromAmino(object: PayoutPairAmino): PayoutPair {
    const message = createBasePayoutPair();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = Coin.fromAmino(object.coin);
    }
    return message;
  },
  toAmino(message: PayoutPair): PayoutPairAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.coin = message.coin ? Coin.toAmino(message.coin) : Coin.toAmino(Coin.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: PayoutPairAminoMsg): PayoutPair {
    return PayoutPair.fromAmino(object.value);
  },
  toAminoMsg(message: PayoutPair): PayoutPairAminoMsg {
    return {
      type: "lifted/manifest/payout-pair",
      value: PayoutPair.toAmino(message)
    };
  },
  fromProtoMsg(message: PayoutPairProtoMsg): PayoutPair {
    return PayoutPair.decode(message.value);
  },
  toProto(message: PayoutPair): Uint8Array {
    return PayoutPair.encode(message).finish();
  },
  toProtoMsg(message: PayoutPair): PayoutPairProtoMsg {
    return {
      typeUrl: "/liftedinit.manifest.v1.PayoutPair",
      value: PayoutPair.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(PayoutPair.typeUrl, PayoutPair);
GlobalDecoderRegistry.registerAminoProtoMapping(PayoutPair.aminoType, PayoutPair.typeUrl);
function createBaseMsgPayoutResponse(): MsgPayoutResponse {
  return {};
}
export const MsgPayoutResponse = {
  typeUrl: "/liftedinit.manifest.v1.MsgPayoutResponse",
  is(o: any): o is MsgPayoutResponse {
    return o && o.$typeUrl === MsgPayoutResponse.typeUrl;
  },
  isSDK(o: any): o is MsgPayoutResponseSDKType {
    return o && o.$typeUrl === MsgPayoutResponse.typeUrl;
  },
  isAmino(o: any): o is MsgPayoutResponseAmino {
    return o && o.$typeUrl === MsgPayoutResponse.typeUrl;
  },
  encode(_: MsgPayoutResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgPayoutResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPayoutResponse();
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
  fromJSON(_: any): MsgPayoutResponse {
    return {};
  },
  toJSON(_: MsgPayoutResponse): JsonSafe<MsgPayoutResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgPayoutResponse>, I>>(_: I): MsgPayoutResponse {
    const message = createBaseMsgPayoutResponse();
    return message;
  },
  fromAmino(_: MsgPayoutResponseAmino): MsgPayoutResponse {
    const message = createBaseMsgPayoutResponse();
    return message;
  },
  toAmino(_: MsgPayoutResponse): MsgPayoutResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgPayoutResponseAminoMsg): MsgPayoutResponse {
    return MsgPayoutResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPayoutResponseProtoMsg): MsgPayoutResponse {
    return MsgPayoutResponse.decode(message.value);
  },
  toProto(message: MsgPayoutResponse): Uint8Array {
    return MsgPayoutResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgPayoutResponse): MsgPayoutResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.manifest.v1.MsgPayoutResponse",
      value: MsgPayoutResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgPayoutResponse.typeUrl, MsgPayoutResponse);
function createBaseMsgBurnHeldBalance(): MsgBurnHeldBalance {
  return {
    authority: "",
    burnCoins: []
  };
}
export const MsgBurnHeldBalance = {
  typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalance",
  aminoType: "lifted/manifest/MsgBurnHeldBalance",
  is(o: any): o is MsgBurnHeldBalance {
    return o && (o.$typeUrl === MsgBurnHeldBalance.typeUrl || typeof o.authority === "string" && Array.isArray(o.burnCoins) && (!o.burnCoins.length || Coin.is(o.burnCoins[0])));
  },
  isSDK(o: any): o is MsgBurnHeldBalanceSDKType {
    return o && (o.$typeUrl === MsgBurnHeldBalance.typeUrl || typeof o.authority === "string" && Array.isArray(o.burn_coins) && (!o.burn_coins.length || Coin.isSDK(o.burn_coins[0])));
  },
  isAmino(o: any): o is MsgBurnHeldBalanceAmino {
    return o && (o.$typeUrl === MsgBurnHeldBalance.typeUrl || typeof o.authority === "string" && Array.isArray(o.burn_coins) && (!o.burn_coins.length || Coin.isAmino(o.burn_coins[0])));
  },
  encode(message: MsgBurnHeldBalance, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.burnCoins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgBurnHeldBalance {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnHeldBalance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.burnCoins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgBurnHeldBalance {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      burnCoins: Array.isArray(object?.burnCoins) ? object.burnCoins.map((e: any) => Coin.fromJSON(e)) : []
    };
  },
  toJSON(message: MsgBurnHeldBalance): JsonSafe<MsgBurnHeldBalance> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    if (message.burnCoins) {
      obj.burnCoins = message.burnCoins.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.burnCoins = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgBurnHeldBalance>, I>>(object: I): MsgBurnHeldBalance {
    const message = createBaseMsgBurnHeldBalance();
    message.authority = object.authority ?? "";
    message.burnCoins = object.burnCoins?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgBurnHeldBalanceAmino): MsgBurnHeldBalance {
    const message = createBaseMsgBurnHeldBalance();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    message.burnCoins = object.burn_coins?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgBurnHeldBalance): MsgBurnHeldBalanceAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    if (message.burnCoins) {
      obj.burn_coins = message.burnCoins.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.burn_coins = message.burnCoins;
    }
    return obj;
  },
  fromAminoMsg(object: MsgBurnHeldBalanceAminoMsg): MsgBurnHeldBalance {
    return MsgBurnHeldBalance.fromAmino(object.value);
  },
  toAminoMsg(message: MsgBurnHeldBalance): MsgBurnHeldBalanceAminoMsg {
    return {
      type: "lifted/manifest/MsgBurnHeldBalance",
      value: MsgBurnHeldBalance.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgBurnHeldBalanceProtoMsg): MsgBurnHeldBalance {
    return MsgBurnHeldBalance.decode(message.value);
  },
  toProto(message: MsgBurnHeldBalance): Uint8Array {
    return MsgBurnHeldBalance.encode(message).finish();
  },
  toProtoMsg(message: MsgBurnHeldBalance): MsgBurnHeldBalanceProtoMsg {
    return {
      typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalance",
      value: MsgBurnHeldBalance.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgBurnHeldBalance.typeUrl, MsgBurnHeldBalance);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgBurnHeldBalance.aminoType, MsgBurnHeldBalance.typeUrl);
function createBaseMsgBurnHeldBalanceResponse(): MsgBurnHeldBalanceResponse {
  return {};
}
export const MsgBurnHeldBalanceResponse = {
  typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalanceResponse",
  is(o: any): o is MsgBurnHeldBalanceResponse {
    return o && o.$typeUrl === MsgBurnHeldBalanceResponse.typeUrl;
  },
  isSDK(o: any): o is MsgBurnHeldBalanceResponseSDKType {
    return o && o.$typeUrl === MsgBurnHeldBalanceResponse.typeUrl;
  },
  isAmino(o: any): o is MsgBurnHeldBalanceResponseAmino {
    return o && o.$typeUrl === MsgBurnHeldBalanceResponse.typeUrl;
  },
  encode(_: MsgBurnHeldBalanceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgBurnHeldBalanceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnHeldBalanceResponse();
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
  fromJSON(_: any): MsgBurnHeldBalanceResponse {
    return {};
  },
  toJSON(_: MsgBurnHeldBalanceResponse): JsonSafe<MsgBurnHeldBalanceResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgBurnHeldBalanceResponse>, I>>(_: I): MsgBurnHeldBalanceResponse {
    const message = createBaseMsgBurnHeldBalanceResponse();
    return message;
  },
  fromAmino(_: MsgBurnHeldBalanceResponseAmino): MsgBurnHeldBalanceResponse {
    const message = createBaseMsgBurnHeldBalanceResponse();
    return message;
  },
  toAmino(_: MsgBurnHeldBalanceResponse): MsgBurnHeldBalanceResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgBurnHeldBalanceResponseAminoMsg): MsgBurnHeldBalanceResponse {
    return MsgBurnHeldBalanceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgBurnHeldBalanceResponseProtoMsg): MsgBurnHeldBalanceResponse {
    return MsgBurnHeldBalanceResponse.decode(message.value);
  },
  toProto(message: MsgBurnHeldBalanceResponse): Uint8Array {
    return MsgBurnHeldBalanceResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgBurnHeldBalanceResponse): MsgBurnHeldBalanceResponseProtoMsg {
    return {
      typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalanceResponse",
      value: MsgBurnHeldBalanceResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgBurnHeldBalanceResponse.typeUrl, MsgBurnHeldBalanceResponse);