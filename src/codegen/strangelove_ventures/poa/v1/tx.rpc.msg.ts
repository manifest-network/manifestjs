import { DeliverTxResponse, StdFee, TxRpc } from "../../../types";
import { MsgCreateValidator, MsgSetPower, MsgRemoveValidator, MsgRemovePending, MsgUpdateStakingParams } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /** CreateValidator is a wrapper method around the SDK's x/staking MsgCreateValidator. */
  createValidator(signerAddress: string, message: MsgCreateValidator, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /** SetPower sets the new power of a validator and accepts new validators into the set. */
  setPower(signerAddress: string, message: MsgSetPower, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /** RemoveValidator removes a validator from the active set and unbonds their delegations. */
  removeValidator(signerAddress: string, message: MsgRemoveValidator, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /** RemovePending removes a pending validator from the queue. */
  removePending(signerAddress: string, message: MsgRemovePending, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /** UpdateStakingParams updates the module parameters. */
  updateStakingParams(signerAddress: string, message: MsgUpdateStakingParams, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* CreateValidator is a wrapper method around the SDK's x/staking MsgCreateValidator. */
  createValidator = async (signerAddress: string, message: MsgCreateValidator, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgCreateValidator.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* SetPower sets the new power of a validator and accepts new validators into the set. */
  setPower = async (signerAddress: string, message: MsgSetPower, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgSetPower.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* RemoveValidator removes a validator from the active set and unbonds their delegations. */
  removeValidator = async (signerAddress: string, message: MsgRemoveValidator, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgRemoveValidator.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* RemovePending removes a pending validator from the queue. */
  removePending = async (signerAddress: string, message: MsgRemovePending, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgRemovePending.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* UpdateStakingParams updates the module parameters. */
  updateStakingParams = async (signerAddress: string, message: MsgUpdateStakingParams, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgUpdateStakingParams.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};