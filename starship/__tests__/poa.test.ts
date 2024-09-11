import "./setup.test";

import { useChain } from "starshipjs";
import { DirectSecp256k1HdWallet, OfflineSigner } from "@cosmjs/proto-signing";
import {
  assertIsDeliverTxSuccess,
  createProtobufRpcClient,
  QueryClient,
  setupStakingExtension,
} from "@cosmjs/stargate";
import { getSigningStrangeloveVenturesClient } from "../../src";
import {
  MsgCreateValidator,
  MsgRemovePending,
  MsgRemoveValidator,
  MsgSetPower,
} from "../../src/codegen/strangelove_ventures/poa/v1/tx";
import {
  CommissionRates,
  Description,
} from "../../src/codegen/strangelove_ventures/poa/v1/validator";
import { PubKey as CosmosCryptoEd25519Pubkey } from "cosmjs-types/cosmos/crypto/ed25519/keys";
import { fromBase64 } from "@cosmjs/encoding";
import { Any } from "../../src/codegen/google/protobuf/any";
import { QueryClientImpl } from "../../src/codegen/strangelove_ventures/poa/v1/query.rpc.Query";
import { HttpEndpoint, Tendermint37Client } from "@cosmjs/tendermint-rpc";

// QueryClient extension for the POA module
function setupPoaExtension(base: QueryClient) {
  const rpcClient = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpcClient);

  return {
    poa: {
      poaAuthority: async () => {
        return await queryService.poaAuthority();
      },
      consensusPower: async (valAddr: string) => {
        return await queryService.consensusPower({ validatorAddress: valAddr });
      },
      pendingValidators: async () => {
        return await queryService.pendingValidators();
      },
    },
  };
}

// This is the POA_ADMIN_ADDRESS mnemonic as defined in the config.yaml file
const poaAdminMnemonic =
  "razor dog gown public private couple ecology paper flee connect local robot diamond stay rude join sound win ribbon soup kidney glass robot vehicle";

// test1 key as defined in https://github.com/cosmology-tech/starship/blob/main/starship/charts/devnet/configs/keys.json
const test1Mnemonic =
  "opinion knife other balcony surge more bamboo canoe romance ask argue teach anxiety adjust spike mystery wolf alone torch tail six decide wash alley";
const test1Val = {
  address: "manifestvaloper1pss7nxeh3f9md2vuxku8q99femnwdjtcjhuxjm",
  pubkey: Any.fromPartial({
    typeUrl: "/cosmos.crypto.ed25519.PubKey",
    value: Uint8Array.from(
      CosmosCryptoEd25519Pubkey.encode(
        CosmosCryptoEd25519Pubkey.fromPartial({
          key: fromBase64("qS4C8i2q1orM463qxf5QA8iAwdZ+Aix7Xm+sJqr1kg4="),
        })
      ).finish()
    ),
  }),
};

// test2 key as defined in https://github.com/cosmology-tech/starship/blob/main/starship/charts/devnet/configs/keys.json
const test2Mnemonic =
  "logic help only text door wealth hurt always remove glory viable income agent olive trial female couch old offer crash menu zero pencil thrive";
const test2Val = {
  address: "manifestvaloper16e0p4vwufmsn0lucwsnfmjfx67ry84y4dh5ec7",
  pubkey: Any.fromPartial({
    typeUrl: "/cosmos.crypto.ed25519.PubKey",
    value: Uint8Array.from(
      CosmosCryptoEd25519Pubkey.encode(
        CosmosCryptoEd25519Pubkey.fromPartial({
          key: fromBase64("0PViQxy6wVFlGV0qocoxxI+a7+8HZawhpmVbHoSlrpE="),
        })
      ).finish()
    ),
  }),
};

