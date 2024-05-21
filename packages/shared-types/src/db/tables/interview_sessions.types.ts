import { Tables } from "../..";
import { TableType } from "./index.types";

type Keys =
  | keyof Pick<
      Tables<"public_jobs">,
      "hiring_manager" | "recruiter" | "recruiting_coordinator" | "sourcer"
    >
  | "previous_interviewers";

export type CustomInterviewSession = TableType<
  "interview_session",
  { members_meta: { [id in Keys]: boolean } }
>;
