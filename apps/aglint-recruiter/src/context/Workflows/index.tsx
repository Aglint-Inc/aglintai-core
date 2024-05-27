import React, { createContext, useContext, useEffect } from 'react';

import useWorkflowsContext from './hooks';
import { useWorkflowStore } from './store';

const WorkflowsContext =
  createContext<ReturnType<typeof useWorkflowsContext>>(undefined);

const WorkflowsProvider = (props: React.PropsWithChildren) => {
  const value = useWorkflowsContext();
  const reset = useWorkflowStore((state) => state.resetAll);
  useEffect(() => {
    return () => reset();
  }, []);
  return (
    <WorkflowsContext.Provider value={value}>
      {props.children}
    </WorkflowsContext.Provider>
  );
};

export default WorkflowsProvider;

export const useWorkflows = () => {
  return useContext(WorkflowsContext);
};
