import { api, TRPC_CLIENT_CONTEXT } from '@/trpc/client';

export const useWorkflowsRead = () =>
  api.workflows.read.useQuery(undefined, { trpc: TRPC_CLIENT_CONTEXT });
