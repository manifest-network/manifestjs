import * as _119 from "./billing/module/v1/module";
import * as _120 from "./billing/v1/genesis";
import * as _121 from "./billing/v1/query";
import * as _122 from "./billing/v1/tx";
import * as _123 from "./billing/v1/types";
import * as _124 from "./manifest/module/v1/module";
import * as _125 from "./manifest/v1/genesis";
import * as _126 from "./manifest/v1/query";
import * as _127 from "./manifest/v1/tx";
import * as _128 from "./sku/module/v1/module";
import * as _129 from "./sku/v1/genesis";
import * as _130 from "./sku/v1/query";
import * as _131 from "./sku/v1/tx";
import * as _132 from "./sku/v1/types";
import * as _254 from "./billing/v1/tx.amino";
import * as _255 from "./manifest/v1/tx.amino";
import * as _256 from "./sku/v1/tx.amino";
import * as _257 from "./billing/v1/tx.registry";
import * as _258 from "./manifest/v1/tx.registry";
import * as _259 from "./sku/v1/tx.registry";
import * as _260 from "./billing/v1/query.lcd";
import * as _261 from "./sku/v1/query.lcd";
import * as _262 from "./billing/v1/query.rpc.Query";
import * as _263 from "./manifest/v1/query.rpc.Query";
import * as _264 from "./sku/v1/query.rpc.Query";
import * as _265 from "./billing/v1/tx.rpc.msg";
import * as _266 from "./manifest/v1/tx.rpc.msg";
import * as _267 from "./sku/v1/tx.rpc.msg";
import * as _287 from "./lcd";
import * as _288 from "./rpc.query";
import * as _289 from "./rpc.tx";
export namespace liftedinit {
  export namespace billing {
    export namespace module {
      export const v1 = {
        ..._119
      };
    }
    export const v1 = {
      ..._120,
      ..._121,
      ..._122,
      ..._123,
      ..._254,
      ..._257,
      ..._260,
      ..._262,
      ..._265
    };
  }
  export namespace manifest {
    export namespace module {
      export const v1 = {
        ..._124
      };
    }
    export const v1 = {
      ..._125,
      ..._126,
      ..._127,
      ..._255,
      ..._258,
      ..._263,
      ..._266
    };
  }
  export namespace sku {
    export namespace module {
      export const v1 = {
        ..._128
      };
    }
    export const v1 = {
      ..._129,
      ..._130,
      ..._131,
      ..._132,
      ..._256,
      ..._259,
      ..._261,
      ..._264,
      ..._267
    };
  }
  export const ClientFactory = {
    ..._287,
    ..._288,
    ..._289
  };
}