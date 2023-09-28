import { Job } from '@context/JobsContext/types';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { Database } from '@/src/types/schema';

export type JobApplicationsData = {
  applications: JobApplication[] | undefined;
  job: Job;
};

export type JobApplication =
  Database['public']['Tables']['job_applications']['Row'];

export type InputData = Partial<
  Omit<JobApplication, 'id' | 'created_at' | 'job_id' | 'application_id'>
>;

export type JobApplicationContext = {
  applicationsData: JobApplicationsData;
  handleJobApplicationCreate: (
    // eslint-disable-next-line no-unused-vars
    inputData: Pick<
      JobApplication,
      'first_name' | 'last_name' | 'email' | 'score'
    > &
      InputData,
  ) => Promise<boolean>;
  handleJobApplicationBulkCreate: (
    // eslint-disable-next-line no-unused-vars
    inputData: (Pick<
      JobApplication,
      'first_name' | 'last_name' | 'email' | 'score'
    > &
      InputData)[],
  ) => Promise<boolean>;
  handleJobApplicationRead: () => Promise<boolean>;
  handleJobApplicationUpdate: (
    // eslint-disable-next-line no-unused-vars
    applicationId: string,
    // eslint-disable-next-line no-unused-vars
    inputData: InputData,
  ) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handleJobApplicationDelete: (applicationId: string) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handleJobApplicationError: (error: any) => void;
  initialLoad: boolean;
  circularScoreAnimation: MutableRefObject<boolean>;
  openImportCandidates: boolean;
  setOpenImportCandidates: Dispatch<SetStateAction<boolean>>;
};
