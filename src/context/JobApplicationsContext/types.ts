/* eslint-disable no-unused-vars */

import { ScoreWheelParams } from '@/src/components/Common/ScoreWheel';
import {
  FilterParameter,
  SortParameter,
} from '@/src/components/JobApplicationsDashboard/utils';
import { PanelType } from '@/src/components/Scheduling/Panels/store';
import { ReadJobApplicationApi } from '@/src/pages/api/jobApplications/read';
import { PromptEnum } from '@/src/pages/api/resumeScoring/types';
import { Applications } from '@/src/types/applications.types';
import { AssessmentResults } from '@/src/types/assessment_results.types';
import { CandidateFiles } from '@/src/types/candidate_files.types';
import { Candidate } from '@/src/types/candidates.types';
import { InterviewScheduleTypeDB } from '@/src/types/data.types';

import useProviderJobApplicationActions from './hooks';

export enum JobApplicationSections {
  NEW = 'new',
  SCREENING = 'screening',
  ASSESSMENT = 'assessment',
  INTERVIEW = 'interview',
  QUALIFIED = 'qualified',
  DISQUALIFIED = 'disqualified',
}

export type CardStateManager = {
  [key in JobApplicationSections]?: {
    checkList: {
      list: Set<string>;
      disabled: boolean;
    };
    disabledList: Set<string>;
  };
};
export type JobApplicationsData = ReadJobApplicationApi['response']['data'];

export type JobApplication = Applications & {
  candidates: Partial<Candidate> & { id: Candidate['id'] };
  candidate_files: Partial<CandidateFiles> & { id: CandidateFiles['id'] };
  assessment_results: Partial<AssessmentResults> & {
    id: AssessmentResults['id'];
  };
  schedule: Partial<InterviewScheduleTypeDB>;
  panel: Partial<PanelType>;
  emailValidity?: {
    isFetching: boolean;
    isValidEmail: boolean;
  };
};

export type Parameters = {
  sort: SortParameter;
  filter: FilterParameter;
  search: string;
};

export type JobApplicationContext = ReturnType<
  typeof useProviderJobApplicationActions
>;

export type ScoreJson = {
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
