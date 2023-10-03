import { JobApplcationDB, JobType } from '@/src/types/data.types';

export type JobsData = {
  jobs: JobType[] | undefined;
  applications: JobApplcationDB[] | undefined;
};

export type InputData = Partial<Omit<JobType, 'created_at' | 'recruiter_id'>>;

export type JobContext = {
  jobsData: JobsData;
  handleJobRead: () => Promise<JobType[] | undefined>;
  handleJobUpdate: (
    // eslint-disable-next-line no-unused-vars
    jobId: string,
    // eslint-disable-next-line no-unused-vars
    inputData: Partial<JobType>,
  ) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handleUIJobUpdate: (newJob: JobType) => boolean;
  // eslint-disable-next-line no-unused-vars
  handleJobDelete: (jobId: string) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handleJobError: (error: any) => void;
  initialLoad: boolean;
};
