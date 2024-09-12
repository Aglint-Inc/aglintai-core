import { api } from '@/trpc/client';

import { useCreateRequest } from './useCreateRequest';

export const useCreateRequestSchedulesPrefetch = () => {
  const { job_id, search } = useCreateRequest((state) => ({
    job_id: state.selections.jobs.id,
    search: state.initial.payloads.candidates.search,
  }));
  void api.requests.create.schedules.usePrefetchInfiniteQuery(
    {
      job_id,
      search,
    },
    {},
  );
};
