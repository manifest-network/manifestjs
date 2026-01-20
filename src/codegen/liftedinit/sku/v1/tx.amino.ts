import { MsgCreateProvider, MsgUpdateProvider, MsgDeactivateProvider, MsgCreateSKU, MsgUpdateSKU, MsgDeactivateSKU, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/liftedinit.sku.v1.MsgCreateProvider": {
    aminoType: "lifted/sku/MsgCreateProvider",
    toAmino: MsgCreateProvider.toAmino,
    fromAmino: MsgCreateProvider.fromAmino
  },
  "/liftedinit.sku.v1.MsgUpdateProvider": {
    aminoType: "lifted/sku/MsgUpdateProvider",
    toAmino: MsgUpdateProvider.toAmino,
    fromAmino: MsgUpdateProvider.fromAmino
  },
  "/liftedinit.sku.v1.MsgDeactivateProvider": {
    aminoType: "lifted/sku/MsgDeactivateProvider",
    toAmino: MsgDeactivateProvider.toAmino,
    fromAmino: MsgDeactivateProvider.fromAmino
  },
  "/liftedinit.sku.v1.MsgCreateSKU": {
    aminoType: "lifted/sku/MsgCreateSKU",
    toAmino: MsgCreateSKU.toAmino,
    fromAmino: MsgCreateSKU.fromAmino
  },
  "/liftedinit.sku.v1.MsgUpdateSKU": {
    aminoType: "lifted/sku/MsgUpdateSKU",
    toAmino: MsgUpdateSKU.toAmino,
    fromAmino: MsgUpdateSKU.fromAmino
  },
  "/liftedinit.sku.v1.MsgDeactivateSKU": {
    aminoType: "lifted/sku/MsgDeactivateSKU",
    toAmino: MsgDeactivateSKU.toAmino,
    fromAmino: MsgDeactivateSKU.fromAmino
  },
  "/liftedinit.sku.v1.MsgUpdateParams": {
    aminoType: "lifted/sku/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};