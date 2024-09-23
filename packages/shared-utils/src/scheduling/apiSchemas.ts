import { z } from 'zod';

export const scheduling_options_schema = z.object({
  include_free_time: z.boolean().nullish().default(true),
  make_training_optional: z.boolean().nullish().default(true),
  use_recruiting_blocks: z.boolean().nullish().default(true),
  check_next_minutes: z.number().nullish().default(30),
  cand_start_time: z.number().nullish().default(8),
  cand_end_time: z.number().nullish().default(18),
  return_empty_slots_err: z.boolean().nullish().default(false),
  include_conflicting_slots: z
    .object({
      show_soft_conflicts: z.boolean().nullish().default(false),
      show_conflicts_events: z.boolean().nullish().default(false),
      interviewers_load: z.boolean().nullish().default(false),
      interviewer_pause: z.boolean().nullish().default(false),
      out_of_office: z.boolean().nullish().default(false),
      calender_not_connected: z.boolean().nullish().default(false),
      day_off: z.boolean().nullish().default(false),
      holiday: z.boolean().nullish().default(false),
      out_of_working_hrs: z.boolean().nullish().default(false),
      day_passed: z.boolean().nullish().default(false),
    })
    .nullish()
    .default({}),
});

export const schema_find_availability_payload = z.object({
  session_ids: z.array(z.string()),
  recruiter_id: z.string(),
  candidate_tz: z.string(),
  start_date_str: z.string(),
  end_date_str: z.string(),
  options: scheduling_options_schema.nullish().default({}),
});

export const schema_find_interview_slot = z.object({
  session_ids: z.array(z.string()),
  recruiter_id: z.string(),
  candidate_tz: z.string(),
  schedule_date: z.string(),
  options: scheduling_options_schema.nullish().default({}),
});

export const schema_find_slots_date_range = z.object({
  session_ids: z.array(z.string()),
  recruiter_id: z.string(),
  date_range_start: z.string(),
  date_range_end: z.string(),
  candidate_tz: z.string(),
  options: scheduling_options_schema.nullish().default({}),
});

export const schema_candidate_req_availabale_slots = z.object({
  avail_req_id: z.string(),
  recruiter_id: z.string(),
  candidate_tz: z.string(),
  curr_round: z.number().nullish().default(1),
});

export const schema_verify_interviewer_selected_slots = z.object({
  cand_availability_id: z.string(),
  user_tz: z.string(),
});

export const schema_find_alternative_slots = z.object({
  session_id: z.string(),
  declined_int_sesn_reln_id: z.string(),
});

export const schema_update_meeting_ints = z.object({
  session_id: z.string(),
  curr_declined_int_sesn_reln_id: z.string(),
  new_int_user_id: z.string(),
});

export const schema_troubleshoot = z.object({
  session_id: z.string(),
  recruiter_id: z.string(),
  schedule_date: z.string(),
  user_tz: z.string(),
  api_options: scheduling_options_schema.nullish().default({}),
});

export const schema_send_avail_req_link = z.object({
  session_details: z.array(
    z.object({
      session_name: z.string(),
    })
  ),
  start_date: z.string(),
  end_date: z.string(),
  job_id: z.string(),
  application_id: z.string(),
  company_id: z.string(),
});

export const candidate_new_schedule_schema = z.object({
  application_id: z.string(),
  recruiter_id: z.string(),
  api_options: scheduling_options_schema.nullish().default({}),
  session_ids: z.array(z.string()),
  target_api: z.any(),
  request_id: z.string(),
  event_run_id: z.number(),
});

export const candidate_avail_request_schema = z.intersection(
  z.object({
    number_of_days: z.number().nullish().default(2),
    number_of_slots: z.number().nullish().default(2),
  }),
  candidate_new_schedule_schema
);

export const candidate_self_schedule_request = z.intersection(
  candidate_new_schedule_schema,
  z.object({})
);

export const phone_agent_self_schedule_schema = z.intersection(
  z.object({
    begin_sentence_template: z.string(),
    interviewer_name: z.string(),
    filter_json_id: z.string(),
    from_phone_no: z.string(),
    to_phone_no: z.string(),
    retell_agent_id: z.string(),
    cand_email: z.string(),
    task_id: z.string().nullable(),
  }),
  z.object({})
);

export const email_agent_self_schedule_schema = z.intersection(
  candidate_new_schedule_schema,
  z.object({
    filter_json_id: z.string(),
    task_id: z.string().nullish(),
    recruiter_user_id: z.string(),
  })
);
