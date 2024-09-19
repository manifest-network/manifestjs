import "./setup.test";

import { OfflineSigner } from "@cosmjs/proto-signing";
import {
  assertIsDeliverTxFailure,
  assertIsDeliverTxSuccess,
  QueryClient,
  setupStakingExtension, SigningStargateClient,
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
  test3Mnemonic,
  test3Val,
} from "../src/test_helper";

const inits = [
  {
    description: "poa-module (proto-signing)",
    createWallets: createProtoWallet,
    mnemonics: [poaAdminMnemonic, test1Mnemonic],
    validators: [test1Val],
  },
  {
    description: "poa-module (amino-signing)",
    createWallets: createAminoWallet,
    mnemonics: [poaAdminMnemonic, test3Mnemonic],
    validators: [test3Val],
  },
];

// Test all endpoints of the POA module with both Proto and Amino signing
describe.each(inits)(
  "$description",
  ({ createWallets, mnemonics, validators }) => {
    let poaWallet: OfflineSigner,
      test1Wallet: OfflineSigner,
      poaAddress: string,
      t1Addr: string,
      rpcEndpoint: string,
      fee: { amount: { denom: string; amount: string }[]; gas: string }

    const denom = "umfx";

    beforeAll(async () => {
      expect(validators.length).toBeGreaterThanOrEqual(1);
      expect(mnemonics.length).toBeGreaterThanOrEqual(2);

      const chainData = await initChain("manifest-ledger-beta");
      rpcEndpoint = chainData.rpcEndpoint;

      poaWallet = await createWallets(mnemonics[0], chainData.prefix);
      test1Wallet = await createWallets(mnemonics[1], chainData.prefix);
      fee = { amount: [{ denom, amount: "100000" }], gas: "550000" };

      poaAddress = (await poaWallet.getAccounts())[0].address;
      t1Addr = (await test1Wallet.getAccounts())[0].address;

      await chainData.creditFromFaucet(poaAddress, denom);
      await chainData.creditFromFaucet(t1Addr, denom);
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

    test("remove pending validator", async () => {
      const valAddr = validators[0].address;
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

    test("set power", async () => {
      const queryClient = await getQueryClient();
      const bondedVal = await queryClient.staking.validators(BONDED);
      expect(bondedVal.validators.length).toEqual(1);

      const val = bondedVal.validators[0]
      const valAddr = val.operatorAddress

      const currentPower = await queryClient.poa.consensusPower(valAddr);
      const newPower = (currentPower.consensusPower + 1n) * 1000000n;

      const client = await getSigningClient(poaWallet);
      const msg = createMsgSetPower(poaAddress, valAddr, newPower, true);
      const result = await client.signAndBroadcast(poaAddress, [msg], fee);

      assertIsDeliverTxSuccess(result);
      expect(result.code).toEqual(0);

      await waitForNBlocks(client, 5);

      const consensusPower = await queryClient.poa.consensusPower(valAddr);
      expect(consensusPower.consensusPower).toEqual(currentPower.consensusPower + 1n);
    });

    test("remove validator (fail)", async () => {
      const queryClient = await getQueryClient();
      const bondedVal = await queryClient.staking.validators(BONDED);
      expect(bondedVal.validators.length).toEqual(1);

      const val = bondedVal.validators[0]
      const valAddr = val.operatorAddress

      const client = await getSigningClient(poaWallet);
      const msg = createMsgRemoveValidator(poaAddress, valAddr);
      const result = await client.signAndBroadcast(poaAddress, [msg], fee);

      // What we really want to test is if the message gets through.
      // It is expected to fail because the validator is the last one in the set.
      assertIsDeliverTxFailure(result);
      expect(result.code).toEqual(1);
      expect(result.rawLog).toContain("cannot remove the last validator in the set");
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
        setupStakingExtension,
      );
    };

    const waitForNBlocks = async (client: SigningStargateClient, numBlocks: number) => {
      const height = await client.getHeight();
      let currentHeight = height;
      while (currentHeight < height + numBlocks) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        currentHeight = await client.getHeight()
    }
  };
});
