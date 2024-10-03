import { REFETCH_INTERVAL } from '@/queries/index';

import { useJob } from './useJob';

export const useJobPolling = () => {
  const { applicationScoringPollEnabled: polling } = useJob();
  return {
    polling,
    opts: {
      refetchInterval: polling ? REFETCH_INTERVAL : 0,
      refetchOnMount: polling,
      refetchOnWindowFocus: false,
    },
  } as const;
};
