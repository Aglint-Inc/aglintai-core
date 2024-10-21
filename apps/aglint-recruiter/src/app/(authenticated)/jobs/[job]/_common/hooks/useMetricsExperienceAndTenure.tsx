import type { ExperienceAndTenure } from '@/routers/jobs/job/metrics/experienceAndTenure';
import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useMetricsExperienceAndTenure =
  (): ExperienceAndTenure['output'] => {
    const { job_id } = useCurrentJob();
    return api.jobs.job.metrics.experienceAndTenure.useSuspenseQuery({
      job_id,
    })[0];
  };
