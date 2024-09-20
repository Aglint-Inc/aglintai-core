import type { CustomRequestType } from "../common.types";
import type { Database } from "../schema.types";
import type { Custom } from "../utils.types";
import type { FunctionType } from "./index.types";

export type CustomGetRequestCountStatsNew = FunctionType<
  "get_request_count_stats_new",
  {},
  Custom<
    Database["public"]["Functions"]["get_request_count_stats_new"]["Returns"][number],
    {
      counts: {
        [id in "created" | "completed"]: {
          [id in CustomRequestType["type"]]: {
            [id in CustomRequestType["priority"]]: number;
          };
        };
      };
    }
  >
>;
