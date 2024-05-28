import {
  useWorkflowDelete,
  useWorkflowMutations,
  useWorkflowQuery,
  useWorkflowUpdate,
} from '@/src/queries/workflow';

import { useAuthDetails } from '../AuthContext/AuthContext';

const useWorkflowsContext = () => {
  const { recruiter_id } = useAuthDetails();
  const workflows = useWorkflowQuery({ recruiter_id });
  const workflowDelete = useWorkflowDelete({ recruiter_id });
  const workflowUpdate = useWorkflowUpdate({ recruiter_id });
  const workflowMutations = useWorkflowMutations({ recruiter_id });
  return {
    workflows,
    workflowDelete,
    workflowUpdate,
    workflowMutations,
  };
};

export default useWorkflowsContext;
