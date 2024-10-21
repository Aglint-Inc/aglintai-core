import { useQuery } from '@tanstack/react-query';

import { api } from '@/trpc/client';

import { useJobRead } from './useJobRead';

export const useJobPolling = (poll = false) => {
  const job = useJobRead();
  const utils = api.useUtils();
  const isApplicationsPolling =
    job.processing_count.processing + job.processing_count.fetching !== 0;
  const isGeneratingCriteria = job.scoring_criteria_loading;
  const enabled = isGeneratingCriteria || isApplicationsPolling || poll;
  useQuery({
    queryKey: ['job-polling', { id: job.id }],
    queryFn: () => {
      utils.jobs.job.applications.invalidate();
      utils.jobs.job.filters.invalidate();
      utils.jobs.job.metrics.invalidate();
      utils.jobs.job.read.invalidate();
    },
    enabled,
    refetchInterval: enabled ? 30_000 : 0,
    refetchOnMount: enabled,
    refetchOnWindowFocus: false,
  });
  return { isPolling: enabled, isApplicationsPolling, isGeneratingCriteria };
};
