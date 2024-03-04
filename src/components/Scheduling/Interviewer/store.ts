import { create } from 'zustand';

import {
  CandidateFileTypeDB,
  CandidateType,
  InterviewModuleType,
  InterviewScheduleTypeDB,
  JobApplcationDB,
} from '@/src/types/data.types';

interface InterviewerSlice {
  schedules: ScheduleType[];
  selectedSchedule: ScheduleType | null;
  members: {
    user_id: string;
    first_name: string;
    email: string;
    profile_image: string;
  }[];
  loading: boolean;
}

const initialState: InterviewerSlice = {
  schedules: [],
  selectedSchedule: null,
  members: [],
  loading: true,
};

export const useInterviewerStore = create<InterviewerSlice>()(() => ({
  ...initialState,
}));

export const setSchedules = (schedules: ScheduleType[]) =>
  useInterviewerStore.setState({ schedules });

export const setSelectedSchedule = (selectedSchedule: ScheduleType) =>
  useInterviewerStore.setState({ selectedSchedule });

export const setMembers = (members: InterviewerSlice['members']) =>
  useInterviewerStore.setState({ members });

export const setLoading = (loading: boolean) =>
  useInterviewerStore.setState({ loading });

export type ScheduleType = {
  applications: JobApplcationDB & {
    score_json: ScoreJson;
  };
  file: CandidateFileTypeDB;
  candidate: CandidateType;
  schedule: InterviewScheduleTypeDB & {
    schedule_time: {
      startTime: string;
      endTime: string;
      user_ids: string[];
    } | null;
    panel_users: {
      user_id: string;
      must: string;
    }[];
  };
  job: {
    id: string;
    created_at: string;
    job_title: string;
    description: string;
    parameter_weights: {
      education: number;
      experience: number;
      skills: number;
    };
    recruiter_id: string;
    jd_json: JSON;
  };
  panel: InterviewModuleType;
};

interface ScoreJson {
  badges: {
    skills: number;
    schools: number;
    positions: number;
    leadership: number;
    careerGrowth: number;
    jobStability: number;
  };
  scores: {
    skills: number;
    education: number;
    experience: number;
  };
  reasoning: {
    skills: string;
    schools: string;
    positions: string;
  };
  relevance: {
    skills: {
      [key: number]: 'high' | 'medium' | 'low';
    };
    schools: {
      [key: number]: 'high' | 'medium' | 'low';
    };
    positions: {
      [key: number]: 'high' | 'medium' | 'low';
    };
  };
}
