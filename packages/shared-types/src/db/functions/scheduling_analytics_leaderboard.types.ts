import { Database } from "../schema.types";
import { Custom } from "../utils.types";
import type { FunctionType } from "./index.types";

export type CustomSchedulingAnalyticsLeaderboard = FunctionType<
  "scheduling_analytics_leaderboard",
  Custom<
    Database["public"]["Functions"]["scheduling_analytics_leaderboard"]["Args"],
    { type: "all_time" | "year" | "month" | "week" }
  >,
  Database["public"]["Functions"]["scheduling_analytics_leaderboard"]["Returns"][number]
>;
