import { DatabaseTable } from '@aglint/shared-types';

import useJobActions from './hooks';

export type JobContext = ReturnType<typeof useJobActions>;
export type CountJobs = {
  // eslint-disable-next-line no-unused-vars
  [key in DatabaseTable['applications']['status']]?: number;
};
