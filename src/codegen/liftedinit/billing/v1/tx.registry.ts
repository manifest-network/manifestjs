//@ts-nocheck
import { TelescopeGeneratedType } from "../../../types";
import { Registry } from "@cosmjs/proto-signing";
import { MsgFundCredit, MsgCreateLease, MsgCreateLeaseForTenant, MsgAcknowledgeLease, MsgRejectLease, MsgCancelLease, MsgCloseLease, MsgWithdraw, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, TelescopeGeneratedType<any, any, any>]> = [["/liftedinit.billing.v1.MsgFundCredit", MsgFundCredit], ["/liftedinit.billing.v1.MsgCreateLease", MsgCreateLease], ["/liftedinit.billing.v1.MsgCreateLeaseForTenant", MsgCreateLeaseForTenant], ["/liftedinit.billing.v1.MsgAcknowledgeLease", MsgAcknowledgeLease], ["/liftedinit.billing.v1.MsgRejectLease", MsgRejectLease], ["/liftedinit.billing.v1.MsgCancelLease", MsgCancelLease], ["/liftedinit.billing.v1.MsgCloseLease", MsgCloseLease], ["/liftedinit.billing.v1.MsgWithdraw", MsgWithdraw], ["/liftedinit.billing.v1.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    fundCredit(value: MsgFundCredit) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgFundCredit",
        value: MsgFundCredit.encode(value).finish()
      };
    },
    createLease(value: MsgCreateLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCreateLease",
        value: MsgCreateLease.encode(value).finish()
      };
    },
    createLeaseForTenant(value: MsgCreateLeaseForTenant) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseForTenant",
        value: MsgCreateLeaseForTenant.encode(value).finish()
      };
    },
    acknowledgeLease(value: MsgAcknowledgeLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgAcknowledgeLease",
        value: MsgAcknowledgeLease.encode(value).finish()
      };
    },
    rejectLease(value: MsgRejectLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgRejectLease",
        value: MsgRejectLease.encode(value).finish()
      };
    },
    cancelLease(value: MsgCancelLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCancelLease",
        value: MsgCancelLease.encode(value).finish()
      };
    },
    closeLease(value: MsgCloseLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCloseLease",
        value: MsgCloseLease.encode(value).finish()
      };
    },
    withdraw(value: MsgWithdraw) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgWithdraw",
        value: MsgWithdraw.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    fundCredit(value: MsgFundCredit) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgFundCredit",
        value
      };
    },
    createLease(value: MsgCreateLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCreateLease",
        value
      };
    },
    createLeaseForTenant(value: MsgCreateLeaseForTenant) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseForTenant",
        value
      };
    },
    acknowledgeLease(value: MsgAcknowledgeLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgAcknowledgeLease",
        value
      };
    },
    rejectLease(value: MsgRejectLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgRejectLease",
        value
      };
    },
    cancelLease(value: MsgCancelLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCancelLease",
        value
      };
    },
    closeLease(value: MsgCloseLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCloseLease",
        value
      };
    },
    withdraw(value: MsgWithdraw) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgWithdraw",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgUpdateParams",
        value
      };
    }
  },
  toJSON: {
    fundCredit(value: MsgFundCredit) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgFundCredit",
        value: MsgFundCredit.toJSON(value)
      };
    },
    createLease(value: MsgCreateLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCreateLease",
        value: MsgCreateLease.toJSON(value)
      };
    },
    createLeaseForTenant(value: MsgCreateLeaseForTenant) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseForTenant",
        value: MsgCreateLeaseForTenant.toJSON(value)
      };
    },
    acknowledgeLease(value: MsgAcknowledgeLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgAcknowledgeLease",
        value: MsgAcknowledgeLease.toJSON(value)
      };
    },
    rejectLease(value: MsgRejectLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgRejectLease",
        value: MsgRejectLease.toJSON(value)
      };
    },
    cancelLease(value: MsgCancelLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCancelLease",
        value: MsgCancelLease.toJSON(value)
      };
    },
    closeLease(value: MsgCloseLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCloseLease",
        value: MsgCloseLease.toJSON(value)
      };
    },
    withdraw(value: MsgWithdraw) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgWithdraw",
        value: MsgWithdraw.toJSON(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgUpdateParams",
        value: MsgUpdateParams.toJSON(value)
      };
    }
  },
  fromJSON: {
    fundCredit(value: any) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgFundCredit",
        value: MsgFundCredit.fromJSON(value)
      };
    },
    createLease(value: any) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCreateLease",
        value: MsgCreateLease.fromJSON(value)
      };
    },
    createLeaseForTenant(value: any) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseForTenant",
        value: MsgCreateLeaseForTenant.fromJSON(value)
      };
    },
    acknowledgeLease(value: any) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgAcknowledgeLease",
        value: MsgAcknowledgeLease.fromJSON(value)
      };
    },
    rejectLease(value: any) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgRejectLease",
        value: MsgRejectLease.fromJSON(value)
      };
    },
    cancelLease(value: any) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCancelLease",
        value: MsgCancelLease.fromJSON(value)
      };
    },
    closeLease(value: any) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCloseLease",
        value: MsgCloseLease.fromJSON(value)
      };
    },
    withdraw(value: any) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgWithdraw",
        value: MsgWithdraw.fromJSON(value)
      };
    },
    updateParams(value: any) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromJSON(value)
      };
    }
  },
  fromPartial: {
    fundCredit(value: MsgFundCredit) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgFundCredit",
        value: MsgFundCredit.fromPartial(value)
      };
    },
    createLease(value: MsgCreateLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCreateLease",
        value: MsgCreateLease.fromPartial(value)
      };
    },
    createLeaseForTenant(value: MsgCreateLeaseForTenant) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCreateLeaseForTenant",
        value: MsgCreateLeaseForTenant.fromPartial(value)
      };
    },
    acknowledgeLease(value: MsgAcknowledgeLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgAcknowledgeLease",
        value: MsgAcknowledgeLease.fromPartial(value)
      };
    },
    rejectLease(value: MsgRejectLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgRejectLease",
        value: MsgRejectLease.fromPartial(value)
      };
    },
    cancelLease(value: MsgCancelLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCancelLease",
        value: MsgCancelLease.fromPartial(value)
      };
    },
    closeLease(value: MsgCloseLease) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgCloseLease",
        value: MsgCloseLease.fromPartial(value)
      };
    },
    withdraw(value: MsgWithdraw) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgWithdraw",
        value: MsgWithdraw.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/liftedinit.billing.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};