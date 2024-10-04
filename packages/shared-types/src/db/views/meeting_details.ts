import type { CustomFeedback } from "../common.types";
import { Database } from "../schema.types";
import type { ViewType } from "./index.types";

export type CustomMeetingDetails = ViewType<
  "meeting_details",
  {
    candidate_feedback: CustomFeedback;
    meeting_json: any;
    application_id: string;
    break_duration: number;
    status: Database["public"]["Enums"]["interview_schedule_status"];
    id: string;
    job_id: string;
    module_id: string;
    session_id: string;
    session_name: string;
    recruiter_id: string;
    session_duration: number;
    schedule_type: Database["public"]["Enums"]["interview_schedule_type"];
  }
>;
