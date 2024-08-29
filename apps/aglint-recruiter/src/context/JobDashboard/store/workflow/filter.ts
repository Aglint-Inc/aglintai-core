import { WorkflowStore } from '@/src/context/Workflows/store';

import { CreateSlice } from '.';

type Filters = WorkflowStore['filters'];

export type FiltersSlice = {
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
  filters: structuredClone(initialFilters),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  resetFilters: () => set({ filters: structuredClone(initialFilters) }),
});
