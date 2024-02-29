import { NextApiRequest, NextApiResponse } from 'next';

import { getRecruiterAuthTokens } from '@/src/utils/schedule-utils/utils';
const { google } = require('googleapis');

type BodyParams = {
  event_id: string;
  organizer_id: string;
  status: string;
};

const { OAuth2Client } = require('google-auth-library');

// Set up OAuth2 client
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_SCHEDULE_CLIENT_ID,
  process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
  process.env.GOOGLE_SCHEDULE_REDIRECT_URI,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { organizer_id, event_id } = req.body as BodyParams;
  if (!organizer_id || !event_id) return res.status(400).send('missing Fields');
  try {
    const authTokens = await getRecruiterAuthTokens(organizer_id);
    oAuth2Client.setCredentials({
      access_token: authTokens.access_token,
      refresh_token: authTokens.refresh_token,
    });
    const event = await getEvent(oAuth2Client, event_id);
    if (!event) {
      return res.status(404).send('event does not exist');
    }
    return res.status(200).send(event.attendees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;

// Function to create a new event in user's calendar
async function getEvent(auth, event_id) {
  const calendar = google.calendar({ version: 'v3', auth: auth });

  const response = await calendar.events.get({
    calendarId: 'primary', // Change to specific calendar ID if needed
    eventId: event_id,
  });
  return response.data;
}
