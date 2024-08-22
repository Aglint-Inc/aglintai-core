import dayjs from '@/src/utils/dayjs';
import { Event, GroupedEvents } from './types';

export const getDatesArray = (count: number, format: string) => {
  const dates = [];

  for (let i = 0; i < 5; i++) {
    dates.push(
      dayjs()
        .add(count + i, 'day')
        .format(format),
    );
  }

  return dates;
};

export function groupByDateAndHour(events) {
  // Step 1: Sort events by type
  if (!events || events.length === 0) {
    // Return an empty result for 5 days with empty events if no events are provided
    return Array.from({ length: 5 }, (_, i) => ({
      date: dayjs().add(i, 'day').format('YYYY-MM-DD'),
      events: Array.from({ length: 8 }, () => ({
        id: null,
        start: null,
        end: null,
        type: 'empty_event',
      })),
    }));
  }

  const sortedEvents = [...events].sort((a, b) => a.type.localeCompare(b.type));

  // Step 2: Find the range of dates (5 days starting from the earliest event date)
  const firstDate = dayjs(sortedEvents[0].start).startOf('day');
  const daysRange = Array.from({ length: 5 }, (_, i) =>
    firstDate.add(i, 'day').format('YYYY-MM-DD'),
  );

  // Step 3: Create a map to group events by date
  const eventsByDate = new Map();
  sortedEvents.forEach((event) => {
    const dateKey = dayjs(event.start).format('YYYY-MM-DD');
    if (!eventsByDate.has(dateKey)) {
      eventsByDate.set(dateKey, []);
    }
    eventsByDate.get(dateKey).push(event);
  });

  // Step 4: Ensure each day has exactly 8 events, filling in empty events as needed
  const finalEvents = daysRange.map((date) => {
    const dateEvents = eventsByDate.get(date) || [];
    const emptyEventsCount = 8 - dateEvents.length;

    // Fill with empty events if needed
    const filledEvents = [
      ...dateEvents,
      ...Array.from({ length: emptyEventsCount }, () => ({
        id: null,
        start: null,
        end: null,
        type: 'empty_event',
      })),
    ] as Event[];

    const order = {
      soft: 6,
      ooo: 2,
      recruiting_blocks: 3,
      free_time: 4,
      cal_event: 5,
      empty_event: 1,
    };

    filledEvents.sort((x, y) => order[x.type] - order[y.type]);

    return { date, events: filledEvents.slice(0, 8) };
  });

  return finalEvents as GroupedEvents[];
}

export const getColor = (value: Event['type']) => {
  const color =
    value === 'empty_event'
      ? 'var(--success-8)'
      : value === 'soft'
        ? 'var(--warning-8)'
        : value === 'ooo'
          ? 'var(--info-8)'
          : value === 'free_time'
            ? 'var(--success-8)'
            : value === 'recruiting_blocks'
              ? 'var(--error-8)'
              : value === 'cal_event' && 'var(--error-9)';
  return {
    style: {
      background: color,
    },
  };
};
