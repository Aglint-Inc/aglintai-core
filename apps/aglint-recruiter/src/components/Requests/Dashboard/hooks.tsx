/* eslint-disable security/detect-object-injection */
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
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
type allRequestType = {
  value: {
    data: {
      type: string;
      status: string;
      priority: string;
    }[];
  };
};
export const useAllScheduleList = () => {
  const {
    recruiterUser: { user_id },
  } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_All_request'],
    refetchInterval: 5000,
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
    refetchInterval: 5000,
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
  const { '0': createdCompletedRequestCount, '1': allRequestCount } =
    await Promise.allSettled([
      await supabase.rpc('get_request_stats', {
        assigner_id: assigner_id,
        curr_date: dayjsLocal().format('YYYY-MM-DD'),
      }),
      await supabase
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

  const urgentRequest = (allRequestCount as allRequestType).value.data.filter(
    (ele) => ele.priority === 'urgent' && ele.status !== 'completed',
  ).length;
  const standardRequest = (allRequestCount as allRequestType).value.data.filter(
    (ele) => ele.priority === 'standard' && ele.status !== 'completed',
  ).length;
  const schedule_request = (
    allRequestCount as allRequestType
  ).value.data.filter(
    (ele) => ele.type === 'schedule_request' && ele.status !== 'completed',
  ).length;
  const reschedule_request = (
    allRequestCount as allRequestType
  ).value.data.filter(
    (ele) => ele.type === 'reschedule_request' && ele.status !== 'completed',
  ).length;
  const cancel_schedule_request = (
    allRequestCount as allRequestType
  ).value.data.filter(
    (ele) =>
      ele.type === 'cancel_schedule_request' && ele.status !== 'completed',
  ).length;
  const decline_request = (allRequestCount as allRequestType).value.data.filter(
    (ele) => ele.type === 'decline_request' && ele.status !== 'completed',
  ).length;
  const completedRequests = (
    allRequestCount as allRequestType
  ).value.data.filter((ele) => ele.status === 'completed').length;

  return {
    chat: {
      createdRequest,
      completedRequest,
      onGoingRequest,
    },
    card: {
      urgentRequest,
      standardRequest,
      schedule_request,
      reschedule_request,
      cancel_schedule_request,
      decline_request,
      completedRequests,
    },
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
