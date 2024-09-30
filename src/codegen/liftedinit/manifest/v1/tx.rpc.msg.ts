import { DeliverTxResponse, StdFee, TxRpc } from "../../../types";
import { MsgPayout, MsgBurnHeldBalance } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /** Payout allows the authority to manually pay out stakeholders. */
  payout(signerAddress: string, message: MsgPayout, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /** BurnHeldBalance allows a tokenholder to burn coins they own. */
  burnHeldBalance(signerAddress: string, message: MsgBurnHeldBalance, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* Payout allows the authority to manually pay out stakeholders. */
  payout = async (signerAddress: string, message: MsgPayout, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgPayout.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* BurnHeldBalance allows a tokenholder to burn coins they own. */
  burnHeldBalance = async (signerAddress: string, message: MsgBurnHeldBalance, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgBurnHeldBalance.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};