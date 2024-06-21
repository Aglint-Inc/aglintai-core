import { DatabaseEnums, DatabaseTable, StatusJobs } from '@aglint/shared-types';
import { DB } from '@aglint/shared-types';

import { ScoreWheelParams } from '@/src/components/Common/ScoreWheel';
import { CountJobs } from '@/src/context/JobsContext/types';

type JobTableRPC = DB['public']['Functions']['getjob']['Returns'][number];
type JobTable = DB['public']['Tables']['public_jobs'];

export type Job = Omit<JobTableRPC, keyof CustomJobType> & CustomJobType;

export type JobInsert = Omit<JobTable['Insert'], keyof CustomJobType> &
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
  email_template: { [key in EmailTemplateTypes]: EmailTemplate };
  processing_count: {
    // eslint-disable-next-line no-unused-vars
    [id in DB['public']['Enums']['application_processing_status']]: number;
  };
  parameter_weights: ScoreWheelParams;
  interview_plan: any;

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

type EmailTemplateTypes =
  | 'interview'
  | 'interview_resend'
  | 'rejection'
  | 'phone_screening'
  | 'phone_screening_resend'
  | 'application_received'
  | 'init_email_agent';

type EmailTemplate = {
  body: string;
  default: boolean;
  subject: string;
  fromName: string;
};
