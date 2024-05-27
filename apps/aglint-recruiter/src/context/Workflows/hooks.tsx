import { useWorkflowQuery } from '@/src/queries/workflow';

import { useAuthDetails } from '../AuthContext/AuthContext';

const useWorkflowsContext = () => {
  const { recruiter_id } = useAuthDetails();
  const workflows = useWorkflowQuery({ recruiter_id });
  return {
    workflows,
  };
};

export default useWorkflowsContext;
