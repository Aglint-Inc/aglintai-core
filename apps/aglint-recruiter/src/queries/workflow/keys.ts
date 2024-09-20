import { appKey } from '..';

export const workflowQueryKeys = {
  all: { queryKey: [appKey, 'workflow'] as string[] },
  workflows: () => ({
    queryKey: [...workflowQueryKeys.all.queryKey],
  }),
  workflow_job_filter: () => ({
    queryKey: [...workflowQueryKeys.all.queryKey, 'workflow_job_filter'],
  }),
} as const;

export const workflowMutationKeys = {
  all: { mutationKey: [appKey, 'workflow'] as string[] },
  workflows: (type: 'CREATE' | 'UPDATE' | 'DELETE' | 'REFRESH') => ({
    mutationKey: [...workflowMutationKeys.all.mutationKey, type],
  }),
} as const;
