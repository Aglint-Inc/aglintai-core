import { CalendarEvent } from '@aglint/shared-types';
import dayjs from 'dayjs';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const update_meetings_info = async ({
  meeting_events,
  meetings_info,
}: {
  meeting_events: {
    session_id: string;
    cal_event: CalendarEvent;
  }[];
  meetings_info: { id: string; session_id }[];
}) => {
  const updateMeetingInfo = async ({
    cal_event,
    session_id,
  }: {
    session_id: string;
    cal_event: CalendarEvent;
  }) => {
    let meeting_link = '';
    if (cal_event.conferenceData.conferenceSolution.name === 'zoom') {
      meeting_link = cal_event.conferenceData.entryPoints[0].uri;
    } else {
      meeting_link = cal_event.hangoutLink;
    }
    const meeting = meetings_info.find((m) => m.session_id === session_id);
    return supabaseWrap(
      await supabaseAdmin
        .from('interview_meeting')
        .update({
          end_time: cal_event.end.dateTime,
          start_time: cal_event.start.dateTime,
          meeting_json: cal_event,
          cal_event_id: cal_event.id,
          meeting_link: meeting_link,
          status: 'confirmed',
          confirmed_date: dayjs().toISOString(),
        })
        .eq('id', meeting.id)
        .select(),
    );
  };

  const meetdb_promises = meeting_events.map(
    async (m) =>
      await updateMeetingInfo({
        session_id: m.session_id,
        cal_event: m.cal_event,
      }),
  );
  return await Promise.all(meetdb_promises);
};
