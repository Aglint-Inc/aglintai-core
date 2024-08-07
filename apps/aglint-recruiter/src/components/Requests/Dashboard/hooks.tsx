/* eslint-disable security/detect-object-injection */
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import { requestTypes } from './utils';

export const useAllScheduleList = () => {
  const {
    recruiterUser: { user_id },
  } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_All_request'],

    queryFn: () => getRequests({ assigner_id: user_id }),
    gcTime: 20000,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_All_request'] });
  return { ...query, refetch };
};

async function getRequests({ assigner_id }: { assigner_id: string }) {
  const data = await supabase
    .rpc('get_request_count_stats', {
      assigner_id: assigner_id,
    })
    .select()
    .throwOnError();

  return data;
}

export const transformForChartData = (data) => {
  return data.map((entry) => {
    const totalCount = Object.values(entry.counts).reduce((acc, counts) => {
      return acc + Object.values(counts).reduce((sum, count) => sum + count, 0);
    }, 0);

    const date = new Date(entry.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    });

    return {
      name: formattedDate,
      count: totalCount,
      color: '#F76B15',
    };
  });
};

export const transFormCardData = (data) => {
  return requestTypes.map(({ title, iconName }) => {
    return {
      title,
      count: data.reduce((total, day) => {
        return (
          total +
          Object.values(day.counts).reduce((subTotal, category) => {
            return subTotal + (category[title] || 0);
          }, 0)
        );
      }, 0),
      iconName,
    };
  });
};

export const transformProgressData = (data) => {
  const result = data.reduce(
    (acc, day) => {
      // Summing up open requests from 'to_do'
      for (let key in day.counts.to_do) {
        acc.open_request += day.counts.to_do[key];
      }

      // Summing up completed requests from 'completed'
      for (let key in day.counts.completed) {
        acc.completed_request += day.counts.completed[key];
      }

      return acc;
    },
    { open_request: 0, completed_request: 0 },
  );
  const total_requests = result.open_request + result.completed_request;

  const completed_percentage = Math.round(
    total_requests > 0 ? (result.completed_request / total_requests) * 100 : 0,
  );

  return {
    ...result,
    completed_percentage,
  };
};
