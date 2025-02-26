import * as _122 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _123 from "./tokenfactory/v1beta1/genesis";
import * as _124 from "./tokenfactory/v1beta1/params";
import * as _125 from "./tokenfactory/v1beta1/query";
import * as _126 from "./tokenfactory/v1beta1/tx";
import * as _247 from "./tokenfactory/v1beta1/tx.amino";
import * as _248 from "./tokenfactory/v1beta1/tx.registry";
import * as _249 from "./tokenfactory/v1beta1/query.lcd";
import * as _250 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _251 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _269 from "./lcd";
import * as _270 from "./rpc.query";
import * as _271 from "./rpc.tx";
export namespace osmosis {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._122,
      ..._123,
      ..._124,
      ..._125,
      ..._126,
      ..._247,
      ..._248,
      ..._249,
      ..._250,
      ..._251
    };
  }
  export const ClientFactory = {
    ..._269,
    ..._270,
    ..._271
  };
}