import { appKey, argsToKeys } from '..';
import { GetWorkflowAction } from '.';

export const workflowActionQueryKeys = {
  all: { queryKey: [appKey, 'workflowAction'] as string[] },
  workflowAction: (args: GetWorkflowAction) => ({
    queryKey: [...workflowActionQueryKeys.all.queryKey, ...argsToKeys(args)],
  }),
} as const;
