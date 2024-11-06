import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const getCandidateAvailability = async (request_id: string) => {
  const supabaseAdmin = await getSupabaseServer();
  const request = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select()
      .eq('request_id', request_id)
      .single(),
    false,
  );
  if (!request) {
    throw new Error('No availability requests found');
  }
  return request;
};
