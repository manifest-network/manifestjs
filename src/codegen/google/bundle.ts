import * as _105 from "./protobuf/any";
import * as _106 from "./protobuf/descriptor";
import * as _107 from "./protobuf/duration";
import * as _108 from "./protobuf/empty";
import * as _109 from "./protobuf/timestamp";

type ProtobufModules = typeof _105 & typeof _106 & typeof _107 & typeof _108 & typeof _109;

export namespace google {
  export const protobuf: ProtobufModules = {
    ..._105,
    ..._106,
    ..._107,
    ..._108,
    ..._109
  };
}
