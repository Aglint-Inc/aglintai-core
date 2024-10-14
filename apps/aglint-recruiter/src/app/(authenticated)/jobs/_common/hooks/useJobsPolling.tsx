import { useQuery } from '@tanstack/react-query';

import { api } from '@/trpc/client';

import { useJobs } from './useJobs';

export const useJobsPolling = () => {
  const jobs = useJobs();
  const utils = api.useUtils();
  const enabled = !!jobs.find(
    (job) =>
      job.scoring_criteria_loading ||
      job.processing_count.processing + job.processing_count.fetching !== 0,
  );
  useQuery({
    queryKey: ['jobs-polling'],
    queryFn: () => {
      utils.jobs.read.invalidate();
    },
    enabled,
    refetchInterval: enabled ? 30_000 : 0,
    refetchOnMount: enabled,
    refetchOnWindowFocus: false,
  });
  return { isPolling: enabled };
};
