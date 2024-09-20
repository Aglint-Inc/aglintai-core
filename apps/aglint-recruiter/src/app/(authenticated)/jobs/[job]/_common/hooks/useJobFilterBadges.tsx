import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';
import { useJobPolling } from './useJobPolling';

export const useJobFilterBadges = () => {
  const { job_id } = useCurrentJob();
  const { opts } = useJobPolling();
  return api.jobs.job.filters.badges.useQuery(
    {
      job_id,
    },
    opts,
  );
};
