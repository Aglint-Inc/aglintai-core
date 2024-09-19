import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useMetricsScheduleData = () => {
  const { job_id } = useCurrentJob();
  return api.jobs.job.metrics.scheduleData.useSuspenseQuery({ job_id });
};
