import { Database } from "../schema.types";
import { Type } from "../utils.types";
import { CustomRequestPayload } from "./common.types";
import type { FunctionType } from "./index.types";

export type CustomCreateSessionRequests = FunctionType<
  "create_session_requests",
  Type<
    Database["public"]["Functions"]["create_session_requests"]["Args"],
    {
      request?: CustomRequestPayload;
    }
  >,
  {}
>;
