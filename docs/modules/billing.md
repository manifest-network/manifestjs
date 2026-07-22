# Billing module — `liftedinit.billing.v1`

The `billing` module manages **leases** between tenants and providers, plus the **credit accounts** that fund them. Tenants pre-fund a credit account, then create leases against published SKUs (see [SKU module](sku.md)). Providers acknowledge or reject pending leases, and withdraw accrued earnings.

| Property        | Value                                                |
| --------------- | ---------------------------------------------------- |
| Proto package   | `liftedinit.billing.v1`                              |
| Codegen path    | `src/codegen/liftedinit/billing/v1/`                 |
| Bundle access   | `liftedinit.billing.v1`                              |

## Imports

```ts
import { liftedinit, getSigningLiftedinitClient } from '@manifest-network/manifestjs';

const tx = liftedinit.billing.v1.MessageComposer.withTypeUrl;
```

## Lease lifecycle

```
                ┌─────────┐
   CreateLease  │ PENDING │  AcknowledgeLease  ┌────────┐  CloseLease   ┌────────┐
  ────────────▶ │         │ ──────────────────▶│ ACTIVE │ ─────────────▶│ CLOSED │
                └────┬────┘                    └────────┘               └────────┘
                     │
                     │ RejectLease / CancelLease     ┌──────────┐
                     ├──────────────────────────────▶│ REJECTED │
                     │                               └──────────┘
                     │ pending_timeout elapses       ┌──────────┐
                     └──────────────────────────────▶│ EXPIRED  │
                                                     └──────────┘
```

States are encoded by the `LeaseState` enum:

| Value                       | Meaning                                                                |
| --------------------------- | ---------------------------------------------------------------------- |
| `LEASE_STATE_UNSPECIFIED`   | Default zero value; never persisted.                                   |
| `LEASE_STATE_PENDING`       | Created; credit locked; awaiting provider.                             |
| `LEASE_STATE_ACTIVE`        | Acknowledged; provider accruing charges.                               |
| `LEASE_STATE_CLOSED`        | Final settlement complete.                                             |
| `LEASE_STATE_REJECTED`      | Rejected by provider or cancelled by tenant; credit unlocked.          |
| `LEASE_STATE_EXPIRED`       | Sat in `PENDING` past `params.pending_timeout`; credit unlocked.       |

## Messages

All messages below use the same `MessageComposer.withTypeUrl.<method>` pattern. Type URLs are `/liftedinit.billing.v1.<MsgName>`. Amino types use the `lifted/billing/...` prefix.

### `MsgFundCredit` — `fundCredit`

Funds a tenant's credit account from `sender`'s wallet. The credit account is the on-chain pool that future leases draw from.

| Field    | Type     | Notes                                                |
| -------- | -------- | ---------------------------------------------------- |
| `sender` | `string` | Wallet paying the funds.                             |
| `tenant` | `string` | Tenant whose credit account is being topped up.      |
| `amount` | `Coin`   | Single denomination (typically `umfx`).              |

```ts
const msg = tx.fundCredit({
  sender: senderAddress,
  tenant: tenantAddress,
  amount: { denom: 'umfx', amount: '50000000' },
});
```

### `MsgCreateLease` — `createLease`

Tenant creates a new lease referencing one or more SKUs (all of which must belong to the same provider). The lease starts in `PENDING`. Credit equal to `min_lease_duration_at_creation × Σ(locked_price × quantity)` is locked.

