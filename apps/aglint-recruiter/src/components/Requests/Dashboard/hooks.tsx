/* eslint-disable security/detect-object-injection */
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import dayjs from '@/src/utils/dayjs';
import { supabase } from '@/src/utils/supabase/client';

import { requestTypes } from './utils';
type responseCreatedCompletedType = {
  value: {
    data: {
      date: string;
      counts: {
        completed: {
          cancel_schedule_request: {
            standard: number;
            urgent: number;
          };
          decline_request: {
            standard: number;
            urgent: number;
          };
          reschedule_request: {
            standard: number;
            urgent: number;
          };
          schedule_request: {
            standard: number;
            urgent: number;
          };
        };
        created: {
          cancel_schedule_request: {
            standard: number;
            urgent: number;
          };
          decline_request: {
            standard: number;
            urgent: number;
          };
          reschedule_request: {
            standard: number;
            urgent: number;
          };
          schedule_request: {
            standard: number;
            urgent: number;
          };
        };
      };
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
      await supabase.rpc('get_request_count_stats_new', { assigner_id }), // For the graph
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
      date: ele.date,
      counts: ele.counts.created,
    };
  });

  const completedRequest = (
    createdCompletedRequestCount as responseCreatedCompletedType
  ).value.data.map((ele) => {
    return {
      date: ele.date,
      counts: ele.counts.completed,
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

  // console.log('allRequestCount',allRequestCount)
  return {
    chat: {
      createdRequest: transformForChartData(createdRequest),
      completedRequest: transformForChartData(completedRequest),
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

export const transformForChartData = (
  data: {
    date: string;
    counts: {
      cancel_schedule_request: {
        standard: number;
        urgent: number;
      };
      decline_request: {
        standard: number;
        urgent: number;
      };
      reschedule_request: {
        standard: number;
        urgent: number;
      };
      schedule_request: {
        standard: number;
        urgent: number;
      };
    };
  }[],
) => {
  return data.reduce((acc, curr) => {
    const { date, counts } = curr;

    const total = Object.values(counts).reduce((sum, request) => {
      return sum + request.standard + request.urgent;
    }, 0);

    acc.push({
      name: new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
      }),
      count: total,
      color: '#63635E',
    });

    return acc;
  }, []) as { name: string; count: number; color: string }[];
};

export const transFormCardData = (
  data: Awaited<ReturnType<typeof getRequestsList>>['data'],
) => {
  return requestTypes.map(({ title, iconName }) => {
    const counts = data.reduce(
      (acc, day) => {
        Object.values(day.counts).forEach((category) => {
          if (category[title]) {
            acc.total +=
              (category[title].standard || 0) + (category[title].urgent || 0);
            acc.urgent += category[title].urgent || 0;
          }
        });
        return acc;
      },
      { total: 0, urgent: 0 },
    );

    return {
      title,
      total: counts.total,
      urgent: counts.urgent,
      iconName,
    };
  });
};

export const transformProgressData = (
  data: Awaited<ReturnType<typeof getRequestsList>>['data'],
) => {
  const result = data.reduce(
    (acc, day) => {
      // Summing up open requests from 'to_do'
      for (let key in day.counts.to_do) {
        const counts = day.counts.to_do[key];
        if (typeof counts === 'object') {
          acc.open_request += (counts.standard || 0) + (counts.urgent || 0);
          acc.all_request += (counts.standard || 0) + (counts.urgent || 0);
        } else {
          acc.open_request += counts;
          acc.all_request += counts;
        }
      }

      // Summing up completed requests from 'completed'
      for (let key in day.counts.completed) {
        const counts = day.counts.completed[key];
        if (typeof counts === 'object') {
          acc.completed_request +=
            (counts.standard || 0) + (counts.urgent || 0);
          acc.all_request += (counts.standard || 0) + (counts.urgent || 0);
        } else {
          acc.completed_request += counts;
          acc.all_request += counts;
        }
      }

      // Summing up requests from 'in_progress'
      for (let key in day.counts.in_progress) {
        const counts = day.counts.in_progress[key];
        if (typeof counts === 'object') {
          acc.all_request += (counts.standard || 0) + (counts.urgent || 0);
        } else {
          acc.all_request += counts;
        }
      }

      // Summing up requests from 'blocked'
      for (let key in day.counts.blocked) {
        const counts = day.counts.blocked[key];
        if (typeof counts === 'object') {
          acc.all_request += (counts.standard || 0) + (counts.urgent || 0);
        } else {
          acc.all_request += counts;
        }
      }

      return acc;
    },
    { open_request: 0, completed_request: 0, all_request: 0 },
  );

  const completed_percentage = Math.round(
    result.all_request > 0
      ? (result.completed_request / result.all_request) * 100
      : 0,
  );

  return {
    open_request: result.open_request,
    completed_request: result.completed_request,
    all_request: result.all_request,
    completed_percentage,
  };
};

export function getSelectedDateRequestCount(data) {
  return Object.values(data).reduce((total, category) => {
    return (
      total +
      Object.values(category).reduce(
        (sum, { standard, urgent }) => sum + standard + urgent,
        0,
      )
    );
  }, 0);
}
export function getAllUrgentRequestCount(data) {
  return Object.values(data).reduce((total, category) => {
    return (
      total +
      Object.values(category).reduce((sum, { urgent }) => sum + urgent, 0)
    );
  }, 0);
}
export function getAllStandardRequestCount(data) {
  return Object.values(data).reduce((total, category) => {
    return (
      total +
      Object.values(category).reduce((sum, { standard }) => sum + standard, 0)
    );
  }, 0);
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
