import { Database } from "../schema.types";
import type { FunctionType } from "./index.types";

export type CustomSchedulingAnalyticsFilters = FunctionType<
  "scheduling_analytics_filters",
  Database["public"]["Functions"]["scheduling_analytics_filters"]["Args"],
  {
    jobs: Pick<
      Database["public"]["Tables"]["public_jobs"]["Row"],
      "id" | "job_title"
    >[];
    departments: Pick<
      Database["public"]["Tables"]["departments"]["Row"],
      "id" | "name"
    >[];
  }
>;
