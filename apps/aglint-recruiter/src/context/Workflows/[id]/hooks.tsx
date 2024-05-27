import { useRouter } from 'next/router';

import { useWorkflows } from '..';

const useWorkflowContext = () => {
  const {
    query: { id },
  } = useRouter();
  const {
    workflows: { data, status },
  } = useWorkflows();
  const workflow =
    status === 'success'
      ? (data ?? []).find((workflow) => workflow.id === id)
      : null;
  return {
    workflow,
  };
};

export default useWorkflowContext;
