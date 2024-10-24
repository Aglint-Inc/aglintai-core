import { type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const supabaseAdmin = getSupabaseServer();

export const getJobScheduleRequests = async (
  job_id: string,
  schedule_type: DatabaseTable['request']['type'],
) => {
  const job_details = supabaseWrap(
    await supabaseAdmin
      .from('public_jobs')
      .select('*')
      .eq('id', job_id)
      .single(),
  );
  const recruiter_details = supabaseWrap(
    await supabaseAdmin
      .from('recruiter')
      .select('*')
      .eq('id', job_details.recruiter_id)
      .single(),
  );
  const allRequests = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*,applications(*, public_jobs(*)),request_relation(*)')
      .eq('applications.job_id', job_id)
      .eq('type', schedule_type),
    false,
  );
  return { job_details, recruiter_details, allRequests };
};
