import { useContext } from 'react';

import { JobsContext } from '@/jobs/contexts';

export const useJobsContext = () => {
  const value = useContext(JobsContext);
  if (!value) throw new Error('JobsContext not found as a provider');
  return value;
};
