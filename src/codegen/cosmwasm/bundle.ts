import * as _84 from "./wasm/v1/authz";
import * as _85 from "./wasm/v1/genesis";
import * as _86 from "./wasm/v1/ibc";
import * as _87 from "./wasm/v1/proposal_legacy";
import * as _88 from "./wasm/v1/query";
import * as _89 from "./wasm/v1/tx";
import * as _90 from "./wasm/v1/types";
import * as _218 from "./wasm/v1/tx.amino";
import * as _219 from "./wasm/v1/tx.registry";
import * as _220 from "./wasm/v1/query.lcd";
import * as _221 from "./wasm/v1/query.rpc.Query";
import * as _222 from "./wasm/v1/tx.rpc.msg";
import * as _260 from "./lcd";
import * as _261 from "./rpc.query";
import * as _262 from "./rpc.tx";
export namespace cosmwasm {
  export namespace wasm {
    export const v1 = {
      ..._84,
      ..._85,
      ..._86,
      ..._87,
      ..._88,
      ..._89,
      ..._90,
      ..._218,
      ..._219,
      ..._220,
      ..._221,
      ..._222
    };
  }
  export const ClientFactory = {
    ..._260,
    ..._261,
    ..._262
  };
}