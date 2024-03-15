import { JdJsonType } from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import { CountJobs, InterviewPlan } from '@/src/context/JobsContext/types';
import { StatusJobs } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

type JobTableRPC =
  Database['public']['Functions']['getjobs']['Returns'][number];
type JobTable = Database['public']['Tables']['public_jobs'];

export type Job = Omit<JobTableRPC, keyof CustomJobType> & CustomJobType;

export type JobInsert = Omit<JobTable['Insert'], keyof CustomJobType> &
  Partial<Omit<CustomJobType, 'count'>>;

export type JobCreate = Required<Job['draft']> & {
  description_hash: Job['description_hash'];
};

type CustomJobType = {
  jd_json: JdJsonType;
  active_status: StatusJobs | null;
  count: CountJobs;
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
