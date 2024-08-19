/* eslint-disable security/detect-object-injection */
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RequestResponse } from '@/src/queries/requests/types';
import dayjs from '@/src/utils/dayjs';
import { supabase } from '@/src/utils/supabase/client';

type responseCreatedCompletedType = {
  value: {
    data: {
      date: string;
      created: number;
      completed: number;
      on_going: number;
    }[];
  };
};

type SectionRequests = {
  // eslint-disable-next-line no-unused-vars
  [id in keyof RequestResponse | 'standard_request']: number;
};

export const useAllScheduleList = () => {
  const {
    recruiterUser: { user_id },
  } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_All_request'],
    refetchInterval: 30000,
    refetchOnMount: true,
    queryFn: () => getRequestsList({ assigner_id: user_id }),
    gcTime: 20000,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_All_request'] });
  return { ...query, refetch };
};

export async function getRequestsList({
  assigner_id,
}: {
  assigner_id: string;
}) {
  const data = await supabase
    .rpc('get_request_count_stats', {
      assigner_id: assigner_id,
    })
    .select()
    .throwOnError();

  return data;
}

export const useRequestCount = () => {
  const {
    recruiterUser: { user_id },
  } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_requests_Count'],
    refetchInterval: 30000,
    refetchOnMount: true,
    queryFn: () => getRequestsCount({ assigner_id: user_id }),
    gcTime: 20000,
    enabled: !!user_id,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_requests_Count'] });
  return { ...query, refetch };
};

export async function getRequestsCount({
  assigner_id,
}: {
  assigner_id: string;
}) {
  const [createdCompletedRequestCount, allRequestCount] =
    await Promise.allSettled([
      supabase.rpc('get_request_stats', {
        assigner_id: assigner_id,
        curr_date: dayjsLocal().format('YYYY-MM-DD'),
      }),
      supabase
        .from('request')
        .select('type,status,priority')
        .or(`assigner_id.eq.${assigner_id},assignee_id.eq.${assigner_id}`)
        .or(
          `status.neq.completed, or(status.eq.completed, and(completed_at.gte.${dayjsLocal().format('YYYY-MM-DD')}), and(completed_at.lt.${dayjsLocal().add(1, 'day').format('YYYY-MM-DD')}))`,
        ), // For the below listing
    ]);

  const createdRequest = (
    createdCompletedRequestCount as responseCreatedCompletedType
  ).value.data.map((ele) => {
    return {
      name: dayjs(ele.date).format('MMM DD'),
      count: ele.created,
    };
  });

  const completedRequest = (
    createdCompletedRequestCount as responseCreatedCompletedType
  ).value.data.map((ele) => {
    return {
      name: dayjs(ele.date).format('MMM DD'),
      count: ele.completed,
    };
  });
  const onGoingRequest = (
    createdCompletedRequestCount as responseCreatedCompletedType
  ).value.data.map((ele) => {
    return {
      name: dayjs(ele.date).format('MMM DD'),
      count: ele.on_going,
    };
  });

  const card = (
    allRequestCount.status === 'fulfilled' && allRequestCount.value.data
  ).reduce(
    (acc, curr) => {
      if (curr.status === 'completed') acc.completed_request += 1;
      else if (curr.priority === 'urgent') acc.urgent_request += 1;
      else {
        acc[curr.type] += 1;
        acc.standard_request += 1;
      }
      return acc;
    },
    {
      cancel_schedule_request: 0,
      completed_request: 0,
      decline_request: 0,
      reschedule_request: 0,
      schedule_request: 0,
      urgent_request: 0,
      standard_request: 0,
    } as SectionRequests,
  );

  return {
    chat: {
      createdRequest,
      completedRequest,
      onGoingRequest,
    },
    card,
  };
}

export function dateStringFormat(date) {
  const today = dayjs();
  const inputDate = dayjs(date);

  if (inputDate.isSame(today, 'day')) {
    return 'today';
  } else if (inputDate.isSame(today.subtract(1, 'day'), 'day')) {
    return 'yesterday';
  } else {
    return inputDate.format('MMM D');
  }
}
