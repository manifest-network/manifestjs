import * as _119 from "./manifest/v1/genesis";
import * as _120 from "./manifest/v1/query";
import * as _121 from "./manifest/v1/tx";
import * as _243 from "./manifest/v1/tx.amino";
import * as _244 from "./manifest/v1/tx.registry";
import * as _245 from "./manifest/v1/query.rpc.Query";
import * as _246 from "./manifest/v1/tx.rpc.msg";
import * as _266 from "./lcd";
import * as _267 from "./rpc.query";
import * as _268 from "./rpc.tx";
export namespace liftedinit {
  export namespace manifest {
    export const v1 = {
      ..._119,
      ..._120,
      ..._121,
      ..._243,
      ..._244,
      ..._245,
      ..._246
    };
  }
  export const ClientFactory = {
    ..._266,
    ..._267,
    ..._268
  };
}