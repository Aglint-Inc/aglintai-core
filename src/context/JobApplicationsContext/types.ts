/* eslint-disable no-unused-vars */
import { Job } from '@context/JobsContext/types';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { Database } from '@/src/types/schema';

export enum JobApplicationSections {
  APPLIED = 'applied',
  INTERVIEWING = 'interviewing',
  SELECTED = 'selected',
  REJECTED = 'rejected',
}

export type JobApplicationSectionData = {
  [key in JobApplicationSections]:
    | {
        list: JobApplication[];
        count: number;
      }
    | undefined;
};

export type JobApplicationsData = {
  applications: JobApplicationSectionData;
  count: number;
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
    inputData: Pick<
      JobApplication,
      'first_name' | 'last_name' | 'email' | 'score'
    > &
      InputData,
  ) => Promise<boolean>;
  handleJobApplicationBulkCreate: (
    inputData: (Pick<
      JobApplication,
      'first_name' | 'last_name' | 'email' | 'score'
    > &
      InputData)[],
  ) => Promise<boolean>;
  handleJobApplicationRead: () => Promise<boolean>;
  handleJobApplicationUpdate: (
    applicationId: string,

    inputData: InputData,
  ) => Promise<boolean>;

  handleJobApplicationDelete: (
    applicationId: string,
    applicationStatus: JobApplicationSections,
  ) => Promise<boolean>;
  handleJobApplicationError: (error: any) => void;
  initialLoad: boolean;
  circularScoreAnimation: MutableRefObject<boolean>;
  openImportCandidates: boolean;
  setOpenImportCandidates: Dispatch<SetStateAction<boolean>>;
  handleUpdateJobStatus: (
    applicationIdSet: Set<string>,
    sections: {
      source: JobApplicationSections;
      destination: JobApplicationSections;
    },
  ) => Promise<boolean>;
};
