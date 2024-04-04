import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the module genesis state */
export interface GenesisState {
  /** Params defines all the paramaters of the module. */
  params: Params;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/manifest.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the module genesis state */
export interface GenesisStateAmino {
  /** Params defines all the paramaters of the module. */
  params?: ParamsAmino;
}
export interface GenesisStateAminoMsg {
  type: "/manifest.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the module genesis state */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
}
/** Params defines the set of module parameters. */
export interface Params {
  stakeHolders: StakeHolders[];
  inflation?: Inflation;
}
export interface ParamsProtoMsg {
  typeUrl: "/manifest.v1.Params";
  value: Uint8Array;
}
/** Params defines the set of module parameters. */
export interface ParamsAmino {
  stake_holders?: StakeHoldersAmino[];
  inflation?: InflationAmino;
}
export interface ParamsAminoMsg {
  type: "manifest/params";
  value: ParamsAmino;
}
/** Params defines the set of module parameters. */
export interface ParamsSDKType {
  stake_holders: StakeHoldersSDKType[];
  inflation?: InflationSDKType;
}
/** StakeHolders is the list of addresses and their percentage of the inflation distribution */
export interface StakeHolders {
  /** manifest address */
  address: string;
  /**
   * percentage is the micro denom % of tokens this address gets on a distribution.
   * 100% = 100_000_000 total. so 1_000000 = 1%.
   */
  percentage: number;
}
export interface StakeHoldersProtoMsg {
  typeUrl: "/manifest.v1.StakeHolders";
  value: Uint8Array;
}
/** StakeHolders is the list of addresses and their percentage of the inflation distribution */
export interface StakeHoldersAmino {
  /** manifest address */
  address?: string;
  /**
   * percentage is the micro denom % of tokens this address gets on a distribution.
   * 100% = 100_000_000 total. so 1_000000 = 1%.
   */
  percentage?: number;
}
export interface StakeHoldersAminoMsg {
  type: "/manifest.v1.StakeHolders";
  value: StakeHoldersAmino;
}
/** StakeHolders is the list of addresses and their percentage of the inflation distribution */
export interface StakeHoldersSDKType {
  address: string;
  percentage: number;
}
/** Inflation is the distribution coins to the stake holders */
export interface Inflation {
  /** if automatic inflation is enabled for distribution */
  automaticEnabled: boolean;
  /** amount of umfx tokens distributed per year */
  yearlyAmount: bigint;
  /** the token to distribute (i.e. 'umfx') */
  mintDenom: string;
}
export interface InflationProtoMsg {
  typeUrl: "/manifest.v1.Inflation";
  value: Uint8Array;
}
/** Inflation is the distribution coins to the stake holders */
export interface InflationAmino {
  /** if automatic inflation is enabled for distribution */
  automatic_enabled?: boolean;
  /** amount of umfx tokens distributed per year */
  yearly_amount?: string;
  /** the token to distribute (i.e. 'umfx') */
  mint_denom?: string;
}
export interface InflationAminoMsg {
  type: "/manifest.v1.Inflation";
  value: InflationAmino;
}
/** Inflation is the distribution coins to the stake holders */
export interface InflationSDKType {
  automatic_enabled: boolean;
  yearly_amount: bigint;
  mint_denom: string;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/manifest.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/manifest.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseParams(): Params {
  return {
    stakeHolders: [],
    inflation: undefined
  };
}
export const Params = {
  typeUrl: "/manifest.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.stakeHolders) {
      StakeHolders.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.inflation !== undefined) {
      Inflation.encode(message.inflation, writer.uint32(18).fork()).ldelim();
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
          message.stakeHolders.push(StakeHolders.decode(reader, reader.uint32()));
          break;
        case 2:
          message.inflation = Inflation.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.stakeHolders = object.stakeHolders?.map(e => StakeHolders.fromPartial(e)) || [];
    message.inflation = object.inflation !== undefined && object.inflation !== null ? Inflation.fromPartial(object.inflation) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    message.stakeHolders = object.stake_holders?.map(e => StakeHolders.fromAmino(e)) || [];
    if (object.inflation !== undefined && object.inflation !== null) {
      message.inflation = Inflation.fromAmino(object.inflation);
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    if (message.stakeHolders) {
      obj.stake_holders = message.stakeHolders.map(e => e ? StakeHolders.toAmino(e) : undefined);
    } else {
      obj.stake_holders = message.stakeHolders;
    }
    obj.inflation = message.inflation ? Inflation.toAmino(message.inflation) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  toAminoMsg(message: Params): ParamsAminoMsg {
    return {
      type: "manifest/params",
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
      typeUrl: "/manifest.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseStakeHolders(): StakeHolders {
  return {
    address: "",
    percentage: 0
  };
}
export const StakeHolders = {
  typeUrl: "/manifest.v1.StakeHolders",
  encode(message: StakeHolders, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.percentage !== 0) {
      writer.uint32(16).int32(message.percentage);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): StakeHolders {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStakeHolders();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.percentage = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<StakeHolders>): StakeHolders {
    const message = createBaseStakeHolders();
    message.address = object.address ?? "";
    message.percentage = object.percentage ?? 0;
    return message;
  },
  fromAmino(object: StakeHoldersAmino): StakeHolders {
    const message = createBaseStakeHolders();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.percentage !== undefined && object.percentage !== null) {
      message.percentage = object.percentage;
    }
    return message;
  },
  toAmino(message: StakeHolders): StakeHoldersAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.percentage = message.percentage === 0 ? undefined : message.percentage;
    return obj;
  },
  fromAminoMsg(object: StakeHoldersAminoMsg): StakeHolders {
    return StakeHolders.fromAmino(object.value);
  },
  fromProtoMsg(message: StakeHoldersProtoMsg): StakeHolders {
    return StakeHolders.decode(message.value);
  },
  toProto(message: StakeHolders): Uint8Array {
    return StakeHolders.encode(message).finish();
  },
  toProtoMsg(message: StakeHolders): StakeHoldersProtoMsg {
    return {
      typeUrl: "/manifest.v1.StakeHolders",
      value: StakeHolders.encode(message).finish()
    };
  }
};
function createBaseInflation(): Inflation {
  return {
    automaticEnabled: false,
    yearlyAmount: BigInt(0),
    mintDenom: ""
  };
}
export const Inflation = {
  typeUrl: "/manifest.v1.Inflation",
  encode(message: Inflation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.automaticEnabled === true) {
      writer.uint32(8).bool(message.automaticEnabled);
    }
    if (message.yearlyAmount !== BigInt(0)) {
      writer.uint32(16).uint64(message.yearlyAmount);
    }
    if (message.mintDenom !== "") {
      writer.uint32(26).string(message.mintDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Inflation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInflation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.automaticEnabled = reader.bool();
          break;
        case 2:
          message.yearlyAmount = reader.uint64();
          break;
        case 3:
          message.mintDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Inflation>): Inflation {
    const message = createBaseInflation();
    message.automaticEnabled = object.automaticEnabled ?? false;
    message.yearlyAmount = object.yearlyAmount !== undefined && object.yearlyAmount !== null ? BigInt(object.yearlyAmount.toString()) : BigInt(0);
    message.mintDenom = object.mintDenom ?? "";
    return message;
  },
  fromAmino(object: InflationAmino): Inflation {
    const message = createBaseInflation();
    if (object.automatic_enabled !== undefined && object.automatic_enabled !== null) {
      message.automaticEnabled = object.automatic_enabled;
    }
    if (object.yearly_amount !== undefined && object.yearly_amount !== null) {
      message.yearlyAmount = BigInt(object.yearly_amount);
    }
    if (object.mint_denom !== undefined && object.mint_denom !== null) {
      message.mintDenom = object.mint_denom;
    }
    return message;
  },
  toAmino(message: Inflation): InflationAmino {
    const obj: any = {};
    obj.automatic_enabled = message.automaticEnabled === false ? undefined : message.automaticEnabled;
    obj.yearly_amount = message.yearlyAmount !== BigInt(0) ? message.yearlyAmount.toString() : undefined;
    obj.mint_denom = message.mintDenom === "" ? undefined : message.mintDenom;
    return obj;
  },
  fromAminoMsg(object: InflationAminoMsg): Inflation {
    return Inflation.fromAmino(object.value);
  },
  fromProtoMsg(message: InflationProtoMsg): Inflation {
    return Inflation.decode(message.value);
  },
  toProto(message: Inflation): Uint8Array {
    return Inflation.encode(message).finish();
  },
  toProtoMsg(message: Inflation): InflationProtoMsg {
    return {
      typeUrl: "/manifest.v1.Inflation",
      value: Inflation.encode(message).finish()
    };
  }
};