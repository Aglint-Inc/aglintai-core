import {
  type DatabaseTableUpdate,
  workflowActionUpdateSchema,
  workflowUpdateSchema,
} from '@aglint/shared-types';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
const schema = z.object({
  workflows: z.array(workflowUpdateSchema),
  updated_actions: z.array(workflowActionUpdateSchema),
  deleted_actions: z.array(z.string()),
});
const mutation = async ({ input }: PrivateProcedure<typeof schema>) => {
  const db = createPrivateClient();

  const updated_workflows: DatabaseTableUpdate['workflow'][] = input.workflows;
  const updated_workflow_actions: DatabaseTableUpdate['workflow_action'][] =
    input.updated_actions as any;

  db.from('workflow')
    .upsert(updated_workflows as any)
    .select()
    .throwOnError();
  db.from('workflow_action')
    .upsert(updated_workflow_actions as any)
    .select()
    .throwOnError();

  db.from('workflow_action')
    .delete()
    .in(
      'id',
      input.deleted_actions.map((id) => id),
    )
    .throwOnError();
  return { success: true };
};

export const updateJobWorkflowsActions = privateProcedure
  .input(schema)
  .mutation(mutation);
