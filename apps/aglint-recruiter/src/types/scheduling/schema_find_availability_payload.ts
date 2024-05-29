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
      override_work_hr_start: z.number().min(0).nullable().default(null),
      override_work_hr_end: z.number().max(24).nullable().default(null),
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
