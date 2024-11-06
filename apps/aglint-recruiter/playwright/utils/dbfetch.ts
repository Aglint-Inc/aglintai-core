import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const getCompanyDetails = async () => {
  const supabaseAdmin = await getSupabaseServer();
  const company = supabaseWrap(
    await supabaseAdmin
      .from('recruiter')
      .select('*, recruiter_user!inner(*)')
      .eq('recruiter_user.email', process.env.E2E_TEST_EMAIL)
      .single(),
  );
  return company;
};

export const getCandidateSelfSchedulingLink = async (request_id: string) => {
  const supabaseAdmin = await getSupabaseServer();
  const filter_json = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select()
      .eq('request_id', request_id)
      .single(),
  );
  return `${process.env.NEXT_PUBLIC_HOST_NAME}/self-scheduling/${filter_json.id}`;
};
