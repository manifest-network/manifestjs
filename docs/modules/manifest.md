# Manifest module — `liftedinit.manifest.v1`

The `manifest` module is Manifest Network's authority-driven token-management module. It ships two messages: a `MsgPayout` for distributing coins to addresses and a `MsgBurnHeldBalance` for destroying coins held by the authority.

Both messages are signed by the module **authority** (typically a `cosmos.group` policy address). Sending them from a regular account will fail.

| Property        | Value                                                 |
| --------------- | ----------------------------------------------------- |
| Proto package   | `liftedinit.manifest.v1`                              |
| Codegen path    | `src/codegen/liftedinit/manifest/v1/`                 |
| Bundle access   | `liftedinit.manifest.v1`                              |
| Signer field    | `authority`                                           |

## Imports

```ts
import { liftedinit, getSigningLiftedinitClient } from '@manifest-network/manifestjs';

const { payout, burnHeldBalance } =
  liftedinit.manifest.v1.MessageComposer.withTypeUrl;
```

## Messages

### `MsgPayout` — `/liftedinit.manifest.v1.MsgPayout`

Pays out coins from the module to one or more addresses in a single transaction.

**Amino type:** `lifted/manifest/MsgPayout`

| Field          | Type            | Notes                                                                |
| -------------- | --------------- | -------------------------------------------------------------------- |
| `authority`    | `string`        | Module authority address (typically a group policy address).         |
| `payoutPairs`  | `PayoutPair[]`  | One entry per recipient. Empty array is rejected by the chain.       |

`PayoutPair` (amino: `lifted/manifest/payout-pair`):

| Field     | Type   | Notes                              |
| --------- | ------ | ---------------------------------- |
| `address` | `string` | Recipient bech32 address.        |
| `coin`    | `Coin` | `{ denom, amount }`.               |

```ts
const msg = payout({
  authority: 'manifest1afk9zr2hn2jsac63h4hm60vl9z3e5u69gndzf7c99cqge3vzwjzsfmy9qj',
  payoutPairs: [
    { address: 'manifest1alice...', coin: { denom: 'umfx', amount: '1000000' } },
    { address: 'manifest1bob...',   coin: { denom: 'umfx', amount: '2500000' } },
  ],
});
```

### `MsgBurnHeldBalance` — `/liftedinit.manifest.v1.MsgBurnHeldBalance`

Burns coins currently held by the authority address.

**Amino type:** `lifted/manifest/MsgBurnHeldBalance`

| Field        | Type     | Notes                                                  |
| ------------ | -------- | ------------------------------------------------------ |
| `authority`  | `string` | Authority address (must hold the coins to burn).      |
| `burnCoins`  | `Coin[]` | One entry per denom to burn.                          |

```ts
const msg = burnHeldBalance({
  authority: 'manifest1afk9zr2hn2jsac63h4hm60vl9z3e5u69gndzf7c99cqge3vzwjzsfmy9qj',
  burnCoins: [{ denom: 'umfx', amount: '1000' }],
});
```

## Submitting via a group proposal

Because both messages are authority-only, the typical flow is to wrap them in a `cosmos.group.v1.MsgSubmitProposal`. Use the `encoded` flavor to produce `Uint8Array` values that fit inside `google.protobuf.Any`:

```ts
import { cosmos, liftedinit, getSigningLiftedinitClient } from '@manifest-network/manifestjs';
import { Any } from '@manifest-network/manifestjs/dist/codegen/google/protobuf/any';

const client = await getSigningLiftedinitClient({ rpcEndpoint: RPC_ENDPOINT, signer });
const fee = { amount: [{ denom: 'umfx', amount: '330000' }], gas: '300000' };

const payoutEncoded = liftedinit.manifest.v1.MessageComposer.encoded.payout({
  authority: GROUP_POLICY_ADDRESS,
  payoutPairs: [/* ... */],
});

const submitProposal = cosmos.group.v1.MessageComposer.fromPartial.submitProposal({
  groupPolicyAddress: GROUP_POLICY_ADDRESS,
  proposers: [proposerAddress],
  messages: [Any.fromPartial(payoutEncoded)],
  metadata: '',
  exec: 0, // EXEC_UNSPECIFIED
  title: 'Payout to contributors',
  summary: 'Quarterly contributor payouts',
});

await client.signAndBroadcast(proposerAddress, [submitProposal], fee);
```

> **Signer-type caveat.** The example above broadcasts `MsgSubmitProposal` (cosmos.group.v1) wrapping a `MsgPayout`. Under a **Direct/proto** signer, `getSigningLiftedinitClient` works as-is — the manifest fork's `defaultRegistryTypes` includes `groupTypes`, and the inner `MsgPayout` rides as opaque `Any` bytes. Under an **Amino** signer (Ledger, Keplr's amino mode), the same client fails at `aminoTypes.toAmino()` for the **outer** `MsgSubmitProposal`: `liftedinitAminoConverters` doesn't include `cosmos.group`, and the manifest fork's default amino converters omit group as well. The inner `MsgPayout` is amino-converted via `GlobalDecoderRegistry.toAminoMsg`, which is populated automatically by importing `liftedinit` from this package — so you don't need a separate manifest amino converter for the inner message. For Amino + group flows, build a multi-namespace `SigningStargateClient` per the README's [Advanced section](../../README.md#advanced--building-a-multi-namespace-signer) and include `cosmosAminoConverters` (which carries the group converter).

See `starship/__tests__/manifest.group.test.ts` for an end-to-end example of submitting, voting, and executing a `payout` proposal.

## Queries

The `liftedinit.manifest.v1` module currently exposes **no query RPCs** — its `Query` service is empty. Module parameters are stored elsewhere (see `liftedinit.billing.v1` for fee/credit-account state).

## Reference

- Proto: [`proto/liftedinit/manifest/v1/tx.proto`](../../proto/liftedinit/manifest/v1/tx.proto)
- Generated code: [`src/codegen/liftedinit/manifest/v1/`](../../src/codegen/liftedinit/manifest/v1/)
- E2E tests: [`starship/__tests__/manifest.group.test.ts`](../../starship/__tests__/manifest.group.test.ts)
