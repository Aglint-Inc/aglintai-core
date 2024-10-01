import type {
  DatabaseTableInsert,
  DatabaseTableUpdate,
} from '@aglint/shared-types';

import type { readJob } from '../job';

export type Job = Awaited<ReturnType<typeof readJob>>;

export type JobInsert = DatabaseTableInsert['public_jobs'];

export type JobUpdate = DatabaseTableUpdate['public_jobs'];

export type JobCreate = Required<
  Job['draft'] &
    Pick<
      Job,
      'hiring_manager' | 'recruiter' | 'recruiting_coordinator' | 'sourcer'
    >
>;
