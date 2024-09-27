import { TxRpc } from "../../../types";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
/** Query provides defines the gRPC querier service. */
export interface Query {}
export class QueryClientImpl implements Query {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {};
};