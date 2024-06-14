import { ScheduleAuthType, schedulingSettingType } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '../supabase/supabaseAdmin';
export const fetchMeetingsInfo = async (meeting_ids) => {
  const meetings = supabaseWrap(
    await supabaseAdmin
      .from('interview_meeting')
      .select(
        'id,recruiter_user(email,schedule_auth,user_id,scheduling_settings)',
      )
      .in('id', meeting_ids),
  );
  const meetings_info = meetings.map((meeting) => ({
    meeting_id: meeting.id,
    organizer_id: meeting.recruiter_user.user_id,
    meeting_organizer_email: meeting.recruiter_user.email,
    scheduling_settings: meeting.recruiter_user
      .scheduling_settings as schedulingSettingType,
    meeting_organizer_auth: meeting.recruiter_user
      .schedule_auth as ScheduleAuthType | null,
  }));

  return meetings_info;
};
