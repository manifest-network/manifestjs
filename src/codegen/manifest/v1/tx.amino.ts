//@ts-nocheck
import { MsgUpdateParams, MsgPayoutStakeholders } from "./tx";
export const AminoConverter = {
  "/manifest.v1.MsgUpdateParams": {
    aminoType: "/manifest.v1.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/manifest.v1.MsgPayoutStakeholders": {
    aminoType: "/manifest.v1.MsgPayoutStakeholders",
    toAmino: MsgPayoutStakeholders.toAmino,
    fromAmino: MsgPayoutStakeholders.fromAmino
  }
};