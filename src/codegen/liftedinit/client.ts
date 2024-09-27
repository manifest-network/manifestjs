import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import { createRpcClient } from "../extern";
import { DeliverTxResponse, EncodeObject, StdFee, TxRpc, SigningClientParams } from "../types";
import * as liftedinitManifestV1TxRegistry from "./manifest/v1/tx.registry";
import * as liftedinitManifestV1TxAmino from "./manifest/v1/tx.amino";
export const liftedinitAminoConverters = {
  ...liftedinitManifestV1TxAmino.AminoConverter
};
export const liftedinitProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...liftedinitManifestV1TxRegistry.registry];
export const getSigningLiftedinitClientOptions = ({
  defaultTypes = defaultRegistryTypes
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...liftedinitProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...liftedinitAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningLiftedinitClient = async ({
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
  } = getSigningLiftedinitClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: registry as any,
    aminoTypes
  });
  return client;
};
export const getSigningLiftedinitTxRpc = async ({
  rpcEndpoint,
  signer
}: SigningClientParams) => {
  let txRpc = (await createRpcClient(rpcEndpoint)) as TxRpc;
  const signingClient = await getSigningLiftedinitClient({
    rpcEndpoint,
    signer
  });
  txRpc.signAndBroadcast = (signerAddress: string, messages: EncodeObject[], fee: number | StdFee | "auto", memo?: string) => {
    return signingClient.signAndBroadcast(signerAddress, messages, fee, memo) as Promise<DeliverTxResponse>;
  };
  return txRpc;
};