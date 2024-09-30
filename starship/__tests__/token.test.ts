import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsDeliverTxSuccess, StargateClient } from "@cosmjs/stargate";
import {
  ConfigContext,
  generateMnemonic,
  useChain,
  useRegistry,
} from "starshipjs";

import { MsgTransfer } from "../../src/codegen/ibc/applications/transfer/v1/tx";
import path from "path";
import { getSigningLiftedinitClient, ibc } from "../../src/codegen";

describe("Token transfers", () => {
  let wallet, address;
  let chainInfo, getCoin, getRpcEndpoint, creditFromFaucet;
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

    ({ chainInfo, getCoin, getRpcEndpoint, creditFromFaucet } = useChain(
      "manifest-ledger-beta"
    ));

    // Initialize wallet
    wallet = await DirectSecp256k1HdWallet.fromMnemonic(generateMnemonic(), {
      prefix: chainInfo.chain.bech32_prefix,
    });
    address = (await wallet.getAccounts())[0].address;

    await creditFromFaucet(address);
  });

  it("send manifest token to address", async () => {
    // Initialize wallet
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

    const token = {
      amount: "10000000",
      denom,
    };

    // Transfer umfx tokens from faucet
    await signingClient.sendTokens(
      address,
      address2,
      [token],
      fee,
      "send tokens test"
    );

    const balance = await signingClient.getBalance(address2, denom);

    expect(balance.amount).toEqual(token.amount);
    expect(balance.denom).toEqual(denom);
  }, 10000);

  it("send ibc umfx tokens to address on cosmos chain", async () => {
    const signingClient = await getSigningLiftedinitClient({
      rpcEndpoint: await getRpcEndpoint(),
      signer: wallet,
    });

    const { chainInfo: cosmosChainInfo, getRpcEndpoint: cosmosRpcEndpoint } =
      useChain("cosmoshub");

    // Initialize wallet address for cosmos chain
    const cosmosWallet = await DirectSecp256k1HdWallet.fromMnemonic(
      generateMnemonic(),
      { prefix: cosmosChainInfo.chain.bech32_prefix }
    );
    const cosmosAddress = (await cosmosWallet.getAccounts())[0].address;

    const ibcInfos = chainInfo.fetcher.getChainIbcData(
      chainInfo.chain.chain_name
    );
    const ibcInfo = ibcInfos.find(
      (i) =>
        i.chain_1.chain_name === chainInfo.chain.chain_name &&
        i.chain_2.chain_name === cosmosChainInfo.chain.chain_name
    );

    expect(ibcInfo).toBeTruthy();

    const { port_id: sourcePort, channel_id: sourceChannel } =
      ibcInfo.channels[0].chain_1;

    // Transfer manifest tokens via IBC to cosmos chain
    const currentTime = Math.floor(Date.now() / 1000);
    const timeoutTime = currentTime + 300; // 5 minutes

    const fee = {
      amount: [
        {
          denom,
          amount: "100000",
        },
      ],
      gas: "550000",
    };

    const token = {
      denom,
      amount: "10000000",
    };

    // send ibc tokens
    const transferMsg = {
      typeUrl: MsgTransfer.typeUrl,
      value: MsgTransfer.fromPartial({
        sourcePort,
        sourceChannel,
        sender: address,
        receiver: cosmosAddress,
        token: token,
        timeoutTimestamp: BigInt(timeoutTime) * BigInt(1_000_000_000), // Timeout in nanoseconds
      }),
    };
    const resp = await signingClient.signAndBroadcast(
      address,
      [transferMsg],
      fee
    );

    assertIsDeliverTxSuccess(resp);

    // Check osmos in address on cosmos chain
    const cosmosClient = await StargateClient.connect(
      await cosmosRpcEndpoint()
    );
    const balances = await cosmosClient.getAllBalances(cosmosAddress);

    // check balances
    expect(balances.length).toEqual(1);
    const ibcBalance = balances.find((balance) => {
      return balance.denom.startsWith("ibc/");
    });
    expect(ibcBalance.amount).toEqual(token.amount);
    expect(ibcBalance.denom).toContain("ibc/");

    // check ibc denom trace of the same
    const queryClient = await ibc.ClientFactory.createRPCQueryClient({
      rpcEndpoint: await cosmosRpcEndpoint(),
    });
    const trace = await queryClient.ibc.applications.transfer.v1.denomTrace({
      hash: ibcBalance.denom.replace("ibc/", ""),
    });
    expect(trace.denomTrace.baseDenom).toEqual(denom);
  }, 10000);
});
