/* eslint-disable no-unused-vars */
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { JobType } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

export enum JobApplicationSections {
  NEW = 'new',
  INTERVIEWING = 'interviewing',
  QUALIFIED = 'qualified',
  DISQUALIFIED = 'disqualified',
}

export type JobApplicationSectionData = {
  [key in JobApplicationSections]: {
    list: JobApplication[];
    count: number;
  };
};

export type JobApplicationsData = {
  applications: JobApplicationSectionData;
  count: number;
};

export type JobApplication =
  Database['public']['Tables']['job_applications']['Row'];

export type InputData = Partial<
  Omit<JobApplication, 'id' | 'created_at' | 'job_id' | 'application_id'>
>;

export type JobApplicationContext = {
  applicationsData: JobApplicationsData;
  job: JobType;
  handleJobApplicationCreate: (
    inputData: Pick<
      JobApplication,
      'first_name' | 'last_name' | 'email' | 'status'
    > &
      InputData,
  ) => Promise<JobApplication>;
  handleJobApplicationBulkCreate: (
    inputData: (Pick<
      JobApplication,
      'first_name' | 'last_name' | 'email' | 'score'
    > &
      InputData)[],
  ) => Promise<JobApplication[]>;
  handleJobApplicationRead: () => Promise<boolean>;
  handleJobApplicationUpdate: (
    applicationId: string,

    inputData: InputData,
  ) => Promise<boolean>;
  handleJobApplicationUIUpdate: (jobApplication: JobApplication) => boolean;
  handleJobApplicationDelete: (
    applicationId: string,
    applicationStatus: JobApplicationSections,
  ) => Promise<boolean>;
  handleJobApplicationError: (error: any) => void;
  initialLoad: boolean;
  circularScoreAnimation: MutableRefObject<boolean>;
  openImportCandidates: boolean;
  setOpenImportCandidates: Dispatch<SetStateAction<boolean>>;
  openManualImportCandidates: boolean;
  setOpenManualImportCandidates: Dispatch<SetStateAction<boolean>>;
  handleUpdateJobStatus: (
    applicationIdSet: Set<string>,
    sections: {
      source: JobApplicationSections;
      destination: JobApplicationSections;
    },
  ) => Promise<boolean>;
};
