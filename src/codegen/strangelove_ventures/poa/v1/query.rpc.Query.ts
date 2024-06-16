import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, ParamsResponse, QueryPendingValidatorsRequest, PendingValidatorsResponse, QueryConsensusPowerRequest, QueryConsensusPowerResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params returns the current params of the module. */
  params(request?: QueryParamsRequest): Promise<ParamsResponse>;
  /** PendingValidators returns currently pending validators of the module. */
  pendingValidators(request?: QueryPendingValidatorsRequest): Promise<PendingValidatorsResponse>;
  /** ConsensusPower returns the current consensus power of a validator. */
  consensusPower(request: QueryConsensusPowerRequest): Promise<QueryConsensusPowerResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  /* Params returns the current params of the module. */
  params = async (request: QueryParamsRequest = {}): Promise<ParamsResponse> => {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("strangelove_ventures.poa.v1.Query", "Params", data);
    return promise.then(data => ParamsResponse.decode(new BinaryReader(data)));
  };
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
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<ParamsResponse> {
      return queryService.params(request);
    },
    pendingValidators(request?: QueryPendingValidatorsRequest): Promise<PendingValidatorsResponse> {
      return queryService.pendingValidators(request);
    },
    consensusPower(request: QueryConsensusPowerRequest): Promise<QueryConsensusPowerResponse> {
      return queryService.consensusPower(request);
    }
  };
};