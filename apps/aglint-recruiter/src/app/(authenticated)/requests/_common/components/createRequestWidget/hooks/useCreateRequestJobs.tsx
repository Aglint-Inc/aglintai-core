import { useTenant } from '@/company/hooks';
import { api } from '@/trpc/client';

import { useCreateRequest } from './useCreateRequest';

export const useCreateRequestJobs = () => {
  const { recruiter_id } = useTenant();
  const search = useCreateRequest((state) => state.payloads.jobs.search);
  const [, result] = api.requests.create.jobs.useSuspenseInfiniteQuery(
    { recruiter_id, search },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  return result;
};
