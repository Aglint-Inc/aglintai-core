import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { api } from '@/trpc/client';

import { useCreateRequest } from './useCreateRequest';

export const useCreateRequesJobsPrefetch = () => {
  const { recruiter_id } = useAuthDetails();
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
