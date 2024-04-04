import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgPayoutStakeholders, MsgPayoutStakeholdersResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a governance operation for updating the parameters.
   * 
   * Since: cosmos-sdk 0.47
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** PayoutStakeholders allows the authority to manually pay out stakeholders. */
  payoutStakeholders(request: MsgPayoutStakeholders): Promise<MsgPayoutStakeholdersResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.payoutStakeholders = this.payoutStakeholders.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("manifest.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  payoutStakeholders(request: MsgPayoutStakeholders): Promise<MsgPayoutStakeholdersResponse> {
    const data = MsgPayoutStakeholders.encode(request).finish();
    const promise = this.rpc.request("manifest.v1.Msg", "PayoutStakeholders", data);
    return promise.then(data => MsgPayoutStakeholdersResponse.decode(new BinaryReader(data)));
  }
}