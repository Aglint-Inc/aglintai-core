import { type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const supabaseAdmin = getSupabaseServer();

export const generateReportForJob = async (job_id: string) => {
  const allRequests = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*,applications(*),request_relation(*)')
      .eq('applications.job_id', job_id),
  );
  scheduleRequests(allRequests);
};

const scheduleRequests = async ((allRequests: DatabaseTable['request']&{
  request_relation:DatabaseTable['request_relation'][]
})[]) => {
  const scheduleRequests = await supabaseWrap(await supabaseAdmin.from(''));
};
