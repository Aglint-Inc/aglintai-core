import { useContext } from 'react';

import { JobsContext } from '@/jobs/contexts';

export const useJobs = () => {
  const value = useContext(JobsContext);
  if (!value) throw new Error('JobsContext not found as a provider');
  return value;
};
