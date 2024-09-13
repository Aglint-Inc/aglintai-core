import { api, TRPC_CLIENT_CONTEXT } from '@/trpc/client';

import { useCreateRequest } from './useCreateRequest';

export const useCreateRequestSchedules = () => {
  const application_id = useCreateRequest(
    (state) => state.selections.candidate.id,
  );
  const search = useCreateRequest((state) => state.payloads.schedules.search);
  const [, result] = api.requests.create.schedules.useSuspenseInfiniteQuery(
    { application_id, search },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );
  return result;
};
