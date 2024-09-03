import { type SessionInterviewerType } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { type BookedMeetingDetails } from './types';

type ConfirmInt = Pick<
  SessionInterviewerType,
  'session_id' | 'user_id' | 'interview_module_relation_id'
>;

export const confirmInterviewers = async (
  booked_meeting_details: BookedMeetingDetails,
  is_debreif = false,
) => {
  let inters: ConfirmInt[] = [];
  for (let booked_meeting of booked_meeting_details) {
    booked_meeting.meeting_organizer;
    inters = [...inters, ...booked_meeting.all_confirmed_interviewers];
  }
  await Promise.all(
    inters.map(async (int) => {
      if (!is_debreif) {
        supabaseWrap(
          await supabaseAdmin
            .from('interview_session_relation')
            .update({
              is_confirmed: true,
            })
            .eq(
              'interview_module_relation_id',
              int.interview_module_relation_id,
            )
            .eq('session_id', int.session_id),
        );
      } else {
        supabaseWrap(
          await supabaseAdmin
            .from('interview_session_relation')
            .update({
              is_confirmed: true,
            })
            .eq('user_id', int.user_id)
            .eq('session_id', int.session_id),
        );
      }
    }),
  );
};
