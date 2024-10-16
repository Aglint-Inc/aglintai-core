import type { Badges } from '@/routers/jobs/job/filters/badges';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useJobFilterBadges = (): ProcedureQuery<Badges> => {
  const { job_id } = useCurrentJob();
  return api.jobs.job.filters.badges.useQuery({
    job_id,
  });
};
