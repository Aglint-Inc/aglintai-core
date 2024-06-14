import { CalendarEvent } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { uniqueId } from 'lodash';

export const createICSAttachment = (
  event: CalendarEvent,
  cal_event_name: string,
  cand_event_desc: string,
  meeting_link: string,
  session_name: string,
  cand_time_zone: string,
) => {
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aglint Ai.//CalDAV Client//EN
BEGIN:VEVENT
UID:${uniqueId()}
DTSTART;TZID=${cand_time_zone}:${dayjsLocal(event.start.dateTime).format('YYYYMMDDTHHmmss')}
DTEND;TZID=${cand_time_zone}:${dayjsLocal(event.end.dateTime).format('YYYYMMDDTHHmmss')}
DTEND:${dayjsLocal(event.end.dateTime).tz(cand_time_zone).format('YYYYMMDDTHHmmss')}
SUMMARY:${cal_event_name}
DESCRIPTION:${cand_event_desc}
LOCATION:${meeting_link}
END:VEVENT
END:VCALENDAR
`;
  return {
    content: Buffer.from(icsContent).toString('base64'),
    filename: `${session_name.split(' ').join('_')}.ics`,
    type: 'text/calendar',
    disposition: 'attachment',
  };
};
