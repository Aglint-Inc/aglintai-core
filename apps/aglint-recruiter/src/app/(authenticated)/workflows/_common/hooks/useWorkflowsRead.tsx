import { api } from '@/trpc/client';

export const useWorkflowsRead = () => api.workflows.read.useQuery();
