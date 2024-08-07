import type { CustomRequestType } from "../common.types";
import type { Database } from "../schema.types";
import type { Custom } from "../utils.types";
import type { FunctionType } from "./index.types";

export type CustomGetRequestCountStats = FunctionType<
  "get_request_count_stats",
  {},
  Custom<
    Database["public"]["Functions"]["get_request_count_stats"]["Returns"][number],
    {
      counts: {
        [id in CustomRequestType["status"]]: {
          [id in CustomRequestType["type"]]: number;
        };
      };
    }
  >
>;
