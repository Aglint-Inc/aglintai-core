import { Database } from "../schema.types";
import { Custom } from "../utils.types";
import type { FunctionType } from "./index.types";

export type CustomSchedulingAnalyticsReasons = FunctionType<
  "scheduling_analytics_reasons",
  Custom<
    Database["public"]["Functions"]["scheduling_analytics_reasons"]["Args"],
    { type?: "reschedule" | "declined" }
  >,
  Database["public"]["Functions"]["scheduling_analytics_reasons"]["Returns"][number]
>;
