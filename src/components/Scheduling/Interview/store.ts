import { create } from 'zustand';

import {
  CandidateFileTypeDB,
  CandidateType,
  InterviewScheduleTypeDB,
  JobApplcationDB,
} from '@/src/types/data.types';

import { PanelType } from '../Panels/store';

interface InterviewSlice {
  applicationList: ApplicationList[];
  initialLoading: boolean;
  isCreateScheduleOpen: boolean;
  selectedApplication: ApplicationList;
  selectedPanel: PanelType;
  selectedUsers: {
    user_id: string;
    must: 'selected' | 'optional' | 'not selected';
  }[];
  filter: {
    status?: string;
    job_id?: string;
    panel_id?: string;
    dateRange?: [Date, Date];
    duration?: number;
    textSearch?: string;
    sortBy?: 'asc' | 'desc';
  };
}

const initialState: InterviewSlice = {
  applicationList: [],
  initialLoading: true,
  isCreateScheduleOpen: false,
  selectedApplication: null,
  selectedPanel: null,
  selectedUsers: [],
  filter: {
    textSearch: '',
  },
};

export const useInterviewStore = create<InterviewSlice>()(() => ({
  ...initialState,
}));

export const setApplicationList = (applicationList: ApplicationList[]) =>
  useInterviewStore.setState({ applicationList });

export const setInitalLoading = (initialLoading: boolean) =>
  useInterviewStore.setState({ initialLoading });

export const setIsCreateScheduleOpen = (isCreateScheduleOpen: boolean) =>
  useInterviewStore.setState({ isCreateScheduleOpen });

export const setSelectedApplication = (selectedApplication: ApplicationList) =>
  useInterviewStore.setState({ selectedApplication });

export const setSelectedPanel = (selectedPanel: PanelType) =>
  useInterviewStore.setState({ selectedPanel });

export const setSelectedUsers = (
  selectedUsers: InterviewSlice['selectedUsers'],
) => useInterviewStore.setState({ selectedUsers });

export const setFilter = (filter: InterviewSlice['filter']) =>
  useInterviewStore.setState((state) => ({
    filter: { ...state.filter, ...filter },
  }));

export const resetInterviewState = () =>
  useInterviewStore.setState({ ...initialState });

export type ApplicationList = JobApplcationDB & {
  candidates: CandidateType;
  candidate_files: CandidateFileTypeDB;
  schedule:
    | (InterviewScheduleTypeDB & {
        schedule_time: {
          startTime: string;
          endTime: string;
          user_ids: string[];
        } | null;
      })
    | null;
  public_jobs: { id: string; job_title: string };
};
