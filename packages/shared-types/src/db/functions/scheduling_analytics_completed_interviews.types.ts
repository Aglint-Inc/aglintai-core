import type { Database } from "../schema.types";
import type { Custom } from "../utils.types";
import type { FunctionType } from "./index.types";

export type CustomSchedulingAnalyticsCompletedInterviews = FunctionType<
  "scheduling_analytics_completed_interviews",
  Custom<
    Database["public"]["Functions"]["scheduling_analytics_completed_interviews"]["Args"],
    { type?: "year" | "quarter" | "month" }
  >,
  Database["public"]["Functions"]["scheduling_analytics_completed_interviews"]["Returns"][number]
>;
