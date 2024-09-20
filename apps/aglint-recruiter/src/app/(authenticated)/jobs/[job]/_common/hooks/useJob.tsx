import { useContext } from 'react';

import { JobContext } from '@/job/contexts/jobContext';

export const useJob = () => {
  const value = useContext(JobContext);
  if (!value) throw new Error('JobContext not found as a provider');
  return value;
};
