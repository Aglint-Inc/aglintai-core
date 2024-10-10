import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useMetricsExperienceAndTenure = () => {
  const { job_id } = useCurrentJob();
  return api.jobs.job.metrics.experienceAndTenure.useSuspenseQuery({ job_id });
};
