import {
  type DatabaseTableUpdate,
  workflowActionUpdateSchema,
  workflowUpdateSchema,
} from '@aglint/shared-types';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const schema = z.object({
  workflows: z.array(workflowUpdateSchema),
  updated_actions: z.array(workflowActionUpdateSchema),
  deleted_actions: z.array(z.string()),
});
const mutation = async ({ input, ctx }: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;

  const updated_workflows: DatabaseTableUpdate['workflow'][] = input.workflows;
  const updated_workflow_actions: DatabaseTableUpdate['workflow_action'][] =
    input.updated_actions as any;

  await db
    .from('workflow')
    .upsert(updated_workflows as any)
    .select()
    .throwOnError();
  await db
    .from('workflow_action')
    .upsert(updated_workflow_actions as any)
    .select()
    .throwOnError();

  await db
    .from('workflow_action')
    .delete()
    .in('id', input.deleted_actions)
    .throwOnError();
  return { success: true };
};

export const updateJobWorkflowsActions = privateProcedure
  .input(schema)
  .mutation(mutation);

export type UpdateJobWorkflowsActions = ProcedureDefinition<
  typeof updateJobWorkflowsActions
>;
