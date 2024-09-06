import * as _116 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _117 from "./tokenfactory/v1beta1/genesis";
import * as _118 from "./tokenfactory/v1beta1/params";
import * as _119 from "./tokenfactory/v1beta1/query";
import * as _120 from "./tokenfactory/v1beta1/tx";
import * as _237 from "./tokenfactory/v1beta1/tx.amino";
import * as _238 from "./tokenfactory/v1beta1/tx.registry";
import * as _239 from "./tokenfactory/v1beta1/query.lcd";
import * as _240 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _241 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _256 from "./lcd";
import * as _257 from "./rpc.query";
import * as _258 from "./rpc.tx";
export namespace osmosis {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._116,
      ..._117,
      ..._118,
      ..._119,
      ..._120,
      ..._237,
      ..._238,
      ..._239,
      ..._240,
      ..._241
    };
  }
  export const ClientFactory = {
    ..._256,
    ..._257,
    ..._258
  };
}