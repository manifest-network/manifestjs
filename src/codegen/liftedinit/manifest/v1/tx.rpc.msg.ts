import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgPayout, MsgPayoutResponse, MsgBurnHeldBalance, MsgBurnHeldBalanceResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a governance operation for updating the parameters.
   * 
   * Since: cosmos-sdk 0.47
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** Payout allows the authority to manually pay out stakeholders. */
  payout(request: MsgPayout): Promise<MsgPayoutResponse>;
  /** BurnHeldBalance allows a tokenholder to burn coins they own. */
  burnHeldBalance(request: MsgBurnHeldBalance): Promise<MsgBurnHeldBalanceResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  /* UpdateParams defines a governance operation for updating the parameters.
  
   Since: cosmos-sdk 0.47 */
  updateParams = async (request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> => {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("liftedinit.manifest.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  };
  /* Payout allows the authority to manually pay out stakeholders. */
  payout = async (request: MsgPayout): Promise<MsgPayoutResponse> => {
    const data = MsgPayout.encode(request).finish();
    const promise = this.rpc.request("liftedinit.manifest.v1.Msg", "Payout", data);
    return promise.then(data => MsgPayoutResponse.decode(new BinaryReader(data)));
  };
  /* BurnHeldBalance allows a tokenholder to burn coins they own. */
  burnHeldBalance = async (request: MsgBurnHeldBalance): Promise<MsgBurnHeldBalanceResponse> => {
    const data = MsgBurnHeldBalance.encode(request).finish();
    const promise = this.rpc.request("liftedinit.manifest.v1.Msg", "BurnHeldBalance", data);
    return promise.then(data => MsgBurnHeldBalanceResponse.decode(new BinaryReader(data)));
  };
}