import type { Job } from '@/jobs/types';
import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useJobRead = (): Job => {
  const { job_id } = useCurrentJob();
  return api.jobs.job.read.useSuspenseQuery({ id: job_id })[0];
};
