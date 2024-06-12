import type { TableType } from "./index.types";

export type CustomInterviewSessionRelation = TableType<
  "interview_session_relation",
  { feedback: CustomFeedback }
>;

type CustomFeedback = {
  recommendation: number;
  objective: string;
} | null;
