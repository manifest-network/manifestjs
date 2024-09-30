import { MsgPayout, MsgBurnHeldBalance } from "./tx";
export const AminoConverter = {
  "/liftedinit.manifest.v1.MsgPayout": {
    aminoType: "lifted/manifest/MsgPayout",
    toAmino: MsgPayout.toAmino,
    fromAmino: MsgPayout.fromAmino
  },
  "/liftedinit.manifest.v1.MsgBurnHeldBalance": {
    aminoType: "lifted/manifest/MsgBurnHeldBalance",
    toAmino: MsgBurnHeldBalance.toAmino,
    fromAmino: MsgBurnHeldBalance.fromAmino
  }
};