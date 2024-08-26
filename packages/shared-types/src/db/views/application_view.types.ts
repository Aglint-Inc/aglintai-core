import type { CustomApplicationBadges } from "../common.types";
import { Database } from "../schema.types";
import type { ViewType } from "./index.types";

export type CustomApplicationView = ViewType<
  "application_view",
  {
    badges: CustomApplicationBadges;
    interview_plans: (Pick<
      Database["public"]["Tables"]["interview_plan"]["Row"],
      "id" | "name" | "plan_order"
    > & {
      status: Record<
        Database["public"]["Tables"]["interview_meeting"]["Row"]["status"],
        number
      >;
    })[];
  }
>;
