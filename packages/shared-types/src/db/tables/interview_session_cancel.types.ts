import type { TableType } from "./index.types";

export type CustomInterviewSessionCancel = TableType<
  "interview_session_cancel",
  {
    other_details: CustomOtherDetails;
  }
>;

type CustomOtherDetails = {
  dateRange?: { start: string; end: string };
  note?: string;
};
