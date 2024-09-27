import { useTenant } from '@/company/hooks';
import { api } from '@/trpc/client';

import { useCreateRequest } from './useCreateRequest';

export const useCreateRequesJobsPrefetch = () => {
  const { recruiter_id } = useTenant();
  const search = useCreateRequest(
    (state) => state.initial.payloads.jobs.search,
  );
  void api.requests.create.jobs.usePrefetchInfiniteQuery(
    {
      recruiter_id,
      search,
    },
    {},
  );
};
