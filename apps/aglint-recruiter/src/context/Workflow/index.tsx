import React, { createContext, useContext, useEffect } from 'react';

import useWorkflowsContext from './hooks';
import { useWorkflowStore } from './store';

const WorkflowContext =
  createContext<ReturnType<typeof useWorkflowsContext>>(undefined);

const WorkflowProvider = (props: React.PropsWithChildren) => {
  const value = useWorkflowsContext();
  const reset = useWorkflowStore((state) => state.resetAll);
  useEffect(() => {
    return () => reset();
  }, []);
  return (
    <WorkflowContext.Provider value={value}>
      {props.children}
    </WorkflowContext.Provider>
  );
};

export default WorkflowProvider;

export const useWorkflows = () => {
  return useContext(WorkflowContext);
};
