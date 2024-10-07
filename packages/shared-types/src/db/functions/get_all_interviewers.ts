import type { SchedulingSettingType } from "../../scheduleTypes";
import type { Database } from "../schema.types";
import type { Custom } from "../utils.types";
import type { FunctionType } from "./index.types";

export type CustomGetAllInterviewers = FunctionType<
  "get_all_interviewers",
  Custom<Database["public"]["Functions"]["get_all_interviewers"]["Args"], {}>,
  Database["public"]["Functions"]["get_all_interviewers"]["Returns"][number] & {
    scheduling_settings: SchedulingSettingType;
    completed_meeting_last_month: {
      [date: string]: number;
    };
  }
>;
