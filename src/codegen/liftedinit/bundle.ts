import * as _112 from "./manifest/v1/genesis";
import * as _113 from "./manifest/v1/query";
import * as _114 from "./manifest/v1/tx";
import * as _231 from "./manifest/v1/tx.amino";
import * as _232 from "./manifest/v1/tx.registry";
import * as _233 from "./manifest/v1/query.rpc.Query";
import * as _234 from "./manifest/v1/tx.rpc.msg";
import * as _251 from "./lcd";
import * as _252 from "./rpc.query";
import * as _253 from "./rpc.tx";
export namespace liftedinit {
  export namespace manifest {
    export const v1 = {
      ..._112,
      ..._113,
      ..._114,
      ..._231,
      ..._232,
      ..._233,
      ..._234
    };
  }
  export const ClientFactory = {
    ..._251,
    ..._252,
    ..._253
  };
}