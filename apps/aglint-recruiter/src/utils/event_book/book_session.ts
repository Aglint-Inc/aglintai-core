const { v4: uuidv4 } = require('uuid');

import {
  CompServiceKeyCred,
  InterviewSession,
  NewCalenderEvent,
  RecruiterUserType,
} from '@aglint/shared-types';

import { GoogleCalender } from '../../services/GoogleCalender/google-calender';
import { ZoomMeet } from '../integrations/zoom-meet';
import { getOutboundEmail } from '../scheduling_v2/get-outbound-email';
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

export type GetAuthParams = {
  company_cred: CompServiceKeyCred;
  recruiter: Interviewer;
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

export type Interviewer = Pick<
  RecruiterUserType,
  'user_id' | 'schedule_auth' | 'email'
>;

export type Organizer = Pick<
  RecruiterUserType,
  'user_id' | 'schedule_auth' | 'email'
> & { timezone: string };

export const bookSession = async ({
  candidate_email,
  end_time,
  interviewers,
  organizer,
  schedule_name,
  start_time,
  company_cred,
  session_id,
  meet_type,
  company_id,
  duration,
  description,
}: {
  schedule_name: string;
  start_time: string;
  end_time: string;
  interviewers: Interviewer[];
  candidate_email: string | null;
  organizer: Organizer;
  company_cred: CompServiceKeyCred;
  session_id: string;
  meet_type: InterviewSession['schedule_type'];
  company_id: string;
  duration: number;
  description: string;
}) => {
  const calendar_event: NewCalenderEvent = {
    summary: schedule_name,
    start: {
      dateTime: start_time,
      timeZone: organizer.timezone,
    },
    end: {
      dateTime: end_time,
      timeZone: organizer.timezone,
    },
    attendees: interviewers.map((int) => ({
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
    description: description,
  };
  if (meet_type === 'google_meet') {
    calendar_event.conferenceData.createRequest = {
      requestId: uuidv4(),
    };
  } else if (meet_type === 'zoom') {
    try {
      const zoom_meet = new ZoomMeet(company_id);
      await zoom_meet.authorizeUser();
      const schd_meet = await zoom_meet.createMeeting({
        topic: schedule_name,
        agenda: schedule_name,
        default_password: false,
        duration: duration,
        start_time: start_time,
        timezone: organizer.timezone ?? 'Asia/columbo',
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

  if (candidate_email) {
    calendar_event.attendees.push({
      email: (await getOutboundEmail(candidate_email)) as string,
    });
  }

  const google_cal = new GoogleCalender({
    recruiter: organizer,
    company_cred,
  });
  await google_cal.authorizeUser();
  const cal_event = await google_cal.createCalenderEvent(calendar_event);
  const attendees_promises = interviewers.map(async (int) => {
    try {
      const email = (int.schedule_auth as any)?.email ?? int.email;
      const int_cal = new GoogleCalender({
        company_cred,
        recruiter: int,
      });
      await int_cal.authorizeUser();
      await int_cal.importEvent(cal_event, email);
    } catch (err) {
      //ignore if importing the event is failed
    }
  });
  await Promise.all(attendees_promises);
  return { session_id, cal_event };
};
