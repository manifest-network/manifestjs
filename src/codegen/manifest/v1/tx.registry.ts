//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgPayout, MsgBurnHeldBalance } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/manifest.v1.MsgUpdateParams", MsgUpdateParams], ["/manifest.v1.MsgPayout", MsgPayout], ["/manifest.v1.MsgBurnHeldBalance", MsgBurnHeldBalance]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/manifest.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    payout(value: MsgPayout) {
      return {
        typeUrl: "/manifest.v1.MsgPayout",
        value: MsgPayout.encode(value).finish()
      };
    },
    burnHeldBalance(value: MsgBurnHeldBalance) {
      return {
        typeUrl: "/manifest.v1.MsgBurnHeldBalance",
        value: MsgBurnHeldBalance.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/manifest.v1.MsgUpdateParams",
        value
      };
    },
    payout(value: MsgPayout) {
      return {
        typeUrl: "/manifest.v1.MsgPayout",
        value
      };
    },
    burnHeldBalance(value: MsgBurnHeldBalance) {
      return {
        typeUrl: "/manifest.v1.MsgBurnHeldBalance",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/manifest.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    payout(value: MsgPayout) {
      return {
        typeUrl: "/manifest.v1.MsgPayout",
        value: MsgPayout.fromPartial(value)
      };
    },
    burnHeldBalance(value: MsgBurnHeldBalance) {
      return {
        typeUrl: "/manifest.v1.MsgBurnHeldBalance",
        value: MsgBurnHeldBalance.fromPartial(value)
      };
    }
  }
};