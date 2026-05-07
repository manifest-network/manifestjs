# SKU module — `liftedinit.sku.v1`

The `sku` module is the catalog the [billing module](billing.md) leases against. **Providers** publish **SKUs** (stock-keeping units) priced per hour or per day. All write paths are authority-only (the module authority or any address in `Params.allowedList`); SKUs and providers cannot be created by arbitrary accounts.

| Property        | Value                                   |
| --------------- | --------------------------------------- |
| Proto package   | `liftedinit.sku.v1`                     |
| Codegen path    | `src/codegen/liftedinit/sku/v1/`        |
| Bundle access   | `liftedinit.sku.v1`                     |
| Signer field    | `authority`                             |

## Imports

```ts
import { liftedinit, getSigningLiftedinitClient } from '@manifest-network/manifestjs';

const tx = liftedinit.sku.v1.MessageComposer.withTypeUrl;
```

## Concepts

- **Provider** — a UUIDv7-keyed entity with a management `address`, a `payoutAddress`, an HTTPS `apiUrl`, and an off-chain `metaHash`. Soft-deletable: deactivating a provider cascades through its SKUs in paginated batches.
- **SKU** — a UUIDv7-keyed offering belonging to a provider, with a `name`, a `Unit` (`UNIT_PER_HOUR` or `UNIT_PER_DAY`), and a `basePrice` `Coin`. Tenants reference SKUs by UUID when creating leases.
- **Reactivation rule** — `MsgUpdateProvider` and `MsgUpdateSKU` can flip `active: false → true`, but **cannot** flip `active: true → false`. Use the explicit `Deactivate*` messages for that path so cascading deactivation runs.

## Messages

Type URLs are `/liftedinit.sku.v1.<MsgName>`. Amino types use the `lifted/sku/...` prefix.

### `MsgCreateProvider` — `createProvider`

Creates a new provider. Response includes the assigned `uuid`.

| Field           | Type          | Notes                                                       |
| --------------- | ------------- | ----------------------------------------------------------- |
| `authority`     | `string`      | Module authority or `Params.allowedList` address.           |
| `address`       | `string`      | Provider management address.                                |
| `payoutAddress` | `string`      | Where withdrawals send funds.                               |
| `metaHash`      | `Uint8Array`  | Hash of off-chain metadata (name, description, etc.).       |
| `apiUrl`        | `string`      | Provider's HTTPS API endpoint. Must be a valid HTTPS URL.   |

### `MsgUpdateProvider` — `updateProvider`

