import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as strangeloveVenturesPoaV1TxRegistry from "./poa/v1/tx.registry";
import * as strangeloveVenturesPoaV1TxAmino from "./poa/v1/tx.amino";
export const strangeloveVenturesAminoConverters = {
  ...strangeloveVenturesPoaV1TxAmino.AminoConverter
};
export const strangeloveVenturesProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...strangeloveVenturesPoaV1TxRegistry.registry];
export const getSigningStrangeloveVenturesClientOptions = ({
  defaultTypes = defaultRegistryTypes
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