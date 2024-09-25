import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

import { type ApiInterviewSessionRequest } from '@/pages/api/scheduling/application/fetchInterviewSessionByRequest';

export const useMeetingList = () => {
  const params = useParams();
  const requestId = params?.request as string;
  const queryClient = useQueryClient();
  const request_id = requestId;
  const query = useQuery({
    queryKey: ['get_meeting_list', request_id],
    refetchInterval: 30000,
    refetchOnMount: true,
    queryFn: () => getMeetingsList({ request_id }),
    gcTime: 20000,
    enabled: !!request_id,
  });

  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_meeting_list', request_id],
    });
  return { ...query, refetch };
};

export async function getMeetingsList({ request_id }: { request_id: string }) {
  const res = await axios.post(
    '/api/scheduling/application/fetchInterviewSessionByRequest',
    {
      request_id,
    },
  );

  if (res.status !== 200) {
    throw new Error('Failed to fetch meeting list');
  }

  return (res?.data?.sessions || []) as ApiInterviewSessionRequest['response']['sessions'];
}