| Field        | Type                | Notes                                                      |
| ------------ | ------------------- | ---------------------------------------------------------- |
| `tenant`     | `string`            | Signer; the lease owner.                                   |
| `items`      | `LeaseItemInput[]`  | 1+ items. See [Item shape](#leaseiteminput-shape).         |
| `metaHash`   | `Uint8Array`        | Optional 0–64-byte hash of off-chain deployment data.      |

Response: `{ leaseUuid }` (UUIDv7).

### `MsgCreateLeaseForTenant` — `createLeaseForTenant`

Authority-only counterpart to `MsgCreateLease`, used to migrate off-chain leases on-chain. Same payload plus an explicit `authority` and `tenant` pair.

### `MsgAcknowledgeLease` — `acknowledgeLease`

Provider accepts one or more `PENDING` leases. All must belong to the same provider; atomic (all-or-nothing). Lease transitions to `ACTIVE` and billing starts at the response's `acknowledgedAt`.

| Field         | Type       | Notes                              |
| ------------- | ---------- | ---------------------------------- |
| `sender`      | `string`   | Provider address or authority.     |
| `leaseUuids`  | `string[]` | 1–100 UUIDs.                       |

### `MsgRejectLease` — `rejectLease`

Provider rejects pending leases. Same payload as `acknowledgeLease` plus an optional `reason` (≤256 chars). Transitions to `REJECTED`; tenant credit is unlocked.

### `MsgCancelLease` — `cancelLease`

Tenant cancels their own pending leases. Like `rejectLease`, but signed by the tenant.

### `MsgCloseLease` — `closeLease`

Closes one or more `ACTIVE` leases. Sender must be the tenant, the provider, or the module authority for each lease. Atomic; final settlement runs as part of the call.

| Field         | Type       | Notes                              |
| ------------- | ---------- | ---------------------------------- |
| `sender`      | `string`   | Tenant, provider, or authority.    |
| `leaseUuids`  | `string[]` | 1–100 UUIDs.                       |
| `reason`      | `string`   | Optional, ≤256 chars.              |

### `MsgWithdraw` — `withdraw`

Provider claims accrued earnings. Two **mutually exclusive** modes:

- **Specific leases:** populate `leaseUuids` (1–100). Withdraws each lease's withdrawable balance.
- **Provider-wide:** populate `providerUuid`. Sweeps that provider's active leases, up to `limit` per call (default 50, max 100). To page through them all, echo each response's opaque `nextKey` back as the next request's `key`, looping until `nextKey` is empty (equivalently, until `hasMore` is `false`).

| Field           | Type         | Notes                                                                                                                          |
| --------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `sender`        | `string`     | Provider address or authority.                                                                                                 |
| `leaseUuids`    | `string[]`   | Mutually exclusive with `providerUuid`.                                                                                        |
| `providerUuid`  | `string`     | Mutually exclusive with `leaseUuids`.                                                                                          |
| `limit`         | `bigint`     | Cap on leases processed per call in provider-wide mode.                                                                        |
| `key`           | `Uint8Array` | Opaque pagination cursor for provider-wide mode — echo the previous response's `nextKey`; empty starts from the beginning. Must be unset in `leaseUuids` mode. |

Response (`MsgWithdrawResponse`): `totalAmounts`, `payoutAddress`, `withdrawalCount`, `hasMore`, and `nextKey` — the opaque cursor to pass as the next request's `key`. `nextKey` is non-empty **iff** `hasMore` is `true`.

### `MsgUpdateParams` — `updateParams`

Authority-only. Replaces module parameters with the supplied `Params` (all fields required).

### `MsgSetItemCustomDomain` — `setItemCustomDomain`

Sets or clears a custom DNS domain on a specific lease item. Lease must be `PENDING` or `ACTIVE`. Empty `customDomain` clears the field and frees the reverse-lookup index entry.

| Field           | Type     | Notes                                                                                  |
| --------------- | -------- | -------------------------------------------------------------------------------------- |
| `sender`        | `string` | Tenant, module authority, or any address in `params.allowedList`.                      |
| `leaseUuid`     | `string` | Owning lease.                                                                          |
| `serviceName`   | `string` | RFC 1123 DNS label that addresses the item. `""` for legacy 1-item leases.             |
| `customDomain`  | `string` | FQDN to claim, or `""` to clear.                                                       |

Domain validation:
- The chain rejects domains matching any suffix in `params.reservedDomainSuffixes` (provider wildcard zones).
- Within an active/pending lease set, domains are unique chain-wide.

#### `LeaseItemInput` shape

`MsgCreateLease.items` and `MsgCreateLeaseForTenant.items` use `LeaseItemInput`:

| Field          | Type     | Notes                                                                                       |
| -------------- | -------- | ------------------------------------------------------------------------------------------- |
| `skuUuid`      | `string` | SKU to lease.                                                                               |
| `quantity`     | `bigint` | Number of instances. ≥1.                                                                    |
| `serviceName`  | `string` | Optional RFC 1123 DNS label. If used, **all items in the lease must have a `serviceName`**, and uniqueness shifts from `skuUuid` to `serviceName` (so the same SKU can appear under different service names). |

## Queries

All queries are reachable on the namespace's `createRPCQueryClient` under `client.liftedinit.billing.v1`:

```ts
const client = await liftedinit.ClientFactory.createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT });
const billing = client.liftedinit.billing.v1;
```

| Method                  | Request                                              | Response highlights                                              |
| ----------------------- | ---------------------------------------------------- | ---------------------------------------------------------------- |
| `params({})`            | —                                                    | `{ params }`                                                     |
| `lease({ leaseUuid })`  | UUID                                                 | `{ lease }`                                                      |
| `leases({ pagination, stateFilter })` | optional state filter + pagination       | `{ leases, pagination }`                                         |
| `leasesByTenant({ tenant, pagination, stateFilter })` |                                | `{ leases, pagination }`                                         |
| `leasesByProvider({ providerUuid, pagination, stateFilter })` |                       | `{ leases, pagination }`                                         |
| `creditAccount({ tenant })` |                                                  | `{ creditAccount, balances, availableBalances }`                 |
| `creditAddress({ tenant })` |                                                  | `{ creditAddress }` — derived bech32 address holding the credit. |
| `withdrawableAmount({ leaseUuid })` |                                          | `{ amounts }`                                                    |
| `providerWithdrawable({ providerUuid, pagination })` |                         | `{ amounts, leaseCount, pagination }` — loop until `pagination.nextKey` is empty, summing `amounts`. |
| `creditAccounts({ pagination })` |                                             | `{ creditAccounts, pagination }`                                 |
| `leasesBySKU({ skuUuid, pagination, stateFilter })` |                          | `{ leases, pagination }`                                         |
| `creditEstimate({ tenant })` |                                                 | `{ currentBalance, totalRatePerSecond, estimatedDurationSeconds, activeLeaseCount }` |
| `leaseByCustomDomain({ customDomain })` |                                      | `{ lease, serviceName }` — the item that claims the FQDN.        |

`stateFilter` is a `LeaseState` enum value; `LEASE_STATE_UNSPECIFIED` (or omitting it) returns leases in any state.

## Module parameters

```ts
const { params } = await billing.params({});
```

`Params` fields:

| Field                            | Type                | Notes                                                                              |
| -------------------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| `maxLeasesPerTenant`             | `bigint`            | Hard cap on active leases per tenant.                                              |
| `allowedList`                    | `string[]`          | Addresses (in addition to authority) allowed to create leases on behalf of tenants and to set custom domains. |
| `maxItemsPerLease`               | `bigint`            | Per-lease item cap (gas-bound).                                                    |
| `minLeaseDuration`               | `bigint` (seconds)  | Minimum duration a tenant's credit must cover at lease creation. Default `3600`.   |
| `maxPendingLeasesPerTenant`      | `bigint`            | Spam protection. Default `10`.                                                     |
| `pendingTimeout`                 | `bigint` (seconds)  | How long a `PENDING` lease can wait. 60 ≤ value ≤ 86400. Default `1800`.           |
| `reservedDomainSuffixes`         | `string[]`          | DNS suffixes (each starting with `.`) that custom domains may not claim — typically provider wildcard zones. |

## Worked example — tenant lifecycle

```ts
import { liftedinit, getSigningLiftedinitClient } from '@manifest-network/manifestjs';
import { MsgCreateLeaseResponse } from '@manifest-network/manifestjs/dist/codegen/liftedinit/billing/v1/tx';

const composer = liftedinit.billing.v1.MessageComposer.withTypeUrl;

const client = await getSigningLiftedinitClient({ rpcEndpoint: RPC_ENDPOINT, signer });
const fee = { amount: [{ denom: 'umfx', amount: '330000' }], gas: '300000' };

// 1. Fund the credit account
await client.signAndBroadcast(senderAddress, [
  composer.fundCredit({
    sender: senderAddress,
    tenant: tenantAddress,
    amount: { denom: 'umfx', amount: '100000000' },
  }),
], fee);

// 2. Create a lease (signer must be the tenant)
const createMsg = composer.createLease({
  tenant: tenantAddress,
  items: [
    { skuUuid: SKU_UUID, quantity: BigInt(1), serviceName: 'web' },
    { skuUuid: SKU_UUID, quantity: BigInt(1), serviceName: 'db' },
  ],
  metaHash: new Uint8Array(),
});
const createResult = await client.signAndBroadcast(tenantAddress, [createMsg], fee);

// 3. Decode the lease UUID from the response
const leaseUuid = MsgCreateLeaseResponse.decode(createResult.msgResponses[0].value).leaseUuid;

// 4. (Provider) acknowledges
await client.signAndBroadcast(providerAddress, [
  composer.acknowledgeLease({ sender: providerAddress, leaseUuids: [leaseUuid] }),
], fee);

// 5. Tenant assigns a custom domain to the "web" item
await client.signAndBroadcast(tenantAddress, [
  composer.setItemCustomDomain({
    sender: tenantAddress,
    leaseUuid,
    serviceName: 'web',
    customDomain: 'app.example.com',
  }),
], fee);

// 6. Later: provider withdraws accrued funds
await client.signAndBroadcast(providerAddress, [
  composer.withdraw({ sender: providerAddress, leaseUuids: [leaseUuid] }),
], fee);
```

## Reference

- Proto: [`proto/liftedinit/billing/v1/`](../../proto/liftedinit/billing/v1/)
- Generated code: [`src/codegen/liftedinit/billing/v1/`](../../src/codegen/liftedinit/billing/v1/)
- Unit tests (custom domain semantics): [`__tests__/billing.custom_domain.test.ts`](../../__tests__/billing.custom_domain.test.ts)
