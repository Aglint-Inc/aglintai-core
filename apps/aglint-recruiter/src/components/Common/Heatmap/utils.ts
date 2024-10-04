import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

import { supabase } from '@/utils/supabase/client';

import { type Meeting } from './type';

export type GroupedEvents = {
  [date: string]: {
    status:
      | 'waiting'
      | 'confirmed'
      | 'completed'
      | 'cancelled'
      | 'reschedule'
      | 'not_scheduled';
    startTime: string | null;
    endTime: string | null;
    meeting_id: string;
  }[];
};

export function useUserSchedules(user_id: string) {
  const query = useQuery({
    queryKey: ['user_id', user_id],
    queryFn: () => fetchFunction({ user_id }),
    enabled: Boolean(user_id),
  });
  return {
    ...query,
    data: query.data!,
  };
}

export const getDatesArray = (
  startDate: string,
  endDate: string,
  format: string,
) => {
  const dates = [];
  let currentDate = dayjsLocal(startDate);

  while (currentDate <= dayjsLocal(endDate)) {
    dates.push(currentDate.format(format));
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};

const fetchFunction = async ({ user_id }: { user_id: string }) => {
  try {
    const data = (
      await supabase
        .from('meeting_details')
        .select(
          'status,start_time,end_time,id,applications(candidates(first_name,last_name)), public_jobs(id,job_title), meeting_interviewers!public_interview_session_meeting_id_fkey(*)',
        )
        .contains('confirmed_user_ids', [user_id])
        .eq('meeting_interviewers.is_confirmed', true)
    ).data!;

    const filteredData = data
      .filter(
        (curr) =>
          curr.status === 'completed' ||
          curr.status === 'confirmed' ||
          curr.status === 'cancelled',
      )
      .map((curr) => ({
        status: curr.status,
        startTime: curr.start_time,
        endTime: curr.end_time,
        meeting_id: curr.id,
      }));

    const groupedData = groupByStartDate({ events: filteredData });

    const maxInterviewsCount = findMaxGroupCount(groupedData);

    return { groupedData, maxInterviewsCount };
  } catch (e) {
    //
  }
};

function groupByStartDate({
  events,
}: {
  events: {
    status:
      | 'waiting'
      | 'confirmed'
      | 'completed'
      | 'cancelled'
      | 'reschedule'
      | 'not_scheduled';
    startTime: string | null;
    endTime: string | null;
    meeting_id: string;
  }[];
}): GroupedEvents {
  const res = events.reduce((acc: GroupedEvents, event) => {
    const startDate = dayjsLocal(event.startTime).format('YYYY-MM-DD');

    if (!acc[startDate]) {
      acc[startDate] = [];
    }

    acc[startDate].push(event);

    return acc;
  }, {} as GroupedEvents);

  return res;
}
function findMaxGroupCount(groupedData: GroupedEvents) {
  const groupSizes = Object.values(groupedData).map((group) => group?.length);
  const maxCount = Math.max(...groupSizes);
  return maxCount;
}

export function transposeArray(array: Meeting[][]): Meeting[][] {
  return array?.length
    ? _.zip(...array)
        .map((row) => row.map((item) => item || ({} as Meeting)))
        .reverse()
    : [];
}

export const filling2dArray = (data: Meeting[][], maxCount: number) => {
  return data?.map((subArray) => {
    const fillCount = maxCount - subArray.length;
    return subArray.concat(
      Array.from({ length: fillCount }, () => ({}) as Meeting),
    );
  });
};
