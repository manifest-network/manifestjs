import { MsgCreateValidator, MsgSetPower, MsgRemoveValidator, MsgRemovePending, MsgUpdateParams, MsgUpdateStakingParams } from "./tx";
export const AminoConverter = {
  "/strangelove_ventures.poa.v1.MsgCreateValidator": {
    aminoType: "poa/MsgCreateValidator",
    toAmino: MsgCreateValidator.toAmino,
    fromAmino: MsgCreateValidator.fromAmino
  },
  "/strangelove_ventures.poa.v1.MsgSetPower": {
    aminoType: "poa/MsgSetPower",
    toAmino: MsgSetPower.toAmino,
    fromAmino: MsgSetPower.fromAmino
  },
  "/strangelove_ventures.poa.v1.MsgRemoveValidator": {
    aminoType: "poa/MsgRemoveValidator",
    toAmino: MsgRemoveValidator.toAmino,
    fromAmino: MsgRemoveValidator.fromAmino
  },
  "/strangelove_ventures.poa.v1.MsgRemovePending": {
    aminoType: "poa/MsgRemovePending",
    toAmino: MsgRemovePending.toAmino,
    fromAmino: MsgRemovePending.fromAmino
  },
  "/strangelove_ventures.poa.v1.MsgUpdateParams": {
    aminoType: "poa/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/strangelove_ventures.poa.v1.MsgUpdateStakingParams": {
    aminoType: "poa/MsgUpdateStakingParams",
    toAmino: MsgUpdateStakingParams.toAmino,
    fromAmino: MsgUpdateStakingParams.fromAmino
  }
};