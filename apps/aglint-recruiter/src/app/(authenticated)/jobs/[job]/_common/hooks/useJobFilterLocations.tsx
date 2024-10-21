import type { Locations } from '@/routers/jobs/job/filters/location';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useJobFilterLocations = (): ProcedureQuery<Locations> => {
  const { job_id } = useCurrentJob();
  return api.jobs.job.filters.locations.useQuery({
    job_id,
  });
};
