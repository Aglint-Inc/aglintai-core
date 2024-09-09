/* eslint-disable security/detect-object-injection */
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import dayjs from '@/utils/dayjs';
import { supabase } from '@/utils/supabase/client';

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
