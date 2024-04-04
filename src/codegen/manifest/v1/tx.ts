import { Params, ParamsAmino, ParamsSDKType } from "./genesis";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
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
  typeUrl: "/manifest.v1.MsgUpdateParams";
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
  type: "/manifest.v1.MsgUpdateParams";
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
  typeUrl: "/manifest.v1.MsgUpdateParamsResponse";
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
  type: "/manifest.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseSDKType {}
/** MsgPayoutStakeholders is the Msg/PayoutStakeholders request type. */
export interface MsgPayoutStakeholders {
  /** authority is the address of the controlling account. */
  authority: string;
  /** payout is the amount of tokens paid to the current stakeholders. */
  payout: Coin;
}
export interface MsgPayoutStakeholdersProtoMsg {
  typeUrl: "/manifest.v1.MsgPayoutStakeholders";
  value: Uint8Array;
}
/** MsgPayoutStakeholders is the Msg/PayoutStakeholders request type. */
export interface MsgPayoutStakeholdersAmino {
  /** authority is the address of the controlling account. */
  authority?: string;
  /** payout is the amount of tokens paid to the current stakeholders. */
  payout: CoinAmino;
}
export interface MsgPayoutStakeholdersAminoMsg {
  type: "/manifest.v1.MsgPayoutStakeholders";
  value: MsgPayoutStakeholdersAmino;
}
/** MsgPayoutStakeholders is the Msg/PayoutStakeholders request type. */
export interface MsgPayoutStakeholdersSDKType {
  authority: string;
  payout: CoinSDKType;
}
/** MsgPayoutStakeholdersResponse defines the response structure for executing a MsgPayoutStakeholders message. */
export interface MsgPayoutStakeholdersResponse {}
export interface MsgPayoutStakeholdersResponseProtoMsg {
  typeUrl: "/manifest.v1.MsgPayoutStakeholdersResponse";
  value: Uint8Array;
}
/** MsgPayoutStakeholdersResponse defines the response structure for executing a MsgPayoutStakeholders message. */
export interface MsgPayoutStakeholdersResponseAmino {}
export interface MsgPayoutStakeholdersResponseAminoMsg {
  type: "/manifest.v1.MsgPayoutStakeholdersResponse";
  value: MsgPayoutStakeholdersResponseAmino;
}
/** MsgPayoutStakeholdersResponse defines the response structure for executing a MsgPayoutStakeholders message. */
export interface MsgPayoutStakeholdersResponseSDKType {}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/manifest.v1.MsgUpdateParams",
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
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
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
      typeUrl: "/manifest.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/manifest.v1.MsgUpdateParamsResponse",
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
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
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
      typeUrl: "/manifest.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgPayoutStakeholders(): MsgPayoutStakeholders {
  return {
    authority: "",
    payout: Coin.fromPartial({})
  };
}
export const MsgPayoutStakeholders = {
  typeUrl: "/manifest.v1.MsgPayoutStakeholders",
  encode(message: MsgPayoutStakeholders, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.payout !== undefined) {
      Coin.encode(message.payout, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgPayoutStakeholders {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPayoutStakeholders();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.payout = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgPayoutStakeholders>): MsgPayoutStakeholders {
    const message = createBaseMsgPayoutStakeholders();
    message.authority = object.authority ?? "";
    message.payout = object.payout !== undefined && object.payout !== null ? Coin.fromPartial(object.payout) : undefined;
    return message;
  },
  fromAmino(object: MsgPayoutStakeholdersAmino): MsgPayoutStakeholders {
    const message = createBaseMsgPayoutStakeholders();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.payout !== undefined && object.payout !== null) {
      message.payout = Coin.fromAmino(object.payout);
    }
    return message;
  },
  toAmino(message: MsgPayoutStakeholders): MsgPayoutStakeholdersAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.payout = message.payout ? Coin.toAmino(message.payout) : Coin.toAmino(Coin.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgPayoutStakeholdersAminoMsg): MsgPayoutStakeholders {
    return MsgPayoutStakeholders.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPayoutStakeholdersProtoMsg): MsgPayoutStakeholders {
    return MsgPayoutStakeholders.decode(message.value);
  },
  toProto(message: MsgPayoutStakeholders): Uint8Array {
    return MsgPayoutStakeholders.encode(message).finish();
  },
  toProtoMsg(message: MsgPayoutStakeholders): MsgPayoutStakeholdersProtoMsg {
    return {
      typeUrl: "/manifest.v1.MsgPayoutStakeholders",
      value: MsgPayoutStakeholders.encode(message).finish()
    };
  }
};
function createBaseMsgPayoutStakeholdersResponse(): MsgPayoutStakeholdersResponse {
  return {};
}
export const MsgPayoutStakeholdersResponse = {
  typeUrl: "/manifest.v1.MsgPayoutStakeholdersResponse",
  encode(_: MsgPayoutStakeholdersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgPayoutStakeholdersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPayoutStakeholdersResponse();
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
  fromPartial(_: Partial<MsgPayoutStakeholdersResponse>): MsgPayoutStakeholdersResponse {
    const message = createBaseMsgPayoutStakeholdersResponse();
    return message;
  },
  fromAmino(_: MsgPayoutStakeholdersResponseAmino): MsgPayoutStakeholdersResponse {
    const message = createBaseMsgPayoutStakeholdersResponse();
    return message;
  },
  toAmino(_: MsgPayoutStakeholdersResponse): MsgPayoutStakeholdersResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgPayoutStakeholdersResponseAminoMsg): MsgPayoutStakeholdersResponse {
    return MsgPayoutStakeholdersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPayoutStakeholdersResponseProtoMsg): MsgPayoutStakeholdersResponse {
    return MsgPayoutStakeholdersResponse.decode(message.value);
  },
  toProto(message: MsgPayoutStakeholdersResponse): Uint8Array {
    return MsgPayoutStakeholdersResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgPayoutStakeholdersResponse): MsgPayoutStakeholdersResponseProtoMsg {
    return {
      typeUrl: "/manifest.v1.MsgPayoutStakeholdersResponse",
      value: MsgPayoutStakeholdersResponse.encode(message).finish()
    };
  }
};