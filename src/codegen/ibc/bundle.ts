import * as _90 from "./applications/transfer/v1/genesis";
import * as _91 from "./applications/transfer/v1/query";
import * as _92 from "./applications/transfer/v1/transfer";
import * as _93 from "./applications/transfer/v1/tx";
import * as _94 from "./applications/transfer/v2/packet";
import * as _95 from "./core/channel/v1/channel";
import * as _96 from "./core/channel/v1/genesis";
import * as _97 from "./core/channel/v1/query";
import * as _98 from "./core/channel/v1/tx";
import * as _99 from "./core/client/v1/client";
import * as _100 from "./core/client/v1/genesis";
import * as _101 from "./core/client/v1/query";
import * as _102 from "./core/client/v1/tx";
import * as _103 from "./core/commitment/v1/commitment";
import * as _104 from "./core/connection/v1/connection";
import * as _105 from "./core/connection/v1/genesis";
import * as _106 from "./core/connection/v1/query";
import * as _107 from "./core/connection/v1/tx";
import * as _108 from "./lightclients/localhost/v1/localhost";
import * as _109 from "./lightclients/solomachine/v1/solomachine";
import * as _110 from "./lightclients/solomachine/v2/solomachine";
import * as _111 from "./lightclients/tendermint/v1/tendermint";
import * as _211 from "./applications/transfer/v1/tx.amino";
import * as _212 from "./core/channel/v1/tx.amino";
import * as _213 from "./core/client/v1/tx.amino";
import * as _214 from "./core/connection/v1/tx.amino";
import * as _215 from "./applications/transfer/v1/tx.registry";
import * as _216 from "./core/channel/v1/tx.registry";
import * as _217 from "./core/client/v1/tx.registry";
import * as _218 from "./core/connection/v1/tx.registry";
import * as _219 from "./applications/transfer/v1/query.lcd";
import * as _220 from "./core/channel/v1/query.lcd";
import * as _221 from "./core/client/v1/query.lcd";
import * as _222 from "./core/connection/v1/query.lcd";
import * as _223 from "./applications/transfer/v1/query.rpc.Query";
import * as _224 from "./core/channel/v1/query.rpc.Query";
import * as _225 from "./core/client/v1/query.rpc.Query";
import * as _226 from "./core/connection/v1/query.rpc.Query";
import * as _227 from "./applications/transfer/v1/tx.rpc.msg";
import * as _228 from "./core/channel/v1/tx.rpc.msg";
import * as _229 from "./core/client/v1/tx.rpc.msg";
import * as _230 from "./core/connection/v1/tx.rpc.msg";
import * as _248 from "./lcd";
import * as _249 from "./rpc.query";
import * as _250 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._90,
        ..._91,
        ..._92,
        ..._93,
        ..._211,
        ..._215,
        ..._219,
        ..._223,
        ..._227
      };
      export const v2 = {
        ..._94
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._95,
        ..._96,
        ..._97,
        ..._98,
        ..._212,
        ..._216,
        ..._220,
        ..._224,
        ..._228
      };
    }
    export namespace client {
      export const v1 = {
        ..._99,
        ..._100,
        ..._101,
        ..._102,
        ..._213,
        ..._217,
        ..._221,
        ..._225,
        ..._229
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._103
      };
    }
    export namespace connection {
      export const v1 = {
        ..._104,
        ..._105,
        ..._106,
        ..._107,
        ..._214,
        ..._218,
        ..._222,
        ..._226,
        ..._230
      };
    }
  }
  export namespace lightclients {
    export namespace localhost {
      export const v1 = {
        ..._108
      };
    }
    export namespace solomachine {
      export const v1 = {
        ..._109
      };
      export const v2 = {
        ..._110
      };
    }
    export namespace tendermint {
      export const v1 = {
        ..._111
      };
    }
  }
  export const ClientFactory = {
    ..._248,
    ..._249,
    ..._250
  };
}