import { supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const selfScheduleAgent = async (req_body) => {
  const { candidate_availability_request_id } = req_body;

  const [avail_record] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select()
      .eq('id', candidate_availability_request_id),
  );
  //
};
