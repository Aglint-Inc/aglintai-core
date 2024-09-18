import { TableType } from "./index.types";

export type CustomInterviewMeeting = TableType<
  "interview_meeting",
  {
    candidate_feedback: candidate_feedback_type;
  }
>;

type candidate_feedback_type = {
  rating: number;
  feedback: string;
};
