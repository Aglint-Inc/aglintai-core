import { CustomFeedback } from "../common.types";
import type { ViewType } from "./index.types";

export type CustomMeetingDetails = ViewType<
  "meeting_details",
  {
    candidate_feedback: CustomFeedback;
    meeting_json: any;
  }
>;
