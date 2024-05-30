import { appKey, argsToKeys } from '..';
import { GetJobWorkflow } from '.';

export const jobWorkflowQueryKeys = {
  all: { queryKey: [appKey, 'jobWorkflow'] as string[] },
  workflow: (args: GetJobWorkflow) => ({
    queryKey: [...jobWorkflowQueryKeys.all.queryKey, ...argsToKeys(args)],
  }),
} as const;

export const jobWorkflowMutationKeys = {
  all: { mutationKey: [appKey, 'jobWorkflow'] as string[] },
  update: (args: GetJobWorkflow) => ({
    mutationKey: [
      ...jobWorkflowMutationKeys.all.mutationKey,
      ...argsToKeys(args),
    ],
  }),
  delete: (args: GetJobWorkflow) => ({
    mutationKey: [
      ...jobWorkflowMutationKeys.all.mutationKey,
      ...argsToKeys(args),
    ],
  }),
} as const;
