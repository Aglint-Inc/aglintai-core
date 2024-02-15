import { create } from 'zustand';

import {
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
    status?: (InterviewScheduleTypeDB['status'] | 'not scheduled')[];
    job_ids?: string[];
    scheduleType?: InterviewScheduleTypeDB['schedule_type'][];
    panel_ids?: string[];
    dateRange?: string;
    duration?: number;
    textSearch?: string;
    sortBy?: 'asc' | 'desc';
  };
  pagination: {
    page: number;
    total: number;
  };
  fetching: boolean;
  filterVisible: {
    relatedJobs: boolean;
    interviewPanels: boolean;
    dateRange: boolean;
    duration: boolean;
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
    status: [],
    sortBy: 'asc',
    job_ids: [],
    panel_ids: [],
    scheduleType: [],
  },
  pagination: {
    page: 1,
    total: 0,
  },
  fetching: false,
  filterVisible: {
    relatedJobs: false,
    interviewPanels: false,
    dateRange: false,
    duration: false,
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

export const setFilterVisible = (
  filterVisible: Partial<InterviewSlice['filterVisible']>,
) =>
  useInterviewStore.setState((state) => ({
    filterVisible: { ...state.filterVisible, ...filterVisible },
  }));

export const setPagination = (
  pagination: Partial<InterviewSlice['pagination']>,
) =>
  useInterviewStore.setState((state) => ({
    pagination: { ...state.pagination, ...pagination },
  }));

export const setFetching = (fetching: boolean) =>
  useInterviewStore.setState({ fetching });

export const resetInterviewState = () =>
  useInterviewStore.setState({ ...initialState });

export type ApplicationList = {
  applications: JobApplcationDB;
  candidates: CandidateType;
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
  current_page: number;
  total_candidates: number;
};
