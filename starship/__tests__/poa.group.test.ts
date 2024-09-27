import path from "path";
import {ConfigContext, useRegistry} from "starshipjs";
import {
  checkPoaAdminIs,
  createAminoWallet, createProtoWallet,
  initChain,
  POA_GROUP_ADDRESS, submitVoteExecGroupProposal,
  test1Mnemonic, test1Val,
  test2Mnemonic, uint8ArrayToHexString, waitForNBlocks
} from "../src/test_helper";
import {encodePubkey, OfflineSigner} from "@cosmjs/proto-signing";
import {MessageComposer as ManifestMessageComposer} from "../../src/codegen/liftedinit/manifest/v1/tx.registry";
import {MessageComposer as POAMessageComposer} from "../../src/codegen/strangelove_ventures/poa/v1/tx.registry";
import {Any} from "../../src/codegen/google/protobuf/any";
import {getSigningCosmosClient, getSigningStrangeloveVenturesClient} from "../../src/codegen";
import {createRPCQueryClient} from "../../src/codegen/strangelove_ventures/rpc.query";
import {CommissionRates, Description} from "../../src/codegen/strangelove_ventures/poa/v1/validator";
import {fromBase64} from "@cosmjs/encoding";
import {encodeEd25519Pubkey} from "@cosmjs/amino";
import {assertIsDeliverTxSuccess} from "@cosmjs/stargate";

const inits = [
  {
    description: "group-poa-admin (proto-signing)",
    createWallets: createProtoWallet,
  },
  {
    description: "group-poa-admin (amino-signing)",
    createWallets: createAminoWallet,
  },
];

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

