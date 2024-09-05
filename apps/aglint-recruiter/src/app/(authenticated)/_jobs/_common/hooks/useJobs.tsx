import { useContext } from 'react';

import { JobsContext } from '@/jobs/contexts/jobsContext';

export const useJobs = () => {
  const value = useContext(JobsContext);
  return { ...value };
};
