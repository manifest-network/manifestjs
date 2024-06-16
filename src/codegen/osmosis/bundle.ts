import * as _136 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _137 from "./tokenfactory/v1beta1/genesis";
import * as _138 from "./tokenfactory/v1beta1/params";
import * as _139 from "./tokenfactory/v1beta1/query";
import * as _140 from "./tokenfactory/v1beta1/tx";
import * as _258 from "./tokenfactory/v1beta1/tx.amino";
import * as _259 from "./tokenfactory/v1beta1/tx.registry";
import * as _260 from "./tokenfactory/v1beta1/query.lcd";
import * as _261 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _262 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _277 from "./lcd";
import * as _278 from "./rpc.query";
import * as _279 from "./rpc.tx";
export namespace osmosis {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._136,
      ..._137,
      ..._138,
      ..._139,
      ..._140,
      ..._258,
      ..._259,
      ..._260,
      ..._261,
      ..._262
    };
  }
  export const ClientFactory = {
    ..._277,
    ..._278,
    ..._279
  };
}