import { type APIScheduleDebreif } from '@aglint/shared-types';
import { scheduling_options_schema, supabaseWrap } from '@aglint/shared-utils';
import * as v from 'valibot';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { userTzDayjs } from '../../userTzDayjs';

export const fetchCandDetailsForDebreifBooking = async (
  req_body: APIScheduleDebreif,
) => {
  const [cand_debreif_details] = supabaseWrap(
    await supabaseAdmin
      .from('interview_schedule')
      .select(
        'recruiter_id,recruiter(id,name),applications(id,candidates(first_name,last_name,timezone),public_jobs(job_title))',
      )
      .eq('id', req_body.schedule_id),
  );
  if (!cand_debreif_details) {
    throw new Error('Availabiluty does not exist');
  }

  const api_options = req_body.options ?? {};
  const zod_options = v.parse(scheduling_options_schema, {
    ...api_options,
    include_conflicting_slots: {
      ...(api_options?.include_conflicting_slots ?? {}),
    },
  });
  const start_date_str = userTzDayjs(
    req_body.selectedOption.sessions[0].start_time,
  )
    .tz(req_body.user_tz)
    .format('DD/MM/YYYY');
  const end_date_str = userTzDayjs(
    req_body.selectedOption.sessions[0].start_time,
  )
    .tz(req_body.user_tz)
    .format('DD/MM/YYYY');

  return {
    application: cand_debreif_details.applications,
    candidate: cand_debreif_details.applications.candidates,
    company: cand_debreif_details.recruiter,
    job: cand_debreif_details.applications.public_jobs,
    zod_options,
    cand_tz: req_body.user_tz,
    start_date_str,
    end_date_str,
  };
};
