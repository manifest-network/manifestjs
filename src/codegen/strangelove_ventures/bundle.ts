import * as _138 from "./poa/v1/genesis";
import * as _139 from "./poa/v1/params";
import * as _140 from "./poa/v1/query";
import * as _141 from "./poa/v1/tx";
import * as _142 from "./poa/v1/validator";
import * as _273 from "./poa/v1/tx.amino";
import * as _274 from "./poa/v1/tx.registry";
import * as _275 from "./poa/v1/query.lcd";
import * as _276 from "./poa/v1/query.rpc.Query";
import * as _277 from "./poa/v1/tx.rpc.msg";
import * as _293 from "./lcd";
import * as _294 from "./rpc.query";
import * as _295 from "./rpc.tx";
export namespace strangelove_ventures {
  export namespace poa {
    export const v1 = {
      ..._138,
      ..._139,
      ..._140,
      ..._141,
      ..._142,
      ..._273,
      ..._274,
      ..._275,
      ..._276,
      ..._277
    };
  }
  export const ClientFactory = {
    ..._293,
    ..._294,
    ..._295
  };
}