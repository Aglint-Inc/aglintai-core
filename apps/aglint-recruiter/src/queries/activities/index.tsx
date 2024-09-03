import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { type AxiosResponse } from 'axios';

import { type ApiResponseActivities } from '@/src/pages/api/scheduling/fetch_activities';
import toast from '@/src/utils/toast';

export const useAllActivities = ({
  application_id,
  session_id,
}: {
  application_id: string;
  session_id?: string;
}) => {
  const queryClient = useQueryClient();
  const queryKey = ['activitiesCandidate', { application_id }];
  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data: resAct, status }: AxiosResponse<ApiResponseActivities> =
        await axios.post('/api/scheduling/fetch_activities', {
          application_id,
          session_id,
        });
      if (status !== 200) {
        toast.error('Unable to fetch activities');
      }
      return resAct.data;
    },
    enabled: !!application_id,
  });
  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };
  return { ...query, refetch };
};
