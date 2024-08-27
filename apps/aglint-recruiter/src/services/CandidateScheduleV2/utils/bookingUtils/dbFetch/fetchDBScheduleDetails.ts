import { PlanCombinationRespType } from '@aglint/shared-types';
import { schema_candidate_direct_booking } from '@aglint/shared-types/src/aglintApi/valibotSchema/candidate-self-schedule';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import * as v from 'valibot';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const fetchDBScheduleDetails = async (
  parsed_body: v.InferInput<typeof schema_candidate_direct_booking>,
) => {
  const [filter_json_data] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*,applications(id,candidate_id,candidates(email,first_name,last_name,recruiter(id,name)),public_jobs(job_title))',
      )
      .eq('id', parsed_body.filter_id),
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
  if (!filter_json_data) {
    throw new Error('invalid filter id');
  }
  const sorted_plan = parsed_body.selected_plan.sort(
    (p1, p2) =>
      dayjsLocal(p1.start_time).unix() - dayjsLocal(p2.start_time).unix(),
  );
  let start_date_str = dayjsLocal(sorted_plan[0].start_time)
    .tz(parsed_body.cand_tz)
    .startOf('day')
    .format('DD/MM/YYYY');
  let end_date_str = dayjsLocal(sorted_plan[sorted_plan.length - 1].start_time)
    .tz(parsed_body.cand_tz)
    .startOf('day')
    .format('DD/MM/YYYY');
  const filered_selected_options: PlanCombinationRespType[] =
    filter_json_data.selected_options?.map((plan) => {
      let updated_plan = { ...plan };
      updated_plan.sessions = updated_plan.sessions.filter((s) =>
        filter_json_data.session_ids.includes(s.session_id),
      );
      return updated_plan;
    }) ?? [];
  return {
    filered_selected_options,
    filter_json_data,
    candidate: filter_json_data.applications.candidates,
    application_id: filter_json_data.application_id,
    email_templates,
    company: filter_json_data.applications.candidates.recruiter,
    job: filter_json_data.applications.public_jobs,
    start_date_str,
    end_date_str,
  };
};
