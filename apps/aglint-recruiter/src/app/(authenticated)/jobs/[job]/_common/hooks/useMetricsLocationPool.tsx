import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useMetricsLocationPool = () => {
  const { job_id } = useCurrentJob();
  return api.jobs.job.metrics.locationPool.useSuspenseQuery({ job_id });
};
