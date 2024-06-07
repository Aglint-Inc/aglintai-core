import { DatabaseTable } from "../index.schema.types";
import { TableType } from "./index.types";

export type CustomApplicationLogs = TableType<
  "application_logs",
  {
    metadata: {
      type: "booking_confirmation";
      sessions: CustomMeta[];
      filter_id?: string;
      availability_request_id?: string;
      action: "waiting" | "canceled" | "rescheduled";
    };
  }
>;

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
