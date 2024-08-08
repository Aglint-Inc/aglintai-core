/* eslint-disable security/detect-object-injection */
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import dayjs from '@/src/utils/dayjs';
import { supabase } from '@/src/utils/supabase/client';

import { requestTypes } from './utils';

export const useAllScheduleList = () => {
  const {
    recruiterUser: { user_id },
  } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_All_request'],

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

export const transformForChartData = (
  data: Awaited<ReturnType<typeof getRequestsList>>['data'],
) => {
  return data.map((entry) => {
    const totalCount = Object.values(entry.counts).reduce((acc, category) => {
      return (
        acc +
        Object.values(category).reduce((sum, countType) => {
          return (
            sum +
            Object.values(countType).reduce(
              (typeSum, count) => typeSum + count,
              0,
            )
          );
        }, 0)
      );
    }, 0);

    const date = new Date(entry.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    });

    return {
      name: formattedDate,
      count: totalCount,
      color: totalCount === 0 ? '#63635E' : '#F76B15',
    };
  });
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
