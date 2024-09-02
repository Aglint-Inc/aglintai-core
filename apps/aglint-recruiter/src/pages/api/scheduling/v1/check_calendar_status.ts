/* eslint-disable no-console */
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type CalEventAttendeesAuthDetails } from '@/src/utils/event_book/book_session';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { decrypt } from '../../decryptApiKey';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { user_id } = req.body;

  if (!user_id) {
    console.log('missing fields');
    return res.status(400).send('missing fields');
  }

  try {
    const { data } = await supabaseAdmin
      .from('recruiter_relation')
      .select(
        'recruiter(integrations(service_json)),recruiter_user!public_recruiter_relation_user_id_fkey(email,schedule_auth)',
      )
      .eq('user_id', user_id)
      .single()
      .throwOnError();

    const company_cred = data.recruiter.integrations.service_json;
    const schedule_auth = data.recruiter_user
      .schedule_auth as CalEventAttendeesAuthDetails['schedule_auth'];
    const email = data.recruiter_user.email;

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

    const acl = await calendar.acl.list({
      calendarId: 'primary',
    });

    const hasSufficientPermissions = acl.data.items.some((item) =>
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

    return res.status(200).json({ hasSufficientPermissions });
  } catch (error) {
    console.log(error?.message ? error.message : String(error));
    return res.status(500).send(String(error));
  }
};

export default handler;
