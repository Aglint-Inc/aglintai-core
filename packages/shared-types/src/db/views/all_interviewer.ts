import type { SchedulingSettingType } from "../..";
import type { ViewType } from "./index.types";

export type CustomAllInterviewers = ViewType<
  "all_interviewers",
  {
    scheduling_settings: SchedulingSettingType;
    completed_meeting_last_month: {
      [date: string]: number;
    };
  }
>;
