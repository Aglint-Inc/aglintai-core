import { create, StateCreator } from 'zustand';

import { type FiltersSlice, createFiltersSlice } from './filters';

type Slices = FiltersSlice;

export type CreateSlice<
  // eslint-disable-next-line no-unused-vars
  T extends Partial<Slices>,
> = StateCreator<Slices, [], [], T>;

type WorkflowSlice = {
  resetAll: () => void;
};

const createWorkflowSlice: StateCreator<Slices, [], [], WorkflowSlice> = (
  _,
  get,
) => ({
  resetAll: () => {
    get().resetFilters();
  },
});

export type WorkflowStore = Slices & WorkflowSlice;
export const useWorkflowStore = create<WorkflowStore>()((...a) => ({
  ...createFiltersSlice(...a),
  ...createWorkflowSlice(...a),
}));
