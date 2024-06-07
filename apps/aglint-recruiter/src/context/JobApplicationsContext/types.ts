/* eslint-disable no-unused-vars */

import { Applications } from '@aglint/shared-types';
import { CandidateFiles } from '@aglint/shared-types';
import { InterviewScheduleTypeDB } from '@aglint/shared-types';
import { Candidate } from '@aglint/shared-types';

import { PromptEnum } from '@/src/apiUtils/resumeScoring/types';
import { ScoreWheelParams } from '@/src/components/Common/ScoreWheel';
import {
  FilterParameter,
  SortParameter,
} from '@/src/components/JobApplicationsDashboard/utils';
import { ApplicationList } from '@/src/components/Scheduling/Candidates/utils';
import { ReadJobApplicationApi } from '@/src/pages/api/job/jobApplications/read';
import { AssessmentResult } from '@/src/queries/assessment/types';
import { Job } from '@/src/queries/job/types';

import { TasksAgentContextType } from '../TasksContextProvider/TasksContextProvider';
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
  assessment_results: (Partial<AssessmentResult> & {
    id: AssessmentResult['id'];
  })[];
  schedule: Partial<InterviewScheduleTypeDB>;
  interview_session_meetings: ApplicationList['interview_session_meetings'];
  emailValidity?: {
    isFetching: boolean;
    isValidEmail: boolean;
  };
  status_emails_sent: Partial<{ [key in keyof Job['email_template']]: string }>;
  tasks: TasksAgentContextType['tasks'];
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
