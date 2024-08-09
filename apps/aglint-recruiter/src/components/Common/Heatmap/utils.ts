import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

import { supabase } from '@/src/utils/supabase/client';

import { Meeting, Meetings } from './type';

export type useUserSchedulesType = Awaited<ReturnType<typeof useUserSchedules>>;

export function useUserSchedules(user_id: string) {
  return useQuery({
    queryKey: ['user_id', user_id],
    queryFn: () => fetchFunction({ user_id }),
    enabled: Boolean(user_id),
  });
}

export const getDatesArray = (startDate, endDate, format) => {
  const dates = [];
  let currentDate = dayjsLocal(startDate);

  while (currentDate <= dayjsLocal(endDate)) {
    dates.push(currentDate.format(format));
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};

const fetchFunction = async ({ user_id }) => {
  try {
    const { data } = await supabase
      .from('meeting_details')
      .select(
        'status,start_time,end_time,id,applications(candidates(first_name,last_name)), public_jobs(id,company,job_title), meeting_interviewers!public_interview_session_meeting_id_fkey(*)',
      )
      .contains('confirmed_user_ids', [user_id])
      .eq('meeting_interviewers.is_confirmed', true);

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
    startTime: string;
    endTime: string;
    meeting_id: string;
  }[];
}): Meetings {
  const res = events.reduce((acc, event) => {
    const startDate = dayjsLocal(event.startTime).format('YYYY-MM-DD');

    // eslint-disable-next-line security/detect-object-injection
    if (!acc[startDate]) {
      // eslint-disable-next-line security/detect-object-injection
      acc[startDate] = [];
    }

    // eslint-disable-next-line security/detect-object-injection
    acc[startDate].push(event);

    return acc;
  }, {});

  return res;
}

function findMaxGroupCount(groupedData: Meetings) {
  const groupSizes = Object.values(groupedData).map((group) => group?.length);
  const maxCount = Math.max(...groupSizes);
  return maxCount;
}

export function transposeArray(array: Meeting[][]): Meeting[][] {
  return array?.length ? _.zip(...array).reverse() : [];
}

export const filling2dArray = (data, maxCount) => {
  return data?.map((subArray) => {
    const fillCount = maxCount - subArray.length;
    return subArray.concat(Array.from({ length: fillCount }, () => ({})));
  });
};
