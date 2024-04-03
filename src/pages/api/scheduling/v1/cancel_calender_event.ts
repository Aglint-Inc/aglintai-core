import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  getUserCalAuth,
  Interviewer,
} from '@/src/utils/event_book/book_session';
import { decrypt_string } from '@/src/utils/integrations/crypt-funcs';
import { CalendarEvent } from '@/src/utils/schedule-utils/types';

import { supabaseAdmin } from '../../phone-screening/get-application-info';
const { google } = require('googleapis');

type BodyParams = {
  calender_event: CalendarEvent;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { calender_event } = req.body as BodyParams;
  if (!calender_event) return res.status(400).send('missing Fields');
  try {
    const { comp_cred, recruiter } = await getRecruiterCredentials({
      email: calender_event.organizer.email,
    });
    const auth_cal = await getUserCalAuth({
      company_cred: comp_cred,
      recruiter,
    });
    await updateEventStatus(auth_cal, calender_event.id, 'cancelled');
    return res.status(200).send('ok');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;

// Function to create a new event in user's calendar
async function updateEventStatus(auth, event_id, status) {
  const calendar = google.calendar({ version: 'v3', auth: auth });
  const response = await calendar.events.patch({
    calendarId: 'primary', // Change to specific calendar ID if needed
    eventId: event_id,
    requestBody: {
      status: status,
    },
    sendNotifications: true,
  });
  return response.data;
}

const getRecruiterCredentials = async ({ email }) => {
  const [rec_user] = supabaseWrap(
    await supabaseAdmin.from('recruiter_user').select().eq('email', email),
  );
  const user_id = rec_user.user_id;
  const promises = [
    (async () => {
      const [rec] = supabaseWrap(
        await supabaseAdmin
          .from('recruiter_relation')
          .select('recruiter(*)')
          .eq('user_id', user_id),
      );
      if (!rec.recruiter.service_json) return null;
      return JSON.parse(decrypt_string(rec.recruiter.service_json));
    })(),
    (async () => {
      const [rec] = supabaseWrap(
        await supabaseAdmin
          .from('recruiter_user')
          .select('schedule_auth')
          .eq('user_id', user_id),
      );

      return rec.schedule_auth;
    })(),
  ];

  const [comp_cred, user_schedule_auth] = await Promise.all(promises);
  const r: Interviewer = {
    email,
    schedule_auth: user_schedule_auth,
    user_id,
  };
  return { comp_cred, recruiter: r };
};
