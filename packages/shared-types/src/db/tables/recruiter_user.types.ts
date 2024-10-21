import { ZodTypeToSchema } from "../../zodHelpers.types";
import {
  customRecruiterUserCalendarSync,
  customRecruiterUserScheduleAuth,
  customRecuiterUserStatus,
  customSchedulingSettingsSchema,
  customSchedulingSettingsUserSchema,
} from "../common.zod";
import { recruiterUserUpdateSchema } from "../zod-schema.types";
import type { CustomSchedulingSettings } from "./common.types";
import type { TableType } from "./index.types";

export type CustomSchedulingSettingsUser = Pick<
  CustomSchedulingSettings,
  | "break_hour"
  | "interviewLoad"
  | "schedulingKeyWords"
  | "timeZone"
  | "totalDaysOff"
  | "workingHours"
>;

export type CustomRecruiterUser = TableType<
  "recruiter_user",
  {
    scheduling_settings: CustomSchedulingSettingsUser;
    schedule_auth: {
      email: string;
      expiry_date: number;
      access_token: string;
      refresh_token: string;
    } | null;
    status: "invited" | "active" | "suspended";
    calendar_sync: {
      resourceId: string;
      channelId: string;
    } | null;
  }
>;

export const customRecruiterUserUpdateSchema = recruiterUserUpdateSchema.extend(
  {
    scheduling_settings: customSchedulingSettingsUserSchema.optional(),
    status: customRecuiterUserStatus.optional(),
    schedule_auth: customRecruiterUserScheduleAuth.optional().nullable(),
    calendar_sync: customRecruiterUserCalendarSync.optional().nullable(),
  }
);
