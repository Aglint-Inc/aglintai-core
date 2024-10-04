import type { CustomInterviewSessionCancelRow } from "../common.types";
import { Database } from "../schema.types";
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
    meeting_id: string;
    job_id: string;
    email: string;
    session_id: string;
    user_id: string;
    accepted_status: Database["public"]["Enums"]["session_accepted_status"];
    is_confirmed: boolean;
    session_relation_id: string;
    totalhoursthisweek: number;
    totalhourstoday: number;
    totalinterviewsthisweek: number;
    totalinterviewstoday: number;
    first_name: string;
    session_type: Database["public"]["Enums"]["session_type"];
    interviewer_type: Database["public"]["Enums"]["status_training"];
    training_type: Database["public"]["Enums"]["interviewer_type"];
  }
>;
