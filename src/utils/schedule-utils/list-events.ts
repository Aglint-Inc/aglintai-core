import { EventType } from './types';
const { google } = require('googleapis');

export async function listEvents(
  authClient,
  startDate: Date,
  endDate: Date,
): Promise<EventType[]> {
  const calendar = google.calendar({ version: 'v3', auth: authClient });
  const events = await calendar.events.list({
    calendarId: 'primary',
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  //   console.log(events.data.items[0]);
  return events.data.items
    .map((e) => {
      let { start, end } = e;
      let isoStart = new Date(start.dateTime);
      let isoEnd = new Date(end.dateTime);

      return { start: isoStart, end: isoEnd };
    })
    .sort((e1, e2) => e1.start.getTime() - e2.start.getTime());
}
