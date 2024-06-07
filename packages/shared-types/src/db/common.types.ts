import { Database, Tables } from "./schema.types";

export type CustomMembersMeta = {
  [id in
    | keyof Pick<
        Tables<"public_jobs">,
        "hiring_manager" | "recruiter" | "recruiting_coordinator" | "sourcer"
      >
    | "previous_interviewers"]: boolean;
};

export type CustomEmailTypes = Extract<
  Database["public"]["Enums"]["email_types"],
  | "self_schedule_request_reminder"
  | "upcoming_interview_reminder_candidate"
  | "upcoming_interview_reminder_interviewers"
  | "availability_request_reminder"
  | "slack_interviewer_confirmation"
>;
