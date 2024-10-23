/* eslint-disable no-console */
import { supabaseWrap } from '@aglint/shared-utils';

import { interviewerDeclineRequest } from '@/services/requests/interviewerDeclineRequest';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { getRandomNumInRange, report_gen_Params } from '../constant';
import { type MeetingDetail } from './candidate-requests';

export const createInterviewDeclineRequest = async (
  meeting_details: MeetingDetail[],
) => {
  const supabaseAdmin = getSupabaseServer();

  const decline_meetings_cnt = Math.floor(
    meeting_details.length *
      report_gen_Params.interviewer_decline_request_percentage,
  );
  const all_meeting_ints = await fetchMeetingInts(
    meeting_details.map((m) => m.session_id),
  );
  // decline meetings
  for (const meeting_detail of meeting_details.slice(0, decline_meetings_cnt)) {
    const meeting_interviewers = all_meeting_ints.filter(
      (m) => m.session_id === meeting_detail.session_id,
    );
    const ints_status = meeting_interviewers.map((int) => ({
      ...int,
      is_declined: getRandomNumInRange(0, 100) > 50,
    }));
    const ints_promises = ints_status
      .filter((int) => int.is_declined === true)
      .map(async (int) => {
        await interviewerDeclineRequest({
          session_id: meeting_detail.session_id,
          declined_place:
            getRandomNumInRange(0, 70) > 50 ? 'slack' : 'calender',
          session_relation_id: int.session_relation_id,
        });
      });
    await Promise.all(ints_promises);
    await updateMeetingIntsStatus(
      ints_status
        .filter((int) => int.is_declined === false)
        .map((int) => int.session_relation_id),
    );
  }

  const accept_meeting_ints = all_meeting_ints.slice(decline_meetings_cnt);
  supabaseWrap(
    await supabaseAdmin
      .from('interview_session_relation')
      .update({ accepted_status: 'accepted' })
      .eq('is_confirmed', true)
      .in(
        'session_id',
        accept_meeting_ints.map((int) => int.session_id),
      ),
  );
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
  );
  return meetings;
};

const updateMeetingIntsStatus = async (session_relation_id: string[]) => {
  const supabaseAdmin = getSupabaseServer();
  const promises = session_relation_id.map((relation) =>
    supabaseAdmin
      .from('interview_session_relation')
      .update({ accepted_status: 'accepted' })
      .eq('session_relation_id', relation),
  );
  await Promise.all(promises);
};
