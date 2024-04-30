import { createContext, ReactNode, useContext } from 'react';

import useJobInterviewPlanActions from './hooks';
import { JobInterviewPlanContextType } from './types';

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

export const useJobInterviewPlanWarnings = () => {
  const jobInterviewPlan = useJobInterviewPlan();
  const isInterviewPlanDisabled =
    jobInterviewPlan && !jobInterviewPlan?.interviewPlans?.data;
  const isInterviewSessionEmpty =
    jobInterviewPlan &&
    jobInterviewPlan.interviewPlans?.data?.interview_session?.length === 0;
  return { isInterviewPlanDisabled, isInterviewSessionEmpty };
};
