import * as _93 from "./module/v1/module";
import * as _94 from "./v1/genesis";
import * as _95 from "./v1/query";
import * as _96 from "./v1/tx";
import * as _167 from "./v1/tx.amino";
import * as _168 from "./v1/tx.registry";
import * as _169 from "./v1/query.rpc.Query";
import * as _170 from "./v1/tx.rpc.msg";
import * as _175 from "./rpc.query";
import * as _176 from "./rpc.tx";
export namespace manifest {
  export namespace module {
    export const v1 = {
      ..._93
    };
  }
  export const v1 = {
    ..._94,
    ..._95,
    ..._96,
    ..._167,
    ..._168,
    ..._169,
    ..._170
  };
  export const ClientFactory = {
    ..._175,
    ..._176
  };
}