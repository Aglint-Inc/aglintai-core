import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const supabaseAdmin = getSupabaseServer();

export const generateReportForJob = async (job_id: string) => {
  const allRequests = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*,applications(*)')
      .eq('applications.job_id', job_id),
  );
};
