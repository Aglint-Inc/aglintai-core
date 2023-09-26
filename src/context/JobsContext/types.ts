import { Database } from '@/src/types/schema';

export type JobsData = {
  jobs: Job[] | undefined;
};

export type Job = Database['public']['Tables']['public_jobs']['Row'];

export type JobContext = {
  jobsData: JobsData;
  handleJobCreate: () => Promise<boolean>;
  handleJobRead: () => Promise<boolean>;
  handleJobUpdate: (
    // eslint-disable-next-line no-unused-vars
    jobId: string,
    // eslint-disable-next-line no-unused-vars
    inputData: Partial<Omit<Job, 'id' | 'recruiter_id'>>,
  ) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handleJobDelete: (jobId: string) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handleJobError: (error: any) => void;
  initialLoad: boolean;
};
