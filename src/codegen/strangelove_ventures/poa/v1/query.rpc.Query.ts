import { TxRpc } from "../../../types";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryPendingValidatorsRequest, PendingValidatorsResponse, QueryConsensusPowerRequest, QueryConsensusPowerResponse, QueryPoaAuthorityRequest, QueryPoaAuthorityResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** PendingValidators returns currently pending validators of the module. */
  pendingValidators(request?: QueryPendingValidatorsRequest): Promise<PendingValidatorsResponse>;
  /** ConsensusPower returns the current consensus power of a validator. */
  consensusPower(request: QueryConsensusPowerRequest): Promise<QueryConsensusPowerResponse>;
  /** POA Authority */
  poaAuthority(request?: QueryPoaAuthorityRequest): Promise<QueryPoaAuthorityResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* PendingValidators returns currently pending validators of the module. */
  pendingValidators = async (request: QueryPendingValidatorsRequest = {}): Promise<PendingValidatorsResponse> => {
    const data = QueryPendingValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request("strangelove_ventures.poa.v1.Query", "PendingValidators", data);
    return promise.then(data => PendingValidatorsResponse.decode(new BinaryReader(data)));
  };
  /* ConsensusPower returns the current consensus power of a validator. */
  consensusPower = async (request: QueryConsensusPowerRequest): Promise<QueryConsensusPowerResponse> => {
    const data = QueryConsensusPowerRequest.encode(request).finish();
    const promise = this.rpc.request("strangelove_ventures.poa.v1.Query", "ConsensusPower", data);
    return promise.then(data => QueryConsensusPowerResponse.decode(new BinaryReader(data)));
  };
  /* POA Authority */
  poaAuthority = async (request: QueryPoaAuthorityRequest = {}): Promise<QueryPoaAuthorityResponse> => {
    const data = QueryPoaAuthorityRequest.encode(request).finish();
    const promise = this.rpc.request("strangelove_ventures.poa.v1.Query", "PoaAuthority", data);
    return promise.then(data => QueryPoaAuthorityResponse.decode(new BinaryReader(data)));
  };
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    pendingValidators(request?: QueryPendingValidatorsRequest): Promise<PendingValidatorsResponse> {
      return queryService.pendingValidators(request);
    },
    consensusPower(request: QueryConsensusPowerRequest): Promise<QueryConsensusPowerResponse> {
      return queryService.consensusPower(request);
    },
    poaAuthority(request?: QueryPoaAuthorityRequest): Promise<QueryPoaAuthorityResponse> {
      return queryService.poaAuthority(request);
    }
  };
};