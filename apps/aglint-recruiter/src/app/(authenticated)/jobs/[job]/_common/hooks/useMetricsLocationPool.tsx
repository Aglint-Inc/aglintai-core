import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';
import { useJobPolling } from './useJobPolling';

export const useMetricsLocationPool = () => {
  const { job_id } = useCurrentJob();
  const { opts } = useJobPolling();
  return api.jobs.job.metrics.locationPool.useSuspenseQuery({ job_id }, opts);
};
