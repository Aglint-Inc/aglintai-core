/* eslint-disable no-console */
import { supabaseWrap } from '@aglint/shared-utils';

import { findReplacementIntsUtil } from '@/services/CandidateSchedule/utils/replaceInterviewer/findReplacementInt';
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
    const replacement_ints = await findReplacementIntsUtil({
      declined_int_sesn_reln_id: declined_int.session_relation_id,
      session_id: meeting_detail.session_id,
    });
    const no_conf_ints = replacement_ints.filter(
      (int) => int.conflicts.length === 0,
    );
    if (no_conf_ints.length === 0) {
      console.error(`for meeting ${meeting_detail.session_id}`);
      return;
    }
    await updateMeetingInterviewers({
      session_id: meeting_detail.session_id,
      curr_declined_int_sesn_reln_id: declined_int.session_relation_id,
      new_int_user_id: no_conf_ints[0].replacement_int.user_id,
      request_id: decline_request.id,
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
