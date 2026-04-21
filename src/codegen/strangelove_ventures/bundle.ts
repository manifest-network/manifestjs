import * as _135 from "./poa/v1/genesis";
import * as _136 from "./poa/v1/params";
import * as _137 from "./poa/v1/query";
import * as _138 from "./poa/v1/tx";
import * as _139 from "./poa/v1/validator";
import * as _270 from "./poa/v1/tx.amino";
import * as _271 from "./poa/v1/tx.registry";
import * as _272 from "./poa/v1/query.lcd";
import * as _273 from "./poa/v1/query.rpc.Query";
import * as _274 from "./poa/v1/tx.rpc.msg";
import * as _290 from "./lcd";
import * as _291 from "./rpc.query";
import * as _292 from "./rpc.tx";
export namespace strangelove_ventures {
  export namespace poa {
    export const v1 = {
      ..._135,
      ..._136,
      ..._137,
      ..._138,
      ..._139,
      ..._270,
      ..._271,
      ..._272,
      ..._273,
      ..._274
    };
  }
  export const ClientFactory = {
    ..._290,
    ..._291,
    ..._292
  };
}