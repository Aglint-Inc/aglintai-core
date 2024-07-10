import { appKey, argsToKeys } from '..';
import { GetWorkflow } from '.';

export const workflowQueryKeys = {
  all: { queryKey: [appKey, 'workflow'] as string[] },
  workflow: (args: GetWorkflow) => ({
    queryKey: [...workflowQueryKeys.all.queryKey, ...argsToKeys(args)],
  }),
  workflow_job_filter: (args: GetWorkflow) => ({
    queryKey: [
      ...workflowQueryKeys.all.queryKey,
      ...argsToKeys(args),
      'workflow_job_filter',
    ],
  }),
} as const;

export const workflowMutationKeys = {
  all: { mutationKey: [appKey, 'workflow'] as string[] },
  workflow: (args: GetWorkflow) => ({
    mutationKey: [...workflowMutationKeys.all.mutationKey, ...argsToKeys(args)],
  }),
} as const;
