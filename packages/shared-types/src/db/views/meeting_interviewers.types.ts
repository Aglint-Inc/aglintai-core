import { DatabaseTable } from "../..";
import type { ViewType } from "./index.types";

export type CustomMeetingInterviewersView = ViewType<
  "meeting_interviewers",
  {
    cancel_reasons: DatabaseTable["interview_session_cancel"][];
  }
>;
