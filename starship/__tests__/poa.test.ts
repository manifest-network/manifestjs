import { encodePubkey, OfflineSigner } from "@cosmjs/proto-signing";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import {
  checkPoaAdminIs,
  createAminoWallet,
  createProtoWallet,
  initChain,
  POA_GROUP_ADDRESS,
  test1Val,
  test3Val,
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
import { ConfigContext, useRegistry } from "starshipjs";
import { getSigningStrangeloveVenturesClient } from "../../src/codegen";

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

// Test Validation Creation endpoint of the POA module with both proto and amino signing.
// Other POA module endpoints are tested in the `poa.group.test.ts` suite as they require the POA Admin permissions.
describe.each(inits)("$description", ({ createWallets, validator }) => {
  let test1Wallet: OfflineSigner,
    t1Addr: string,
    rpcEndpoint: string,
    fee: { amount: { denom: string; amount: string }[]; gas: string };
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

    test1Wallet = await createWallets(validator.mnemonic, chainData.prefix);
    fee = { amount: [{ denom, amount: "100000" }], gas: "550000" };

    t1Addr = (await test1Wallet.getAccounts())[0].address;

    await chainData.creditFromFaucet(t1Addr, denom);
  });

  test("create validator", async () => {
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const signingClient = await getSigningStrangeloveVenturesClient({
      rpcEndpoint,
      signer: test1Wallet,
    });
    const pendingValidatorsBefore =
      await queryClient.strangelove_ventures.poa.v1.pendingValidators();
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

    const pendingValidatorsAfter =
      await queryClient.strangelove_ventures.poa.v1.pendingValidators();
    expect(pendingValidatorsAfter.pending.length).toEqual(
      pendingValidatorsBefore.pending.length + 1
    );
  });
});
