import { InterviewPlanScheduleDbType } from '@/src/components/JobInterviewPlan/types';
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
const { v4: uuidv4 } = require('uuid');

import { RecruiterUserType } from '@/src/types/data.types';

import { CalenderEvent } from '../schedule-utils/types';
import { CompServiceKeyCred } from '../scheduling_v2/types';
import { decrypt } from '../scheduling_v2/utils';
import { supabaseAdmin } from '../supabase/supabaseAdmin';
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

export const getAllIntsFromPlan = async (
  plan: InterviewPlanScheduleDbType['plan']
) => {
  let intSet = new Set();

  for (const module_slot of plan) {
    module_slot.attended_inters.forEach((int) => {
      intSet.add(int.id);
    });
  }

  const [company] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_relation')
      .select('recruiter(service_json)')
      .eq('user_id', Array.from(intSet)[0])
  ) as { recruiter: { service_json: string } }[];

  const recs = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('user_id, schedule_auth, email')
      .in('user_id', Array.from(intSet))
  ) as Pick<RecruiterUserType, 'user_id' | 'schedule_auth' | 'email'>[];

  return {
    company_cred: decrypt(
      company.recruiter.service_json,
      process.env.ENCRYPTION_KEY
    ),
    recruiters_info: recs
  };
};

export const getUserCalAuth = async ({
  company_cred,
  recruiter
}: {
  company_cred: CompServiceKeyCred;
  recruiter: Interviewer;
}) => {
  if (recruiter.schedule_auth) {
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_SCHEDULE_CLIENT_ID,
      process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
      process.env.GOOGLE_SCHEDULE_REDIRECT_URI
    );
    const schedule_auth = recruiter.schedule_auth as any;
    oAuth2Client.setCredentials({
      access_token: schedule_auth.access_token,
      refresh_token: schedule_auth.refresh_token
    });
    return oAuth2Client;
  } else {
    const jwtClient = new google.auth.JWT({
      email: company_cred.client_email,
      key: company_cred.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar'],
      subject: recruiter.email
    });

    const auth = await jwtClient.authorize();
    return auth;
  }
};

export type Interviewer = Pick<
  RecruiterUserType,
  'user_id' | 'schedule_auth' | 'email'
>;

export type Organizer = Pick<
  RecruiterUserType,
  'user_id' | 'schedule_auth' | 'email'
>;

export const bookIndividualModule = async ({
  candidate_email,
  end_time,
  interviewers,
  organizer,
  schedule_name,
  start_time,
  company_cred
}: {
  schedule_name: string;
  start_time: string;
  end_time: string;
  interviewers: Interviewer[];
  candidate_email: string;
  organizer: Organizer;
  company_cred: CompServiceKeyCred;
}) => {
  const calendar_event: CalenderEvent = {
    summary: schedule_name,
    start: {
      dateTime: start_time
    },
    end: {
      dateTime: end_time
    },
    attendees: interviewers.map((int) => ({
      email: (int.schedule_auth as any)?.email ?? int.email
    })),
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 }
      ]
    },
    conferenceData: {
      createRequest: {
        requestId: uuidv4()
      }
    }
  };
  calendar_event.attendees.push({
    email: candidate_email
  });

  const auth = await getUserCalAuth({ company_cred, recruiter: organizer });

  const event = await createEvent(auth, calendar_event);

  const attendees_promises = interviewers.map(async (int) => {
    const auth = await getUserCalAuth({ company_cred, recruiter: int });
    const email = (int.schedule_auth as any)?.email ?? int.email;
    return await importEventToAttendee(event, email, auth);
  });
  await Promise.all(attendees_promises);
  return event;
};

export async function createEvent(auth, event) {
  const calendar = google.calendar({ version: 'v3', auth: auth });

  const response = await calendar.events.insert({
    calendarId: 'primary', // 'primary' refers to the user's primary calendar
    resource: event,
    conferenceDataVersion: 1,
    sendNotifications: true
  });

  return response.data;
}

export async function importEventToAttendee(event, attendeeEmail, auth) {
  const calendar = google.calendar({ version: 'v3', auth: auth });
  const response = await calendar.events.import({
    calendarId: attendeeEmail, // Use the attendee's email as the calendar ID
    resource: event,
    sendNotifications: true
  });
  return response.data;
}
