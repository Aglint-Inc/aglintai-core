import { useWorkflow } from '@/src/queries/workflow';

import { useAuthDetails } from '../AuthContext/AuthContext';

const useWorkflowsContext = () => {
  const { recruiter_id } = useAuthDetails();
  const workflows = useWorkflow({ recruiter_id });
  return {
    workflows,
  };
};

export default useWorkflowsContext;
