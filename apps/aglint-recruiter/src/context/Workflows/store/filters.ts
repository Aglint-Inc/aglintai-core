import { type DatabaseView } from '@aglint/shared-types';

import { type CreateSlice } from '.';

type Filters = {
  search: string;
  job: string[];
  tags: DatabaseView['workflow_view']['tags'];
};

export type FiltersSlice = {
  initialFilters: Filters;
  filters: Filters;
  // eslint-disable-next-line no-unused-vars
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
};

const initialFilters: Filters = {
  search: '',
  job: [],
  tags: [],
};

export const createFiltersSlice: CreateSlice<FiltersSlice> = (set) => ({
  initialFilters,
  filters: structuredClone(initialFilters),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  resetFilters: () => set({ filters: structuredClone(initialFilters) }),
});
