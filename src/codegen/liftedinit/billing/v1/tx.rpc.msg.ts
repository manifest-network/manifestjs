import { DeliverTxResponse, StdFee, TxRpc } from "../../../types";
import { MsgFundCredit, MsgCreateLease, MsgCreateLeaseForTenant, MsgAcknowledgeLease, MsgRejectLease, MsgCancelLease, MsgCloseLease, MsgWithdraw, MsgUpdateParams } from "./tx";
/** Msg defines the billing module's Msg service. */
export interface Msg {
  /** FundCredit funds a tenant's credit account. */
  fundCredit(signerAddress: string, message: MsgFundCredit, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /**
   * CreateLease creates a new lease for the tenant.
   * The lease starts in PENDING state awaiting provider acknowledgement.
   */
  createLease(signerAddress: string, message: MsgCreateLease, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /**
   * CreateLeaseForTenant allows authority to create a lease on behalf of a tenant.
   * This is used for migrating off-chain leases to on-chain.
   * The lease starts in PENDING state awaiting provider acknowledgement.
   */
  createLeaseForTenant(signerAddress: string, message: MsgCreateLeaseForTenant, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /**
   * AcknowledgeLease allows a provider to acknowledge a PENDING lease.
   * This transitions the lease to ACTIVE state and starts billing.
   */
  acknowledgeLease(signerAddress: string, message: MsgAcknowledgeLease, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /**
   * RejectLease allows a provider to reject a PENDING lease.
   * This transitions the lease to REJECTED state and unlocks tenant credit.
   */
  rejectLease(signerAddress: string, message: MsgRejectLease, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /**
   * CancelLease allows a tenant to cancel their own PENDING lease.
   * This transitions the lease to REJECTED state and unlocks tenant credit.
   */
  cancelLease(signerAddress: string, message: MsgCancelLease, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /** CloseLease closes an active lease. */
  closeLease(signerAddress: string, message: MsgCloseLease, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /**
   * Withdraw allows a provider to withdraw accrued funds from leases.
   * Two modes: specific lease UUIDs, or provider-wide with pagination.
   */
  withdraw(signerAddress: string, message: MsgWithdraw, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /** UpdateParams updates the module parameters. */
  updateParams(signerAddress: string, message: MsgUpdateParams, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* FundCredit funds a tenant's credit account. */
  fundCredit = async (signerAddress: string, message: MsgFundCredit, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgFundCredit.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* CreateLease creates a new lease for the tenant.
   The lease starts in PENDING state awaiting provider acknowledgement. */
  createLease = async (signerAddress: string, message: MsgCreateLease, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgCreateLease.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* CreateLeaseForTenant allows authority to create a lease on behalf of a tenant.
   This is used for migrating off-chain leases to on-chain.
   The lease starts in PENDING state awaiting provider acknowledgement. */
  createLeaseForTenant = async (signerAddress: string, message: MsgCreateLeaseForTenant, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgCreateLeaseForTenant.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* AcknowledgeLease allows a provider to acknowledge a PENDING lease.
   This transitions the lease to ACTIVE state and starts billing. */
  acknowledgeLease = async (signerAddress: string, message: MsgAcknowledgeLease, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgAcknowledgeLease.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* RejectLease allows a provider to reject a PENDING lease.
   This transitions the lease to REJECTED state and unlocks tenant credit. */
  rejectLease = async (signerAddress: string, message: MsgRejectLease, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgRejectLease.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* CancelLease allows a tenant to cancel their own PENDING lease.
   This transitions the lease to REJECTED state and unlocks tenant credit. */
  cancelLease = async (signerAddress: string, message: MsgCancelLease, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgCancelLease.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* CloseLease closes an active lease. */
  closeLease = async (signerAddress: string, message: MsgCloseLease, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgCloseLease.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* Withdraw allows a provider to withdraw accrued funds from leases.
   Two modes: specific lease UUIDs, or provider-wide with pagination. */
  withdraw = async (signerAddress: string, message: MsgWithdraw, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgWithdraw.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* UpdateParams updates the module parameters. */
  updateParams = async (signerAddress: string, message: MsgUpdateParams, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgUpdateParams.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};