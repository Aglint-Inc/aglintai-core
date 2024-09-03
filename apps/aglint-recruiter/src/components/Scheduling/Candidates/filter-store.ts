/* eslint-disable no-unused-vars */
import { isEqual } from 'lodash';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type UserType } from './Filters/FilterCordinator';

export interface FilterCandidateState {
  filter: {
    job_ids?: string[];
    department_ids?: number[];
    textSearch?: string;
    coordinator_ids?: UserType[];
  };
  filterVisible: FilterType[];
  isInitialState?: () => boolean;
  reset?: () => void;
}

export enum FilterType {
  jobs = 'jobs',
  departments = 'departments',
  coordinator = 'coordinator',
}

const initialFilterState: FilterCandidateState = {
  filter: {
    textSearch: '',
    job_ids: [],
    department_ids: [],
    coordinator_ids: [],
  },
  filterVisible: Object.keys(FilterType) as FilterType[],
};

export const useFilterCandidateStore = create<FilterCandidateState>()(
  persist(
    (set, get) => ({
      ...initialFilterState,
      reset: () =>
        set({
          ...initialFilterState,
          filter: {
            ...initialFilterState.filter,
            textSearch: get().filter.textSearch,
          },
        }),
      isInitialState: () => {
        const { filter: curFil, filterVisible: curFilVis } = get();
        const curState = { ...curFil, filterVisible: curFilVis };

        const { filter: iniFil, filterVisible: iniFilVis } = initialFilterState;
        const iniState = { ...iniFil, filterVisible: iniFilVis };

        delete curState['textSearch'];
        delete iniState['textSearch'];
        return !isEqual(curState, iniState);
      },
    }),
    {
      name: 'schedule_candidate_list',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const setFilter = (filter: FilterCandidateState['filter']) => {
  useFilterCandidateStore.setState((state) => ({
    filter: { ...state.filter, ...filter },
  }));
};

export const setFilterVisible = (
  filterVisible: FilterCandidateState['filterVisible'],
) => useFilterCandidateStore.setState({ filterVisible });
