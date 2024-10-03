import { api } from '@/trpc/client';

import { useCreateRequest } from './useCreateRequest';

export const useCreateRequestCandidates = () => {
  const job_id = useCreateRequest((state) => state.selections.jobs.id);
  const search = useCreateRequest((state) => state.payloads.candidate.search);
  const [, result] = api.requests.create.candidates.useSuspenseInfiniteQuery(
    { job_id, search },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  return result;
};
