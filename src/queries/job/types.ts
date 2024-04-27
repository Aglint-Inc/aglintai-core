import { ScoreWheelParams } from '@/src/components/Common/ScoreWheel';
import { JdJsonType } from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import { CountJobs, InterviewPlan } from '@/src/context/JobsContext/types';
import { StatusJobs } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

type JobTableRPC =
  Database['public']['Functions']['getjobs']['Returns'][number];
type JobTable = Database['public']['Tables']['public_jobs'];

// export type Job = Pick<
//   Omit<JobTableRPC, keyof CustomJobType> & CustomJobType,
//   | 'active_status'
//   | 'assessment'
//   | 'company'
//   | 'count'
//   | 'created_at'
//   | 'department'
//   | 'description'
//   | 'description_hash'
//   | 'draft'
//   | 'email_template'
//   | 'id'
//   | 'jd_json'
//   | 'job_title'
//   | 'job_type'
//   | 'location'
//   | 'parameter_weights'
//   | 'phone_screen_enabled'
//   | 'posted_by'
//   | 'recruiter_id'
//   | 'scoring_criteria_loading'
//   | 'status'
//   | 'workplace_type'
// >;

export type Job = Omit<JobTableRPC, keyof CustomJobType> & CustomJobType;

export type JobInsert = Omit<JobTable['Insert'], keyof CustomJobType> &
  Partial<Omit<CustomJobType, 'count' | 'processing_count'>>;

export type JobCreate = Required<Job['draft']> & {
  description_hash: Job['description_hash'];
};

type CustomJobType = {
  jd_json: JdJsonType;
  active_status: StatusJobs | null;
  count: CountJobs;
  // eslint-disable-next-line no-unused-vars
  email_template: { [key in EmailTemplateTypes]: EmailTemplate };
  processing_count: {
    // eslint-disable-next-line no-unused-vars
    [id in Database['public']['Enums']['application_processing_status']]: number;
  };
  parameter_weights: ScoreWheelParams;
  interview_plan: InterviewPlan;
  draft: Pick<
    JobTableRPC,
    | 'job_title'
    | 'description'
    | 'department'
    | 'company'
    | 'workplace_type'
    | 'job_type'
    | 'location'
  > & { jd_json: JdJsonType };
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
  default: string;
  subject: string;
  fromName: string;
};
