//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgPayoutStakeholders } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/manifest.v1.MsgUpdateParams", MsgUpdateParams], ["/manifest.v1.MsgPayoutStakeholders", MsgPayoutStakeholders]];
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
    payoutStakeholders(value: MsgPayoutStakeholders) {
      return {
        typeUrl: "/manifest.v1.MsgPayoutStakeholders",
        value: MsgPayoutStakeholders.encode(value).finish()
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
    payoutStakeholders(value: MsgPayoutStakeholders) {
      return {
        typeUrl: "/manifest.v1.MsgPayoutStakeholders",
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
    payoutStakeholders(value: MsgPayoutStakeholders) {
      return {
        typeUrl: "/manifest.v1.MsgPayoutStakeholders",
        value: MsgPayoutStakeholders.fromPartial(value)
      };
    }
  }
};