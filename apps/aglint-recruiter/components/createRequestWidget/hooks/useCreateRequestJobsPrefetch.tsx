import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { api } from '@/trpc/client';

import { useCreateRequest } from './useCreateRequest';

export const useCreateRequesJobsPrefetch = () => {
  const { recruiter_id } = useAuthDetails();
  const {
    payloads: {
      jobs: { search },
    },
  } = useCreateRequest((state) => state.initial);
  void api.requests.create.jobs.usePrefetchInfiniteQuery(
    {
      recruiter_id,
      search,
    },
    {},
  );
};
