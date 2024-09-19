import type { CustomInterviewSessionCancelRow } from "../common.types";
import type { CustomSchedulingSettings } from "../tables/common.types";
import type { ViewType } from "./index.types";

export type CustomMeetingInterviewersView = ViewType<
  "meeting_interviewers",
  {
    cancel_reasons: CustomInterviewSessionCancelRow[];
    schedule_auth: {
      email: string;
      expiry_date: number;
      access_token: string;
      refresh_token: string;
    };
    scheduling_settings: CustomSchedulingSettings;
  }
>;