Updates an existing provider. All fields are required (it's a full replace, not a patch).

| Field           | Type          | Notes                                                       |
| --------------- | ------------- | ----------------------------------------------------------- |
| `authority`     | `string`      |                                                             |
| `uuid`          | `string`      | Provider to update.                                         |
| `address`       | `string`      |                                                             |
| `payoutAddress` | `string`      |                                                             |
| `metaHash`      | `Uint8Array`  |                                                             |
| `active`        | `boolean`     | `true` → reactivate. Setting `false` on an active provider fails — use `MsgDeactivateProvider`. |
| `apiUrl`        | `string`      |                                                             |

### `MsgDeactivateProvider` — `deactivateProvider`

Soft-deletes a provider. Existing leases continue, but no new SKUs can be created. SKU cascade is paginated to bound gas usage:

| Field        | Type     | Notes                                                                 |
| ------------ | -------- | --------------------------------------------------------------------- |
| `authority`  | `string` |                                                                       |
| `uuid`      | `string` | Provider to deactivate.                                               |
| `limit`      | `bigint` | Max SKUs to deactivate this call. `0` → server default.               |

Response: `{ deactivatedSkuCount, hasMore }`. If `hasMore: true`, send the same message again until it returns `false`.

### `MsgCreateSKU` — `createSKU`

| Field          | Type          | Notes                                                       |
| -------------- | ------------- | ----------------------------------------------------------- |
| `authority`    | `string`      |                                                             |
| `providerUuid` | `string`      | Provider that owns the SKU.                                 |
| `name`         | `string`      | Human-readable name.                                        |
| `unit`         | `Unit`        | `UNIT_PER_HOUR` (`1`) or `UNIT_PER_DAY` (`2`).              |
| `basePrice`    | `Coin`        | Per-unit price (e.g. `{ denom: 'umfx', amount: '1000' }`).  |
| `metaHash`     | `Uint8Array`  | Off-chain metadata hash.                                    |

Response: `{ uuid }` (UUIDv7).

### `MsgUpdateSKU` — `updateSKU`

Full replace of an existing SKU. As with provider, `active: true → false` is rejected — use `MsgDeactivateSKU`.

### `MsgDeactivateSKU` — `deactivateSKU`

Marks the SKU inactive. Existing leases continue; no new leases can reference it.

### `MsgUpdateParams` — `updateParams`

Authority-only. Replaces module parameters.

## Queries

```ts
const client = await liftedinit.ClientFactory.createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT });
const sku = client.liftedinit.sku.v1;
```

| Method                                                       | Returns                                  |
| ------------------------------------------------------------ | ---------------------------------------- |
| `params({})`                                                 | `{ params }`                             |
| `provider({ uuid })`                                         | `{ provider }`                           |
| `providers({ pagination, activeOnly })`                      | `{ providers, pagination }`              |
| `sKU({ uuid })`                                              | `{ sku }`                                |
| `sKUs({ pagination, activeOnly })`                           | `{ skus, pagination }`                   |
| `sKUsByProvider({ providerUuid, pagination, activeOnly })`   | `{ skus, pagination }`                   |
| `providerByAddress({ address, pagination, activeOnly })`     | `{ providers, pagination }`              |

> Note the `sKU…` casing on the SKU-named methods. Telescope lowers only the first character of the proto method name; `SKU` becomes `sKU`, `SKUs` becomes `sKUs`, etc. The `MessageComposer.withTypeUrl.{createSKU,updateSKU,deactivateSKU}` keys keep the full `SKU` because the proto name (`CreateSKU`) starts with a lowercase-able `C`.

## Module parameters

`Params`:

| Field          | Type       | Notes                                                                 |
| -------------- | ---------- | --------------------------------------------------------------------- |
| `allowedList`  | `string[]` | Addresses allowed to manage providers/SKUs in addition to the authority. |

## Worked example — provider + SKU + reactivation

```ts
import { liftedinit, getSigningLiftedinitClient } from '@manifest-network/manifestjs';
import { Unit } from '@manifest-network/manifestjs/dist/codegen/liftedinit/sku/v1/types';
import {
  MsgCreateProviderResponse,
  MsgCreateSKUResponse,
} from '@manifest-network/manifestjs/dist/codegen/liftedinit/sku/v1/tx';

const tx = liftedinit.sku.v1.MessageComposer.withTypeUrl;
const client = await getSigningLiftedinitClient({ rpcEndpoint: RPC_ENDPOINT, signer });
const fee = { amount: [{ denom: 'umfx', amount: '330000' }], gas: '300000' };

// 1. Create provider
const createProvider = await client.signAndBroadcast(authorityAddress, [
  tx.createProvider({
    authority: authorityAddress,
    address: providerMgmtAddress,
    payoutAddress: providerPayoutAddress,
    metaHash: new Uint8Array(),
    apiUrl: 'https://provider.example.com/api',
  }),
], fee);
const providerUuid = MsgCreateProviderResponse
  .decode(createProvider.msgResponses[0].value).uuid;

// 2. Create SKU under that provider
const createSku = await client.signAndBroadcast(authorityAddress, [
  tx.createSKU({
    authority: authorityAddress,
    providerUuid,
    name: 'docker-small',
    unit: Unit.UNIT_PER_HOUR,
    basePrice: { denom: 'umfx', amount: '100' },
    metaHash: new Uint8Array(),
  }),
], fee);
const skuUuid = MsgCreateSKUResponse
  .decode(createSku.msgResponses[0].value).uuid;

// 3. Deactivate the SKU later
await client.signAndBroadcast(authorityAddress, [
  tx.deactivateSKU({ authority: authorityAddress, uuid: skuUuid }),
], fee);

// 4. Reactivate via UpdateSKU (note: setting active: true on an inactive SKU is allowed)
await client.signAndBroadcast(authorityAddress, [
  tx.updateSKU({
    authority: authorityAddress,
    uuid: skuUuid,
    providerUuid,
    name: 'docker-small',
    unit: Unit.UNIT_PER_HOUR,
    basePrice: { denom: 'umfx', amount: '100' },
    metaHash: new Uint8Array(),
    active: true,
  }),
], fee);
```

## Reference

- Proto: [`proto/liftedinit/sku/v1/`](../../proto/liftedinit/sku/v1/)
- Generated code: [`src/codegen/liftedinit/sku/v1/`](../../src/codegen/liftedinit/sku/v1/)
