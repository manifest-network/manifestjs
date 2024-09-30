//@ts-nocheck
import { TelescopeGeneratedType } from "../../../types";
import { Registry } from "@cosmjs/proto-signing";
import { MsgPayout, MsgBurnHeldBalance } from "./tx";
export const registry: ReadonlyArray<[string, TelescopeGeneratedType<any, any, any>]> = [["/liftedinit.manifest.v1.MsgPayout", MsgPayout], ["/liftedinit.manifest.v1.MsgBurnHeldBalance", MsgBurnHeldBalance]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    payout(value: MsgPayout) {
      return {
        typeUrl: "/liftedinit.manifest.v1.MsgPayout",
        value: MsgPayout.encode(value).finish()
      };
    },
    burnHeldBalance(value: MsgBurnHeldBalance) {
      return {
        typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalance",
        value: MsgBurnHeldBalance.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    payout(value: MsgPayout) {
      return {
        typeUrl: "/liftedinit.manifest.v1.MsgPayout",
        value
      };
    },
    burnHeldBalance(value: MsgBurnHeldBalance) {
      return {
        typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalance",
        value
      };
    }
  },
  toJSON: {
    payout(value: MsgPayout) {
      return {
        typeUrl: "/liftedinit.manifest.v1.MsgPayout",
        value: MsgPayout.toJSON(value)
      };
    },
    burnHeldBalance(value: MsgBurnHeldBalance) {
      return {
        typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalance",
        value: MsgBurnHeldBalance.toJSON(value)
      };
    }
  },
  fromJSON: {
    payout(value: any) {
      return {
        typeUrl: "/liftedinit.manifest.v1.MsgPayout",
        value: MsgPayout.fromJSON(value)
      };
    },
    burnHeldBalance(value: any) {
      return {
        typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalance",
        value: MsgBurnHeldBalance.fromJSON(value)
      };
    }
  },
  fromPartial: {
    payout(value: MsgPayout) {
      return {
        typeUrl: "/liftedinit.manifest.v1.MsgPayout",
        value: MsgPayout.fromPartial(value)
      };
    },
    burnHeldBalance(value: MsgBurnHeldBalance) {
      return {
        typeUrl: "/liftedinit.manifest.v1.MsgBurnHeldBalance",
        value: MsgBurnHeldBalance.fromPartial(value)
      };
    }
  }
};