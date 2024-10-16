import { useParams } from 'next/navigation';

import type { RequestSessions } from '@/routers/requests/utils/requestSessions';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useMeetingList = () => {
  const apiResp = useRequestSessionsProcedure();
  return {
    ...apiResp,
    data: apiResp.data! || [],
  };
};

const useRequestSessionsProcedure = (): ProcedureQuery<RequestSessions> => {
  const params = useParams();
  const requestId = params?.request as string;
  return api.requests.utils.requestSessions.useQuery(
    { request_id: requestId },
    {
      enabled: !!requestId,
    },
  );
};
