import { TableType } from "./index.types";

export type CandidateRequestAvailability = TableType<
  "candidate_request_availability",
  {
    availability: AvailabilityType;
    date_range: DateRange;
  }
>;

type DateRange = any[];
type AvailabilityType = {
  free_keywords: boolean;
  recruiting_block_keywords: boolean;
  day_offs: boolean;
  outside_work_hours: boolean;
};
