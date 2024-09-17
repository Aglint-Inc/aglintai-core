import { keepPreviousData } from '@tanstack/react-query';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { api, TRPC_CLIENT_CONTEXT } from '@/trpc/client';

import { useCreateRequest } from './useCreateRequest';

export const useCreateRequestJobs = () => {
  const { recruiter_id } = useAuthDetails();
  const search = useCreateRequest((state) => state.payloads.jobs.search);
  const result = api.requests.create.jobs.useInfiniteQuery(
    { recruiter_id, search },
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );
  return result;
};
