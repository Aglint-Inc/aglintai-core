import { scheduling_options_schema, supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const fetchCandidateAvailability = async (request_id: string) => {
  const supabaseAdmin = getSupabaseServer();

  const [avail_details] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select(
        'slots,availability,date_range,applications(candidates(timezone)),recruiter_id, request_session_relation(session_id)',
      )
      .eq('id', request_id),
  );
  if (!avail_details) {
    throw new Error('Availabiluty does not exist');
  }
  const zod_options = scheduling_options_schema.parse({
    include_conflicting_slots: {
      day_off: true,
      day_passed: true,
      holiday: true,
      interviewer_pause: true,
      interviewers_load: true,
      out_of_office: true,
      out_of_working_hrs: true,
      show_conflicts_events: true,
      show_soft_conflicts: true,
    },
    include_free_time: true,
    use_recruiting_blocks: true,
  });
  return {
    session_ids: avail_details.request_session_relation.map(
      (s) => s.session_id,
    ),
    candidate_selected_slots: avail_details.slots,
    start_date_str: avail_details.date_range[0],
    end_date_str: avail_details.date_range[1],
    api_options: zod_options,
    recruiter_id: avail_details.recruiter_id,
  };
};
