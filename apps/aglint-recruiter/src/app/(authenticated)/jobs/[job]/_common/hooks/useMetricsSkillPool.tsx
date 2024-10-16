import type { SkillPool } from '@/routers/jobs/job/metrics/skillPool';
import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useMetricsSkillPool = (): SkillPool['output'] => {
  const { job_id } = useCurrentJob();
  return api.jobs.job.metrics.skillPool.useSuspenseQuery({ job_id })[0];
};
