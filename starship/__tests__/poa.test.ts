import "./setup.test";

import { OfflineSigner } from "@cosmjs/proto-signing";
import {
  assertIsDeliverTxSuccess,
  QueryClient,
  setupStakingExtension,
} from "@cosmjs/stargate";
import { getSigningStrangeloveVenturesClient } from "../../src";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";
// @ts-ignore
import {
  BONDED,
  createAminoWallet,
  createDefaultCommissionRates,
  createDefaultDescription,
  createMsgCreateValidator,
  createMsgRemovePendingValidator,
  createMsgRemoveValidator,
  createMsgSetPower,
  createProtoWallet,
  initChain,
  poaAdminMnemonic,
  setupPoaExtension,
  test1Mnemonic,
  test1Val,
  test2Mnemonic,
  test2Val,
  test3Mnemonic,
  test3Val,
  test4Mnemonic,
  test4Val,
  UNBONDING,
} from "../src/test_helper";

const inits = [
  {
    description: "poa-module (proto-signing)",
    createWallets: createProtoWallet,
    mnemonics: [poaAdminMnemonic, test1Mnemonic, test2Mnemonic],
    validators: [test1Val, test2Val],
  },
  // TODO: The amino signing tests are currently failing because of the nested Any message in the MsgCreateValidator message.
  {
    description: "poa-module (amino-signing)",
    createWallets: createAminoWallet,
    mnemonics: [poaAdminMnemonic, test3Mnemonic, test4Mnemonic],
    validators: [test3Val, test4Val],
  },
];

// Test all endpoints of the POA module with both Proto and Amino signing
describe.each(inits)(
  "$description",
  ({ createWallets, mnemonics, validators }) => {
    let poaWallet: OfflineSigner,
      test1Wallet: OfflineSigner,
      test2Wallet: OfflineSigner,
      poaAddress: string,
      t1Addr: string,
      t2Addr: string,
      denom: string,
      rpcEndpoint: string,
      fee: { amount: { denom: string; amount: string }[]; gas: string };

    beforeAll(async () => {
      expect(validators.length).toEqual(2);
      expect(mnemonics.length).toEqual(3);

      const chainData = await initChain("manifest-ledger-beta");
      denom = chainData.denom;
      rpcEndpoint = chainData.rpcEndpoint;

      poaWallet = await createWallets(mnemonics[0], chainData.prefix);
      test1Wallet = await createWallets(mnemonics[1], chainData.prefix);
      test2Wallet = await createWallets(mnemonics[2], chainData.prefix);
      fee = { amount: [{ denom, amount: "100000" }], gas: "550000" };

      poaAddress = (await poaWallet.getAccounts())[0].address;
      t1Addr = (await test1Wallet.getAccounts())[0].address;
      t2Addr = (await test2Wallet.getAccounts())[0].address;

      await chainData.creditFromFaucet(poaAddress, denom);
      await chainData.creditFromFaucet(t1Addr, denom);
      await chainData.creditFromFaucet(t2Addr, denom);
    });

    test("create validator", async () => {
      const signingClient = await getSigningClient(test1Wallet);
      const desc = createDefaultDescription();
      const rates = createDefaultCommissionRates();
      const valAddr = validators[0].address;
      const pubkey = validators[0].pubkey;

      const msg = createMsgCreateValidator(valAddr, desc, rates, pubkey);
      const result = await signingClient.signAndBroadcast(t1Addr, [msg], fee);

      assertIsDeliverTxSuccess(result);
      expect(result.code).toEqual(0);

      const queryClient = await getQueryClient();
      const pendingValidators = await queryClient.poa.pendingValidators();
      expect(pendingValidators.pending.length).toEqual(1);
      expect(pendingValidators.pending[0].description).toEqual(desc);
    });

    test("set power", async () => {
      const client = await getSigningClient(poaWallet);
      const valAddr = validators[0].address;
      const msg = createMsgSetPower(poaAddress, valAddr, 2000000n, true);
      const result = await client.signAndBroadcast(poaAddress, [msg], fee);

      assertIsDeliverTxSuccess(result);
      expect(result.code).toEqual(0);

      const queryClient = await getQueryClient();
      const consensusPower = await queryClient.poa.consensusPower(valAddr);
      expect(consensusPower.consensusPower).toEqual(2n);

      const pendingValidators = await queryClient.poa.pendingValidators();
      expect(pendingValidators.pending.length).toEqual(0);
      const bondedValidators = await queryClient.staking.validators(BONDED);
      expect(bondedValidators.validators.length).toEqual(2);
    });

    test("remove validator", async () => {
      const client = await getSigningClient(poaWallet);
      const valAddr = validators[0].address;
      const msg = createMsgRemoveValidator(poaAddress, valAddr);
      const result = await client.signAndBroadcast(poaAddress, [msg], fee);

      assertIsDeliverTxSuccess(result);
      expect(result.code).toEqual(0);

      const queryClient = await getQueryClient();
      const pendingValidators = await queryClient.poa.pendingValidators();
      expect(pendingValidators.pending.length).toEqual(0);

      // Wait for the validator to be removed to the bonded validators
      setTimeout(() => {}, 10000);

      const bondedVal = await queryClient.staking.validators(BONDED);
      expect(bondedVal.validators.length).toEqual(1);
      const unbondingVal = await queryClient.staking.validators(UNBONDING);
      expect(unbondingVal.validators.length).toEqual(1);
    });

    test("remove pending validator", async () => {
      const test2Client = await getSigningClient(test2Wallet);
      const desc = createDefaultDescription();
      const rates = createDefaultCommissionRates();
      const valAddr = validators[1].address;
      const pubkey = validators[1].pubkey;
      const msgCreate = createMsgCreateValidator(valAddr, desc, rates, pubkey);
      const resultCreate = await test2Client.signAndBroadcast(
        t2Addr,
        [msgCreate],
        fee
      );
      assertIsDeliverTxSuccess(resultCreate);
      expect(resultCreate.code).toEqual(0);

      const queryClient = await getQueryClient();
      const pendingValidators = await queryClient.poa.pendingValidators();
      expect(pendingValidators.pending.length).toEqual(1);

      const poaClient = await getSigningClient(poaWallet);
      const msg = createMsgRemovePendingValidator(poaAddress, valAddr);
      const result = await poaClient.signAndBroadcast(poaAddress, [msg], fee);

      assertIsDeliverTxSuccess(result);
      expect(result.code).toEqual(0);

      const pendingValidators2 = await queryClient.poa.pendingValidators();
      expect(pendingValidators2.pending.length).toEqual(0);
    });

    const getSigningClient = async (signer: OfflineSigner) => {
      return await getSigningStrangeloveVenturesClient({
        rpcEndpoint,
        signer: signer,
      });
    };

    const getQueryClient = async () => {
      const cometClient = await Tendermint37Client.connect(rpcEndpoint);
      return QueryClient.withExtensions(
        cometClient,
        setupPoaExtension,
        setupStakingExtension
      );
    };
  }
);
