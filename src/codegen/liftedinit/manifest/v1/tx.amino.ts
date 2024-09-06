import { MsgUpdateParams, MsgPayout, MsgBurnHeldBalance } from "./tx";
export const AminoConverter = {
  "/liftedinit.manifest.v1.MsgUpdateParams": {
    aminoType: "/liftedinit.manifest.v1.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/liftedinit.manifest.v1.MsgPayout": {
    aminoType: "/liftedinit.manifest.v1.MsgPayout",
    toAmino: MsgPayout.toAmino,
    fromAmino: MsgPayout.fromAmino
  },
  "/liftedinit.manifest.v1.MsgBurnHeldBalance": {
    aminoType: "/liftedinit.manifest.v1.MsgBurnHeldBalance",
    toAmino: MsgBurnHeldBalance.toAmino,
    fromAmino: MsgBurnHeldBalance.fromAmino
  }
};