import * as _121 from "./poa/v1/genesis";
import * as _122 from "./poa/v1/params";
import * as _123 from "./poa/v1/query";
import * as _124 from "./poa/v1/tx";
import * as _125 from "./poa/v1/validator";
import * as _241 from "./poa/v1/tx.amino";
import * as _242 from "./poa/v1/tx.registry";
import * as _243 from "./poa/v1/query.lcd";
import * as _244 from "./poa/v1/query.rpc.Query";
import * as _245 from "./poa/v1/tx.rpc.msg";
import * as _258 from "./lcd";
import * as _259 from "./rpc.query";
import * as _260 from "./rpc.tx";
export namespace strangelove_ventures {
  export namespace poa {
    export const v1 = {
      ..._121,
      ..._122,
      ..._123,
      ..._124,
      ..._125,
      ..._241,
      ..._242,
      ..._243,
      ..._244,
      ..._245
    };
  }
  export const ClientFactory = {
    ..._258,
    ..._259,
    ..._260
  };
}