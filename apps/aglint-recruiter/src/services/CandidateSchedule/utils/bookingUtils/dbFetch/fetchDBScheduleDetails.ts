import {
  type DatabaseTable,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const fetchDBScheduleDetails = async (filter_id: string) => {
  const supabaseAdmin = getSupabaseServer();

  const filter_json_data = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*,applications!inner(id,candidate_id,candidates!inner(email,first_name,last_name,recruiter!inner(id,name)),public_jobs!inner(job_title))',
      )
      .eq('id', filter_id)
      .single(),
  );

  const email_templates = supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .select()
      .eq(
        'recruiter_id',
        filter_json_data.applications.candidates.recruiter.id,
      ),
  );

  const fetchDetails: FetchDBScheduleDetailsType = {
    candidate: {
      email: filter_json_data.applications.candidates.email,
      first_name: filter_json_data.applications.candidates.first_name,
      last_name: filter_json_data.applications.candidates.last_name ?? '',
    },
    company: filter_json_data.applications.candidates.recruiter,
    job: filter_json_data.applications.public_jobs,
    application_id: filter_json_data.application_id,
    email_templates: email_templates,
    session_ids: filter_json_data.session_ids,
    request_id: filter_json_data.request_id,
    plans_time_zone: filter_json_data.plans_time_zone,
    selected_plans: filter_json_data.selected_options,
  };
  return fetchDetails;
};

type FetchDBScheduleDetailsType = {
  candidate: {
    email: string;
    first_name: string;
    last_name: string;
  };
  company: {
    id: string;
    name: string;
  };
  job: {
    job_title: string;
  };
  application_id: string;
  request_id: string;
  email_templates: DatabaseTable['company_email_template'][];
  session_ids: string[];
  plans_time_zone: string;
  selected_plans: PlanCombinationRespType[];
};
