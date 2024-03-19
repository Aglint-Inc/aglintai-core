import { InterviewModuleDbType } from '@/src/components/JobInterviewPlan/types';
import { refreshAccessToken } from '@/src/pages/api/email-outreach/getNewAcessToken';

import { NewCalenderEvent, ScheduleAuthType } from '../schedule-utils/types';
import { supabaseAdmin } from '../supabase/supabaseAdmin';
const crypto = require('crypto');

const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');

// Set up OAuth2 client
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_SCHEDULE_CLIENT_ID,
  process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
  process.env.GOOGLE_SCHEDULE_REDIRECT_URI,
);

// using oAuth 2.0
export async function fetchCalenderEvents(
  access_token: string,
  refresh_token: string,
  startDate: string,
  endDate: string,
) {
  oAuth2Client.setCredentials({
    access_token: access_token,
    refresh_token: refresh_token,
  });
  const events = await listEvents(oAuth2Client, startDate, endDate);

  return events;
}
async function listEvents(
  authClient,
  startDate: string,
  endDate: string,
): Promise<NewCalenderEvent[]> {
  const calendar = google.calendar({ version: 'v3', auth: authClient });
  const events = await calendar.events.list({
    calendarId: 'primary',
    timeMin: startDate,
    timeMax: endDate,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return events.data.items;
}

// using Service key

export const fetchCalenderEventsCompanyCred = async (
  company_cred,
  emp_email: string,
  startDate: string,
  endDate: string,
) => {
  const jwtClient = new google.auth.JWT({
    email: company_cred.client_email,
    key: company_cred.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
    subject: emp_email,
  });

  await jwtClient.authorize();
  const calendar = google.calendar({ version: 'v3', auth: jwtClient });
  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: startDate,
    timeMax: endDate,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.data.items as NewCalenderEvent[];

  return events;
};

export const refreshTokenIfNeeded = async (
  schedule_auth: ScheduleAuthType,
  interviewer_id: string,
) => {
  const isDateExpired = schedule_auth.expiry_date - Date.now();
  if (isDateExpired) {
    const newAccessToken = await refreshAccessToken(
      schedule_auth.refresh_token,
      process.env.GOOGLE_SCHEDULE_CLIENT_ID,
      process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
    );
    schedule_auth.access_token = newAccessToken;
    supabaseAdmin
      .from('recruiter_user')
      .update({ schedule_auth: { ...schedule_auth } })
      .eq('user_id', interviewer_id);
  }
  const tokenInfo = {
    expiry_date: schedule_auth.expiry_date,
    email: schedule_auth.email,
    access_token: schedule_auth.access_token,
    refresh_token: schedule_auth.refresh_token,
  };

  return tokenInfo;
};

// utils

export function decrypt(encryptedData, encryptionKey) {
  const decipher = crypto.createDecipher('aes256', encryptionKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}

export const getSelectedInterviewers = (
  interview_plan: InterviewModuleDbType[],
) => {
  let inters = new Set();
  for (let inter_module of interview_plan) {
    for (let inter of inter_module.selectedIntervs) {
      inters.add(inter.interv_id);
    }
  }
  return Array.from(inters) as string[];
};
