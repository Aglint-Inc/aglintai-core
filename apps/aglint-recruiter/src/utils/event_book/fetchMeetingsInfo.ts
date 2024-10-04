import {
  type ScheduleAuthType,
  type SchedulingSettingType,
} from '@aglint/shared-types';
import { CApiError, supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '../supabase/supabaseAdmin';
export const fetchMeetingsInfo = async (meeting_ids: string[]) => {
  const supabaseAdmin = getSupabaseServer();

  const meetings = supabaseWrap(
    await supabaseAdmin
      .from('interview_meeting')
      .select(
        'id,recruiter_user!inner(email,schedule_auth,user_id,scheduling_settings)',
      )
      .in('id', meeting_ids),
  );
  if (!meetings) {
    throw new CApiError('SERVER_ERROR', 'Meetings not found');
  }
  const meetings_info = meetings.map((meeting) => ({
    meeting_id: meeting.id,
    organizer_id: meeting.recruiter_user.user_id,
    meeting_organizer_email: meeting.recruiter_user.email,
    scheduling_settings: meeting.recruiter_user
      .scheduling_settings as SchedulingSettingType,
    meeting_organizer_auth: meeting.recruiter_user
      .schedule_auth as ScheduleAuthType | null,
  }));

  return meetings_info;
};
