import * as _132 from "./module/v1/module";
import * as _133 from "./v1/genesis";
import * as _134 from "./v1/query";
import * as _135 from "./v1/tx";
import * as _251 from "./v1/tx.amino";
import * as _252 from "./v1/tx.registry";
import * as _253 from "./v1/query.lcd";
import * as _254 from "./v1/query.rpc.Query";
import * as _255 from "./v1/tx.rpc.msg";
import * as _272 from "./lcd";
import * as _273 from "./rpc.query";
import * as _274 from "./rpc.tx";
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
    ..._251,
    ..._252,
    ..._253,
    ..._254,
    ..._255
  };
  export const ClientFactory = {
    ..._272,
    ..._273,
    ..._274
  };
}