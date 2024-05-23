import { appKey, argsToKeys } from '..';
import { GetJobWorkflow } from '.';

export const jobWorkflowQueryKeys = {
  all: { queryKey: [appKey, 'jobWorkflow'] as string[] },
  workflow: (args: GetJobWorkflow) => ({
    queryKey: [...jobWorkflowQueryKeys.all.queryKey, ...argsToKeys(args)],
  }),
} as const;