describe.each(inits)("$description", ({ description, createWallets }) => {
  let poaWallet: OfflineSigner,
    test1Wallet: OfflineSigner,
    test2Wallet: OfflineSigner,
    poaAddress: string,
    test1Address: string,
    test2Address: string,
    rpcEndpoint: string,
    fee: { amount: { denom: string; amount: string }[]; gas: string };
  const denom = "umfx";

  beforeAll(async () => {
    const configFile = path.join(__dirname, "..", "configs", "config.group.local.yaml");
    ConfigContext.setConfigFile(configFile);
    ConfigContext.setRegistry(await useRegistry(configFile));

    const chainData = await initChain("manifest-ledger-beta");
    rpcEndpoint = chainData.rpcEndpoint;

    await checkPoaAdminIs(rpcEndpoint, POA_GROUP_ADDRESS);

    test1Wallet = await createWallets(test1Mnemonic, chainData.prefix);
    test2Wallet = await createWallets(test2Mnemonic, chainData.prefix);
    fee = { amount: [{ denom, amount: "100000" }], gas: "550000" };

    test1Address = (await test1Wallet.getAccounts())[0].address;
    test2Address = (await test1Wallet.getAccounts())[0].address;

    await chainData.creditFromFaucet(test1Address, denom);
    await chainData.creditFromFaucet(test2Address, denom);

    const client = await getSigningCosmosClient({rpcEndpoint, signer: test1Wallet});
    await client.sendTokens(test1Address, POA_GROUP_ADDRESS, [{ denom, amount: "100000000" }], fee);
  })

  // test('payout (manifest)', async () => {
  //   const client = await getSigningCosmosClient({rpcEndpoint, signer: test1Wallet});
  //   const proposal = Any.fromPartial(
  //     ManifestMessageComposer.encoded.payout({
  //       authority: POA_GROUP_ADDRESS,
  //       payoutPairs: [
  //         {
  //           address: test1Address,
  //           coin: { denom, amount: "1000" },
  //         },
  //       ],
  //     })
  //   )
  //
  //   const beforeBalance = await client.getBalance(test1Address, denom);
  //   await submitVoteExecGroupProposal(test1Address, client, "payout", "some payout", [test1Address], [proposal], fee);
  //
  //   const afterBalance = await client.getBalance(test1Address, denom);
  //   expect(afterBalance.amount).toEqual((parseInt(beforeBalance.amount) - (3 * parseInt(fee.amount[0].amount)) + 1000).toString());
  // }, 30000)
  //
  // test('burn (manifest)', async () => {
  //   const client = await getSigningCosmosClient({rpcEndpoint, signer: test1Wallet});
  //   const proposal = Any.fromPartial(
  //     ManifestMessageComposer.encoded.burnHeldBalance({
  //       authority: POA_GROUP_ADDRESS,
  //       burnCoins: [{ denom, amount: "1000" }],
  //     })
  //   )
  //
  //   const beforeBalance = await client.getBalance(POA_GROUP_ADDRESS, denom);
  //   await submitVoteExecGroupProposal(test1Address, client, "burn", "some burn", [test1Address], [proposal], fee);
  //
  //   const afterBalance = await client.getBalance(POA_GROUP_ADDRESS, denom);
  //   expect(afterBalance.amount).toEqual((parseInt(beforeBalance.amount) - 1000).toString());
  // }, 30000)
  //
  // test('set power (poa)', async () => {
  //   const client = await getSigningCosmosClient({rpcEndpoint, signer: test1Wallet});
  //   const queryClient = await createRPCQueryClient({rpcEndpoint});
  //
  //   const bondedVal = await queryClient.cosmos.staking.v1beta1.validators({
  //     status: "BOND_STATUS_BONDED",
  //   });
  //   expect(bondedVal.validators.length).toEqual(1);
  //
  //   const val = bondedVal.validators[0];
  //   const validatorAddress = val.operatorAddress;
  //
  //   const currentPower =
  //     await queryClient.strangelove_ventures.poa.v1.consensusPower({
  //       validatorAddress,
  //     });
  //   const newPower = (currentPower.consensusPower + 1n) * 1000000n;
  //
  //   const proposal = Any.fromPartial(
  //     POAMessageComposer.encoded.setPower({
  //       sender: POA_GROUP_ADDRESS,
  //       validatorAddress,
  //       power: newPower,
  //       unsafe: true,
  //     })
  //   )
  //
  //   await submitVoteExecGroupProposal(test1Address, client, "set power", "some set power", [test1Address], [proposal], fee);
  //
  //   await waitForNBlocks(client, 2);
  //
  //   const updatedPower =
  //     await queryClient.strangelove_ventures.poa.v1.consensusPower({
  //       validatorAddress,
  //     });
  //   expect(updatedPower.consensusPower).toEqual(currentPower.consensusPower + 1n);
  // }, 30000)

  test('remove pending validator (poa)', async () => {
    const client = await getSigningCosmosClient({rpcEndpoint, signer: test1Wallet});
    const queryClient = await createRPCQueryClient({ rpcEndpoint });
    const pendingValidatorsBefore = await queryClient.strangelove_ventures.poa.v1.pendingValidators();
    const pendingValidatorsBeforeLength = pendingValidatorsBefore.pending.length;
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
    const msg = POAMessageComposer.fromPartial.createValidator({
      description,
      commission,
      minSelfDelegation: "1",
      delegatorAddress: "",
      validatorAddress: test1Val.address,
      pubkey: encodePubkey(encodeEd25519Pubkey(fromBase64(test1Val.pubkey))),
    });
    const poaClient = await getSigningStrangeloveVenturesClient({rpcEndpoint, signer: test1Wallet});
    const result = await poaClient.signAndBroadcast(test1Address, [msg], fee);

    assertIsDeliverTxSuccess(result);
    expect(result.code).toEqual(0);

    const pendingValidatorsAfterCreate =
      await queryClient.strangelove_ventures.poa.v1.pendingValidators();
    expect(pendingValidatorsAfterCreate.pending.length).toEqual(pendingValidatorsBeforeLength + 1);

    const proposal = Any.fromPartial(
      POAMessageComposer.encoded.removePending({
        sender: POA_GROUP_ADDRESS,
        validatorAddress: test1Val.address,
      })
    )

    await submitVoteExecGroupProposal(test1Address, client, "remove pending", "some remove pending", [test1Address], [proposal], fee);

    const pendingValidatorsAfterRemovePending =
      await queryClient.strangelove_ventures.poa.v1.pendingValidators();
    expect(pendingValidatorsAfterRemovePending.pending.length).toEqual(pendingValidatorsBeforeLength);
  }, 30000)
})

