import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';
import dayjs from '@/src/utils/dayjs';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

type MeetingStatus = 'accepted' | 'declined' | 'tentative' | 'needsAction';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const resource_id = req.headers['x-goog-resource-id'] as string;
    const channel_id = req.headers['x-goog-channel-id'] as string;
    // const channel_token = req.headers['x-goog-channel-token'];
    // const resourceState = req.headers['x-goog-resource-state'];

    const split = channel_id.split('-');
    const user_id = split.slice(1).join('');

    const google_cal = new GoogleCalender(null, null, user_id);
    await google_cal.authorizeUser();
    const results = await google_cal.fullCalendarSync();
    const meetings = await fetchMeetings(user_id);
    const calendarIds = [...new Set(meetings.map((meet) => meet.cal_event_id))];
    const calendarEvents = results.events.filter((event) =>
      calendarIds.includes(event.id),
    );
    await updateUser({
      resourceId: resource_id,
      syncToken: results.syncToken,
      user_id,
      channelId: channel_id,
    });
    const updateRelations = meetings
      .map((meet) => {
        const event = calendarEvents.find((e) => e.id === meet.cal_event_id);
        const interviewers = meet.meeting_interviewers
          .filter((int) => int.is_confirmed)
          .map((interviewer) => {
            const calendarstatus = event.attendees.find(
              (attendee) => attendee.email === interviewer.email,
            ).responseStatus as MeetingStatus;
            return {
              session_relation_id: interviewer.session_relation_id,
              status: (calendarstatus === 'accepted'
                ? 'accepted'
                : calendarstatus === 'declined'
                  ? 'declined'
                  : 'waiting') as DatabaseTable['interview_session_relation']['accepted_status'],
              email: interviewer.email,
              name: meet.interview_session[0].name,
              start_time: dayjs(meet.start_time).format('MMM DD HH:mm:ss'),
              session_id: meet.interview_session[0].id,
            };
          });
        return interviewers;
      })
      .flatMap((interviewers) => interviewers)
      .filter(
        (interviewer) =>
          interviewer.status === 'declined' ||
          interviewer.status === 'accepted',
      )
      .map((interviewer) => {
        const session_relation: DatabaseTableInsert['interview_session_relation'] =
          {
            id: interviewer.session_relation_id,
            accepted_status: interviewer.status,
            session_id: interviewer.session_id,
          };
        return session_relation;
      });

    await supabaseAdmin
      .from('interview_session_relation')
      .upsert(updateRelations)
      .throwOnError();

    const cancelSessions: DatabaseTableInsert['interview_session_cancel'][] =
      updateRelations
        .filter((interviewer) => interviewer.accepted_status === 'declined')
        .map((interviewer) => ({
          reason: 'Declined in google calendar',
          session_id: interviewer.session_id,
          session_relation_id: interviewer.id,
          type: 'declined',
        }));

    await supabaseAdmin
      .from('interview_session_cancel')
      .upsert(cancelSessions)
      .throwOnError();

    return res.status(200).send(cancelSessions);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export default handler;

const fetchMeetings = async (user_id: string) => {
  return (
    await supabaseAdmin
      .from('interview_meeting')
      .select('*,meeting_interviewers(*),interview_session(*)')
      .eq('status', 'confirmed')
      .eq('organizer_id', user_id)
      .throwOnError()
  ).data;
};

const updateUser = async ({
  user_id,
  syncToken,
  resourceId,
  channelId,
}: {
  user_id: string;
  syncToken: string;
  resourceId: string;
  channelId: string;
}) => {
  await supabaseAdmin
    .from('recruiter_user')
    .update({ calendar_sync: { syncToken, resourceId, channelId } })
    .eq('user_id', user_id);
};
