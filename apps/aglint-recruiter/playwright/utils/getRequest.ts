import { type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { getCompanyDetails } from './dbfetch';

export const getRequestForAvailabilityE2e = async (): Promise<
  DatabaseTable['request'][]
> => {
  const { recruiter_user } = await getCompanyDetails();
  const supabaseAdmin = await getSupabaseServer();
  const scheduleRequests = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select()
      .eq('type', 'schedule_request')
      .eq('status', 'to_do')
      .eq('assigner_id', recruiter_user.user_id),
    false,
  );
  if (scheduleRequests.length === 0) {
    throw new Error('No schedule requests found');
  }
  return scheduleRequests;
};
