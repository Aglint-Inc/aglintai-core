import dayjs from '@/src/utils/dayjs';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

const sleepStart = 22;
const sleepEnd = 6;

const timeToPx = (hours, minutes) => {
  return hours * 60 * 0.133 + minutes * 0.133;
};

export function EventFilling(events: Event[], tzCode: string, index: number) {
  const res = events.filter((event) => {
    const startTime = dayjs(event.start.dateTime);
    const endTime = dayjs(event.end.dateTime);
    return startTime.hour() >= sleepEnd;
  });

  const date = dayjs().add(index, 'day');
  const tz = tzCode;
  const gm = dayjsLocal().add(index, 'day').tz(tzCode).toISOString().split('+');
  const utc = gm?.length > 0 ? gm[1] : '';

  // const date = dayjs(events[0]?.start.dateTime).format('YYYY-MM-DD');
  // const tz = events[0]?.start.timeZone;
  // const gm = events[0]?.start.dateTime.split('+');
  // const utc = gm?.length > 0 ? gm[1] : '';

  // startTime.hour() >= sleepEnd &&
  // startTime.hour() <= sleepStart &&
  // startTime.isBefore(dayjs().hour(sleepStart).minute(0)) &&
  // endTime.isBefore(dayjs().hour(sleepStart).minute(0))

  res.unshift({
    start: {
      dateTime: date.hour(0).minute(0).toISOString(),
      // dateTime: `${date}T00:00:00+${utc}`,
      timeZone: tz,
      startPx: timeToPx(
        date.hour(0).minute(0).format('H'),
        date.hour(0).minute(0).format('m'),
      ),
    },

    end: {
      dateTime: date.hour(sleepEnd).minute(0).toISOString(),
      // dateTime: `${date}T${sleepEnd < 10 ? '0' + sleepEnd : sleepEnd}:00:00+${utc}`,
      timeZone: tz,
      endPx: timeToPx(
        date.hour(sleepEnd).minute(0).format('H'),
        date.hour(sleepEnd).minute(0).format('m'),
      ),
    },
    type: 'morning_sleep',
  });

  res.push({
    start: {
      dateTime: date.hour(sleepStart).minute(0).toISOString(),
      // dateTime: `${date}T${sleepStart}:00:00+${utc}`,
      timeZone: tz,
      startPx: timeToPx(
        date.hour(sleepStart).minute(0).format('H'),
        date.hour(sleepStart).minute(0).format('m'),
      ),
    },

    end: {
      // dateTime: `${date}T24:00:00+${utc}`,
      dateTime: date.hour(24).minute(0).toISOString(),
      timeZone: tz,
      endPx: timeToPx(
        date.hour(24).minute(0).format('H'),
        date.hour(24).minute(0).format('m'),
      ),
    },
    type: 'night_sleep',
  });

  // console.log('res : ', res);

  return fillingGap(res);
}

const fillingGap = (events: Event[]) => {
  // Sort events by start time
  const sortedEvents = events.sort((a, b) =>
    dayjs(a.start.dateTime).isBefore(dayjs(b.start.dateTime)) ? -1 : 1,
  );

  // Container for the new events including empty events
  const newEvents: Event[] = [];

  sortedEvents.forEach((event, index) => {
    // Add the original event
    newEvents.push(event);

    // Check if there's a next event
    if (index < sortedEvents.length - 1) {
      const currentEnd = dayjs(event.end.dateTime);
      const nextStart = dayjs(sortedEvents[index + 1].start.dateTime);

      // Create an empty event immediately after the current event and before the next event
      const emptyEvent = {
        start: {
          dateTime: currentEnd.format(),
          timeZone: event.start.timeZone,
          startPx: timeToPx(+currentEnd.format('H'), +currentEnd.format('m')),
        },
        end: {
          dateTime: nextStart.format(),
          timeZone: event.start.timeZone,
          endPx: timeToPx(+nextStart.format('H'), +nextStart.format('m')),
        },
        type: 'empty_event',
      };

      // Add the empty event
      newEvents.push(emptyEvent);
    }
  });

  return newEvents;
};

export const groupByDate = (events, dayCount) => {
  // Step 1: Create a range of dates from today to three days in the future
  const today = dayjsLocal().startOf('day');
  const dateRange = Array.from({ length: dayCount }, (_, i) =>
    today.add(i, 'day').format('YYYY-MM-DD'),
  );

  // Step 2: Group the events by date
  const groupedEvents = events.reduce((acc, event) => {
    const eventDate = dayjsLocal(event.start.dateTime).format('YYYY-MM-DD');

    if (!acc[eventDate]) {
      acc[eventDate] = [];
    }

    acc[eventDate].push(event);

    return acc;
  }, {});

  // Step 3: Ensure all dates in the range are present, even if they have no events
  return Object.values(
    dateRange.reduce((acc, date) => {
      acc[date] = groupedEvents[date] || [];
      return acc;
    }, {}),
  );
};

export interface Event {
  start: {
    dateTime: string;
    timeZone: string;
    startPx: string | number;
  };
  end: {
    dateTime: string;
    timeZone: string;
    endPx: string | number;
  };
  type: string;
}
