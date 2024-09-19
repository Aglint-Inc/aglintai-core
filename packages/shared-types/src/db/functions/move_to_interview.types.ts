import type { CustomRequestType } from "../common.types";
import type { Database } from "../schema.types";
import type { Custom } from "../utils.types";
import type { CustomRequestPayload } from "./common.types";
import type { FunctionType } from "./index.types";

export type CustomMoveToInterview = FunctionType<
  "move_to_interview",
  Custom<
    Database["public"]["Functions"]["move_to_interview"]["Args"],
    {
      requests?: (CustomRequestPayload &
        Pick<CustomRequestType, "application_id">)[];
    }
  >,
  {}
>;
