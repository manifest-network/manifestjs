import { ConfigContext, useRegistry } from 'starshipjs';
import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  initChain,
  POA_GROUP_ADDRESS,
  submitVoteExecGroupProposal,
  test1Mnemonic,
  test2Mnemonic,
  waitForNBlocks
} from '../src/test_helper';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { MessageComposer as CosmWasmMessageComposer } from '../../src/codegen/cosmwasm/wasm/v1/tx.registry';
import { Any } from '../../src/codegen/google/protobuf/any';
import { getSigningCosmosClient } from '../../src/codegen';
import { createRPCQueryClient as CosmWasmRPCQueryClient } from '../../src/codegen/cosmwasm/rpc.query';
import { SigningStargateClient } from '@cosmjs/stargate';
import path from 'path';
import fs from 'fs';
import { AccessConfig, AccessType } from '../../src/codegen/cosmwasm/wasm/v1/types';

const wasmFile = fs.readFileSync(path.join(__dirname, "..", "wasm", "cw_template.wasm"));

const inits = [
  {
    description: "group-cosmwasm-admin (proto-signing)",
    createWallets: createProtoWallet,
  },
  {
    description: "group-cosmwasm-admin (amino-signing)",
    createWallets: createAminoWallet,
  },
];

// Test POA module endpoints that require POA Admin permissions with both proto and amino signing.
describe.each(inits)("$description", ({ createWallets }) => {
  let test1Wallet: OfflineSigner,
    test2Wallet: OfflineSigner,
    test1Address: string,
    test2Address: string,
    rpcEndpoint: string,
    fee: { amount: { denom: string; amount: string }[]; gas: string },
    cosmosSigningClient: SigningStargateClient;
  const denom = "umfx";

  beforeAll(async () => {
    const configFile = path.join(
      __dirname,
      "..",
      "configs",
      "config.group.local.yaml"
    );
    ConfigContext.setConfigFile(configFile);
    ConfigContext.setRegistry(await useRegistry(configFile));

    const chainData = await initChain("manifest-ledger-beta");
    rpcEndpoint = chainData.rpcEndpoint;

    await checkPoaAdminIs(rpcEndpoint, POA_GROUP_ADDRESS);

    test1Wallet = await createWallets(test1Mnemonic, chainData.prefix);
    test2Wallet = await createWallets(test2Mnemonic, chainData.prefix);
    fee = { amount: [{ denom, amount: "100000" }], gas: "10000000" };

    test1Address = (await test1Wallet.getAccounts())[0].address;
    test2Address = (await test2Wallet.getAccounts())[0].address;

    expect(test1Address).not.toEqual(test2Address);

    await chainData.creditFromFaucet(test1Address, denom);
    await chainData.creditFromFaucet(test2Address, denom);

    cosmosSigningClient = await getSigningCosmosClient({
      rpcEndpoint,
      signer: test1Wallet,
    });
    await cosmosSigningClient.sendTokens(
      test1Address,
      POA_GROUP_ADDRESS,
      [{ denom, amount: "100000000" }],
      fee
    );
  });

  test("store code (cosmwasm)", async () => {
    const client = await getSigningCosmosClient({
      rpcEndpoint,
      signer: test1Wallet,
    });
    const queryClient = await CosmWasmRPCQueryClient({ rpcEndpoint });

    const codesBefore = await queryClient.cosmwasm.wasm.v1.codes();

    const proposal = Any.fromPartial(
      CosmWasmMessageComposer.encoded.storeCode({
        sender: POA_GROUP_ADDRESS,
        wasmByteCode: wasmFile,
        // https://github.com/CosmWasm/wasmd/issues/1863
        // instantiatePermission: AccessConfig.fromPartial({
        //   permission: AccessType.ACCESS_TYPE_ANY_OF_ADDRESSES,
        //   addresses: [POA_GROUP_ADDRESS],
        // })
      })
    );

    await submitVoteExecGroupProposal(
      test1Address,
      POA_GROUP_ADDRESS,
      client,
      "store wasm code",
      "some wasm code",
      [test1Address],
      [proposal],
      fee
    );
    await waitForNBlocks(client, 2);

    const codes = await queryClient.cosmwasm.wasm.v1.codes()
    expect(codes.codeInfos.length).toEqual(codesBefore.codeInfos.length + 1);
  }, 30000);

  test("instantiate contract (cosmwasm)", async () => {
    const client = await getSigningCosmosClient({
      rpcEndpoint,
      signer: test1Wallet,
    });
    const queryClient = await CosmWasmRPCQueryClient({ rpcEndpoint });

    const contractsBefore = await queryClient.cosmwasm.wasm.v1.contractsByCreator({ creatorAddress: POA_GROUP_ADDRESS });
    const codes = await queryClient.cosmwasm.wasm.v1.codes();
    const codeId = codes.codeInfos[codes.codeInfos.length - 1].codeId;
    const initJson = JSON.stringify({ count: 0 });
    const encoder = new TextEncoder();
    const initMsg = encoder.encode(initJson);

    const proposal = Any.fromPartial(
      CosmWasmMessageComposer.encoded.instantiateContract({
        sender: POA_GROUP_ADDRESS,
        admin: POA_GROUP_ADDRESS,
        codeId,
        label: "test contract",
        msg: initMsg,
        funds: [],
      }))

    await submitVoteExecGroupProposal(
      test1Address,
      POA_GROUP_ADDRESS,
      client,
      "instantiate contract",
      "some contract",
      [test1Address],
      [proposal],
      fee
    );

    const contracts = await queryClient.cosmwasm.wasm.v1.contractsByCreator({ creatorAddress: POA_GROUP_ADDRESS });
    expect(contracts.contractAddresses.length).toEqual(contractsBefore.contractAddresses.length + 1);
  }, 30000);
})
