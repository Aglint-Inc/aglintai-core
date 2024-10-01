/* eslint-disable no-console */
import { CApiError } from '@aglint/shared-utils';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import type { CalEventAttendeesAuthDetails } from '@/utils/event_book/types';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { decrypt } from '../../decryptApiKey';

type BodyParams = {
  user_id: string;
};

const checkCalenderStatus = async (req_body: BodyParams) => {
  const { user_id } = req_body;
  const supabaseAdmin = getSupabaseServer();
  const rec_data = (
    await supabaseAdmin
      .from('recruiter_relation')
      .select(
        'recruiter!inner(integrations!inner(service_json)),recruiter_user!public_recruiter_relation_user_id_fkey!inner(email,schedule_auth)',
      )
      .eq('user_id', user_id)
      .single()
      .throwOnError()
  ).data;
  if (!rec_data) {
    throw new CApiError('SERVER_ERROR', 'No recruiter found');
  }

  const company_cred = rec_data.recruiter.integrations.service_json;
  const schedule_auth = rec_data.recruiter_user
    .schedule_auth as CalEventAttendeesAuthDetails['schedule_auth'];
  const email = rec_data.recruiter_user.email;

  const dec_company_cred = company_cred
    ? JSON.parse(decrypt(company_cred, process.env.ENCRYPTION_KEY))
    : null;
  let authClient;
  if (schedule_auth) {
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_SCHEDULE_CLIENT_ID,
      process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_HOST_NAME}/auth-cal/google`,
    );
    oAuth2Client.setCredentials({
      access_token: schedule_auth.access_token,
      refresh_token: schedule_auth.refresh_token,
    });
    authClient = oAuth2Client;
  } else {
    const jwtClient = new google.auth.JWT({
      email: dec_company_cred.client_email,
      key: dec_company_cred.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar'],
      subject: email,
    });
    await jwtClient.authorize();
    authClient = jwtClient;
  }

  const calendar = google.calendar({ version: 'v3', auth: authClient });

  const acl = (await calendar.acl.list({
    calendarId: 'primary',
  })) as any;

  const hasSufficientPermissions = acl.data.items.some((item: any) =>
    ['owner', 'writer'].includes(item.role),
  );

  if (hasSufficientPermissions) {
    await supabaseAdmin
      .from('recruiter_user')
      .update({ is_calendar_connected: true })
      .eq('user_id', user_id);
  } else {
    await supabaseAdmin
      .from('recruiter_user')
      .update({ is_calendar_connected: false })
      .eq('user_id', user_id);
  }

  return hasSufficientPermissions;
};

export default createPageApiPostRoute(null, checkCalenderStatus);
