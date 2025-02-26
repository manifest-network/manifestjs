import * as _127 from "./poa/v1/genesis";
import * as _128 from "./poa/v1/params";
import * as _129 from "./poa/v1/query";
import * as _130 from "./poa/v1/tx";
import * as _131 from "./poa/v1/validator";
import * as _252 from "./poa/v1/tx.amino";
import * as _253 from "./poa/v1/tx.registry";
import * as _254 from "./poa/v1/query.lcd";
import * as _255 from "./poa/v1/query.rpc.Query";
import * as _256 from "./poa/v1/tx.rpc.msg";
import * as _272 from "./lcd";
import * as _273 from "./rpc.query";
import * as _274 from "./rpc.tx";
export namespace strangelove_ventures {
  export namespace poa {
    export const v1 = {
      ..._127,
      ..._128,
      ..._129,
      ..._130,
      ..._131,
      ..._252,
      ..._253,
      ..._254,
      ..._255,
      ..._256
    };
  }
  export const ClientFactory = {
    ..._272,
    ..._273,
    ..._274
  };
}