import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { CalendarEventWithType } from '../types';

export const timeToPx = (hours, minutes) => {
  return hours * 60 * 0.133 + minutes * 0.133;
};

export const groupByDate = ({
  events,
  dayCount,
}: {
  events: CalendarEventWithType;
  dayCount: number;
}) => {
  // Step 1: Create a range of dates from today to three days in the future
  const today = dayjsLocal().startOf('day');
  const dateRange = Array.from({ length: dayCount }, (_, i) =>
    today.add(i, 'day').format('YYYY-MM-DD'),
  );

  // Step 2: Group the events by date
  const groupedEvents = events.reduce((acc, event) => {
    const eventDate = dayjsLocal(event.start.dateTime).format('YYYY-MM-DD');

    // eslint-disable-next-line security/detect-object-injection
    if (!acc[eventDate]) {
      // eslint-disable-next-line security/detect-object-injection
      acc[eventDate] = [];
    }

    // eslint-disable-next-line security/detect-object-injection
    acc[eventDate].push(event);

    return acc;
  }, {});

  // Step 3: Ensure all dates in the range are present, even if they have no events
  return Object.values(
    dateRange.reduce((acc, date) => {
      // eslint-disable-next-line security/detect-object-injection
      acc[date] = groupedEvents[date] || [];
      return acc;
    }, {}),
  ) as CalendarEventWithType[];
};

export const getLocalSortedInterviewerIds = () => {
  const res = localStorage.getItem('availabilityInterviewerSortList');
  const ids = JSON.parse(res);
  return (ids?.length ? ids : []) as string[];
};

export const setLocalSortedInterviewerIds = (ids: string[]) => {
  localStorage.setItem('availabilityInterviewerSortList', JSON.stringify(ids));
};
