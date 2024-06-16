//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateValidator, MsgSetPower, MsgRemoveValidator, MsgRemovePending, MsgUpdateParams, MsgUpdateStakingParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/strangelove_ventures.poa.v1.MsgCreateValidator", MsgCreateValidator], ["/strangelove_ventures.poa.v1.MsgSetPower", MsgSetPower], ["/strangelove_ventures.poa.v1.MsgRemoveValidator", MsgRemoveValidator], ["/strangelove_ventures.poa.v1.MsgRemovePending", MsgRemovePending], ["/strangelove_ventures.poa.v1.MsgUpdateParams", MsgUpdateParams], ["/strangelove_ventures.poa.v1.MsgUpdateStakingParams", MsgUpdateStakingParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createValidator(value: MsgCreateValidator) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgCreateValidator",
        value: MsgCreateValidator.encode(value).finish()
      };
    },
    setPower(value: MsgSetPower) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgSetPower",
        value: MsgSetPower.encode(value).finish()
      };
    },
    removeValidator(value: MsgRemoveValidator) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidator",
        value: MsgRemoveValidator.encode(value).finish()
      };
    },
    removePending(value: MsgRemovePending) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePending",
        value: MsgRemovePending.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    updateStakingParams(value: MsgUpdateStakingParams) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParams",
        value: MsgUpdateStakingParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createValidator(value: MsgCreateValidator) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgCreateValidator",
        value
      };
    },
    setPower(value: MsgSetPower) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgSetPower",
        value
      };
    },
    removeValidator(value: MsgRemoveValidator) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidator",
        value
      };
    },
    removePending(value: MsgRemovePending) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePending",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateParams",
        value
      };
    },
    updateStakingParams(value: MsgUpdateStakingParams) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParams",
        value
      };
    }
  },
  fromPartial: {
    createValidator(value: MsgCreateValidator) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgCreateValidator",
        value: MsgCreateValidator.fromPartial(value)
      };
    },
    setPower(value: MsgSetPower) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgSetPower",
        value: MsgSetPower.fromPartial(value)
      };
    },
    removeValidator(value: MsgRemoveValidator) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidator",
        value: MsgRemoveValidator.fromPartial(value)
      };
    },
    removePending(value: MsgRemovePending) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePending",
        value: MsgRemovePending.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    updateStakingParams(value: MsgUpdateStakingParams) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParams",
        value: MsgUpdateStakingParams.fromPartial(value)
      };
    }
  }
};