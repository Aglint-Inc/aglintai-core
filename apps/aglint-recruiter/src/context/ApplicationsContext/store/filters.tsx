import { DatabaseView } from '@aglint/shared-types';

import { nestedObjectToArray } from '@/src/components/Common/FilterHeader/utils';

import { CreateSlice } from '.';

type Sort = {
  type: keyof Pick<
    DatabaseView['application_view'],
    'resume_score' | 'applied_at' | 'name'
  >;
  order: 'asc' | 'desc';
};

type FilterKeys =
  | keyof Pick<
      DatabaseView['application_view'],
      'resume_score' | 'badges' | 'bookmarked'
    >
  | 'search'
  | 'locations';

type FilterValues = {
  bookmarked: boolean;
  search: DatabaseView['application_view']['name'];
  badges: (keyof DatabaseView['application_view']['badges'])[];
  // city: DatabaseView['application_view']['city'][];
  // state: DatabaseView['application_view']['state'][];
  // country: DatabaseView['application_view']['country'][];
  locations: ReturnType<typeof nestedObjectToArray>;
  resume_score: (
    | 'Top match'
    | 'Good match'
    | 'Average match'
    | 'Poor match'
    | 'Not a match'
  )[];
};

type Filters = { [id in FilterKeys]: FilterValues[id] };

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
  bookmarked: false,
  search: '',
  badges: [],
  locations: [],
  resume_score: [],
};

const initialSort: Sort = {
  type: 'resume_score',
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
