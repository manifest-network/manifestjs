import { DeliverTxResponse, StdFee, TxRpc } from "../../../types";
import { MsgAuthorizeCircuitBreaker, MsgTripCircuitBreaker, MsgResetCircuitBreaker } from "./tx";
/** Msg defines the circuit Msg service. */
export interface Msg {
  /**
   * AuthorizeCircuitBreaker allows a super-admin to grant (or revoke) another
   * account's circuit breaker permissions.
   */
  authorizeCircuitBreaker(signerAddress: string, message: MsgAuthorizeCircuitBreaker, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /** TripCircuitBreaker pauses processing of Msg's in the state machine. */
  tripCircuitBreaker(signerAddress: string, message: MsgTripCircuitBreaker, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
  /**
   * ResetCircuitBreaker resumes processing of Msg's in the state machine that
   * have been been paused using TripCircuitBreaker.
   */
  resetCircuitBreaker(signerAddress: string, message: MsgResetCircuitBreaker, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* AuthorizeCircuitBreaker allows a super-admin to grant (or revoke) another
   account's circuit breaker permissions. */
  authorizeCircuitBreaker = async (signerAddress: string, message: MsgAuthorizeCircuitBreaker, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgAuthorizeCircuitBreaker.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* TripCircuitBreaker pauses processing of Msg's in the state machine. */
  tripCircuitBreaker = async (signerAddress: string, message: MsgTripCircuitBreaker, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgTripCircuitBreaker.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
  /* ResetCircuitBreaker resumes processing of Msg's in the state machine that
   have been been paused using TripCircuitBreaker. */
  resetCircuitBreaker = async (signerAddress: string, message: MsgResetCircuitBreaker, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgResetCircuitBreaker.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};