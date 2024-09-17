import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useJobFilterLocations = () => {
  const { job_id } = useCurrentJob();
  return api.jobs.job.filters.locations.useQuery({
    job_id,
  });
};
