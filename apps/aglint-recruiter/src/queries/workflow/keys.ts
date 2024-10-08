import { appKey } from '..';

export const workflowMutationKeys = {
  all: { mutationKey: [appKey, 'workflow'] as string[] },
  workflows: (type: 'CREATE' | 'UPDATE' | 'DELETE' | 'REFRESH') => ({
    mutationKey: [...workflowMutationKeys.all.mutationKey, type],
  }),
} as const;
