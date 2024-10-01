import {
  customRecruiterUserCalendarSync,
  customRecruiterUserScheduleAuth,
  customRecuiterUserStatus,
  customSchedulingSettingsSchema,
} from "../common.zod";
import { recruiterUserUpdateSchema } from "../zod-schema.types";
import type { CustomSchedulingSettings } from "./common.types";
import type { TableType } from "./index.types";

export type CustomRecruiterUser = TableType<
  "recruiter_user",
  {
    scheduling_settings: CustomSchedulingSettings;
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
    scheduling_settings: customSchedulingSettingsSchema.optional(),
    status: customRecuiterUserStatus.optional(),
    schedule_auth: customRecruiterUserScheduleAuth.optional().nullable(),
    calendar_sync: customRecruiterUserCalendarSync.optional().nullable(),
  }
);
