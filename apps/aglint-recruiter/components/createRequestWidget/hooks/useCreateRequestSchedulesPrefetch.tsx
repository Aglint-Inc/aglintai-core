import { api } from '@/trpc/client';

import { useCreateRequest } from './useCreateRequest';

export const useCreateRequestSchedulesPrefetch = () => {
  const job_id = useCreateRequest((state) => state.selections.jobs.id);
  const search = useCreateRequest((state) => state.payloads.schedules.search);
  void api.requests.create.schedules.usePrefetchInfiniteQuery(
    {
      job_id,
      search,
    },
    {},
  );
};
