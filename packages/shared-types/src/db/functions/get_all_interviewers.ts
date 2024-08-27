import { schedulingSettingType } from "../../scheduleTypes";
import { CustomApplicationBadges } from "../common.types";
import { Database } from "../schema.types";
import { Custom } from "../utils.types";
import type { FunctionType } from "./index.types";

export type CustomGetAllInterviewers = FunctionType<
  "get_all_interviewers",
  Custom<Database["public"]["Functions"]["get_all_interviewers"]["Args"], {}>,
  Database["public"]["Functions"]["get_all_interviewers"]["Returns"][number] & {
    scheduling_settings: schedulingSettingType;
    completed_meeting_last_month: {
      [date: string]: number;
    };
  }
>;
