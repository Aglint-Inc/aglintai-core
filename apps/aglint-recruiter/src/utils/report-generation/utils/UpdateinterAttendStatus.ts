/* eslint-disable no-console */
import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

//
export const sessnRelnAccept = async () => {
  const supabaseAdmin = getSupabaseServer();
  const confirmed_meetings = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .or(`status.eq.confirmed,status.eq.completed`),
  );

  supabaseWrap(
    await supabaseAdmin
      .from('interview_session_relation')
      .update({
        accepted_status: 'accepted',
      })
      .eq('is_confirmed', true)
      .in(
        'session_id',
        confirmed_meetings.map((s) => s.id),
      )
      .select(),
    false,
  );
  console.log('interviewer attend status updated');
};
