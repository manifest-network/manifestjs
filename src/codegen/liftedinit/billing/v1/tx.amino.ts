import { MsgFundCredit, MsgCreateLease, MsgCreateLeaseForTenant, MsgAcknowledgeLease, MsgRejectLease, MsgCancelLease, MsgCloseLease, MsgWithdraw, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/liftedinit.billing.v1.MsgFundCredit": {
    aminoType: "lifted/billing/MsgFundCredit",
    toAmino: MsgFundCredit.toAmino,
    fromAmino: MsgFundCredit.fromAmino
  },
  "/liftedinit.billing.v1.MsgCreateLease": {
    aminoType: "lifted/billing/MsgCreateLease",
    toAmino: MsgCreateLease.toAmino,
    fromAmino: MsgCreateLease.fromAmino
  },
  "/liftedinit.billing.v1.MsgCreateLeaseForTenant": {
    aminoType: "lifted/billing/MsgCreateLeaseForTenant",
    toAmino: MsgCreateLeaseForTenant.toAmino,
    fromAmino: MsgCreateLeaseForTenant.fromAmino
  },
  "/liftedinit.billing.v1.MsgAcknowledgeLease": {
    aminoType: "lifted/billing/MsgAcknowledgeLease",
    toAmino: MsgAcknowledgeLease.toAmino,
    fromAmino: MsgAcknowledgeLease.fromAmino
  },
  "/liftedinit.billing.v1.MsgRejectLease": {
    aminoType: "lifted/billing/MsgRejectLease",
    toAmino: MsgRejectLease.toAmino,
    fromAmino: MsgRejectLease.fromAmino
  },
  "/liftedinit.billing.v1.MsgCancelLease": {
    aminoType: "lifted/billing/MsgCancelLease",
    toAmino: MsgCancelLease.toAmino,
    fromAmino: MsgCancelLease.fromAmino
  },
  "/liftedinit.billing.v1.MsgCloseLease": {
    aminoType: "lifted/billing/MsgCloseLease",
    toAmino: MsgCloseLease.toAmino,
    fromAmino: MsgCloseLease.fromAmino
  },
  "/liftedinit.billing.v1.MsgWithdraw": {
    aminoType: "lifted/billing/MsgWithdraw",
    toAmino: MsgWithdraw.toAmino,
    fromAmino: MsgWithdraw.fromAmino
  },
  "/liftedinit.billing.v1.MsgUpdateParams": {
    aminoType: "lifted/billing/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};