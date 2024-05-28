import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  useWorkflowActionCreate,
  useWorkflowActionDelete,
  useWorkflowActionMutations,
  useWorkflowActions,
  useWorkflowActionUpdate,
} from '@/src/queries/workflow-action';

import { useWorkflows } from '..';

const useWorkflowContext = () => {
  const {
    query: { id },
  } = useRouter();
  const {
    workflows: { data, status },
    workflowDelete: { mutate: deleteWorkflowMutation },
    workflowUpdate: { mutate: updateWorkflowMuation },
  } = useWorkflows();

  const workflow = useMemo(
    () =>
      status === 'success'
        ? (data ?? []).find((workflow) => workflow.id === id)
        : null,
    [status, data],
  );

  const handleDeleteWorkflow = useCallback(
    () => deleteWorkflowMutation({ id: workflow?.id ?? null }),
    [workflow],
  );
  const handleUpdateWorkflow = useCallback(
    (payload: Parameters<typeof updateWorkflowMuation>[0]['payload']) =>
      updateWorkflowMuation({ id: workflow?.id ?? null, payload }),
    [workflow],
  );

  const actions = useWorkflowActions({ workflow_id: workflow?.id });
  const actionMutations = useWorkflowActionMutations({
    workflow_id: workflow?.id,
  });
  const { mutate: createActionMutation } = useWorkflowActionCreate({
    workflow_id: workflow?.id,
  });
  const { mutate: deleteActionMutation } = useWorkflowActionDelete({
    workflow_id: workflow?.id,
  });
  const { mutate: updateActionMutation } = useWorkflowActionUpdate({
    workflow_id: workflow?.id,
  });

  const handleCreateAction = useCallback(
    (payload: Parameters<typeof createActionMutation>[0]['payload']) => {
      const id = uuidv4();
      createActionMutation({
        id,
        payload,
        workflow_id: workflow?.id,
      });
    },
    [workflow],
  );
  const handleDeleteAction = useCallback(
    () => deleteActionMutation({ id: workflow?.id }),
    [workflow],
  );
  const handleUpdateAction = useCallback(
    (payload: Parameters<typeof updateActionMutation>[0]['payload']) =>
      updateActionMutation({ id: workflow?.id, payload }),
    [workflow],
  );

  return {
    workflow,
    actions,
    actionMutations,
    handleDeleteWorkflow,
    handleUpdateWorkflow,
    handleCreateAction,
    handleDeleteAction,
    handleUpdateAction,
  };
};

export default useWorkflowContext;
