import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { initUser } from '@/src/pages/api/interviewers';

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

export const color = {
  soft_conflict: 'var(--warning-7)',
  out_standnig: 'var(--info-7)',
  calendar_event: 'var(--error-9)',
  recruiting_block: 'var(--error-7)',
  free_time: 'var(--success-7)',

  working_hour: 'var(--success-6)',
  company_off: 'var(--neutral-5)',
  break_time: 'var(--neutral-4)',

  early_morning: '#efefa8',
  after_work: '#dfcddf',
};

export const sortedData = (data: initUser[]) => {
  const checkedInterviewers = getLocalSortedInterviewerIds();

  return data.sort((a, b) => {
    const indexA = checkedInterviewers.indexOf(a.user_id);
    const indexB = checkedInterviewers.indexOf(b.user_id);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    } else if (indexA !== -1) {
      return -1;
    } else if (indexB !== -1) {
      return 1;
    } else {
      return a.first_name.localeCompare(b.first_name);
    }
  }) as initUser[];
};
