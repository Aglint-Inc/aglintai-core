import {
  APIFindAltenativeTimeSlot,
  APIRespFindReplaceMentInts,
  APIUpdateMeetingInterviewers,
} from '@aglint/shared-types';
import { ApiError, getFullName, supabaseWrap } from '@aglint/shared-utils';
import axios from 'axios';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { ProgressLoggerType } from '../utils';
type FuncParams = {
  request_id: string;
  session_id: string;
  reqProgressLogger: ProgressLoggerType;
};
export const changeInterviewer = async (payload: FuncParams) => {
  // list interviewers
  const [cancel_rec] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_cancel')
      .select()
      .eq('request_id', payload.request_id),
  );
  const api_payload1: APIFindAltenativeTimeSlot = {
    session_id: cancel_rec.session_id,
    declined_int_sesn_reln_id: cancel_rec.session_relation_id,
    user_tz: 'Asia/Colombo',
  };
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/find-replacement-ints`,
    api_payload1,
  );

  const alternate_slots: APIRespFindReplaceMentInts = data;
  if (alternate_slots.length === 0) {
    throw new ApiError(
      'SERVER_ERROR',
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
    new_int_sesn_reln_id: alternate_slots[0].replacement_int.id,
  };
  await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/update-meeting-interviewers`,
    api_payload2,
  );
  await payload.reqProgressLogger({
    event_type: 'REPLACE_ALTERNATIVE_INTERVIEWER',
    is_progress_step: true,
    status: 'completed',
    log: `Replaced ${getFullName(alternate_slots[0].replacement_int.first_name, alternate_slots[0].replacement_int.last_name)} for the interview`,
  });
  await payload.reqProgressLogger({
    event_type: 'REPLACE_ALTERNATIVE_INTERVIEWER',
    is_progress_step: false,
    status: 'completed',
  });
};
