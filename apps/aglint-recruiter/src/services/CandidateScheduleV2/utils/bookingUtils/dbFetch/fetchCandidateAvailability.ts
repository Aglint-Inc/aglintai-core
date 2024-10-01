import { type APIConfirmRecruiterSelectedOption } from '@aglint/shared-types';
import { CApiError, scheduling_options_schema } from '@aglint/shared-utils';
import { type z } from 'zod';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

type DbFetchCandAvailForBooking = {
  session_ids: string[];
  candidate: {
    first_name: string;
    last_name: string;
    timezone: string;
  };
  application_id: string;
  date: {
    start_date_str: string;
    end_date_str: string;
  };
  company: {
    id: string;
    name: string;
  };
  job: {
    job_title: string;
  };
  zod_options: z.infer<typeof scheduling_options_schema>;
  request_id: string;
};

export const fetchCandAvailForBooking = async (
  req_body: APIConfirmRecruiterSelectedOption,
) => {
  const supabaseAdmin = getSupabaseServer();
  const avail_details = (
    await supabaseAdmin
      .from('candidate_request_availability')
      .select(
        '*, recruiter(id,name),applications(id,candidates(first_name,last_name,timezone),public_jobs(job_title)), request_session_relation(session_id)',
      )
      .eq('id', req_body.availability_req_id)
      .single()
      .throwOnError()
  ).data;

  if (!avail_details) {
    throw new Error('Availabiluty does not exist');
  }
  if (!avail_details.applications) {
    throw new CApiError('CLIENT', 'application');
  }
  if (!avail_details.applications.candidates) {
    throw new CApiError('CLIENT', 'Candidate not found');
  }
  if (!avail_details.applications.public_jobs) {
    throw new CApiError('CLIENT', 'Job not found');
  }
  if (!avail_details.recruiter) {
    throw new CApiError('CLIENT', 'Recruiter not found');
  }
  const fetched_details: DbFetchCandAvailForBooking = {
    session_ids: avail_details.request_session_relation.map(
      (s) => s.session_id,
    ),
    candidate: {
      first_name: avail_details.applications.candidates.first_name,
      last_name: avail_details.applications.candidates.last_name ?? '',
      timezone: req_body.user_tz,
    },
    application_id: avail_details.applications.id,
    date: {
      start_date_str: avail_details.date_range[0],
      end_date_str: avail_details.date_range[1],
    },
    company: {
      id: avail_details.recruiter.id,
      name: avail_details.recruiter.name,
    },
    job: {
      job_title: avail_details.applications.public_jobs.job_title,
    },
    zod_options: scheduling_options_schema.parse({
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
    }),
    request_id: avail_details.request_id,
  };

  return fetched_details;
};
