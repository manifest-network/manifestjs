import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgCreateValidator, MsgCreateValidatorResponse, MsgSetPower, MsgSetPowerResponse, MsgRemoveValidator, MsgRemoveValidatorResponse, MsgRemovePending, MsgRemovePendingResponse, MsgUpdateStakingParams, MsgUpdateStakingParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /** CreateValidator is a wrapper method around the SDK's x/staking MsgCreateValidator. */
  createValidator(request: MsgCreateValidator): Promise<MsgCreateValidatorResponse>;
  /** SetPower sets the new power of a validator and accepts new validators into the set. */
  setPower(request: MsgSetPower): Promise<MsgSetPowerResponse>;
  /** RemoveValidator removes a validator from the active set and unbonds their delegations. */
  removeValidator(request: MsgRemoveValidator): Promise<MsgRemoveValidatorResponse>;
  /** RemovePending removes a pending validator from the queue. */
  removePending(request: MsgRemovePending): Promise<MsgRemovePendingResponse>;
  /** UpdateStakingParams updates the module parameters. */
  updateStakingParams(request: MsgUpdateStakingParams): Promise<MsgUpdateStakingParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  /* CreateValidator is a wrapper method around the SDK's x/staking MsgCreateValidator. */
  createValidator = async (request: MsgCreateValidator): Promise<MsgCreateValidatorResponse> => {
    const data = MsgCreateValidator.encode(request).finish();
    const promise = this.rpc.request("strangelove_ventures.poa.v1.Msg", "CreateValidator", data);
    return promise.then(data => MsgCreateValidatorResponse.decode(new BinaryReader(data)));
  };
  /* SetPower sets the new power of a validator and accepts new validators into the set. */
  setPower = async (request: MsgSetPower): Promise<MsgSetPowerResponse> => {
    const data = MsgSetPower.encode(request).finish();
    const promise = this.rpc.request("strangelove_ventures.poa.v1.Msg", "SetPower", data);
    return promise.then(data => MsgSetPowerResponse.decode(new BinaryReader(data)));
  };
  /* RemoveValidator removes a validator from the active set and unbonds their delegations. */
  removeValidator = async (request: MsgRemoveValidator): Promise<MsgRemoveValidatorResponse> => {
    const data = MsgRemoveValidator.encode(request).finish();
    const promise = this.rpc.request("strangelove_ventures.poa.v1.Msg", "RemoveValidator", data);
    return promise.then(data => MsgRemoveValidatorResponse.decode(new BinaryReader(data)));
  };
  /* RemovePending removes a pending validator from the queue. */
  removePending = async (request: MsgRemovePending): Promise<MsgRemovePendingResponse> => {
    const data = MsgRemovePending.encode(request).finish();
    const promise = this.rpc.request("strangelove_ventures.poa.v1.Msg", "RemovePending", data);
    return promise.then(data => MsgRemovePendingResponse.decode(new BinaryReader(data)));
  };
  /* UpdateStakingParams updates the module parameters. */
  updateStakingParams = async (request: MsgUpdateStakingParams): Promise<MsgUpdateStakingParamsResponse> => {
    const data = MsgUpdateStakingParams.encode(request).finish();
    const promise = this.rpc.request("strangelove_ventures.poa.v1.Msg", "UpdateStakingParams", data);
    return promise.then(data => MsgUpdateStakingParamsResponse.decode(new BinaryReader(data)));
  };
}