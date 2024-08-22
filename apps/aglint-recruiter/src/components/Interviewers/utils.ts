import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { initUser } from '@/src/pages/api/interviewers';
import { supabase } from '@/src/utils/supabase/client';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import dayjs from '@/src/utils/dayjs';

// -------------------------------------------------------- InterviewerLoad
export type useAllInterviewerType = Awaited<
  ReturnType<typeof useAllInterviewer>
>;

export function useAllInterviewer(recruiter_id: string) {
  return useQuery({
    queryKey: ['recruiter_id', recruiter_id],
    queryFn: () => fetchAllInterviewer(recruiter_id),
    enabled: Boolean(recruiter_id),
  });
}

const fetchAllInterviewer = async (recruiter_id: string) => {
  const { data, error } = await supabase
    .from('all_interviewers')
    .select()
    .eq('recruiter_id', recruiter_id);
  if (error) throw new Error(error.message);

  return data;
};

//------------------------------------------------------------- Availability

export type useAvailabiltyWithCalType = Awaited<
  ReturnType<typeof useAvailabilty>
>;

console.log('object');

export const useAvailabilty = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_fetchAvailabiltyWithCal', startDate, endDate],
    refetchOnMount: true,
    queryFn: () => fetchAvailabiltyWithCal(recruiter_id, startDate, endDate),
    gcTime: 20000,
    enabled: !!recruiter_id,
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_fetchAvailabiltyWithCal', startDate, endDate],
    });
  return { ...query, refetch };
};

const fetchAvailabiltyWithCal = async (
  recruiter_id: string,
  startDate: string,
  endDate: string,
) => {
  return axios
    .post('/api/interviewers', {
      recruiter_id,
      startDate,
      endDate,
    })
    .then((data) => {
      return data.data.data as initUser[];
    });
};

//------------------------------------------------ service

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

{
  /*
export const groupByDateAndHour = (events) => {
  // Step 1: Sort events by type
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
    ];

    return { date, events: filledEvents };
  });

  return finalEvents;
};
*/
}

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
    ];

    return { date, events: filledEvents };
  });

  return finalEvents;
}
