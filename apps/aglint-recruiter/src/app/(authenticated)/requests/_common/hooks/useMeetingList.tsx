import { useParams } from 'next/navigation';

import { api } from '@/trpc/client';

export const useMeetingList = () => {
  const params = useParams();
  const requestId = params?.request as string;
  return api.requests.utils.requestSessions.useQuery(
    { request_id: requestId },
    {
      enabled: !!requestId,
    },
  );
};
