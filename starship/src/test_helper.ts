// This is the POA_ADMIN_ADDRESS mnemonic as defined in the config.yaml file
import {Any} from "../../src/codegen/google/protobuf/any";
import {PubKey as CosmosCryptoEd25519Pubkey} from "cosmjs-types/cosmos/crypto/ed25519/keys";
import {fromBase64} from "@cosmjs/encoding";

export const poaAdminMnemonic =
  "razor dog gown public private couple ecology paper flee connect local robot diamond stay rude join sound win ribbon soup kidney glass robot vehicle";
// test1 key as defined in https://github.com/cosmology-tech/starship/blob/main/starship/charts/devnet/configs/keys.json
export const test1Mnemonic =
  "opinion knife other balcony surge more bamboo canoe romance ask argue teach anxiety adjust spike mystery wolf alone torch tail six decide wash alley";
export const test1Val = {
  address: "manifestvaloper1pss7nxeh3f9md2vuxku8q99femnwdjtcjhuxjm",
  pubkey: Any.fromPartial({
    typeUrl: "/cosmos.crypto.ed25519.PubKey",
    value: Uint8Array.from(
      CosmosCryptoEd25519Pubkey.encode(
        CosmosCryptoEd25519Pubkey.fromPartial({
          key: fromBase64("qS4C8i2q1orM463qxf5QA8iAwdZ+Aix7Xm+sJqr1kg4="),
        })
      ).finish()
    ),
  }),
};
// test2 key as defined in https://github.com/cosmology-tech/starship/blob/main/starship/charts/devnet/configs/keys.json
export const test2Mnemonic =
  "logic help only text door wealth hurt always remove glory viable income agent olive trial female couch old offer crash menu zero pencil thrive";
export const test2Val = {
  address: "manifestvaloper16e0p4vwufmsn0lucwsnfmjfx67ry84y4dh5ec7",
  pubkey: Any.fromPartial({
    typeUrl: "/cosmos.crypto.ed25519.PubKey",
    value: Uint8Array.from(
      CosmosCryptoEd25519Pubkey.encode(
        CosmosCryptoEd25519Pubkey.fromPartial({
          key: fromBase64("0PViQxy6wVFlGV0qocoxxI+a7+8HZawhpmVbHoSlrpE="),
        })
      ).finish()
    ),
  }),
};
