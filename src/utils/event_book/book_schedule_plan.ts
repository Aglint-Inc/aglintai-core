import { InterviewPlanScheduleDbType } from '@/src/components/JobInterviewPlan/types';
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
const { v4: uuidv4 } = require('uuid');

import { RecruiterUserType } from '@/src/types/data.types';

import { NewCalenderEvent } from '../schedule-utils/types';
import { CompServiceKeyCred } from '../scheduling_v2/types';
import { decrypt } from '../scheduling_v2/utils';
import { supabaseAdmin } from '../supabase/supabaseAdmin';
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

export type GetAuthParams = {
  company_cred: CompServiceKeyCred;
  recruiter: Interviewer;
};
export const getAllIntsFromPlan = async (
  plan: InterviewPlanScheduleDbType['plans'],
) => {
  let intSet = new Set();

  for (const module_slot of plan) {
    module_slot.selectedIntervs.forEach((int) => {
      intSet.add(int.interv_id);
    });
    module_slot.shadowIntervs.forEach((int) => {
      intSet.add(int.interv_id);
    });
    module_slot.revShadowIntervs.forEach((int) => {
      intSet.add(int.interv_id);
    });
  }

  const [company] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_relation')
      .select('recruiter(service_json)')
      .eq('user_id', Array.from(intSet)[0]),
  );

  const recs = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('user_id, schedule_auth, email')
      .in('user_id', Array.from(intSet)),
  );

  let company_cred = null;
  if (company.recruiter.service_json) {
    company_cred = JSON.parse(
      decrypt(company.recruiter.service_json, process.env.ENCRYPTION_KEY),
    );
  }

  return {
    company_cred: company_cred,
    recruiters_info: recs,
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
        process.env.GOOGLE_SCHEDULE_REDIRECT_URI,
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
  company_cred,
  module_id,
}: {
  schedule_name: string;
  start_time: string;
  end_time: string;
  interviewers: Interviewer[];
  candidate_email: string;
  organizer: Organizer;
  company_cred: CompServiceKeyCred;
  module_id: string;
}) => {
  const calendar_event: NewCalenderEvent = {
    summary: schedule_name,
    start: {
      dateTime: start_time,
    },
    end: {
      dateTime: end_time,
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
      createRequest: {
        requestId: uuidv4(),
      },
    },
  };
  calendar_event.attendees.push({
    email: candidate_email,
  });
  const auth = await getUserCalAuth({ company_cred, recruiter: organizer });
  if (!auth) {
    throw new Error('invalid organized cred');
  }
  const event = await createEvent(auth, calendar_event);
  const attendees_promises = interviewers.map(async (int) => {
    const auth = await getUserCalAuth({ company_cred, recruiter: int });

    if (!auth) {
      return null;
    }
    const email = (int.schedule_auth as any)?.email ?? int.email;
    await importEventToAttendee(event, email, auth);
    return;
  });
  await Promise.all(attendees_promises);

  return { module_id, event };
};

export async function createEvent(auth, event) {
  const calendar = google.calendar({ version: 'v3', auth: auth });

  const response = await calendar.events.insert({
    calendarId: 'primary', // 'primary' refers to the user's primary calendar
    resource: event,
    conferenceDataVersion: 1,
    sendNotifications: true,
  });

  return response.data;
}

export async function importEventToAttendee(event, attendeeEmail, auth) {
  const calendar = google.calendar({ version: 'v3', auth: auth });
  const response = await calendar.events.import({
    calendarId: attendeeEmail, // Use the attendee's email as the calendar ID
    resource: event,
    sendNotifications: true,
  });
  return response.data;
}
