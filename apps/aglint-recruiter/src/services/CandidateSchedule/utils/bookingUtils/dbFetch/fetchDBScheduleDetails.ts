import {
  type DatabaseTable,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import { type SchemaCandidateDirectBooking } from '@aglint/shared-types/src/aglintApi/zodSchemas/candidate-self-schedule';
import { CApiError } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { type z } from 'zod';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const fetchDBScheduleDetails = async (
  parsed_body: z.infer<typeof SchemaCandidateDirectBooking>,
) => {
  const supabaseAdmin = getSupabaseServer();

  const filter_json_data = (
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*,applications!inner(id,candidate_id,candidates!inner(email,first_name,last_name,recruiter!inner(id,name)),public_jobs!inner(job_title))',
      )
      .eq('id', parsed_body.filter_id)
      .single()
      .throwOnError()
  ).data;

  if (!filter_json_data) {
    throw new CApiError('CLIENT', 'Filter does not exist');
  }

  const email_templates = (
    await supabaseAdmin
      .from('company_email_template')
      .select()
      .eq('recruiter_id', filter_json_data.applications.candidates.recruiter.id)
      .throwOnError()
  ).data;
  if (!email_templates) {
    throw new CApiError('CLIENT', 'Email templates not found');
  }

  const sorted_plan = parsed_body.selected_plan.sort(
    (p1, p2) =>
      dayjsLocal(p1.start_time).unix() - dayjsLocal(p2.start_time).unix(),
  );
  const start_date_str = dayjsLocal(sorted_plan[0].start_time)
    .tz(parsed_body.cand_tz)
    .startOf('day')
    .format('DD/MM/YYYY');
  const end_date_str = dayjsLocal(
    sorted_plan[sorted_plan.length - 1].start_time,
  )
    .tz(parsed_body.cand_tz)
    .startOf('day')
    .format('DD/MM/YYYY');
  const filered_selected_options: PlanCombinationRespType[] =
    filter_json_data.selected_options?.map((plan) => {
      const updated_plan = { ...plan };
      updated_plan.sessions = updated_plan.sessions.filter((s) =>
        filter_json_data.session_ids.includes(s.session_id),
      );
      return updated_plan;
    }) ?? [];
  const fetchDetails: FetchDBScheduleDetailsType = {
    filtered_selected_options: filered_selected_options,
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
    dates: {
      start_date_str: start_date_str,
      end_date_str: end_date_str,
    },
    request_id: filter_json_data.request_id,
  };
  return fetchDetails;
};

type FetchDBScheduleDetailsType = {
  filtered_selected_options: PlanCombinationRespType[];
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
  dates: {
    start_date_str: string;
    end_date_str: string;
  };
  session_ids: string[];
};
