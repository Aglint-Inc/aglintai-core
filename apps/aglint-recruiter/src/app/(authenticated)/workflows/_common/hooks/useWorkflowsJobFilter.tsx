import { api } from '@/trpc/client';

export const useWorkflowsJobFilter = api.workflows.filters.jobs.useQuery;
