# Tokenfactory module — `osmosis.tokenfactory.v1beta1`

The tokenfactory module lets any account mint and manage `factory/<creator>/<subdenom>` denoms. The Manifest chain ships the [strangelove-ventures fork](https://github.com/strangelove-ventures/tokenfactory) under the original Osmosis package path; that's why it lives under `osmosis.tokenfactory.v1beta1` despite being a Manifest-managed dependency.

> ⚠️ Version: `v1beta1`, **not** `v1`. Older versions of this README mistakenly referenced `osmosis.tokenfactory.v1`; that path does not exist in the codegen.

| Property        | Value                                                  |
| --------------- | ------------------------------------------------------ |
| Proto package   | `osmosis.tokenfactory.v1beta1`                         |
| Codegen path    | `src/codegen/osmosis/tokenfactory/v1beta1/`            |
| Bundle access   | `osmosis.tokenfactory.v1beta1`                         |

## Imports

```ts
import { osmosis, getSigningOsmosisClient } from '@manifest-network/manifestjs';

const tx = osmosis.tokenfactory.v1beta1.MessageComposer.withTypeUrl;
```

## Concepts

- **Creating a denom** mints a fresh `factory/<creatorAddress>/<subdenom>` namespace and assigns admin rights to the creator. Subdenoms are up to 44 alphanumeric characters.
- **Admin** controls mint/burn/force-transfer/metadata for the denom. Admin can be transferred via `MsgChangeAdmin`, including to the zero address (effectively renouncing admin powers).
- **Denom creation fee** is configurable via `Params.denomCreationFee` (the Manifest devnet sets it to `[]` in [config.group.local.yaml](../../starship/configs/config.group.local.yaml)). Production deployments may charge.

## Messages

Type URLs are `/osmosis.tokenfactory.v1beta1.<MsgName>`. Amino types use `osmosis/tokenfactory/<kebab-name>`.

### `MsgCreateDenom` — `createDenom`

| Field      | Type     | Notes                                      |
| ---------- | -------- | ------------------------------------------ |
| `sender`   | `string` | Becomes the denom's creator and admin.     |
| `subdenom` | `string` | Up to 44 alphanumeric chars.               |

Response: `{ newTokenDenom }` — e.g., `factory/manifest1.../mytoken`.

### `MsgMint` — `mint`

Mints to `mintToAddress` (defaults to sender if empty). Sender must be the denom's admin.

| Field            | Type     | Notes                                                     |
| ---------------- | -------- | --------------------------------------------------------- |
| `sender`         | `string` | Denom admin.                                              |
| `amount`         | `Coin`   | Denom must be a `factory/.../...` token.                  |
| `mintToAddress`  | `string` | Optional. Empty string ⇒ mint to sender.                  |

### `MsgBurn` — `burn`

Burns from `burnFromAddress` (defaults to sender). Sender must be admin.

| Field             | Type     | Notes                                              |
| ----------------- | -------- | -------------------------------------------------- |
| `sender`          | `string` |                                                    |
| `amount`          | `Coin`   |                                                    |
| `burnFromAddress` | `string` | Optional.                                          |

### `MsgChangeAdmin` — `changeAdmin`

Transfers admin to `newAdmin`.

| Field      | Type     | Notes                              |
| ---------- | -------- | ---------------------------------- |
| `sender`   | `string` | Current admin.                     |
| `denom`    | `string` | The factory denom string.          |
| `newAdmin` | `string` | Bech32 address to receive admin rights. |

### `MsgSetDenomMetadata` — `setDenomMetadata`

Updates the bank module's `Metadata` for the denom (display name, description, denom units, base, display, symbol, name, uri, uriHash).

| Field      | Type            | Notes                                                              |
| ---------- | --------------- | ------------------------------------------------------------------ |
| `sender`   | `string`        | Denom admin.                                                       |
| `metadata` | `bank.Metadata` | `{ description, denomUnits, base, display, name, symbol, uri, uriHash }`. `denomUnits` includes the base denom plus any display denominations. |

### `MsgForceTransfer` — `forceTransfer`

Admin moves tokens between two addresses without consent. Use carefully (the chain's admin is responsible for explaining why this exists).

| Field                  | Type     | Notes                          |
| ---------------------- | -------- | ------------------------------ |
| `sender`               | `string` | Denom admin.                   |
| `amount`               | `Coin`   |                                |
| `transferFromAddress`  | `string` |                                |
| `transferToAddress`    | `string` |                                |

### `MsgUpdateParams` — `updateParams`

Governance-only (authority is the `x/gov` module account, not the tokenfactory admin).

| Field       | Type     | Notes                                  |
| ----------- | -------- | -------------------------------------- |
| `authority` | `string` | `x/gov` module account.                |
| `params`    | `Params` | Full replace. `denomCreationFee`, `denomCreationGasConsume`. |

## Queries

```ts
const client = await osmosis.ClientFactory.createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT });
const tf = client.osmosis.tokenfactory.v1beta1;
```

| Method                                     | Returns                                                |
| ------------------------------------------ | ------------------------------------------------------ |
| `params({})`                               | `{ params }` — denomCreationFee, denomCreationGasConsume. |
| `denomAuthorityMetadata({ denom })`        | `{ authorityMetadata: { admin } }`                     |
| `denomsFromCreator({ creator })`           | `{ denoms: string[] }`                                 |
| `denomsFromAdmin({ admin })`               | `{ denoms: string[] }`                                 |

## Worked example — create, mint, change admin

```ts
import { osmosis, getSigningOsmosisClient } from '@manifest-network/manifestjs';
import { MsgCreateDenomResponse } from
  '@manifest-network/manifestjs/dist/codegen/osmosis/tokenfactory/v1beta1/tx';

const tx = osmosis.tokenfactory.v1beta1.MessageComposer.withTypeUrl;
const client = await getSigningOsmosisClient({ rpcEndpoint: RPC_ENDPOINT, signer });
const fee = { amount: [{ denom: 'umfx', amount: '330000' }], gas: '300000' };

// 1. Create a new denom
const createRes = await client.signAndBroadcast(adminAddress, [
  tx.createDenom({ sender: adminAddress, subdenom: 'mytoken' }),
], fee);
const denom = MsgCreateDenomResponse.decode(createRes.msgResponses[0].value).newTokenDenom;
// e.g. "factory/manifest1.../mytoken"

// 2. Mint 1,000,000 to a recipient
await client.signAndBroadcast(adminAddress, [
  tx.mint({
    sender: adminAddress,
    amount: { denom, amount: '1000000' },
    mintToAddress: recipientAddress,
  }),
], fee);

// 3. Hand admin off
await client.signAndBroadcast(adminAddress, [
  tx.changeAdmin({ sender: adminAddress, denom, newAdmin: newAdminAddress }),
], fee);
```

## Reference

- Proto: [`proto/osmosis/tokenfactory/v1beta1/`](../../proto/osmosis/tokenfactory/v1beta1/)
- Generated code: [`src/codegen/osmosis/tokenfactory/v1beta1/`](../../src/codegen/osmosis/tokenfactory/v1beta1/)
- E2E tests: [`starship/__tests__/tokenfactory.test.ts`](../../starship/__tests__/tokenfactory.test.ts), [`starship/__tests__/tokenfactory.group.test.ts`](../../starship/__tests__/tokenfactory.group.test.ts)
- Upstream: [strangelove-ventures/tokenfactory](https://github.com/strangelove-ventures/tokenfactory)
