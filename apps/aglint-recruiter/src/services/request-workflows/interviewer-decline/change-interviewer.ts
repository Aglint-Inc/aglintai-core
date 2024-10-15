import {
  type APIRespFindReplaceMentInts,
  type APIUpdateMeetingInterviewers,
} from '@aglint/shared-types';
import { CApiError, getFullName, supabaseWrap } from '@aglint/shared-utils';
import { type ProgressLoggerType } from '@aglint/shared-utils/src/request-workflow/utils';
import axios from 'axios';

import { findReplacementIntsUtil } from '@/server/api/routers/scheduling/v1/findReplacementInts/util';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';
type FuncParams = {
  request_id: string;
  session_id: string;
  reqProgress: ProgressLoggerType;
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
      input: {
        session_id: cancel_rec.session_id,
        declined_int_sesn_reln_id: cancel_rec.session_relation_id,
      },
      ctx: { db: supabaseAdmin } as any,
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

  const api_payload2: APIUpdateMeetingInterviewers = {
    session_id: payload.session_id,
    curr_declined_int_sesn_reln_id: cancel_rec.session_relation_id,
    new_int_user_id: alternate_slots[0].replacement_int.user_id,
    request_id: payload.request_id,
  };
  await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/update-meeting-interviewers`,
    api_payload2,
  );

  await supabaseWrap(
    await supabaseAdmin
      .from('request')
      .update({ status: 'completed' })
      .eq('id', payload.request_id),
  );
  await payload.reqProgress({
    is_progress_step: true,
    status: 'completed',
    log: `Replaced ${getFullName(alternate_slots[0].replacement_int.first_name, alternate_slots[0].replacement_int.last_name)} for the interview`,
  });
  await payload.reqProgress({
    is_progress_step: false,
    status: 'completed',
  });
};
