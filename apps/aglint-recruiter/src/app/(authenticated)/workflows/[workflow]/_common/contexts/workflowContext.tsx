import { createContext, memo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useRouterPro } from '@/hooks/useRouterPro';
import {
  useWorkflowActionCreate,
  useWorkflowActionDelete,
  useWorkflowActionMutations,
  useWorkflowActions,
  useWorkflowActionUpdate,
} from '@/queries/workflow-action';
import { useWorkflows } from '@/workflows/hooks';

const useWorkflowContext = () => {
  const {
    params: { workflow: id },
  } = useRouterPro();
  const {
    workflows,
    workflowUpdate: {
      mutate: updateWorkflowMuation,
      mutateAsync: updateWorkflowAsyncMuation,
    },
    devlinkProps,
    manageWorkflow,
  } = useWorkflows();

  const workflow = (workflows ?? []).find((workflow) => workflow.id === id);

  if (!workflow) throw new Error('Workflow not found');

  const handleUpdateWorkflow = useCallback(
    (payload: Parameters<typeof updateWorkflowMuation>[0]['payload']) =>
      updateWorkflowMuation({ id: workflow?.id ?? null!, payload }),
    [workflow],
  );

  const handleAsyncUpdateWorkflow = useCallback(
    async (payload: Parameters<typeof updateWorkflowMuation>[0]['payload']) => {
      try {
        await updateWorkflowAsyncMuation({
          id: workflow?.id ?? null!,
          payload,
        });
      } catch {
        //
      }
    },
    [workflow],
  );

  const actions = useWorkflowActions({ workflow_id: workflow?.id ?? null! })!;
  const actionMutations = useWorkflowActionMutations({
    workflow_id: workflow?.id ?? null!,
  });
  const { mutate: createActionMutation } = useWorkflowActionCreate({
    workflow_id: workflow?.id ?? null!,
  });
  const { mutate: handleDeleteAction } = useWorkflowActionDelete({
    workflow_id: workflow?.id ?? null!,
  });
  const { mutate: handleUpdateAction } = useWorkflowActionUpdate({
    workflow_id: workflow?.id ?? null!,
  });

  const handleCreateAction = useCallback(
    (payload: Parameters<typeof createActionMutation>[0]) => {
      const id = uuidv4();
      createActionMutation({
        ...payload,
        workflow_id: workflow?.id ?? null!,
        id,
      });
    },
    [workflow],
  );

  return {
    workflow,
    actions,
    actionMutations,
    handleUpdateWorkflow,
    handleAsyncUpdateWorkflow,
    handleCreateAction,
    handleDeleteAction,
    handleUpdateAction,
    devlinkProps,
    manageWorkflow,
  };
};

export const WorkflowContext = createContext<
  ReturnType<typeof useWorkflowContext> | undefined
>(undefined);

export const WorkflowProvider = memo((props: React.PropsWithChildren) => {
  const value = useWorkflowContext();
  return (
    <WorkflowContext.Provider value={value}>
      {props.children}
    </WorkflowContext.Provider>
  );
});
WorkflowProvider.displayName = 'WorkflowProvider';
