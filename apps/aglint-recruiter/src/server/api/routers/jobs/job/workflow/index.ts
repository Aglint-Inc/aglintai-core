import { createTRPCRouter } from '@/server/api/trpc';

import { getJobWorkflows } from './getJobWorkflowsActions';
import { updateJobWorkflowsActions } from './updateJobWorkflowsActions';

export const workflow = createTRPCRouter({
  getJobWorkflows,
  updateJobWorkflowsActions,
});
