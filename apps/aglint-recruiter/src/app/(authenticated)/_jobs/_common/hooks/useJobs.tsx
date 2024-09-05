import { useContext } from 'react';

import { JobsContext } from '../context';

export const useJobs = () => {
  const value = useContext(JobsContext);
  return { ...value };
};
