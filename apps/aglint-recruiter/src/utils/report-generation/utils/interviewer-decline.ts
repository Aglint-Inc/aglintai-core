/* eslint-disable no-console */
import { supabaseWrap } from '@aglint/shared-utils';

import { updateMeetingInterviewers } from '@/services/request-workflows/interviewer-decline/updateMeetingInterviewers';
import { interviewerDeclineRequest } from '@/services/requests/interviewerDeclineRequest';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { getRandomNumInRange, report_gen_Params } from '../constant';
import { type MeetingDetail } from './candidate-requests';
// import { runPromisesInBatches } from './runPromisesInBatches';

export const processInterviewerDeclineRequests = async (
  meeting_details: MeetingDetail[],
) => {
  const decline_meetings_cnt = Math.floor(
    meeting_details.length *
      report_gen_Params.interviewer_decline_request_percentage,
  );
  const all_meeting_ints = await fetchMeetingInts(
    meeting_details.map((m) => m.session_id),
  );

  // for each meeting decline some interviewers and raise decline request
  for (const meeting_detail of meeting_details.slice(0, decline_meetings_cnt)) {
    const meeting_interviewers = all_meeting_ints.filter(
      (m) => m.session_id === meeting_detail.session_id,
    );
    const declined_int =
      meeting_interviewers[
        getRandomNumInRange(0, meeting_interviewers.length - 1)
      ];
    console.log('creating decline request for', meeting_detail.session_id);
    const { decline_request } = await interviewerDeclineRequest({
      session_id: meeting_detail.session_id,
      declined_place: getRandomNumInRange(0, 70) > 50 ? 'slack' : 'calender',
      session_relation_id: declined_int.session_relation_id,
    });
    const alternative_int = await alternativeInt(meeting_detail);
    await updateMeetingInterviewers({
      session_id: meeting_detail.session_id,
      curr_declined_int_sesn_reln_id: declined_int.session_relation_id,
      new_int_user_id: alternative_int,
      request_id: decline_request.request_id!,
    });
  }

  console.log('interviewer confirmations updated');
};

const fetchMeetingInts = async (session_ids: string[]) => {
  const supabaseAdmin = getSupabaseServer();
  const meetings = supabaseWrap(
    await supabaseAdmin
      .from('meeting_interviewers')
      .select()
      .in('session_id', session_ids)
      .eq('is_confirmed', true),
    false,
  );
  return meetings;
};

const alternativeInt = async (meeting_detail: MeetingDetail) => {
  const supabaseAdmin = getSupabaseServer();
  const all_session_ints = supabaseWrap(
    await supabaseAdmin
      .from('meeting_interviewers')
      .select()
      .eq('session_id', meeting_detail.session_id),
    false,
  );
  const not_confirmed_ints = all_session_ints.filter(
    (int) => int.is_confirmed === false,
  );
  if (not_confirmed_ints.length > 0) {
    return not_confirmed_ints[0].user_id;
  }
  const module_details = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select()
      .eq('id', meeting_detail.session_id)
      .single(),
  );
  const module_ints = supabaseWrap(
    await supabaseAdmin
      .from('interview_module_relation')
      .select()
      .eq('module_id', module_details.module_id!),
  );

  const other_ints = module_ints.filter(
    (int) => !all_session_ints.find((m_int) => m_int.user_id == int.user_id),
  );
  if (other_ints.length === 0) {
    throw new Error('no alternative user found');
  }
  return other_ints[0].user_id;
};
