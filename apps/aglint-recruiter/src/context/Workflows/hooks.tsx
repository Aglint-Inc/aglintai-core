import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  useWorkflowCreate,
  useWorkflowDelete,
  useWorkflowMutations,
  useWorkflowQuery,
  useWorkflowUpdate,
} from '@/src/queries/workflow';

import { useAuthDetails } from '../AuthContext/AuthContext';

const useWorkflowsContext = () => {
  const { recruiter_id } = useAuthDetails();
  const workflows = useWorkflowQuery({ recruiter_id });
  const { mutate: createWorkflowMutation } = useWorkflowCreate({
    recruiter_id,
  });
  const { mutate: deleteWorkflowMutation } = useWorkflowDelete({
    recruiter_id,
  });
  const workflowUpdate = useWorkflowUpdate({ recruiter_id });
  const workflowMutations = useWorkflowMutations({ recruiter_id });

  const handleCreateWorkflow = useCallback(
    (
      payload: Omit<
        Parameters<typeof createWorkflowMutation>[0]['payload'],
        'recruiter_id'
      >,
    ) => {
      const id = uuidv4();
      createWorkflowMutation({
        id,
        recruiter_id,
        payload,
      });
    },
    [workflows.data],
  );

  const handleDeleteWorkflow = useCallback(
    (payload: Parameters<typeof deleteWorkflowMutation>[0]) => {
      deleteWorkflowMutation(payload);
    },
    [workflows.data],
  );

  return {
    workflows,
    workflowUpdate,
    workflowMutations,
    handleCreateWorkflow,
    handleDeleteWorkflow,
  };
};

export default useWorkflowsContext;
