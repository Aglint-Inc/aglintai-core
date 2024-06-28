import type { CustomApplicationBadges } from "../common.types";
import { Database } from "../schema.types";
import type { ViewType } from "./index.types";

export type CustomApplicationView = ViewType<
  "application_view",
  {
    badges: CustomApplicationBadges;
    meeting_details: (Pick<
      Database["public"]["Views"]["meeting_details"]["Row"],
      | "session_duration"
      | "session_name"
      | "session_order"
      | "schedule_type"
      | "session_type"
      | "status"
      | "session_id"
    > & {
      date?: Pick<
        Database["public"]["Views"]["meeting_details"]["Row"],
        "start_time" | "end_time"
      >;
      meeting_id: string;
    })[];
  }
>;
