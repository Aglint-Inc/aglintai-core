import { z } from 'zod';

const scheduling_options_schema = z.object({
  include_free_time: z.boolean().default(true),
  make_training_optional: z.boolean().default(true),
  use_recruiting_blocks: z.boolean().default(true),
  check_next_minutes: z.number().default(30),
  include_conflicting_slots: z
    .object({
      show_soft_conflicts: z.boolean().default(true),
      show_conflicts_events: z.boolean().default(true),
      interviewers_load: z.boolean().default(false),
      interviewer_pause: z.boolean().default(false),
      out_of_office: z.boolean().default(false),
      calender_not_connected: z.boolean().default(false),
      day_off: z.boolean().default(false),
      holiday: z.boolean().default(false),
      override_working_hours: z.object({
        start: z.number().min(0),
        end: z.number().max(23),
      }),
    })
    .default({}), // Ensure defaults for nested object
});

export const schema_find_availability_payload = z.object({
  session_ids: z.string().array(),
  recruiter_id: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  candidate_tz: z.string(),
  options: scheduling_options_schema.default({}), // Ensure default values are applied
});

// TODO: better types needed
export type SchedulingAPI = z.infer<typeof schema_find_availability_payload>;
