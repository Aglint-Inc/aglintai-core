import { api, TRPC_CLIENT_CONTEXT } from '@/trpc/client';

import { useCreateRequest } from './useCreateRequest';

export const useCreateRequestSchedules = () => {
  const job_id = useCreateRequest((state) => state.selections.jobs.id);
  const search = useCreateRequest((state) => state.payloads.schedules.search);
  const [, result] = api.requests.create.schedules.useSuspenseInfiniteQuery(
    { job_id, search },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );
  return result;
};
