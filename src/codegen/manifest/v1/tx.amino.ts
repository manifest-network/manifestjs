import { MsgUpdateParams, MsgPayout, MsgBurnHeldBalance } from "./tx";
export const AminoConverter = {
  "/manifest.v1.MsgUpdateParams": {
    aminoType: "/manifest.v1.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/manifest.v1.MsgPayout": {
    aminoType: "/manifest.v1.MsgPayout",
    toAmino: MsgPayout.toAmino,
    fromAmino: MsgPayout.fromAmino
  },
  "/manifest.v1.MsgBurnHeldBalance": {
    aminoType: "/manifest.v1.MsgBurnHeldBalance",
    toAmino: MsgBurnHeldBalance.toAmino,
    fromAmino: MsgBurnHeldBalance.fromAmino
  }
};