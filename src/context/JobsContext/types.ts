import { JobApplcationDB } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

export type JobsData = {
  jobs: Job[] | undefined;
  applications: JobApplcationDB[] | undefined;
};

// export type Job = Database['public']['Tables']['public_jobs']['Row'];

export type InputData = Partial<Omit<Job, 'created_at' | 'recruiter_id'>>;

export type JobContext = {
  jobsData: JobsData;
  // eslint-disable-next-line no-unused-vars
  handleJobCreate: (inputData: InputData) => Promise<Job>;
  handleJobRead: () => Promise<Job[] | undefined>;
  handleJobUpdate: (
    // eslint-disable-next-line no-unused-vars
    inputData: Job,
  ) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handleJobDelete: (jobId: string) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handleJobError: (error: any) => void;
  initialLoad: boolean;
};

export type Job = Omit<
  Database['public']['Tables']['public_jobs']['Row'],
  'status'
> & { status: Status | null };
export type Status = 'inactive' | 'sourcing' | 'interviewing' | 'closed';
