import * as _141 from "./poa/module/v1/module";
import * as _142 from "./poa/v1/genesis";
import * as _143 from "./poa/v1/params";
import * as _144 from "./poa/v1/query";
import * as _145 from "./poa/v1/tx";
import * as _146 from "./poa/v1/validator";
import * as _263 from "./poa/v1/tx.amino";
import * as _264 from "./poa/v1/tx.registry";
import * as _265 from "./poa/v1/query.lcd";
import * as _266 from "./poa/v1/query.rpc.Query";
import * as _267 from "./poa/v1/tx.rpc.msg";
import * as _280 from "./lcd";
import * as _281 from "./rpc.query";
import * as _282 from "./rpc.tx";
export namespace strangelove_ventures {
  export namespace poa {
    export namespace module {
      export const v1 = {
        ..._141
      };
    }
    export const v1 = {
      ..._142,
      ..._143,
      ..._144,
      ..._145,
      ..._146,
      ..._263,
      ..._264,
      ..._265,
      ..._266,
      ..._267
    };
  }
  export const ClientFactory = {
    ..._280,
    ..._281,
    ..._282
  };
}