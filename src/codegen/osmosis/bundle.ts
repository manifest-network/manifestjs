import * as _133 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _134 from "./tokenfactory/v1beta1/genesis";
import * as _135 from "./tokenfactory/v1beta1/params";
import * as _136 from "./tokenfactory/v1beta1/query";
import * as _137 from "./tokenfactory/v1beta1/tx";
import * as _268 from "./tokenfactory/v1beta1/tx.amino";
import * as _269 from "./tokenfactory/v1beta1/tx.registry";
import * as _270 from "./tokenfactory/v1beta1/query.lcd";
import * as _271 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _272 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _290 from "./lcd";
import * as _291 from "./rpc.query";
import * as _292 from "./rpc.tx";
export namespace osmosis {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._133,
      ..._134,
      ..._135,
      ..._136,
      ..._137,
      ..._268,
      ..._269,
      ..._270,
      ..._271,
      ..._272
    };
  }
  export const ClientFactory = {
    ..._290,
    ..._291,
    ..._292
  };
}