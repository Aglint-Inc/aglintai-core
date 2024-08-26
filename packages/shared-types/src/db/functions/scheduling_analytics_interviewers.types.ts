import { Database } from "../schema.types";
import { Custom } from "../utils.types";
import type { FunctionType } from "./index.types";

export type CustomSchedulingAnalyticsInterviewers = FunctionType<
  "scheduling_analytics_interviewers",
  Custom<
    Database["public"]["Functions"]["scheduling_analytics_interviewers"]["Args"],
    { type?: "training" | "qualified" }
  >,
  Database["public"]["Functions"]["scheduling_analytics_interviewers"]["Returns"][number]
>;
