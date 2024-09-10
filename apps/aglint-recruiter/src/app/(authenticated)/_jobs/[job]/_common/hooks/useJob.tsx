import { useContext } from 'react';

import { JobContext } from '@/job/contexts/jobContext';

export const useJob = () => {
  const value = useContext(JobContext);
  if (value === undefined) throw Error('JobProvider not found');
  return value;
};
