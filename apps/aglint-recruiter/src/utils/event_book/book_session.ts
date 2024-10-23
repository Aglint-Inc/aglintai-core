import {
  type NewCalenderEvent,
  type SessionCombinationRespType,
} from '@aglint/shared-types';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line import/no-cycle
import { GoogleCalender } from '../../services/GoogleCalender/google-calender';
import { ZoomMeet } from '../integrations/zoom-meet';
import { getCalEventDescription } from './getCalEventDescription';
import type {
  CalEventAttendeesAuthDetails,
  CalEventOrganizerAuthDetails,
} from './types';

export const bookSession = async ({
  cal_event_attendees,
  cal_event_organizer,
  candidate_name,
  company_cred_hash_str,
  company_id,
  job_title,
  meeting_id,
  session,
}: {
  session: Pick<
    SessionCombinationRespType,
    | 'module_name'
    | 'start_time'
    | 'end_time'
    | 'break_duration'
    | 'schedule_type'
    | 'session_name'
    | 'session_type'
    | 'session_id'
    | 'meeting_id'
    | 'duration'
  >;
  company_id: string;
  meeting_id: string;
  candidate_name: string;
  job_title: string;
  cal_event_organizer: CalEventOrganizerAuthDetails;
  cal_event_attendees: CalEventAttendeesAuthDetails[];
  company_cred_hash_str: string | null;
}) => {
  const event_name = `${session.module_name} : ${candidate_name} for ${job_title}`;
  const event_description = getCalEventDescription(meeting_id);
  const calendar_event: NewCalenderEvent = {
    summary: event_name,
    start: {
      dateTime: session.start_time,
      timeZone: cal_event_organizer.timezone,
    },
    end: {
      dateTime: session.end_time,
      timeZone: cal_event_organizer.timezone,
    },
    attendees: cal_event_attendees.map((int) => ({
      email: (int.schedule_auth as any)?.email ?? int.email,
    })),
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
    conferenceData: {
      createRequest: undefined,
    },
    description: event_description,
  };
  if (session.schedule_type === 'google_meet') {
    calendar_event.conferenceData.createRequest = {
      requestId: uuidv4(),
    };
  } else if (session.schedule_type === 'zoom') {
    try {
      const zoom_meet = new ZoomMeet(company_id);
      await zoom_meet.authorizeUser();
      const schd_meet = await zoom_meet.createMeeting({
        topic: event_name,
        agenda: event_name,
        default_password: false,
        duration: session.duration,
        start_time: session.start_time,
        timezone: cal_event_organizer.timezone,
        type: 2,
        settings: {
          host_video: false,
          join_before_host: true,
          participant_video: false,
        },
      });
      calendar_event.conferenceData.conferenceSolution = {
        key: {
          type: 'addOn',
        },
        name: 'zoom',
      };
      calendar_event.conferenceData.entryPoints = [
        {
          entryPointType: 'video',
          uri: schd_meet.join_url,
          passcode: schd_meet.password,
          label: schd_meet.topic,
        },
      ];
    } catch (err) {
      console.error(err);
      calendar_event.conferenceData.createRequest = {
        requestId: uuidv4(),
      };
    }
  }
  const google_cal = new GoogleCalender(
    company_cred_hash_str,
    cal_event_organizer,
  );
  await google_cal.authorizeUser();
  const cal_event = await google_cal.createCalenderEvent(calendar_event);
  const attendees_promises = cal_event_attendees.map(async (int) => {
    try {
      const email = (int.schedule_auth as any)?.email ?? int.email;
      const int_cal = new GoogleCalender(company_cred_hash_str, int);
      await int_cal.authorizeUser();
      await int_cal.importEvent(cal_event, email);
    } catch (err) {
      console.error(err);
      //ignore if importing the event is failed
    }
  });
  await Promise.all(attendees_promises);
  return {
    session_id: session.session_id,
    cal_event,
    meeting_id: session.meeting_id,
  };
};
