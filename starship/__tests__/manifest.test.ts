import "./setup.test";

import { generateMnemonic, useChain } from "starshipjs";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { MsgPayout } from "../../src/codegen/liftedinit/manifest/v1/tx";
import { getSigningLiftedinitClient } from "../../src";

// This is the POA_ADMIN_ADDRESS mnemonic as defined in the config.yaml file
const poaAdminMnemonic =
  "razor dog gown public private couple ecology paper flee connect local robot diamond stay rude join sound win ribbon soup kidney glass robot vehicle";

describe("manifest module", () => {
  let wallet, denom, address;
  let chainInfo, getCoin, getRpcEndpoint, creditFromFaucet;

  beforeAll(async () => {
    ({ chainInfo, getCoin, getRpcEndpoint, creditFromFaucet } = useChain(
      "manifest-ledger-beta"
    ));
    denom = (await getCoin()).base;

    // Initialize wallet
    wallet = await DirectSecp256k1HdWallet.fromMnemonic(poaAdminMnemonic, {
      prefix: chainInfo.chain.bech32_prefix,
    });
    address = (await wallet.getAccounts())[0].address;

    await creditFromFaucet(address);
  });

  test("mint tokens", async () => {
    const wallet2 = await DirectSecp256k1HdWallet.fromMnemonic(
      generateMnemonic(),
      { prefix: chainInfo.chain.bech32_prefix }
    );
    const address2 = (await wallet2.getAccounts())[0].address;

    const signingClient = await getSigningLiftedinitClient({
      rpcEndpoint: await getRpcEndpoint(),
      signer: wallet,
    });

    const fee = {
      amount: [
        {
          denom,
          amount: "100000",
        },
      ],
      gas: "550000",
    };

    const initialAmount = 1;
    const mintAmount = 1000000;
    const resultBalance = initialAmount + mintAmount;

    // Send tokens to address2 so it exists in the ledger
    await signingClient.sendTokens(
      address,
      address2,
      [{ amount: initialAmount.toString(), denom }],
      fee,
      "send 1 token to address2"
    );

    // Get the current balance
    const balance = await signingClient.getBalance(address2, denom);
    expect(balance.amount).toEqual(initialAmount.toString());
    expect(balance.denom).toEqual(denom);

    // Mint tokens
    const payoutMsg = {
      typeUrl: MsgPayout.typeUrl,
      value: MsgPayout.fromPartial({
        authority: address,
        payoutPairs: [
          { address: address2, coin: { denom, amount: mintAmount.toString() } },
        ],
      }),
    };
    const resp = await signingClient.signAndBroadcast(
      address,
      [payoutMsg],
      fee
    );

    assertIsDeliverTxSuccess(resp);

    const balance2 = await signingClient.getBalance(address2, denom);
    expect(balance2.amount).toBe(resultBalance.toString());
    expect(balance2.denom).toBe(denom);
  });
});
