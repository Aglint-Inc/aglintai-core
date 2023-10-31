/* eslint-disable no-unused-vars */
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import {
  FilterParameter,
  SortParameter,
} from '@/src/components/JobApplicationsDashboard/utils';
import { ReadJobApplicationApi } from '@/src/pages/api/JobApplicationsApi/read';
import { Database } from '@/src/types/schema';

import { JobTypeDashboard } from '../JobsContext/types';

export enum JobApplicationSections {
  NEW = 'new',
  INTERVIEWING = 'interviewing',
  QUALIFIED = 'qualified',
  DISQUALIFIED = 'disqualified',
}

export type JobApplicationsData = ReadJobApplicationApi['response']['data'];

export type JobApplication =
  Database['public']['Tables']['job_applications']['Row'];

export type InputData = Partial<
  Omit<JobApplication, 'id' | 'created_at' | 'job_id' | 'application_id'>
>;

export type Parameters = {
  sort?: SortParameter;
  filter?: FilterParameter[];
  search?: string;
};

export type JobApplicationContext = {
  applications: JobApplicationsData;
  applicationDepth: { [key in JobApplicationSections]: number };
  job: JobTypeDashboard;
  updateTick: boolean;
  handleJobApplicationCreate: (
    inputData: Pick<JobApplication, 'first_name' | 'last_name' | 'email'> &
      InputData,
  ) => Promise<JobApplication>;
  handleJobApplicationBulkCreate: (
    inputData: (Pick<JobApplication, 'first_name' | 'last_name' | 'email'> &
      InputData)[],
  ) => Promise<JobApplication[]>;
  handleJobApplicationRead: (
    request: ReadJobApplicationApi['request'],
  ) => Promise<boolean>;
  handleJobApplicationPaginatedRead: ([
    section,
  ]: JobApplicationSections[]) => Promise<boolean>;
  handleJobApplicationPaginatedPolling: (
    sections: JobApplicationSections[],
  ) => Promise<boolean>;
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
  handleJobApplicationFilter: (parameters: Parameters) => Promise<void>;
  searchParameters: Parameters;
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
