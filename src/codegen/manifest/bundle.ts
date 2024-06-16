import * as _132 from "./module/v1/module";
import * as _133 from "./v1/genesis";
import * as _134 from "./v1/query";
import * as _135 from "./v1/tx";
import * as _253 from "./v1/tx.amino";
import * as _254 from "./v1/tx.registry";
import * as _255 from "./v1/query.lcd";
import * as _256 from "./v1/query.rpc.Query";
import * as _257 from "./v1/tx.rpc.msg";
import * as _274 from "./lcd";
import * as _275 from "./rpc.query";
import * as _276 from "./rpc.tx";
export namespace manifest {
  export namespace module {
    export const v1 = {
      ..._132
    };
  }
  export const v1 = {
    ..._133,
    ..._134,
    ..._135,
    ..._253,
    ..._254,
    ..._255,
    ..._256,
    ..._257
  };
  export const ClientFactory = {
    ..._274,
    ..._275,
    ..._276
  };
}