import { useContext } from 'react';

import { JobsContext } from '@/jobs/contexts';

export const useJobs = () => {
  const value = useContext(JobsContext);
  return { ...value };
};
