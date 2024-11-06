import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';
import { getCompanyDetails } from '../dbfetch';
import { supabaseWrap } from '@aglint/shared-utils';

export const testData = async () => {
  const { id: recruiter_id } = await getCompanyDetails();
  const supabaseAdmin = await getSupabaseServer();

  const jobs = supabaseWrap(
    await supabaseAdmin
      .from('public_jobs')
      .select(
        '*, applications!inner(*), interview_plan!inner(*, interview_session!inner(*))',
      )
      .eq('recruiter_id', recruiter_id),
    false,
  );

  const randomJobId = jobs[Math.floor(Math.random() * jobs.length)]
    .id as string;

  const job = jobs.find((job) => job.id === randomJobId);

  return job;
};
