import { dayjsLocal } from '@aglint/shared-utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import dayjs from '@/utils/dayjs';
import { supabase } from '@/utils/supabase/client';

import type { responseCreatedCompletedType, SectionRequests } from '../types';

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
        .or(`assigner_id.eq.${assigner_id},assignee_id.eq.${assigner_id}`),
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

  const all_open_request =
    (card?.urgent_request ?? 0) + (card?.standard_request ?? 0);

  return {
    chat: {
      createdRequest,
      completedRequest,
      onGoingRequest,
    },
    card,
    all_open_request,
  };
}
