import { type APIRespFindReplaceMentInts } from '@aglint/shared-types';
import { CApiError } from '@aglint/shared-utils';

import { findReplacementIntsUtil } from '@/services/CandidateSchedule/utils/replaceInterviewer/findReplacementInt';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { updateMeetingInterviewers } from './updateMeetingInterviewers';
type FuncParams = {
  request_id: string;
  session_id: string;
};
export const changeInterviewer = async (payload: FuncParams) => {
  const supabaseAdmin = getSupabaseServer();

  const cancel_rec = (
    await supabaseAdmin
      .from('interview_session_cancel')
      .select()
      .eq('request_id', payload.request_id)
      .single()
      .throwOnError()
  ).data;
  if (!cancel_rec || !cancel_rec.session_relation_id) {
    throw new CApiError('CLIENT', 'No cancel record found');
  }
  const alternate_slots: APIRespFindReplaceMentInts =
    await findReplacementIntsUtil({
      session_id: cancel_rec.session_id,
      declined_int_sesn_reln_id: cancel_rec.session_relation_id,
    });
  if (alternate_slots.length === 0) {
    throw new CApiError(
      'CLIENT',
      'No alternative interviewers are found in the interview plan.',
    );
  }

  if (alternate_slots.every((r) => r.conflicts.length > 0)) {
    // await payload.reqProgressLogger({
    //   event_type: 'REPLACE_ALTERNATIVE_INTERVIEWER',
    //   log: `Resolve Conflicts ${alternate_slots.map(slot=>slot.conflicts.)}`,
    //   is_progress_step: false,
    //   status: 'failed',
    // });
  }

  await updateMeetingInterviewers({
    session_id: payload.session_id,
    curr_declined_int_sesn_reln_id: cancel_rec.session_relation_id,
    new_int_user_id: alternate_slots[0].replacement_int.user_id,
    request_id: payload.request_id,
  });
};
