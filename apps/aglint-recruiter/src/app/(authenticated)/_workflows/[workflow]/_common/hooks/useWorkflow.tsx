import { useContext } from 'react';

import { WorkflowContext } from '@/workflow/contexts';

export const useWorkflow = () => {
  const value = useContext(WorkflowContext);
  if (!value) throw new Error('WorkflowContext is not found as provider');
  return value;
};
