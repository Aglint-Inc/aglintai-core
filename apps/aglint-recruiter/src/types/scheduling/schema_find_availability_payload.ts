import { z } from 'zod';
export const scheduling_options_schema = z.object({
  include_free_time: z.boolean().default(true),
  make_training_optional: z.boolean().default(true),
  use_recruiting_blocks: z.boolean().default(true),
  check_next_minutes: z.number().default(30),
  cand_start_time: z.number().default(8),
  cand_end_time: z.number().default(18),
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
      out_of_working_hrs: z.boolean().default(false),
      day_passed: z.boolean().default(false),
    })
    .default({}), // Ensure defaults for nested object
});

export const schema_find_availability_payload = z.object({
  session_ids: z.string().array(),
  recruiter_id: z.string(),
  candidate_tz: z.string(),
  start_date_str: z.string(),
  end_date_str: z.string(),
  options: scheduling_options_schema.default({}), // Ensure default values are applied
});

export const schema_find_interview_slot = z.object({
  session_ids: z.string().array(),
  recruiter_id: z.string(),
  candidate_tz: z.string(),
  schedule_date: z.string(),
  options: scheduling_options_schema.default({}), // Ensure default values are applied
});

export const schema_find_slots_date_range = z.object({
  session_ids: z.string().array(),
  recruiter_id: z.string(),
  date_range_start: z.string(),
  date_range_end: z.string(),
  candidate_tz: z.string(),
  options: scheduling_options_schema.default({}), // Ensure default values are applied
});

export const schema_verify_interviewer_selected_slots = z.object({
  cand_availability_id: z.string(),
  user_tz: z.string(),
});
