/* eslint-disable no-console */
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
import { type APIEventAttendeeStatus } from '@aglint/shared-types';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { GoogleCalender } from '@/services/GoogleCalender/google-calender';

const eventAttendeeStatus = async (req_body: APIEventAttendeeStatus) => {
  const { event_id, attendee_interv_id } = req_body;

  const google_cal = new GoogleCalender(null, null, attendee_interv_id);
  await google_cal.authorizeUser();
  const event = await google_cal.getCalenderEventById(event_id);
  return { event_attendees_status: event.attendees };
};

export default createPageApiPostRoute(null, eventAttendeeStatus);
