/* eslint-disable no-console */
import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { type APIEventAttendeeStatus } from '@aglint/shared-types';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { event_id, attendee_interv_id } = req.body as APIEventAttendeeStatus;
  if (!event_id || !attendee_interv_id)
    return res.status(400).send('missing fields');

  try {
    const google_cal = new GoogleCalender(null, null, attendee_interv_id);
    await google_cal.authorizeUser();
    const event = await google_cal.getCalenderEventById(event_id);
    console.log(event);
    return res.status(200).json({ event_attendees_status: event.attendees });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
