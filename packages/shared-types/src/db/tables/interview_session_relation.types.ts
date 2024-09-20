import type { CustomFeedback } from "../common.types";
import type { TableType } from "./index.types";

export type CustomInterviewSessionRelation = TableType<
  "interview_session_relation",
  { feedback: CustomFeedback }
>;
