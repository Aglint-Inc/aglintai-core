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
