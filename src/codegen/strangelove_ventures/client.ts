import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import { createRpcClient } from "../extern";
import { DeliverTxResponse, EncodeObject, StdFee, TxRpc, SigningClientParams } from "../types";
import * as strangeloveVenturesPoaV1TxRegistry from "./poa/v1/tx.registry";
import * as strangeloveVenturesPoaV1TxAmino from "./poa/v1/tx.amino";
export const strangeloveVenturesAminoConverters = {
  ...strangeloveVenturesPoaV1TxAmino.AminoConverter
};
export const strangeloveVenturesProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...strangeloveVenturesPoaV1TxRegistry.registry];
export const getSigningStrangeloveVenturesClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...strangeloveVenturesProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...strangeloveVenturesAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningStrangeloveVenturesClient = async ({
  rpcEndpoint,
  signer,
  defaultTypes = defaultRegistryTypes
}: {
  rpcEndpoint: string | HttpEndpoint;
  signer: OfflineSigner;
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => {
  const {
    registry,
    aminoTypes
  } = getSigningStrangeloveVenturesClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: registry as any,
    aminoTypes
  });
  return client;
};
export const getSigningStrangeloveVenturesTxRpc = async ({
  rpcEndpoint,
  signer
}: SigningClientParams) => {
  let txRpc = (await createRpcClient(rpcEndpoint)) as TxRpc;
  const signingClient = await getSigningStrangeloveVenturesClient({
    rpcEndpoint,
    signer
  });
  txRpc.signAndBroadcast = (signerAddress: string, messages: EncodeObject[], fee: number | StdFee | "auto", memo?: string) => {
    return signingClient.signAndBroadcast(signerAddress, messages, fee, memo) as Promise<DeliverTxResponse>;
  };
  return txRpc;
};