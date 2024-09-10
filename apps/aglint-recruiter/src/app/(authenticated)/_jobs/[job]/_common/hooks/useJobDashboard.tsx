import { useContext } from 'react';

import { JobDashboardContext } from '@/job/contexts/jobDashboardContext';

export const useJobDashboard = () => {
  const value = useContext(JobDashboardContext);
  if (value === undefined) throw Error('JobDashboardContext not found');
  return value;
};
