import { useContext } from 'react';

import { JobInterviewPlanContext } from '../contexts/jobInterviewPlanContext';

export const useJobInterviewPlan = () => {
  const value = useContext(JobInterviewPlanContext);
  if (!value)
    throw new Error('JobInterviewPlanContext not found as a provider');
  return value;
};
