import * as _112 from "./manifest/module/v1/module";
import * as _113 from "./manifest/v1/genesis";
import * as _114 from "./manifest/v1/query";
import * as _115 from "./manifest/v1/tx";
import * as _232 from "./manifest/v1/tx.amino";
import * as _233 from "./manifest/v1/tx.registry";
import * as _234 from "./manifest/v1/query.rpc.Query";
import * as _235 from "./manifest/v1/tx.rpc.msg";
import * as _252 from "./lcd";
import * as _253 from "./rpc.query";
import * as _254 from "./rpc.tx";
export namespace liftedinit {
  export namespace manifest {
    export namespace module {
      export const v1 = {
        ..._112
      };
    }
    export const v1 = {
      ..._113,
      ..._114,
      ..._115,
      ..._232,
      ..._233,
      ..._234,
      ..._235
    };
  }
  export const ClientFactory = {
    ..._252,
    ..._253,
    ..._254
  };
}