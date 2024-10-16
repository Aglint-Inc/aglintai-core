import type { LocationPool } from '@/routers/jobs/job/metrics/locationPool';
import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useMetricsLocationPool = (): LocationPool['output'] => {
  const { job_id } = useCurrentJob();
  return api.jobs.job.metrics.locationPool.useSuspenseQuery({ job_id })[0];
};
