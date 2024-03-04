import { create } from 'zustand';

import {
  CandidateType,
  InterviewScheduleTypeDB,
  JobApplcationDB
} from '@/src/types/data.types';

import { PanelType } from '../Panels/store';

export interface InterviewSlice {
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
  filterVisible: FilterType[];
  duration: number;
  isRescheduleOpen: boolean;
  isCancelOpen: boolean;
}

export enum FilterType {
  // eslint-disable-next-line no-unused-vars
  relatedJobs = 'relatedJobs',
  // eslint-disable-next-line no-unused-vars
  interviewPanels = 'interviewPanels',
  // eslint-disable-next-line no-unused-vars
  dateRange = 'dateRange',
  // eslint-disable-next-line no-unused-vars
  scheduleType = 'scheduleType',
  // eslint-disable-next-line no-unused-vars
  status = 'status'
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
    dateRange: null
  },
  pagination: {
    page: 1,
    total: 0
  },
  fetching: false,
  filterVisible: [],
  duration: 30,
  isRescheduleOpen: false,
  isCancelOpen: false
};

export const useInterviewStore = create<InterviewSlice>()(() => ({
  ...initialState
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
  selectedUsers: InterviewSlice['selectedUsers']
) => useInterviewStore.setState({ selectedUsers });

export const setFilter = (filter: InterviewSlice['filter']) =>
  useInterviewStore.setState((state) => ({
    filter: { ...state.filter, ...filter }
  }));

export const setDuration = (duration: number) =>
  useInterviewStore.setState({ duration });

export const setIsRescheduleOpen = (isRescheduleOpen: boolean) =>
  useInterviewStore.setState({ isRescheduleOpen });

export const setIsCancelOpen = (isCancelOpen: boolean) =>
  useInterviewStore.setState({ isCancelOpen });

export const setFilterVisible = (
  filterVisible: InterviewSlice['filterVisible']
) => useInterviewStore.setState({ filterVisible });

export const setPagination = (
  pagination: Partial<InterviewSlice['pagination']>
) =>
  useInterviewStore.setState((state) => ({
    pagination: { ...state.pagination, ...pagination }
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
};
