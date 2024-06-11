import React, { createContext, useContext } from 'react';

import useWorkflowContext from './hooks';

const WorkflowContext =
  createContext<ReturnType<typeof useWorkflowContext>>(undefined);

const WorkflowProvider = (props: React.PropsWithChildren) => {
  const value = useWorkflowContext();
  return (
    <WorkflowContext.Provider value={value}>
      {props.children}
    </WorkflowContext.Provider>
  );
};

export default WorkflowProvider;

export const useWorkflow = () => {
  return useContext(WorkflowContext);
};
