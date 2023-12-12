/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from 'react';

import { ScoreWheelParams } from '@/src/components/Common/ScoreWheel';
import {
  FilterParameter,
  SortParameter,
} from '@/src/components/JobApplicationsDashboard/utils';
import { ReadJobApplicationApi } from '@/src/pages/api/JobApplicationsApi/read';
import { PromptEnum } from '@/src/pages/api/resumeScoring/types';
import { Database } from '@/src/types/schema';

import { Candidate } from '../CandidatesContext/types';
import { JobTypeDashboard } from '../JobsContext/types';

export enum JobApplicationSections {
  NEW = 'new',
  INTERVIEWING = 'interviewing',
  QUALIFIED = 'qualified',
  DISQUALIFIED = 'disqualified',
}

export type JobApplicationsData = ReadJobApplicationApi['response']['data'];

export type NewJobApplications = Pick<
  Database['public']['Tables']['job_applications']['Row'],
  | 'application_id'
  | 'created_at'
  | 'resume_score'
  | 'feedback'
  | 'conversation'
  | 'status'
  | 'jd_score'
  | 'job_id'
  | 'interview_score'
  | 'api_status'
  | 'json_resume'
  | 'resume'
  | 'candidate_id'
  | 'emails'
>;
export type NewJobApplicationsInsert =
  Database['public']['Tables']['job_applications']['Insert'];
export type NewJobApplicationsUpdate =
  Database['public']['Tables']['job_applications']['Update'];

export interface JobApplication extends NewJobApplications {
  candidates: Candidate;
}

export type Parameters = {
  sort?: SortParameter;
  filter?: FilterParameter[];
  search?: string;
};

export type JobApplicationContext = {
  applications: JobApplicationsData;
  paginationLimit: number;
  applicationDisable: boolean;
  setApplicationDisable: Dispatch<SetStateAction<boolean>>;
  job: JobTypeDashboard;
  updateTick: boolean;
  pageNumber: { [key in JobApplicationSections]: number };
  handleJobApplicationCreate: (
    inputData: NewJobApplicationsInsert,
  ) => Promise<boolean>;
  handleJobApplicationBulkCreate: (
    inputData: NewJobApplicationsInsert[],
  ) => Promise<boolean>;
  handleJobApplicationRead: (
    request: ReadJobApplicationApi['request'],
  ) => Promise<{
    confirmation: boolean;
    count: {
      new?: number;
      qualified?: number;
      disqualified?: number;
      interviewing?: number;
    };
  }>;
  handleJobApplicationRefresh: () => Promise<boolean>;
  handleJobApplicationPaginate: (
    pageNumber: number,
    section: JobApplicationSections,
  ) => Promise<boolean>;
  handleJobApplicationUpdate: (
    applicationId: string,

    inputData: NewJobApplicationsUpdate,
  ) => Promise<boolean>;
  handleJobApplicationDelete: (
    applicationId: string,
    applicationStatus: JobApplicationSections,
  ) => Promise<boolean>;
  handleJobApplicationError: (error: any) => void;
  handleJobApplicationFilter: (parameters: Parameters) => Promise<{
    confirmation: boolean;
    count: {
      new?: number;
      qualified?: number;
      disqualified?: number;
      interviewing?: number;
    };
  }>;
  searchParameters: Parameters;
  initialLoad: boolean;
  openImportCandidates: boolean;
  setOpenImportCandidates: Dispatch<SetStateAction<boolean>>;
  openManualImportCandidates: boolean;
  setOpenManualImportCandidates: Dispatch<SetStateAction<boolean>>;
  handleUpdateJobStatus: (
    sections: {
      source: JobApplicationSections;
      destination: JobApplicationSections;
    },
    applicationIdSet?: Set<string>,
    updateAll?: boolean,
  ) => Promise<boolean>;
  section: JobApplicationSections;
  setSection: Dispatch<SetStateAction<JobApplicationSections>>;
};

export type JdScore = {
  scores: ScoreWheelParams;
  badges: {
    skills: number;
    schools: number;
    positions: number;
    leadership: number;
    jobStability: number;
    careerGrowth: number;
  };
  relevance: {
    skills: { [key: string]: PromptEnum };
    schools: { [key: string]: PromptEnum };
    positions: { [key: string]: PromptEnum };
  };
};
