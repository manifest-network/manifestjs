import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as manifestV1TxRegistry from "./v1/tx.registry";
import * as manifestV1TxAmino from "./v1/tx.amino";
export const manifestAminoConverters = {
  ...manifestV1TxAmino.AminoConverter
};
export const manifestProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...manifestV1TxRegistry.registry];
export const getSigningManifestClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...manifestProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...manifestAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningManifestClient = async ({
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
  } = getSigningManifestClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};