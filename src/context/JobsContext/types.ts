// import { InterviewPlanScheduleDbType } from '@/src/components/JobInterviewPlan/types';
import { Job } from '@/src/queries/job/types';

import { JobApplicationSections } from '../JobApplicationsContext/types';
// import { Assessment } from '@/src/queries/assessment/types';
import useJobActions from './hooks';

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
export type JobTypeDashboard = Job;
// eslint-disable-next-line no-unused-vars
export type CountJobs = { [key in JobApplicationSections]?: number };

export type InterviewPlan = any; //update or delete this line once new interview plan is implemented
