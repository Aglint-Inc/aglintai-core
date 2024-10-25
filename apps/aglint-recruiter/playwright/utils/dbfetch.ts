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
