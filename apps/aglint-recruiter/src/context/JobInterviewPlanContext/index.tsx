import { type ReactNode, createContext, useContext } from 'react';

import useJobInterviewPlanActions from './hooks';
import { type JobInterviewPlanContextType } from './types';

const JobInterviewPlanContext = createContext(undefined);

const JobInterviewPlanProvider = ({ children }: { children: ReactNode }) => {
  const value = useJobInterviewPlanActions();
  return (
    <JobInterviewPlanContext.Provider value={value}>
      {children}
    </JobInterviewPlanContext.Provider>
  );
};

export default JobInterviewPlanProvider;

export const useJobInterviewPlan = (): JobInterviewPlanContextType => {
  const value = useContext(JobInterviewPlanContext);
  return value && { ...value };
};
