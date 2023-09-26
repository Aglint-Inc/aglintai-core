import { Database } from '@/src/types/schema';

export type JobsData = {
  jobs: Job[] | undefined;
};

export type Job = Database['public']['Tables']['public_jobs']['Row'];

export type InputData = Partial<
  Omit<Job, 'id' | 'created_at' | 'recruiter_id'>
>;

export type JobContext = {
  jobsData: JobsData;
  // eslint-disable-next-line no-unused-vars
  handleJobCreate: (inputData: InputData) => Promise<boolean>;
  handleJobRead: () => Promise<boolean>;
  handleJobUpdate: (
    // eslint-disable-next-line no-unused-vars
    jobId: string,
    // eslint-disable-next-line no-unused-vars
    inputData: InputData,
  ) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handleJobDelete: (jobId: string) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handleJobError: (error: any) => void;
  initialLoad: boolean;
};
