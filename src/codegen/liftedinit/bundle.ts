import * as _119 from "./billing/v1/genesis";
import * as _120 from "./billing/v1/query";
import * as _121 from "./billing/v1/tx";
import * as _122 from "./billing/v1/types";
import * as _123 from "./manifest/v1/genesis";
import * as _124 from "./manifest/v1/query";
import * as _125 from "./manifest/v1/tx";
import * as _126 from "./sku/v1/genesis";
import * as _127 from "./sku/v1/query";
import * as _128 from "./sku/v1/tx";
import * as _129 from "./sku/v1/types";
import * as _251 from "./billing/v1/tx.amino";
import * as _252 from "./manifest/v1/tx.amino";
import * as _253 from "./sku/v1/tx.amino";
import * as _254 from "./billing/v1/tx.registry";
import * as _255 from "./manifest/v1/tx.registry";
import * as _256 from "./sku/v1/tx.registry";
import * as _257 from "./billing/v1/query.lcd";
import * as _258 from "./sku/v1/query.lcd";
import * as _259 from "./billing/v1/query.rpc.Query";
import * as _260 from "./manifest/v1/query.rpc.Query";
import * as _261 from "./sku/v1/query.rpc.Query";
import * as _262 from "./billing/v1/tx.rpc.msg";
import * as _263 from "./manifest/v1/tx.rpc.msg";
import * as _264 from "./sku/v1/tx.rpc.msg";
import * as _284 from "./lcd";
import * as _285 from "./rpc.query";
import * as _286 from "./rpc.tx";
export namespace liftedinit {
  export namespace billing {
    export const v1 = {
      ..._119,
      ..._120,
      ..._121,
      ..._122,
      ..._251,
      ..._254,
      ..._257,
      ..._259,
      ..._262
    };
  }
  export namespace manifest {
    export const v1 = {
      ..._123,
      ..._124,
      ..._125,
      ..._252,
      ..._255,
      ..._260,
      ..._263
    };
  }
  export namespace sku {
    export const v1 = {
      ..._126,
      ..._127,
      ..._128,
      ..._129,
      ..._253,
      ..._256,
      ..._258,
      ..._261,
      ..._264
    };
  }
  export const ClientFactory = {
    ..._284,
    ..._285,
    ..._286
  };
}