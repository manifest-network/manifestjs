import { LCDClient } from "@cosmology/lcd";
import { QueryPendingValidatorsRequest, PendingValidatorsResponseSDKType, QueryConsensusPowerRequest, QueryConsensusPowerResponseSDKType, QueryPoaAuthorityRequest, QueryPoaAuthorityResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
  }
  /* PendingValidators returns currently pending validators of the module. */
  pendingValidators = async (_params: QueryPendingValidatorsRequest = {}): Promise<PendingValidatorsResponseSDKType> => {
    const endpoint = `poa/v1/pending_validators`;
    return await this.req.get<PendingValidatorsResponseSDKType>(endpoint);
  };
  /* ConsensusPower returns the current consensus power of a validator. */
  consensusPower = async (params: QueryConsensusPowerRequest): Promise<QueryConsensusPowerResponseSDKType> => {
    const options: any = {
      params: {}
    };
    if (typeof params?.validatorAddress !== "undefined") {
      options.params.validator_address = params.validatorAddress;
    }
    const endpoint = `poa/v1/consensus_power`;
    return await this.req.get<QueryConsensusPowerResponseSDKType>(endpoint, options);
  };
  /* POA Authority */
  poaAuthority = async (_params: QueryPoaAuthorityRequest = {}): Promise<QueryPoaAuthorityResponseSDKType> => {
    const endpoint = `poa/v1/authority`;
    return await this.req.get<QueryPoaAuthorityResponseSDKType>(endpoint);
  };
}