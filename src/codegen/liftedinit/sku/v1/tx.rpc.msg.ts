import { DeliverTxResponse, StdFee, TxRpc } from "../../../types";
import { MsgCreateProvider, MsgUpdateProvider, MsgDeactivateProvider, MsgCreateSKU, MsgUpdateSKU, MsgDeactivateSKU, MsgUpdateParams } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /** CreateProvider creates a new provider. */
  createProvider(signerAddress: string, message: MsgCreateProvider, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /** UpdateProvider updates an existing provider. */
  updateProvider(signerAddress: string, message: MsgUpdateProvider, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /**
   * DeactivateProvider deactivates a provider (soft delete).
   * Deactivated providers cannot create new SKUs but existing SKUs continue.
   */
  deactivateProvider(signerAddress: string, message: MsgDeactivateProvider, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /** CreateSKU creates a new SKU. */
  createSKU(signerAddress: string, message: MsgCreateSKU, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /** UpdateSKU updates an existing SKU. */
  updateSKU(signerAddress: string, message: MsgUpdateSKU, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /**
   * DeactivateSKU deactivates a SKU (soft delete).
   * Deactivated SKUs cannot be used for new leases but existing leases continue.
   */
  deactivateSKU(signerAddress: string, message: MsgDeactivateSKU, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /** UpdateParams updates the module parameters. */
  updateParams(signerAddress: string, message: MsgUpdateParams, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* CreateProvider creates a new provider. */
  createProvider = async (signerAddress: string, message: MsgCreateProvider, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgCreateProvider.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* UpdateProvider updates an existing provider. */
  updateProvider = async (signerAddress: string, message: MsgUpdateProvider, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgUpdateProvider.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* DeactivateProvider deactivates a provider (soft delete).
   Deactivated providers cannot create new SKUs but existing SKUs continue. */
  deactivateProvider = async (signerAddress: string, message: MsgDeactivateProvider, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgDeactivateProvider.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* CreateSKU creates a new SKU. */
  createSKU = async (signerAddress: string, message: MsgCreateSKU, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgCreateSKU.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* UpdateSKU updates an existing SKU. */
  updateSKU = async (signerAddress: string, message: MsgUpdateSKU, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgUpdateSKU.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* DeactivateSKU deactivates a SKU (soft delete).
   Deactivated SKUs cannot be used for new leases but existing leases continue. */
  deactivateSKU = async (signerAddress: string, message: MsgDeactivateSKU, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgDeactivateSKU.typeUrl,
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