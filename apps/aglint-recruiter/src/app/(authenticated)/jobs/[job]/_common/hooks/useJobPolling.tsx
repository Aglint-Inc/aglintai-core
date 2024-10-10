import { useQuery } from '@tanstack/react-query';

import { api } from '@/trpc/client';

import { useJobRead } from './useJobRead';

export const useJobPolling = () => {
  const job = useJobRead();
  const utils = api.useUtils();
  const processing_poll =
    job.processing_count.processing + job.processing_count.fetching !== 0;
  const enabled = job.scoring_criteria_loading || processing_poll;
  useQuery({
    queryKey: ['job-polling', { id: job.id }],
    queryFn: () => {
      utils.jobs.read.invalidate();
      utils.jobs.job.applications.invalidate();
      utils.jobs.job.filters.invalidate();
      utils.jobs.job.metrics.invalidate();
      utils.jobs.job.read.invalidate();
    },
    enabled,
    refetchInterval: enabled ? 10_000 : 0,
    refetchOnMount: enabled,
    refetchOnWindowFocus: false,
  });
  return { enabled, processing_poll };
};
