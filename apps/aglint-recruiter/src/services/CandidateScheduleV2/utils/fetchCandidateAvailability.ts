import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { scheduling_options_schema } from '@/src/types/scheduling/schema_find_availability_payload';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { userTzDayjs } from './userTzDayjs';

export const fetchCandidateAvailability = async (request_id: string) => {
  const [avail_details] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select(
        'session_ids,slots,availability,date_range,applications(candidates(timezone)),recruiter_id',
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
    include_free_time: avail_details.availability.free_keywords,
    use_recruiting_blocks: avail_details.availability.recruiting_block_keywords,
  });

  const cand_tz = avail_details.applications.candidates.timezone;
  return {
    session_ids: avail_details.session_ids.map((s) => s.id),
    candidate_selected_slots: avail_details.slots,
    start_date_str: userTzDayjs(avail_details.date_range[0])
      .tz(cand_tz)
      .subtract(2, 'day')
      .format('DD/MM/YYYY'),
    end_date_str: userTzDayjs(avail_details.date_range[1])
      .tz(cand_tz)
      .add(2, 'day')
      .format('DD/MM/YYYY'),
    cand_tz: cand_tz,
    api_options: zod_options,
    recruiter_id: avail_details.recruiter_id,
  };
};
