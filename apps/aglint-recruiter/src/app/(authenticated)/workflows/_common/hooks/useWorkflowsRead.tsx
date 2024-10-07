import { api } from '@/trpc/client';

export const useWorkflowsRead = () => {
  return api.workflows.read.useSuspenseQuery()[1];
};
