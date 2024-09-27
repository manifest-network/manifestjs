import { encodePubkey, OfflineSigner } from "@cosmjs/proto-signing";
import {
  assertIsDeliverTxFailure,
  assertIsDeliverTxSuccess,
} from "@cosmjs/stargate";
import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  initChain, POA_ADDRESS,
  poaAdminMnemonic,
  test1Val,
  test3Val,
  waitForNBlocks,
  // @ts-ignore
} from "../src/test_helper";
import { MessageComposer } from "../../src/codegen/strangelove_ventures/poa/v1/tx.registry";
import {
  CommissionRates,
  Description,
} from "../../src/codegen/strangelove_ventures/poa/v1/validator";
import { encodeEd25519Pubkey } from "@cosmjs/amino";
import { fromBase64 } from "@cosmjs/encoding";
import { createRPCQueryClient } from "../../src/codegen/strangelove_ventures/rpc.query";
import path from "path";
import {ConfigContext, useRegistry} from "starshipjs";
import {getSigningStrangeloveVenturesClient} from "../../src/codegen";

const inits = [
  {
    description: "poa-module (proto-signing)",
    createWallets: createProtoWallet,
    validator: test1Val,
  },
  {
    description: "poa-module (amino-signing)",
    createWallets: createAminoWallet,
    validator: test3Val,
  },
];

// Test all endpoints of the POA module with both Proto and Amino signing
describe.each(inits)("$description", ({ createWallets, validator }) => {
  let poaWallet: OfflineSigner,
    test1Wallet: OfflineSigner,
    poaAddress: string,
    t1Addr: string,
    rpcEndpoint: string,
    fee: { amount: { denom: string; amount: string }[]; gas: string };
  const denom = "umfx";

  beforeAll(async () => {
    const configFile = path.join(__dirname, "..", "configs", "config.local.yaml");
    ConfigContext.setConfigFile(configFile);
    ConfigContext.setRegistry(await useRegistry(configFile));

    const chainData = await initChain("manifest-ledger-beta");
    rpcEndpoint = chainData.rpcEndpoint;

    await checkPoaAdminIs(rpcEndpoint, POA_ADDRESS);

    poaWallet = await createWallets(poaAdminMnemonic, chainData.prefix);
    test1Wallet = await createWallets(validator.mnemonic, chainData.prefix);
    fee = { amount: [{ denom, amount: "100000" }], gas: "550000" };

    poaAddress = (await poaWallet.getAccounts())[0].address;
    t1Addr = (await test1Wallet.getAccounts())[0].address;

    await chainData.creditFromFaucet(poaAddress, denom);
    await chainData.creditFromFaucet(t1Addr, denom);
  });

  test("create validator", async () => {
    const signingClient = await getSigningStrangeloveVenturesClient({
      rpcEndpoint,
      signer: test1Wallet,
    });
    const description = Description.fromPartial({
      moniker: "test-validator",
      identity: "some identity",
      website: "www.some.website.com",
      securityContact: "some contact",
      details: "some details",
    });
    // Rates must be integers, not floating point numbers.
    // E.g., 1000000000000000000 == 1.0
    const commission = CommissionRates.fromPartial({
      rate: "0",
      maxRate: "0",
      maxChangeRate: "0",
    });
    const msg = MessageComposer.fromPartial.createValidator({
      description,
      commission,
      minSelfDelegation: "1",
      delegatorAddress: "",
      validatorAddress: validator.address,
      pubkey: encodePubkey(encodeEd25519Pubkey(fromBase64(validator.pubkey))),
    });
    const result = await signingClient.signAndBroadcast(t1Addr, [msg], fee);

    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);

    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const pendingValidators =
      await queryClient.strangelove_ventures.poa.v1.pendingValidators();
    expect(pendingValidators.pending.length).toEqual(1);
    expect(pendingValidators.pending[0].description).toEqual(description);
  });

  test("remove pending validator", async () => {
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const pendingValidators =
      await queryClient.strangelove_ventures.poa.v1.pendingValidators();
    expect(pendingValidators.pending.length).toEqual(1);

    const poaClient = await getSigningStrangeloveVenturesClient({
      rpcEndpoint,
      signer: poaWallet,
    });
    const msg = MessageComposer.fromPartial.removePending({
      sender: poaAddress,
      validatorAddress: validator.address,
    });
    const result = await poaClient.signAndBroadcast(poaAddress, [msg], fee);

    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);

    const pendingValidators2 =
      await queryClient.strangelove_ventures.poa.v1.pendingValidators();
    expect(pendingValidators2.pending.length).toEqual(0);
  });

  test("set power", async () => {
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const bondedVal = await queryClient.cosmos.staking.v1beta1.validators({
      status: "BOND_STATUS_BONDED",
    });
    expect(bondedVal.validators.length).toEqual(1);

    const val = bondedVal.validators[0];
    const validatorAddress = val.operatorAddress;

    const currentPower =
      await queryClient.strangelove_ventures.poa.v1.consensusPower({
        validatorAddress,
      });
    const newPower = (currentPower.consensusPower + 1n) * 1000000n;

    const client = await getSigningStrangeloveVenturesClient({
      rpcEndpoint,
      signer: poaWallet,
    });
    const msg = MessageComposer.fromPartial.setPower({
      sender: poaAddress,
      validatorAddress,
      power: newPower,
      unsafe: true,
    });
    const result = await client.signAndBroadcast(poaAddress, [msg], fee);

    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);

    await waitForNBlocks(client, 5);

    const consensusPower =
      await queryClient.strangelove_ventures.poa.v1.consensusPower({
        validatorAddress,
      });
    expect(consensusPower.consensusPower).toEqual(
      currentPower.consensusPower + 1n
    );
  });

  test("remove validator (fail)", async () => {
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const bondedVal = await queryClient.cosmos.staking.v1beta1.validators({
      status: "BOND_STATUS_BONDED",
    });
    expect(bondedVal.validators.length).toEqual(1);

    const val = bondedVal.validators[0];
    const validatorAddress = val.operatorAddress;

    const client = await getSigningStrangeloveVenturesClient({
      rpcEndpoint,
      signer: poaWallet,
    });
    const msg = MessageComposer.fromPartial.removeValidator({
      sender: poaAddress,
      validatorAddress,
    });
    const result = await client.signAndBroadcast(poaAddress, [msg], fee);

    // What we really want to test is if the message gets through.
    // It is expected to fail because the validator is the last one in the set.
    assertIsDeliverTxFailure(result);
    expect(result.code).toEqual(1);
    expect(result.rawLog).toContain(
      "cannot remove the last validator in the set"
    );
  });
});
