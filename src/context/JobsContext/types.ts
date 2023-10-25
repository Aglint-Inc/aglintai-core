import { JobType } from '@/src/types/data.types';

export type JobsData = {
  jobs: JobType[] | undefined;
  applications: ApplicationData[] | undefined;
};

export type ApplicationData = {
  job_id: string;
  status: string;
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
  // eslint-disable-next-line no-unused-vars
  handleGetJob: (jobId: string) => JobType;
  // eslint-disable-next-line no-unused-vars
  handleApplicationsRead: (jobIds: string[]) => void;
  initialLoad: boolean;
};
