import { appKey, argsToKeys } from '..';
import { type WorkflowActionKeys } from '.';

export const workflowActionQueryKeys = {
  all: { queryKey: [appKey, 'workflowAction'] as string[] },
  workflowAction: (args: WorkflowActionKeys) => ({
    queryKey: [...workflowActionQueryKeys.all.queryKey, ...argsToKeys(args)],
  }),
} as const;

export const workflowActionMutationKeys = {
  all: { mutationKey: [appKey, 'workflowAction'] as string[] },
  workflowAction: (args: WorkflowActionKeys) => ({
    mutationKey: [
      ...workflowActionMutationKeys.all.mutationKey,
      ...argsToKeys(args),
    ],
  }),
} as const;
