//@ts-nocheck
import { TelescopeGeneratedType } from "../../../types";
import { Registry } from "@cosmjs/proto-signing";
import { MsgCreateValidator, MsgSetPower, MsgRemoveValidator, MsgRemovePending, MsgUpdateStakingParams } from "./tx";
export const registry: ReadonlyArray<[string, TelescopeGeneratedType<any, any, any>]> = [["/strangelove_ventures.poa.v1.MsgCreateValidator", MsgCreateValidator], ["/strangelove_ventures.poa.v1.MsgSetPower", MsgSetPower], ["/strangelove_ventures.poa.v1.MsgRemoveValidator", MsgRemoveValidator], ["/strangelove_ventures.poa.v1.MsgRemovePending", MsgRemovePending], ["/strangelove_ventures.poa.v1.MsgUpdateStakingParams", MsgUpdateStakingParams]];
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
    updateStakingParams(value: MsgUpdateStakingParams) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParams",
        value
      };
    }
  },
  toJSON: {
    createValidator(value: MsgCreateValidator) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgCreateValidator",
        value: MsgCreateValidator.toJSON(value)
      };
    },
    setPower(value: MsgSetPower) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgSetPower",
        value: MsgSetPower.toJSON(value)
      };
    },
    removeValidator(value: MsgRemoveValidator) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidator",
        value: MsgRemoveValidator.toJSON(value)
      };
    },
    removePending(value: MsgRemovePending) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePending",
        value: MsgRemovePending.toJSON(value)
      };
    },
    updateStakingParams(value: MsgUpdateStakingParams) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParams",
        value: MsgUpdateStakingParams.toJSON(value)
      };
    }
  },
  fromJSON: {
    createValidator(value: any) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgCreateValidator",
        value: MsgCreateValidator.fromJSON(value)
      };
    },
    setPower(value: any) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgSetPower",
        value: MsgSetPower.fromJSON(value)
      };
    },
    removeValidator(value: any) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgRemoveValidator",
        value: MsgRemoveValidator.fromJSON(value)
      };
    },
    removePending(value: any) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgRemovePending",
        value: MsgRemovePending.fromJSON(value)
      };
    },
    updateStakingParams(value: any) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParams",
        value: MsgUpdateStakingParams.fromJSON(value)
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
    updateStakingParams(value: MsgUpdateStakingParams) {
      return {
        typeUrl: "/strangelove_ventures.poa.v1.MsgUpdateStakingParams",
        value: MsgUpdateStakingParams.fromPartial(value)
      };
    }
  }
};