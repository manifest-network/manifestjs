import * as _115 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _116 from "./tokenfactory/v1beta1/genesis";
import * as _117 from "./tokenfactory/v1beta1/params";
import * as _118 from "./tokenfactory/v1beta1/query";
import * as _119 from "./tokenfactory/v1beta1/tx";
import * as _235 from "./tokenfactory/v1beta1/tx.amino";
import * as _236 from "./tokenfactory/v1beta1/tx.registry";
import * as _237 from "./tokenfactory/v1beta1/query.lcd";
import * as _238 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _239 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _254 from "./lcd";
import * as _255 from "./rpc.query";
import * as _256 from "./rpc.tx";
export namespace osmosis {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._115,
      ..._116,
      ..._117,
      ..._118,
      ..._119,
      ..._235,
      ..._236,
      ..._237,
      ..._238,
      ..._239
    };
  }
  export const ClientFactory = {
    ..._254,
    ..._255,
    ..._256
  };
}