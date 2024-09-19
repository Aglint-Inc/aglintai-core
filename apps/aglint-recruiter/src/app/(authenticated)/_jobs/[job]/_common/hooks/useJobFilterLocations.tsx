import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';
import { useJobPolling } from './useJobPolling';

export const useJobFilterLocations = () => {
  const { job_id } = useCurrentJob();
  const { opts } = useJobPolling();
  return api.jobs.job.filters.locations.useQuery(
    {
      job_id,
    },
    opts,
  );
};
