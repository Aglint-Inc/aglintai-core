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

import useProviderJobApplicationActions from './hooks';
import { Candidate } from '../CandidatesContext/types';

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
  | 'applied_at'
  | 'is_resume_fetching'
>;
export type NewJobApplicationsInsert =
  Database['public']['Tables']['job_applications']['Insert'];
export type NewJobApplicationsUpdate =
  Database['public']['Tables']['job_applications']['Update'];

export interface JobApplication extends NewJobApplications {
  candidates: Candidate;
}

export type Parameters = {
  sort: SortParameter;
  filter: FilterParameter;
  search: string;
};

export type JobApplicationContext = ReturnType<
  typeof useProviderJobApplicationActions
>;

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
  reasoning: {
    skills: string;
    schools: string;
    positions: string;
  };
};
