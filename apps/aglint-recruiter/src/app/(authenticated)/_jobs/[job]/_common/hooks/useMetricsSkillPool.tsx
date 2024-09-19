import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';
import { useJobPolling } from './useJobPolling';

export const useMetricsSkillPool = () => {
  const { job_id } = useCurrentJob();
  const { opts } = useJobPolling();
  return api.jobs.job.metrics.skillPool.useSuspenseQuery({ job_id }, opts);
};
