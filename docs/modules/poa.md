# POA module — `strangelove_ventures.poa.v1`

The Proof-of-Authority (POA) module replaces standard `cosmos.staking` validator selection with an authority-curated set. New validators submit `MsgCreateValidator` and sit in a **pending queue** until the authority calls `MsgSetPower` to admit them. The same authority can adjust an active validator's power, remove them, or update the bundled `staking` module parameters.

| Property        | Value                                              |
| --------------- | -------------------------------------------------- |
| Proto package   | `strangelove_ventures.poa.v1`                      |
| Codegen path    | `src/codegen/strangelove_ventures/poa/v1/`         |
| Bundle access   | `strangelove_ventures.poa.v1`                      |

The Manifest network's POA authority is a `cosmos.group` policy address (set at genesis). All `MsgSetPower` / `MsgRemoveValidator` / `MsgRemovePending` / `MsgUpdateStakingParams` operations therefore go through a group proposal.

## Imports

```ts
import { strangelove_ventures, getSigningStrangeloveVenturesClient }
  from '@manifest-network/manifestjs';

const tx = strangelove_ventures.poa.v1.MessageComposer.withTypeUrl;
```

## Messages

Type URLs are `/strangelove_ventures.poa.v1.<MsgName>`. Amino types use the `poa/...` prefix (no namespace).

### `MsgCreateValidator` — `createValidator`

Submitted by a candidate validator. Mirrors `cosmos.staking.v1beta1.MsgCreateValidator` but routes the new validator into the POA pending queue rather than directly into the active set.

| Field                | Type           | Notes                                                   |
| -------------------- | -------------- | ------------------------------------------------------- |
| `description`        | `Description`  | `{ moniker, identity, website, securityContact, details }`. |
| `commission`         | `CommissionRates` | `{ rate, maxRate, maxChangeRate }`.                  |
| `minSelfDelegation`  | `string`       | Cosmos `Int` as string.                                 |
| `validatorAddress`   | `string`       | Bech32 valoper address. **Signs the message.**          |
| `pubkey`             | `Any`          | Wrapped `cosmos.crypto.PubKey`.                         |
| `delegatorAddress`   | `string`       | **Deprecated** — same account as the validator.        |

### `MsgSetPower` — `setPower`

Authority sets the consensus power of a validator. Also admits a pending validator into the active set when first called for them.

| Field              | Type      | Notes                                                                |
| ------------------ | --------- | -------------------------------------------------------------------- |
| `sender`           | `string`  | Authority (group policy address on Manifest).                        |
| `validatorAddress` | `string`  | Bech32 valoper.                                                      |
| `power`            | `bigint`  | Consensus power. Increasing it admits a pending validator.           |
| `unsafe`           | `boolean` | Bypasses POA's safety checks. Leave `false` unless you know what you're breaking. |

### `MsgRemoveValidator` — `removeValidator`

Removes an **active** validator and unbonds their delegations.

| Field              | Type     | Notes                              |
| ------------------ | -------- | ---------------------------------- |
| `sender`           | `string` | Authority.                         |
| `validatorAddress` | `string` |                                    |

### `MsgRemovePending` — `removePending`

Removes a validator from the **pending** queue (e.g., to reject a candidate without admitting them).

| Field              | Type     | Notes                              |
| ------------------ | -------- | ---------------------------------- |
| `sender`           | `string` | Authority.                         |
| `validatorAddress` | `string` |                                    |

### `MsgUpdateStakingParams` — `updateStakingParams`

Authority updates the bundled `cosmos.staking` parameters. **All fields must be supplied** — it's a full replace.

| Field    | Type            | Notes                                                       |
| -------- | --------------- | ----------------------------------------------------------- |
| `sender` | `string`        | Authority.                                                  |
| `params` | `StakingParams` | Mirrors `cosmos.staking.v1beta1.Params` (unbondingTime, maxValidators, maxEntries, historicalEntries, bondDenom, minCommissionRate). |

