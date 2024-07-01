import { DatabaseTable, InterviewSession } from '@aglint/shared-types';
import { isEqual } from 'lodash';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { UserType } from './Filters/FilterCordinator';

export interface FilterCandidateState {
  filter: {
    status?: DatabaseTable['interview_meeting']['status'][];
    job_ids?: string[];
    module_ids?: string[];
    dateRange?: string;
    textSearch?: string;
    sortBy?: 'asc' | 'desc';
    coordinator_ids?: UserType[];
    scheduleType?: InterviewSession['schedule_type'][];
  };
  pagination: {
    page: number;
    total: number;
  };
  filterVisible: FilterType[];
  isInitialState?: () => boolean;
  reset?: () => void;
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

const initialState: FilterCandidateState = {
  filter: {
    textSearch: '',
    status: [],
    sortBy: 'asc',
    job_ids: [],
    module_ids: [],
    dateRange: null,
    coordinator_ids: [],
    scheduleType: [],
  },
  pagination: {
    page: 1,
    total: 0,
  },
  filterVisible: Object.keys(FilterType) as FilterType[],
};

export const useFilterCandidateStore = create<FilterCandidateState>()(
  persist(
    (set, get) => ({
      ...initialState,
      reset: () => set(initialState),
      isInitialState: () => {
        const { filter: curFil, filterVisible: curFilVis } = get();
        const curState = { ...curFil, ...curFilVis };

        const { filter: iniFil, filterVisible: iniFilVis } = initialState;
        const iniState = { ...iniFil, ...iniFilVis };

        return !isEqual(curState, iniState);
      },
    }),
    {
      name: 'filter-candidate',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const setFilter = (filter: FilterCandidateState['filter']) => {
  useFilterCandidateStore.setState((state) => ({
    pagination: { ...state.pagination, page: 1 },
    filter: { ...state.filter, ...filter },
  }));
};

export const setFilterVisible = (
  filterVisible: FilterCandidateState['filterVisible'],
) => useFilterCandidateStore.setState({ filterVisible });

export const setPagination = (
  pagination: Partial<FilterCandidateState['pagination']>,
) =>
  useFilterCandidateStore.setState((state) => ({
    pagination: { ...state.pagination, ...pagination },
  }));
