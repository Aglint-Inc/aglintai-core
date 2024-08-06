import { Database } from "../schema.types";
import { Custom } from "../utils.types";
import { CustomRequestPayload } from "./common.types";
import type { FunctionType } from "./index.types";

export type CustomMoveToInterview = FunctionType<
  "move_to_interview",
  Custom<
    Database["public"]["Functions"]["move_to_interview"]["Args"],
    {
      request?: CustomRequestPayload;
    }
  >,
  {}
>;
