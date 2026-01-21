import * as _130 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _131 from "./tokenfactory/v1beta1/genesis";
import * as _132 from "./tokenfactory/v1beta1/params";
import * as _133 from "./tokenfactory/v1beta1/query";
import * as _134 from "./tokenfactory/v1beta1/tx";
import * as _265 from "./tokenfactory/v1beta1/tx.amino";
import * as _266 from "./tokenfactory/v1beta1/tx.registry";
import * as _267 from "./tokenfactory/v1beta1/query.lcd";
import * as _268 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _269 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _287 from "./lcd";
import * as _288 from "./rpc.query";
import * as _289 from "./rpc.tx";
export namespace osmosis {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._130,
      ..._131,
      ..._132,
      ..._133,
      ..._134,
      ..._265,
      ..._266,
      ..._267,
      ..._268,
      ..._269
    };
  }
  export const ClientFactory = {
    ..._287,
    ..._288,
    ..._289
  };
}