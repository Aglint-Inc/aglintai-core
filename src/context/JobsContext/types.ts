import { JdJsonType } from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import { Assessment } from '@/src/queries/assessment/types';
import { JobTypeDB, StatusJobs } from '@/src/types/data.types';

import useJobActions from './hooks';
import { JobApplicationSections } from '../JobApplicationsContext/types';

export type JobsData = {
  jobs: JobTypeDashboard[] | undefined;
  applications: ApplicationData[] | undefined;
};

export type ApplicationData = {
  job_id: string;
  status: string;
  email: string;
};

export type InputData = Partial<
  Omit<JobTypeDashboard, 'created_at' | 'recruiter_id'>
>;

export type JobContext = ReturnType<typeof useJobActions>;

export type JobTypeDashboard = Omit<JobTypeDB, 'active_status'> & {
  assessment_job_relation: Partial<{ assessment: Assessment }[]>;
  jd_json: JdJsonType;
  active_status: StatusJobs | null;
  count: CountJobs;
};

// eslint-disable-next-line no-unused-vars
export type CountJobs = { [key in JobApplicationSections]?: number };
