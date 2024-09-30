import * as _120 from "./poa/v1/genesis";
import * as _121 from "./poa/v1/params";
import * as _122 from "./poa/v1/query";
import * as _123 from "./poa/v1/tx";
import * as _124 from "./poa/v1/validator";
import * as _240 from "./poa/v1/tx.amino";
import * as _241 from "./poa/v1/tx.registry";
import * as _242 from "./poa/v1/query.lcd";
import * as _243 from "./poa/v1/query.rpc.Query";
import * as _244 from "./poa/v1/tx.rpc.msg";
import * as _257 from "./lcd";
import * as _258 from "./rpc.query";
import * as _259 from "./rpc.tx";
export namespace strangelove_ventures {
  export namespace poa {
    export const v1 = {
      ..._120,
      ..._121,
      ..._122,
      ..._123,
      ..._124,
      ..._240,
      ..._241,
      ..._242,
      ..._243,
      ..._244
    };
  }
  export const ClientFactory = {
    ..._257,
    ..._258,
    ..._259
  };
}