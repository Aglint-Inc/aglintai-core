import type { Database } from "../schema.types";
import type { Custom } from "../utils.types";
import type { CustomRequestPayload } from "./common.types";
import type { FunctionType } from "./index.types";

export type CustomCreateSessionRequest = FunctionType<
  "create_session_request",
  Custom<
    Database["public"]["Functions"]["create_session_request"]["Args"],
    {
      request?: CustomRequestPayload;
    }
  >,
  {}
>;
