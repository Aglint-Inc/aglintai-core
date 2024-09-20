import { useContext } from 'react';

import { WorkflowsContext } from '@/workflows/contexts';

export const useWorkflows = () => {
  const value = useContext(WorkflowsContext);
  if (!value) throw new Error('JobContext not found as a provider');
  return value;
};