describe("poa module", () => {
  let poaWallet: OfflineSigner,
    test1Wallet: OfflineSigner,
    test2Wallet: OfflineSigner,
    denom: string;
  let getRpcEndpoint: () =>
    | string
    | HttpEndpoint
    | PromiseLike<string | HttpEndpoint>;

  beforeAll(async () => {
    let chainInfo: { chain: { bech32_prefix: any } },
      getCoin: () => any,
      creditFromFaucet: (arg0: string, arg1: string) => any;
    ({ chainInfo, getCoin, getRpcEndpoint, creditFromFaucet } = useChain(
      "manifest-ledger-beta"
    ));
    denom = (await getCoin()).base;

    poaWallet = await DirectSecp256k1HdWallet.fromMnemonic(poaAdminMnemonic, {
      prefix: chainInfo.chain.bech32_prefix,
    });
    const poaAddress = (await poaWallet.getAccounts())[0].address;

    test1Wallet = await DirectSecp256k1HdWallet.fromMnemonic(test1Mnemonic, {
      prefix: chainInfo.chain.bech32_prefix,
    });
    const test1Account = (await test1Wallet.getAccounts())[0];
    const test1Address = test1Account.address;

    test2Wallet = await DirectSecp256k1HdWallet.fromMnemonic(test2Mnemonic, {
      prefix: chainInfo.chain.bech32_prefix,
    });
    const test2Account = (await test2Wallet.getAccounts())[0];
    const test2Address = test2Account.address;

    await creditFromFaucet(poaAddress, denom);
    await creditFromFaucet(test1Address, denom);
    await creditFromFaucet(test2Address, denom);
  });

  test("create validator", async () => {
    await createValidator(test1Wallet, test1Val.address, test1Val.pubkey);

    const queryClient = await getQueryClient();
    const pendingValidators = await queryClient.poa.pendingValidators();
    expect(pendingValidators.pending.length).toEqual(1);
    expect(pendingValidators.pending[0].description).toEqual(description);
  });

  test("set power", async () => {
    await setPower(poaWallet, test1Val.address, 2000000n);
    const queryClient = await getQueryClient();
    const consensusPower = await queryClient.poa.consensusPower(
      test1Val.address
    );
    expect(consensusPower.consensusPower).toEqual(2n);

    const pendingValidators = await queryClient.poa.pendingValidators();
    expect(pendingValidators.pending.length).toEqual(0);
    const bondedValidators = await queryClient.staking.validators(
      "BOND_STATUS_BONDED"
    );
    expect(bondedValidators.validators.length).toEqual(2);
  });

  test("remove validator", async () => {
    await removeValidator(poaWallet, test1Val.address);

    const queryClient = await getQueryClient();
    const pendingValidators = await queryClient.poa.pendingValidators();
    expect(pendingValidators.pending.length).toEqual(0);

    // Wait for the validator to be removed to the bonded validators
    setTimeout(() => {}, 10000);

    const bondedValidators = await queryClient.staking.validators(
      "BOND_STATUS_BONDED"
    );
    expect(bondedValidators.validators.length).toEqual(1);

    const unbondingValidators = await queryClient.staking.validators(
      "BOND_STATUS_UNBONDING"
    );
    expect(unbondingValidators.validators.length).toEqual(1);
  });

  test("remove pending validator", async () => {
    await createValidator(test2Wallet, test2Val.address, test2Val.pubkey);

    const queryClient = await getQueryClient();
    const pendingValidators = await queryClient.poa.pendingValidators();
    expect(pendingValidators.pending.length).toEqual(1);

    await removePendingValidator(poaWallet, test2Val.address);

    const pendingValidators2 = await queryClient.poa.pendingValidators();
    expect(pendingValidators2.pending.length).toEqual(0);
  });

  const getFee = () => ({
    amount: [{ denom, amount: "100000" }],
    gas: "550000",
  });

  const description = Description.fromPartial({
    moniker: "SomeMonicker",
    identity: "Some Identity",
    website: "https://manifestai.org",
    securityContact: "security@liftedinit.org",
    details: "This is a test validator",
  });

  const commission = CommissionRates.fromPartial({
    rate: "0.0",
    maxRate: "0.0",
    maxChangeRate: "0.0",
  });

  const getSigningClient = async (signer: OfflineSigner) => {
    return await getSigningStrangeloveVenturesClient({
      rpcEndpoint: await getRpcEndpoint(),
      signer: signer,
    });
  };

  const getQueryClient = async () => {
    const cometClient = await Tendermint37Client.connect(
      await getRpcEndpoint()
    );
    return QueryClient.withExtensions(
      cometClient,
      setupPoaExtension,
      setupStakingExtension
    );
  };

  const createValidator = async (
    signer: OfflineSigner,
    validatorAddress: string,
    valPubKey: Any
  ) => {
    const signingClient = await getSigningClient(signer);
    const fee = getFee();

    const sender = (await signer.getAccounts())[0].address;
    const msg = {
      typeUrl: MsgCreateValidator.typeUrl,
      value: MsgCreateValidator.fromPartial({
        description,
        commission,
        minSelfDelegation: "1",
        validatorAddress,
        pubkey: valPubKey,
      }),
    };
    const result = await signingClient.signAndBroadcast(
      sender,
      [msg],
      fee,
      "create validator test"
    );

    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);
  };

  const setPower = async (
    signer: OfflineSigner,
    validatorAddress: string,
    power: bigint
  ) => {
    const client = await getSigningClient(signer);
    const fee = getFee();

    const sender = (await signer.getAccounts())[0].address;
    const msg = {
      typeUrl: MsgSetPower.typeUrl,
      value: MsgSetPower.fromPartial({
        sender,
        validatorAddress,
        power,
        unsafe: true,
      }),
    };
    const result = await client.signAndBroadcast(
      sender,
      [msg],
      fee,
      "set power test"
    );
    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);
  };

  const removePendingValidator = async (
    signer: OfflineSigner,
    validatorAddress: string
  ) => {
    const client = await getSigningClient(signer);
    const fee = getFee();

    const sender = (await signer.getAccounts())[0].address;
    const msg = {
      typeUrl: MsgRemovePending.typeUrl,
      value: MsgRemovePending.fromPartial({
        sender,
        validatorAddress,
      }),
    };
    const result = await client.signAndBroadcast(
      sender,
      [msg],
      fee,
      "remove pending validator test"
    );
    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);
  };

  const removeValidator = async (
    signer: OfflineSigner,
    validatorAddress: string
  ) => {
    const client = await getSigningClient(signer);
    const fee = getFee();

    const sender = (await signer.getAccounts())[0].address;
    const msg = {
      typeUrl: MsgRemoveValidator.typeUrl,
      value: MsgRemoveValidator.fromPartial({
        sender,
        validatorAddress,
      }),
    };
    const result = await client.signAndBroadcast(
      sender,
      [msg],
      fee,
      "remove validator test"
    );
    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);
  };
});
