import { createClient } from '@supabase/supabase-js';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
// import {
//   AvalabilitySlotType,
//   InterviewerAvailabliity
// } from '@/src/components/Scheduling/Availability/availability.types';
import { refreshAccessToken } from '@/src/pages/api/email-outreach/getNewAcessToken';
import { Database } from '@/src/types/schema';

import { ScheduleAuthType } from './types';
// Import required modules
export const CAL_SYNC_DAYS = 15;

// Set up OAuth2 client

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export const getRecruiterAuthTokens = async (userId: string) => {
  const [user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('schedule_auth')
      .eq('user_id', userId),
  );
  let schedule_auth = user.schedule_auth as ScheduleAuthType;
  if (!schedule_auth) throw new Error('Calender not connected');
  const isDateExpired =
    (user.schedule_auth as ScheduleAuthType).expiry_date - Date.now();
  if (isDateExpired) {
    const newAccessToken = await refreshAccessToken(
      schedule_auth.refresh_token,
      process.env.GOOGLE_SCHEDULE_CLIENT_ID,
      process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
    );
    schedule_auth.access_token = newAccessToken;
    supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .update({ schedule_auth: { ...schedule_auth } })
        .eq('user_id', userId),
    );
  }
  const tokenInfo = {
    expiry_date: schedule_auth.expiry_date,
    email: schedule_auth.email,
    access_token: schedule_auth.access_token,
    refresh_token: schedule_auth.refresh_token,
  };

  return tokenInfo;
};
