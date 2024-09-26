import type { DatabaseTable } from "../index.schema.types";
import type { TableType } from "./index.types";

export type CustomApplicationLogs = TableType<
  "application_logs",
  {
    metadata:
      | BookingConfirmationMetadata
      | CandidateResponseSelfSchedule
      | InterviewerDeclineMetadata;
  }
>;

export type BookingConfirmationMetadata = {
  action: "waiting" | "canceled" | "rescheduled";
  type: "booking_confirmation";
  sessions: CustomMeta[];
  filter_id?: string;
  availability_request_id?: string;
};

export type InterviewerDeclineMetadata = {
  action: "waiting" | "canceled" | "rescheduled";
  type: "interviewer_decline";
  reason: string;
  response_type: "reschedule" | "cancel";
  other_details: DatabaseTable["interview_session_cancel"]["other_details"];
  meeting_id: string;
};

export type CandidateResponseSelfSchedule = {
  action: "waiting" | "canceled" | "rescheduled";
  type: "candidate_response_self_schedule";
  reason: string;
  response_type: "reschedule" | "cancel";
  other_details: DatabaseTable["interview_session_cancel"]["other_details"];
  filter_id: string;
  session_ids: string[];
};

type CustomMeta = DatabaseTable["interview_session"] & {
  interview_meeting: Pick<
    DatabaseTable["interview_meeting"],
    | "id"
    | "start_time"
    | "end_time"
    | "status"
    | "cal_event_id"
    | "meeting_link"
  >;
  interview_session_relation: InterviewSessionRelation[];
};

type InterviewSessionRelation = DatabaseTable["interview_session_relation"] & {
  interview_module_relation: Pick<
    DatabaseTable["interview_module_relation"],
    "id"
  > & {
    recruiter_user: {
      email: string;
      user_id: string;
      last_name: string;
      first_name: string;
      profile_image: string;
    };
  };
};