## Queries

```ts
const client = await strangelove_ventures.ClientFactory.createRPCQueryClient({
  rpcEndpoint: RPC_ENDPOINT,
});
const poa = client.strangelove_ventures.poa.v1;
```

| Method                                   | Returns                                  |
| ---------------------------------------- | ---------------------------------------- |
| `pendingValidators({})`                  | `{ pending: Validator[] }`               |
| `consensusPower({ validatorAddress })`   | `{ consensusPower: bigint }` (BFT power) |
| `poaAuthority({})`                       | `{ authority: string }`                  |

## Worked example — admitting a pending validator via group

```ts
import {
  cosmos,
  strangelove_ventures,
  getSigningStrangeloveVenturesClient,
} from '@manifest-network/manifestjs';
import { Any } from '@manifest-network/manifestjs/dist/codegen/google/protobuf/any';

const client = await getSigningStrangeloveVenturesClient({ rpcEndpoint: RPC_ENDPOINT, signer });
const fee = { amount: [{ denom: 'umfx', amount: '330000' }], gas: '300000' };

// 1. Encode MsgSetPower with the group policy as sender
const setPowerEncoded = strangelove_ventures.poa.v1.MessageComposer.encoded.setPower({
  sender: GROUP_POLICY_ADDRESS,
  validatorAddress: candidateValAddress,
  power: BigInt(1_000_000),
  unsafe: false,
});

// 2. Wrap in a group proposal
const submit = cosmos.group.v1.MessageComposer.fromPartial.submitProposal({
  groupPolicyAddress: GROUP_POLICY_ADDRESS,
  proposers: [memberAddress],
  messages: [Any.fromPartial(setPowerEncoded)],
  metadata: '',
  exec: 0,
  title: 'Admit validator',
  summary: `Admit ${candidateValAddress} with 1.0 voting power`,
});

await client.signAndBroadcast(memberAddress, [submit], fee);

// 3. After the group threshold is met and the proposal executes,
//    the candidate moves from `pendingValidators` into the active set.
```

> **Signer-type caveat.** The example wraps `MsgSetPower` in `cosmos.group.v1.MsgSubmitProposal`. Under a **Direct/proto** signer, `getSigningStrangeloveVenturesClient` works — the manifest fork's `defaultRegistryTypes` includes `groupTypes`, and the inner `MsgSetPower` rides as opaque `Any` bytes. Under an **Amino** signer (Ledger, Keplr's amino mode), the same client fails at `aminoTypes.toAmino()` for the **outer** `MsgSubmitProposal`: `strangeloveVenturesAminoConverters` doesn't include `cosmos.group`, and the fork's default amino converters omit group as well. The inner `MsgSetPower` is amino-converted via `GlobalDecoderRegistry.toAminoMsg`, populated automatically by importing `strangelove_ventures` from this package — so no extra POA amino converter is needed for the inner message. For Amino + group flows, build a multi-namespace `SigningStargateClient` per the README's [Advanced section](../../README.md#advanced--building-a-multi-namespace-signer) and include `cosmosAminoConverters` (which carries the group converter).

The full submit-vote-exec cycle is implemented in `starship/src/test_helper.ts:submitVoteExecGroupProposal`; see `starship/__tests__/poa.group.test.ts` for working POA scenarios.

## Reference

- Proto: [`proto/strangelove_ventures/poa/v1/`](../../proto/strangelove_ventures/poa/v1/)
- Generated code: [`src/codegen/strangelove_ventures/poa/v1/`](../../src/codegen/strangelove_ventures/poa/v1/)
- E2E tests: [`starship/__tests__/poa.test.ts`](../../starship/__tests__/poa.test.ts), [`starship/__tests__/poa.group.test.ts`](../../starship/__tests__/poa.group.test.ts)
- Upstream POA: [strangelove-ventures/poa](https://github.com/strangelove-ventures/poa)
