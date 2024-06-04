import { DatabaseView } from '@aglint/shared-types';

import { CreateSlice } from '.';

type Sort = {
  sortBy: keyof Pick<
    DatabaseView['application_view'],
    'resume_score' | 'applied_at' | 'name'
  >;
  order: 'asc' | 'desc';
};

type Filters = Pick<
  DatabaseView['application_view'],
  | 'resume_score'
  | 'resume_processing_state'
  | 'current_job_title'
  | 'badges'
  | 'city'
  | 'country'
> & {
  search: DatabaseView['application_view']['name'];
};

export type FilterSortSlice = {
  filters: Filters;
  sort: Sort;
  // eslint-disable-next-line no-unused-vars
  setFilters: (filters: Partial<Filters>) => void;
  // eslint-disable-next-line no-unused-vars
  setSort: (sort: Partial<Sort>) => void;
  resetFilters: () => void;
  resetSort: () => void;
  resetFilterSort: () => void;
};

const initialFilters: Filters = {
  search: '',
  badges: null,
  city: null,
  country: null,
  current_job_title: null,
  resume_processing_state: null,
  resume_score: null,
};

const initialSort: Sort = {
  sortBy: 'resume_score',
  order: 'desc',
};

export const createFiltersSlice: CreateSlice<FilterSortSlice> = (set) => ({
  filters: structuredClone(initialFilters),
  sort: structuredClone(initialSort),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...structuredClone(filters) },
    })),
  setSort: (sort) =>
    set((state) => ({ sort: { ...state.sort, ...structuredClone(sort) } })),
  resetFilters: () => set({ filters: structuredClone(initialFilters) }),
  resetSort: () => set({ sort: structuredClone(initialSort) }),
  resetFilterSort: () =>
    set({
      filters: structuredClone(initialFilters),
      sort: structuredClone(initialSort),
    }),
});
