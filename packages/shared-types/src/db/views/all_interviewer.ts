import { DatabaseTable, DatabaseView, schedulingSettingType } from "../..";
import type { ViewType } from "./index.types";

export type CustomAllInterviewers = ViewType<
  "all_interviewers",
  {
    scheduling_settings: schedulingSettingType;
  }
>;
