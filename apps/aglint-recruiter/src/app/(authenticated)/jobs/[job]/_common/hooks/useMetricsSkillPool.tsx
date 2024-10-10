import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useMetricsSkillPool = () => {
  const { job_id } = useCurrentJob();
  return api.jobs.job.metrics.skillPool.useSuspenseQuery({ job_id });
};
