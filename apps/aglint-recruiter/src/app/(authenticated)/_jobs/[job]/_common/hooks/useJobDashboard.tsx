import { useContext } from 'react';

import { JobDashboardContext } from '@/job/contexts/jobDashboardContext';

export const useJobDashboard = () => {
  const value = useContext(JobDashboardContext);
  if (!value) throw new Error('JobContext not found as a provider');
  return value;
};
