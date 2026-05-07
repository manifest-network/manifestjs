<h1 align="center">manifestjs</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/cosmos/chain-registry/00df6ff89abd382f9efe3d37306c353e2bd8d55c/manifest/images/manifest.png" alt="Manifest Network" width="100"/>
</p>

<p align="center">
  TypeScript SDK for the Manifest Network — proto-generated message composers, query clients, signing-client factories, and amino converters for every module the chain ships.
</p>

## Install

```sh
npm install @manifest-network/manifestjs
# or
yarn add @manifest-network/manifestjs
```

Compatibility:

- This release (`2.4.x`) targets [`manifest-ledger` v2.1.0](https://github.com/manifest-network/manifest-ledger).
- CI builds and tests on Node 20.

## Table of contents

- [Install](#install)
- [What's in the box](#whats-in-the-box)
- [Usage](#usage)
  - [Frontend (cosmos-kit)](#frontend-cosmos-kit)
  - [Backend / scripts (raw signer)](#backend--scripts-raw-signer)
  - [Querying state](#querying-state)
  - [Composing messages](#composing-messages)
  - [Typed Msg clients](#typed-msg-clients)
- [Module reference](#module-reference)
- [Advanced — building a multi-namespace signer](#advanced--building-a-multi-namespace-signer)
- [About the `@manifest-network/stargate` dependency](#about-the-manifest-networkstargate-dependency)
- [Developing](#developing)
- [Releasing](#releasing)
- [Related projects](#related-projects)
- [Credits](#credits)
- [Disclaimer](#disclaimer)

## What's in the box

Top-level namespaces exported by the package:

| Namespace                     | Modules                                                            | Notes                                                                |
| ----------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `cosmos`                      | bank, auth, authz, distribution, feegrant, gov (v1, v1beta1), group, mint, staking, upgrade, vesting, circuit, consensus | Standard Cosmos SDK modules, regenerated from upstream protos.       |
| `cosmwasm`                    | wasm                                                               | CosmWasm Msg/Query clients.                                          |
| `ibc`                         | applications.transfer, core.channel, core.client, core.connection, lightclients (tendermint, solomachine, localhost) | IBC v1.                                                              |
| `osmosis`                     | tokenfactory (v1beta1)                                             | The Osmosis-style tokenfactory bundled with manifest-ledger.         |
| `strangelove_ventures`        | poa (v1)                                                           | Proof-of-Authority validator module.                                 |
| `liftedinit`                  | manifest (v1), billing (v1), sku (v1)                              | Manifest-specific modules. **The chain's distinctive features live here.** |
| `tendermint`, `google`        | —                                                                  | Supporting types.                                                    |

For each namespace the package generates:

- `<namespace>.<module>.<version>` — message types, `MessageComposer`, `AminoConverter`, query/tx interfaces.
- `<namespace>.ClientFactory.createRPCQueryClient({ rpcEndpoint })` — typed RPC query client for that namespace.
- `<namespace>.ClientFactory.createLCDClient({ restEndpoint })` — typed LCD/REST query client (where supported).
- `getSigning<Namespace>Client({ rpcEndpoint, signer })` — `SigningStargateClient` pre-configured with that namespace's registry and amino converters.
- `<namespace>ProtoRegistry`, `<namespace>AminoConverters` — building blocks for composing your own multi-namespace registry (see [Advanced](#advanced--building-a-multi-namespace-signer)).

## Usage

> Replace `RPC_ENDPOINT` with your Manifest RPC URL throughout.

### Frontend (cosmos-kit)

For browser apps, use [cosmos-kit](https://github.com/cosmology-tech/cosmos-kit) for wallet connection and let it provide the signer. Once you have an `OfflineSigner`, hand it to one of the `getSigning*Client` factories:

```ts
import { getSigningLiftedinitClient } from '@manifest-network/manifestjs';
import { liftedinit } from '@manifest-network/manifestjs';

// `signer` comes from cosmos-kit (Keplr, Leap, etc.)
const client = await getSigningLiftedinitClient({
  rpcEndpoint: RPC_ENDPOINT,
  signer,
});

const { payout } = liftedinit.manifest.v1.MessageComposer.withTypeUrl;

const msg = payout({
  authority: 'manifest1...',
  payoutPairs: [
    { address: 'manifest1recipient...', coin: { denom: 'umfx', amount: '1000000' } },
  ],
});

const fee = { amount: [{ denom: 'umfx', amount: '220000' }], gas: '200000' };
const result = await client.signAndBroadcast(senderAddress, [msg], fee);
```

The `getSigningLiftedinitClient` registry covers `liftedinit.*` plus the default cosmos-sdk types, so a typical Manifest-only app does not need to compose registries manually. If you also need to send `cosmos.group`, `osmosis.tokenfactory`, or `strangelove_ventures.poa` messages from the same client, see [Advanced](#advanced--building-a-multi-namespace-signer).

### Backend / scripts (raw signer)

For Node scripts and tests, build a signer with `@cosmjs/proto-signing` (proto/Direct) or `@cosmjs/amino` (Amino — recommended for Ledger HW):

```ts
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { getSigningLiftedinitClient } from '@manifest-network/manifestjs';
import { liftedinit } from '@manifest-network/manifestjs';

const signer = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, {
  prefix: 'manifest',
});
const [{ address }] = await signer.getAccounts();

const client = await getSigningLiftedinitClient({
  rpcEndpoint: RPC_ENDPOINT,
  signer,
});

const { burnHeldBalance } = liftedinit.manifest.v1.MessageComposer.withTypeUrl;
const msg = burnHeldBalance({
  authority: address,
  burnCoins: [{ denom: 'umfx', amount: '1000' }],
});

const fee = { amount: [{ denom: 'umfx', amount: '220000' }], gas: '200000' };
await client.signAndBroadcast(address, [msg], fee);
```

WARNING: never hard-code mnemonics in shipped code. The example above is fine for one-off scripts; use environment variables, AES encryption, or a wallet adapter in real applications.

For Amino signing, swap `DirectSecp256k1HdWallet` for `Secp256k1HdWallet`:

```ts
import { Secp256k1HdWallet } from '@cosmjs/amino';

const signer = await Secp256k1HdWallet.fromMnemonic(MNEMONIC, { prefix: 'manifest' });
```

### Querying state

Each namespace exposes a query client factory under `ClientFactory.createRPCQueryClient`:

```ts
import { liftedinit } from '@manifest-network/manifestjs';

const { createRPCQueryClient } = liftedinit.ClientFactory;
const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT });

// cosmos modules are folded in (so you don't need a separate cosmos client)
const { balances } = await client.cosmos.bank.v1beta1.allBalances({
  address: 'manifest1...',
});

// Manifest-specific modules
const params = await client.liftedinit.billing.v1.params({});
const lease = await client.liftedinit.billing.v1.lease({
  leaseUuid: '0190000-aaaa-7bbb-cccc-ddddeeeeffff',
});
```

For POA / tokenfactory queries, use the matching namespace:

```ts
import { strangelove_ventures, osmosis } from '@manifest-network/manifestjs';

const poaClient = await strangelove_ventures.ClientFactory.createRPCQueryClient({
  rpcEndpoint: RPC_ENDPOINT,
});
const { authority } = await poaClient.strangelove_ventures.poa.v1.poaAuthority();

const tfClient = await osmosis.ClientFactory.createRPCQueryClient({
  rpcEndpoint: RPC_ENDPOINT,
});
const { params: tfParams } = await tfClient.osmosis.tokenfactory.v1beta1.params({});
```

LCD/REST clients are also generated where the proto opts in to `google.api.http`:

```ts
import { liftedinit } from '@manifest-network/manifestjs';

const lcd = await liftedinit.ClientFactory.createLCDClient({
  restEndpoint: REST_ENDPOINT,
});
const { params } = await lcd.liftedinit.billing.v1.params();
```

### Composing messages

Every module exports a `MessageComposer` with five flavors:

| Flavor                  | Returns                                       | Use when                                                            |
| ----------------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| `withTypeUrl.<method>`  | `{ typeUrl, value: <Msg> }`                   | You'll pass `messages` straight to `signAndBroadcast`. **Default.** |
| `fromPartial.<method>`  | `{ typeUrl, value: <Msg> with defaults }`     | You only have a partial value object and want defaults filled.     |
| `encoded.<method>`      | `{ typeUrl, value: Uint8Array }`              | You're wrapping in `google.protobuf.Any` (e.g., group proposals).  |
| `toJSON` / `fromJSON`   | JSON-safe forms                               | Serializing to disk / over a non-protobuf transport.               |

```ts
import { cosmos, ibc, osmosis, liftedinit, strangelove_ventures } from '@manifest-network/manifestjs';

// Cosmos
const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;

// IBC
const { transfer } = ibc.applications.transfer.v1.MessageComposer.withTypeUrl;

// Osmosis tokenfactory (note: v1beta1, not v1)
const { createDenom, mint, burn } =
  osmosis.tokenfactory.v1beta1.MessageComposer.withTypeUrl;

// Manifest
const { payout, burnHeldBalance } =
  liftedinit.manifest.v1.MessageComposer.withTypeUrl;

// Billing
const { fundCredit, createLease, withdraw, setItemCustomDomain } =
  liftedinit.billing.v1.MessageComposer.withTypeUrl;

// SKU
const { createProvider, createSKU } =
  liftedinit.sku.v1.MessageComposer.withTypeUrl;

// POA
const { setPower, removeValidator } =
  strangelove_ventures.poa.v1.MessageComposer.withTypeUrl;
```

### Typed Msg clients

If you'd rather not hand-roll the `MessageComposer` + `signAndBroadcast` plumbing, every namespace also exposes a `createRPCMsgExtensions` factory that returns one `MsgClientImpl` per module. Each method has the signature `(signerAddress, message, fee?, memo?) => Promise<DeliverTxResponse>`:

```ts
import { liftedinit } from '@manifest-network/manifestjs';

const tx = await liftedinit.ClientFactory.createRPCMsgExtensions({
  rpcEndpoint: RPC_ENDPOINT,
  signer,
});

const fee = { amount: [{ denom: 'umfx', amount: '330000' }], gas: '300000' };

await tx.liftedinit.billing.v1.fundCredit(
  senderAddress,
  { sender: senderAddress, tenant: tenantAddress, amount: { denom: 'umfx', amount: '1000000' } },
  fee,
);

await tx.cosmos.bank.v1beta1.send(
  senderAddress,
  { fromAddress: senderAddress, toAddress: recipient, amount: [{ denom: 'umfx', amount: '500' }] },
  fee,
);
```

The same pattern is available on `cosmos`, `osmosis`, `strangelove_ventures`, `cosmwasm`, and `ibc` namespaces.

> Each method accepts `fee: number | StdFee | "auto"`, but `"auto"` requires the underlying `SigningStargateClient` to be constructed with a `gasPrice` — and `getSigning<Namespace>Client` does not set one. Pass an explicit `StdFee` (as above), or build your own `SigningStargateClient` via the [Advanced section](#advanced--building-a-multi-namespace-signer) and supply `{ gasPrice: GasPrice.fromString('1.1umfx') }` if you want gas estimation. The current `umfx` gas-price tiers (fixed-min `1`, low `1.05`, average `1.1`, high `3`) come from the [chain-registry entry for manifest](https://github.com/cosmos/chain-registry/blob/master/manifest/chain.json); double-check before sending real value, since the registry is the source of truth.

## Module reference

Per-module references with every message, query, type URL, and worked example:

- [Manifest (`liftedinit.manifest.v1`)](docs/modules/manifest.md) — `payout`, `burnHeldBalance`.
- [Billing (`liftedinit.billing.v1`)](docs/modules/billing.md) — leases, credit accounts, withdrawals, custom domains.
- [SKU (`liftedinit.sku.v1`)](docs/modules/sku.md) — provider and SKU CRUD.
- [POA (`strangelove_ventures.poa.v1`)](docs/modules/poa.md) — validator power management.
- [Tokenfactory (`osmosis.tokenfactory.v1beta1`)](docs/modules/tokenfactory.md) — denom creation, mint, burn, admin transfer.

For the standard Cosmos SDK modules (`cosmos.bank`, `cosmos.gov`, `cosmos.group`, `cosmos.staking`, etc.) follow the upstream Cosmos SDK docs — message names and field shapes match.

## Advanced — building a multi-namespace signer

If a single transaction must include messages from several namespaces (say, `cosmos.group` proposing a `liftedinit.manifest` payout), compose your own registry:

```ts
import { OfflineSigner, GeneratedType, Registry } from '@cosmjs/proto-signing';
import { AminoTypes, SigningStargateClient, defaultRegistryTypes } from '@cosmjs/stargate';

import {
  cosmosAminoConverters,
  cosmosProtoRegistry,
  ibcAminoConverters,
  ibcProtoRegistry,
  liftedinitAminoConverters,
  liftedinitProtoRegistry,
  osmosisAminoConverters,
  osmosisProtoRegistry,
  strangeloveVenturesAminoConverters,
  strangeloveVenturesProtoRegistry,
  cosmwasmAminoConverters,
  cosmwasmProtoRegistry,
} from '@manifest-network/manifestjs';

const protoRegistry: ReadonlyArray<[string, GeneratedType]> = [
  ...defaultRegistryTypes,
  ...cosmosProtoRegistry,
  ...ibcProtoRegistry,
  ...liftedinitProtoRegistry,
  ...osmosisProtoRegistry,
  ...strangeloveVenturesProtoRegistry,
  ...cosmwasmProtoRegistry,
];

const aminoConverters = {
  ...cosmosAminoConverters,
  ...ibcAminoConverters,
  ...liftedinitAminoConverters,
  ...osmosisAminoConverters,
  ...strangeloveVenturesAminoConverters,
  ...cosmwasmAminoConverters,
};

const registry = new Registry(protoRegistry);
const aminoTypes = new AminoTypes(aminoConverters);

const client = await SigningStargateClient.connectWithSigner(
  RPC_ENDPOINT,
  signer,
  { registry, aminoTypes },
);
```

Pick only the namespaces you actually use — registry size affects bundle size and amino-type lookup time.

## About the `@manifest-network/stargate` dependency

`package.json` pins `@cosmjs/stargate` to a Manifest-maintained fork:

```jsonc
"@cosmjs/stargate": "npm:@manifest-network/stargate@0.32.4-ll.3"
```

The fork's source and the patches it carries are tracked in [manifest-network/cosmjs#1](https://github.com/manifest-network/cosmjs/pull/1). Day-to-day usage is identical to upstream `@cosmjs/stargate@0.32.4`; the alias is needed because Manifest's stack relies on behaviors not yet upstreamed. If you depend on `@cosmjs/stargate` directly elsewhere in your project, the alias keeps a single resolution.

## Developing

Setup:

```sh
yarn
yarn build
```

Available scripts:

| Script              | What it does                                                                       |
| ------------------- | ---------------------------------------------------------------------------------- |
| `yarn build`        | Cleans `dist/` and `mjs/`, then builds both CJS (`dist/`) and ESM (`dist/*.mjs`).  |
| `yarn codegen`      | Regenerates `src/codegen/**` from `proto/**` via `@cosmology/telescope`.           |
| `yarn test`         | Runs unit tests in `__tests__/` (Jest + ts-jest).                                  |
| `yarn starship`     | Brings up a local Starship cluster using `starship/configs/config.group.local.yaml`. |
| `yarn starship:test`| Runs the E2E suite in `starship/__tests__/` against a running Starship cluster.    |

### Codegen

Proto files live in `proto/`. The codegen entry point is [`scripts/codegen.js`](scripts/codegen.js); it drives `@cosmology/telescope` to regenerate `src/codegen/**`.

To add a new proto:

1. Drop the `.proto` files under `proto/<namespace>/<module>/<version>/`. If you're vendoring an external module, mirror that project's directory layout.
2. Run `yarn codegen`.
3. Spot-check generated output (`src/codegen/<namespace>/...`). New top-level namespaces are picked up automatically; new sub-modules are reflected in the matching `bundle.ts` and `client.ts`.
4. If telescope flags type errors in generated files, list the file in `tsDisable.files` in `scripts/codegen.js`.

To **exclude** a package from codegen (e.g., to avoid pulling in a cosmos-sdk module the chain doesn't ship), add it to `prototypes.excluded.packages` in the same script.

### Proto vendoring

Vendored protos under `proto/cosmos/`, `proto/ibc/`, `proto/cosmwasm/`, `proto/osmosis/`, `proto/strangelove_ventures/`, and `proto/google/` track upstream releases. When bumping `manifest-ledger` compatibility, sync the corresponding proto trees from the matching ledger commit so the SDK matches what the chain accepts on the wire.

### Tests

- `__tests__/` — fast unit tests over generated types (no chain required). Add tests here when you change codegen options or hand-touch generated logic.
- `starship/__tests__/` — E2E tests that spin up real Manifest + relayer chains via Starship. Cover authz, feegrant, group, manifest payouts/burns, POA, tokenfactory, and IBC paths.

E2E setup requires a Kubernetes cluster (kind/minikube/docker-desktop) and the [`starship`](https://github.com/cosmology-tech/starship) CLI. Once `yarn starship` is up, run `yarn starship:test` from another terminal.

## Releasing

Releases are tag-driven. The [`Release` workflow](.github/workflows/release.yaml) fires on tags matching `v[0-9]*.[0-9]*.[0-9]*`:

1. Bump `package.json#version` (e.g., `2.4.1 → 2.4.2`) and merge to `main`.
2. Tag: `git tag v2.4.2 && git push origin v2.4.2`. The tag must match `package.json#version` exactly (the workflow validates this).
3. CI typechecks, builds, runs `yarn test`, then `npm publish --provenance` via OIDC trusted publishing. Pre-release versions (e.g., `v2.5.0-rc.1`) are published under a dist-tag matching the prerelease label, so `npm install` won't pick them up by default.
4. A GitHub Release is created with auto-generated notes.

## Related projects

- [@cosmology/telescope](https://github.com/cosmology-tech/telescope) — the codegen engine that produces `src/codegen/**`.
- [chain-registry](https://github.com/cosmology-tech/chain-registry) — chain metadata (assets, IBC denoms, RPC endpoints).
- [cosmos-kit](https://github.com/cosmology-tech/cosmos-kit) — wallet adapters for browser apps.
- [starship](https://github.com/cosmology-tech/starship) — the local devnet runner used by `yarn starship`.
- [manifest-ledger](https://github.com/manifest-network/manifest-ledger) — the chain itself.

## Credits

Built with [Telescope](https://github.com/cosmology-tech/telescope) by Cosmology.

## Disclaimer

AS DESCRIBED IN THE LICENSES, THE SOFTWARE IS PROVIDED "AS IS", AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.

No developer or entity involved in creating this software will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of the code, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
