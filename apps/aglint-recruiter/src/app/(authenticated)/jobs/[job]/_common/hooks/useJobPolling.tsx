import { REFETCH_INTERVAL } from '@/queries/index';
import { TRPC_CLIENT_CONTEXT } from '@/trpc/client';

import { useJob } from './useJob';

export const useJobPolling = () => {
  const { applicationScoringPollEnabled: polling } = useJob();
  return {
    polling,
    opts: {
      refetchInterval: polling ? REFETCH_INTERVAL : 0,
      refetchOnMount: polling,
      refetchOnWindowFocus: false,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  } as const;
};
