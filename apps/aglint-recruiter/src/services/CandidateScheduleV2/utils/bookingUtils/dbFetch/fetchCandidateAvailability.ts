import { APIConfirmRecruiterSelectedOption } from '@aglint/shared-types';
import { scheduling_options_schema, supabaseWrap } from '@aglint/shared-utils';
import * as v from 'valibot';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
export const fetchCandAvailForBooking = async (
  req_body: APIConfirmRecruiterSelectedOption,
) => {
  const [avail_details] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select(
        'session_ids,user_timezone,slots,availability,date_range,recruiter_id,recruiter(id,name),applications(id,candidates(first_name,last_name,timezone),public_jobs(job_title))',
      )
      .eq('id', req_body.availability_req_id),
  );
  if (!avail_details) {
    throw new Error('Availabiluty does not exist');
  }
  const zod_options = v.parse(scheduling_options_schema, {
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

  return {
    session_ids: avail_details.session_ids,
    candidate: avail_details.applications.candidates,
    application: avail_details.applications,
    start_date_str: avail_details.date_range[0],
    end_date_str: avail_details.date_range[1],
    recruiter_id: avail_details.recruiter_id,
    company: avail_details.recruiter,
    job: avail_details.applications.public_jobs,
    zod_options,
    cand_tz: avail_details.user_timezone,
  };
};
