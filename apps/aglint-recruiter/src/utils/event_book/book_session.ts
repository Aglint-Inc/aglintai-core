const { v4: uuidv4 } = require('uuid');

import {
  CompServiceKeyCred,
  NewCalenderEvent,
  RecruiterUserType,
  SessionCombinationRespType,
} from '@aglint/shared-types';

import { GoogleCalender } from '../../services/GoogleCalender/google-calender';
import { ZoomMeet } from '../integrations/zoom-meet';
import { getCalEventDescription } from './getCalEventDescription';
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
export type GetAuthParams = {
  company_cred: CompServiceKeyCred;
  recruiter: CalEventAttendeesAuthDetails;
};

export type CalEventAttendeesAuthDetails = Pick<
  RecruiterUserType,
  'user_id' | 'schedule_auth' | 'email'
>;

export type CalEventOrganizerAuthDetails = CalEventAttendeesAuthDetails & {
  timezone: string;
};

export const bookSession = async (
  session: SessionCombinationRespType,
  company_id: string,
  meeting_id: string,
  candidate_name: string,
  job_title: string,
  cal_event_organizer: CalEventOrganizerAuthDetails,
  cal_event_attendees: CalEventAttendeesAuthDetails[],
  company_cred_hash_str: string,
) => {
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
      createRequest: null,
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

export const getUserCalAuth = async ({
  company_cred,
  recruiter,
}: GetAuthParams) => {
  try {
    if (recruiter.schedule_auth) {
      const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_SCHEDULE_CLIENT_ID,
        process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
        `${process.env.NEXT_PUBLIC_HOST_NAME}/auth-cal/google`,
      );
      const schedule_auth = recruiter.schedule_auth as any;
      oAuth2Client.setCredentials({
        access_token: schedule_auth.access_token,
        refresh_token: schedule_auth.refresh_token,
      });
      return oAuth2Client;
    } else {
      const jwtClient = new google.auth.JWT({
        email: company_cred.client_email,
        key: company_cred.private_key,
        scopes: ['https://www.googleapis.com/auth/calendar'],
        subject: recruiter.email,
      });

      await jwtClient.authorize();
      return jwtClient;
    }
  } catch (error) {
    return null;
  }
};

export const getSuperAdminAuth = async (
  company_cred: GetAuthParams['company_cred'],
  admin_email,
) => {
  const jwtClient = new google.auth.JWT({
    email: company_cred.client_email,
    key: company_cred.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
    subject: admin_email,
  });

  await jwtClient.authorize();
  return jwtClient;
};
