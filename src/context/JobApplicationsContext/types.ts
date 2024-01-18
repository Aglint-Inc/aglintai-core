/* eslint-disable no-unused-vars */

import { ScoreWheelParams } from '@/src/components/Common/ScoreWheel';
import {
  FilterParameter,
  SortParameter,
} from '@/src/components/JobApplicationsDashboard/utils';
import { ReadJobApplicationApi } from '@/src/pages/api/jobApplications/read';
import { PromptEnum } from '@/src/pages/api/resumeScoring/types';
import { Applications } from '@/src/types/applications.types';
import { AssessmentResults } from '@/src/types/assessment_results.types';
import { CandidateFiles } from '@/src/types/candidate_files.types';
import { Candidate } from '@/src/types/candidates.types';

import useProviderJobApplicationActions from './hooks';

export enum JobApplicationSections {
  NEW = 'new',
  ASSESSMENT = 'assessment',
  SCREENING = 'screening',
  QUALIFIED = 'qualified',
  DISQUALIFIED = 'disqualified',
}

export type JobApplicationsData = ReadJobApplicationApi['response']['data'];

export type JobApplication = Applications & {
  candidates: Partial<Candidate> & { id: Candidate['id'] };
  candidate_files: Partial<CandidateFiles> & { id: CandidateFiles['id'] };
  assessment_results: Partial<AssessmentResults> & {
    id: AssessmentResults['id'];
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
