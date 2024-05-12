import { create } from 'zustand';

import { ResumeJson } from '@/src/apiUtils/resumeScoring/types';
import {
  type CandidateType,
  type InterviewMeetingTypeDb,
  type InterviewScheduleTypeDB,
  type InterviewSession,
  type JobApplcationDB,
} from '@/src/types/data.types';

export interface InterviewSlice {
  fetching: boolean;
  isRescheduleOpen: boolean;
  isCancelOpen: boolean;
}

export enum FilterType {
  // eslint-disable-next-line no-unused-vars
  relatedJobs = 'relatedJobs',
  // eslint-disable-next-line no-unused-vars
  interviewPanels = 'interviewPanels',
  // eslint-disable-next-line no-unused-vars
  scheduleType = 'scheduleType',
  // eslint-disable-next-line no-unused-vars
  status = 'status',
  // eslint-disable-next-line no-unused-vars
  coordinator = 'coordinator',
}

const initialState: InterviewSlice = {
  fetching: false,
  isRescheduleOpen: false,
  isCancelOpen: false,
};

export const useInterviewSchedulingStore = create<InterviewSlice>()(() => ({
  ...initialState,
}));

export const setIsRescheduleOpen = (isRescheduleOpen: boolean) =>
  useInterviewSchedulingStore.setState({ isRescheduleOpen });

export const setIsCancelOpen = (isCancelOpen: boolean) =>
  useInterviewSchedulingStore.setState({ isCancelOpen });

export const setFetching = (fetching: boolean) =>
  useInterviewSchedulingStore.setState({ fetching });

export const resetInterviewState = () =>
  useInterviewSchedulingStore.setState({ ...initialState });

export type ApplicationList = {
  applications: JobApplcationDB;
  candidates: CandidateType;
  file: {
    id: string;
    created_at: string;
    file_url: string;
    candidate_id: string;
    resume_json: ResumeJson;
    type: string;
  };
  schedule: InterviewScheduleTypeDB | null;
  public_jobs: {
    id: string;
    job_title: string;
  };
  interview_session_meetings: {
    interview_meeting: null | InterviewMeetingTypeDb;
    interview_session: InterviewSession;
  }[];
};
