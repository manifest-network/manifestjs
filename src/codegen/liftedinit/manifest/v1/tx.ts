import { Params, ParamsAmino, ParamsSDKType } from "./genesis";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial, Exact } from "../../../helpers";
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
  /** authority is the address of the controlling account. */
  authority: string;
  /**
   * params defines the parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/liftedinit.manifest.v1.MsgUpdateParams";
  value: Uint8Array;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsAmino {
  /** authority is the address of the controlling account. */
  authority?: string;
  /**
   * params defines the parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params?: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "/liftedinit.manifest.v1.MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/liftedinit.manifest.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/liftedinit.manifest.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseSDKType {}
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
  type: "/liftedinit.manifest.v1.MsgPayout";
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
  type: "/liftedinit.manifest.v1.PayoutPair";
  value: PayoutPairAmino;
}
/** PayoutPair is the object that pairs an address with a coin to be paid out. */
export interface PayoutPairSDKType {
  address: string;
  coin: CoinSDKType;
}
/** MsgPayoutResponse defines the response structure for executing a MsgPayout message. */
export interface MsgPayoutResponse {}
export interface MsgPayoutResponseProtoMsg {
  typeUrl: "/liftedinit.manifest.v1.MsgPayoutResponse";
  value: Uint8Array;
}
/** MsgPayoutResponse defines the response structure for executing a MsgPayout message. */
export interface MsgPayoutResponseAmino {}
export interface MsgPayoutResponseAminoMsg {
  type: "/liftedinit.manifest.v1.MsgPayoutResponse";
  value: MsgPayoutResponseAmino;
}
/** MsgPayoutResponse defines the response structure for executing a MsgPayout message. */
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
  type: "/liftedinit.manifest.v1.MsgBurnHeldBalance";
  value: MsgBurnHeldBalanceAmino;
}
/** MsgPayout is the Msg/BurnHeldBalance request type. */
export interface MsgBurnHeldBalanceSDKType {
  authority: string;
  burn_coins: CoinSDKType[];
}
/** MsgBurnHeldBalanceResponse defines the response structure for executing a MsgBurnHeldBalance message. */
export interface MsgBurnHeldBalanceResponse {}
export interface MsgBurnHeldBalanceResponseProtoMsg {
  typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalanceResponse";
  value: Uint8Array;
}
/** MsgBurnHeldBalanceResponse defines the response structure for executing a MsgBurnHeldBalance message. */
export interface MsgBurnHeldBalanceResponseAmino {}
export interface MsgBurnHeldBalanceResponseAminoMsg {
  type: "/liftedinit.manifest.v1.MsgBurnHeldBalanceResponse";
  value: MsgBurnHeldBalanceResponseAmino;
}
/** MsgBurnHeldBalanceResponse defines the response structure for executing a MsgBurnHeldBalance message. */
export interface MsgBurnHeldBalanceResponseSDKType {}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/liftedinit.manifest.v1.MsgUpdateParams",
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
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/liftedinit.manifest.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/liftedinit.manifest.v1.MsgUpdateParamsResponse",
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
      typeUrl: "/liftedinit.manifest.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgPayout(): MsgPayout {
  return {
    authority: "",
    payoutPairs: []
  };
}
export const MsgPayout = {
  typeUrl: "/liftedinit.manifest.v1.MsgPayout",
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
function createBasePayoutPair(): PayoutPair {
  return {
    address: "",
    coin: Coin.fromPartial({})
  };
}
export const PayoutPair = {
  typeUrl: "/liftedinit.manifest.v1.PayoutPair",
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
function createBaseMsgPayoutResponse(): MsgPayoutResponse {
  return {};
}
export const MsgPayoutResponse = {
  typeUrl: "/liftedinit.manifest.v1.MsgPayoutResponse",
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
function createBaseMsgBurnHeldBalance(): MsgBurnHeldBalance {
  return {
    authority: "",
    burnCoins: []
  };
}
export const MsgBurnHeldBalance = {
  typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalance",
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
function createBaseMsgBurnHeldBalanceResponse(): MsgBurnHeldBalanceResponse {
  return {};
}
export const MsgBurnHeldBalanceResponse = {
  typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalanceResponse",
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