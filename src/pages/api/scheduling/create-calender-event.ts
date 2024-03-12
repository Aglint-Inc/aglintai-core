import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
const { v4: uuidv4 } = require('uuid');

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { Database } from '@/src/types/schema';
import {
  createEvent,
  importEventToAttendee
} from '@/src/utils/event_book/book_schedule_plan';
import { NewCalenderEvent } from '@/src/utils/schedule-utils/types';
import { getRecruiterAuthTokens } from '@/src/utils/schedule-utils/utils';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

type BodyParams = {
  organizer_id: string;
  interviewers_id: string[];
  candidate_email: string;
  schedule_name: string;
  start_time: string;
  end_time: string;
};

const { OAuth2Client } = require('google-auth-library');

// Set up OAuth2 client
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_SCHEDULE_CLIENT_ID,
  process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
  process.env.GOOGLE_SCHEDULE_REDIRECT_URI
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    organizer_id,
    interviewers_id,
    schedule_name,
    candidate_email,
    end_time,
    start_time
  } = req.body as BodyParams;
  if (
    !organizer_id ||
    !interviewers_id ||
    !schedule_name ||
    !end_time ||
    !start_time ||
    !candidate_email
  )
    return res.status(400).send('missing Fields');
  try {
    const interviewers_promises = interviewers_id.map(async (int_id) => {
      const [rec] = supabaseWrap(
        await supabaseAdmin
          .from('recruiter_user')
          .select('schedule_auth')
          .eq('user_id', int_id)
      );
      return rec.schedule_auth.email;
    });
    const interviewers_email = await Promise.all(interviewers_promises);
    const calendar_event: NewCalenderEvent = {
      summary: schedule_name,
      start: {
        dateTime: start_time
      },
      end: {
        dateTime: end_time
      },
      attendees: interviewers_email.map((email) => ({ email })),
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
    const authTokens = await getRecruiterAuthTokens(organizer_id);
    oAuth2Client.setCredentials({
      access_token: authTokens.access_token,
      refresh_token: authTokens.refresh_token
    });
    const event = await createEvent(oAuth2Client, calendar_event);
    const attendees_promises = interviewers_id.map(async (int_id: string) => {
      const tokenInfo = await getRecruiterAuthTokens(int_id);
      oAuth2Client.setCredentials({
        access_token: tokenInfo.access_token,
        refresh_token: tokenInfo.refresh_token
      });
      return await importEventToAttendee(event, tokenInfo.email, oAuth2Client);
    });
    await Promise.all(attendees_promises);
    return res.status(200).send(event);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;

// Function to create a new event in user's calendar

// const seedEvent = {
//   summary: 'interview-event',
//   location: 'goog meet linnk',
//   start: {
//     dateTime: '2024-03-14T18:30:00.000Z',
//   },
//   end: {
//     dateTime: '2024-03-14T19:30:00.000Z',
//   },
//   attendees: [{ email: 'chinmai@aglinthq.com' }],
//   reminders: {
//     useDefault: false,
//     overrides: [
//       { method: 'email', minutes: 24 * 60 },
//       { method: 'popup', minutes: 10 },
//     ],
//   },
//   conferenceData: {
//     createRequest: { requestId: uuidv4() },
//   },
// };
