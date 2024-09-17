import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useJobFilterBadges = () => {
  const { job_id } = useCurrentJob();
  return api.jobs.job.filters.badges.useQuery({
    job_id,
  });
};
