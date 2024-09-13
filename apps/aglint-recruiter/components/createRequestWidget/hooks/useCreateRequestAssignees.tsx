import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { api, TRPC_CLIENT_CONTEXT } from '@/trpc/client';

import { useCreateRequest } from './useCreateRequest';

export const useCreateRequestAssignees = () => {
  const { recruiter_id } = useAuthDetails();
  const search = useCreateRequest((state) => state.payloads.assignees.search);
  const [, result] = api.requests.create.assignees.useSuspenseInfiniteQuery(
    { recruiter_id, search },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );
  return result;
};
