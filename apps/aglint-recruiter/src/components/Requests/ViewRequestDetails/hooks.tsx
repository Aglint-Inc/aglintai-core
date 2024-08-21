import { useQuery, useQueryClient } from '@tanstack/react-query';

import axios from '@/src/client/axios';
import { ApiInterviewSessionsStage } from '@/src/pages/api/scheduling/application/fetchInterviewStagesBySessionId';

export const useMeetingList = ({
  session_ids,
  application_id,
}: {
  session_ids: string[];
  application_id: string;
}) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_meeting_list', session_ids],
    refetchInterval: 30000,
    refetchOnMount: true,
    queryFn: () => getMeetingsList({ session_ids, application_id }),
    gcTime: 20000,
    enabled: !!session_ids && !!session_ids.length,
  });

  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_meeting_list', session_ids],
    });
  return { ...query, refetch };
};

export async function getMeetingsList({
  session_ids,
  application_id,
}: {
  session_ids: string[];
  application_id: string;
}) {
  const res = await axios.call<ApiInterviewSessionsStage>(
    'POST',
    '/api/scheduling/application/fetchInterviewStagesBySessionId',
    {
      application_id,
      sessions_ids: session_ids,
    },
  );
  return res.sessions;
}
