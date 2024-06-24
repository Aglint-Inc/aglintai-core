import {
  DatabaseEnums,
  DatabaseTable,
  DatabaseTableInsert,
  StatusJobs,
} from '@aglint/shared-types';
import { DB } from '@aglint/shared-types';

import { ScoreWheelParams } from '@/src/components/Common/ScoreWheel';
import { CountJobs } from '@/src/context/JobsContext/types';

type JobTableRPC = DB['public']['Functions']['getjob']['Returns'][number];

export type Job = Omit<JobTableRPC, keyof CustomJobType> & CustomJobType;

export type JobInsert = Omit<
  DatabaseTableInsert['public_jobs'],
  keyof CustomJobType
> &
  Partial<Omit<CustomJobType, JobLocal>>;
export type JobLocal =
  | 'count'
  | 'processing_count'
  | 'interview_plan'
  | 'activeSections';

export type JobCreate = Required<
  Job['draft'] &
    Pick<
      Job,
      'hiring_manager' | 'recruiter' | 'recruiting_coordinator' | 'sourcer'
    >
> & {
  description_hash: Job['description_hash'];
};

type CustomJobType = {
  jd_json: DatabaseTable['public_jobs']['jd_json'];
  active_status: StatusJobs | null;
  count: CountJobs;
  activeSections: DatabaseEnums['application_status'][];
  // eslint-disable-next-line no-unused-vars
  processing_count: {
    // eslint-disable-next-line no-unused-vars
    [id in DB['public']['Enums']['application_processing_status']]: number;
  };
  parameter_weights: ScoreWheelParams;

  draft: Pick<
    JobTableRPC,
    | 'job_title'
    | 'description'
    | 'department'
    | 'company'
    | 'workplace_type'
    | 'job_type'
    | 'location'
  > & { jd_json: DatabaseTable['public_jobs']['jd_json'] };
};
