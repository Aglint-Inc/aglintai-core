import { DatabaseView } from '@aglint/shared-types';
import { type useWorkflowActions } from '../queries/workflow-action';

export type Workflow = DatabaseView['workflow_view'];

export type WorkflowAction = NonNullable<
  ReturnType<typeof useWorkflowActions>['data']
>[number];
