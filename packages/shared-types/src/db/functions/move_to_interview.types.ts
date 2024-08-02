import { Database } from "../schema.types";
import { Type } from "../utils.types";
import { CustomRequestPayload } from "./common.types";
import type { FunctionType } from "./index.types";

export type CustomMoveToInterview = FunctionType<
  "move_to_interview",
  Type<
    Database["public"]["Functions"]["move_to_interview"]["Args"],
    {
      request?: CustomRequestPayload;
    }
  >,
  {}
>;
