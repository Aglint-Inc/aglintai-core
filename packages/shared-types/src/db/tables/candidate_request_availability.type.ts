import { z } from "zod";
import type { TableType } from "./index.types";

export type CandidateRequestAvailability = TableType<
  "candidate_request_availability",
  {
    availability: AvailabilityType;
    date_range: DateRange;
    slots: dateSlotsType | null;
  }
>;

type DateRange = string[];
export const availabilityTypeSchema = z.object({
  free_keywords: z.boolean(),
  recruiting_block_keywords: z.boolean(),
  day_offs: z.boolean(),
  outside_work_hours: z.boolean(),
});
type AvailabilityType = z.infer<typeof availabilityTypeSchema>;
type dateSlotsType = z.infer<typeof dateSlotsTypeSchema>;
export const dateSlotsTypeSchema = z.array(
  z.object({
    round: z.number(),
    dates: z.array(
      z.object({
        curr_day: z.string(),
        slots: z.array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
            isSlotAvailable: z.boolean(),
          })
        ),
      })
    ),
  })
);
