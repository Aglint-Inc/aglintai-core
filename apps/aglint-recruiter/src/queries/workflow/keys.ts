import { appKey, argsToKeys } from '..';
import { GetWorkflow } from '.';

export const workflowQueryKeys = {
  all: { queryKey: [appKey, 'workflow'] as string[] },
  workflow: (args: GetWorkflow) => ({
    queryKey: [...workflowQueryKeys.all.queryKey, ...argsToKeys(args)],
  }),
} as const;
