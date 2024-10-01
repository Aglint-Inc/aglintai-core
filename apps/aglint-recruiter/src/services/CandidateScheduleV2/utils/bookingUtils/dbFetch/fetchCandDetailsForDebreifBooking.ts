import { type APIScheduleDebreif } from '@aglint/shared-types';
import {
  CApiError,
  dayjsLocal,
  type scheduling_options_schema,
} from '@aglint/shared-utils';
import { type z } from 'zod';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

type DebriefFetchResponse = {
  application_id: string;
  candidate: {
    first_name: string;
    last_name: string;
    timezone: string;
  };
  company: {
    id: string;
    name: string;
  };
  job: {
    job_title: string;
  };
  dates: {
    start_date_str: string;
    end_date_str: string;
  };
  api_options: z.infer<typeof scheduling_options_schema>;
  cand_tz: string;
  request_id: string;
};

export const fetchCandDetailsForDebreifBooking = async (
  req_body: APIScheduleDebreif,
) => {
  const supabaseAdmin = getSupabaseServer();

  const cand_debreif_details = (
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*,applications!inner(id,candidates!inner(first_name,last_name,timezone),public_jobs!inner(job_title),recruiter!inner(id,name))',
      )
      .eq('id', req_body.filter_id)
      .single()
      .throwOnError()
  ).data;
  if (!cand_debreif_details) {
    throw new CApiError('CLIENT', 'Filter does not exist');
  }

  const fetchedData: DebriefFetchResponse = {
    application_id: cand_debreif_details.application_id,
    candidate: {
      first_name: cand_debreif_details.applications.candidates.first_name,
      last_name: cand_debreif_details.applications.candidates.last_name ?? '',
      timezone:
        cand_debreif_details.applications.candidates.timezone ??
        req_body.user_tz,
    },
    company: {
      id: cand_debreif_details.applications.recruiter.id,
      name: cand_debreif_details.applications.recruiter.name ?? '',
    },
    job: {
      job_title: cand_debreif_details.applications.public_jobs.job_title ?? '',
    },
    dates: {
      start_date_str: dayjsLocal(req_body.selectedOption.sessions[0].start_time)
        .tz(req_body.user_tz)
        .format('DD/MM/YYYY'),
      end_date_str: dayjsLocal(req_body.selectedOption.sessions[0].start_time)
        .tz(req_body.user_tz)
        .format('DD/MM/YYYY'),
    },
    api_options:
      req_body.options ?? ({} as z.infer<typeof scheduling_options_schema>),
    cand_tz: req_body.user_tz,
    request_id: cand_debreif_details.request_id,
  };

  return fetchedData;
};
