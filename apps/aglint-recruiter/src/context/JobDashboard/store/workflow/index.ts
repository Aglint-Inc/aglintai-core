import { StateCreator } from 'zustand';

import { createFiltersSlice, FiltersSlice } from './filter';
import { createPopupSlice, PopupSlice } from './popup';
import { createSelectionsSlice, SelectionsSlice } from './selections';

type Slices = FiltersSlice & PopupSlice & SelectionsSlice;

export type CreateSlice<
  // eslint-disable-next-line no-unused-vars
  T extends Partial<Slices>,
> = StateCreator<Slices, [], [], T>;

type WorkflowCustomSlice = {
  resetWorkflow: () => void;
};

const createWorkflowSlice: StateCreator<Slices, [], [], WorkflowCustomSlice> = (
  set,
  get,
) => ({
  resetWorkflow: () => {
    get().resetFilters();
    get().resetPopup();
    get().resetSelections();
  },
});

export type WorkflowSlicesType = Slices & WorkflowCustomSlice;
export const WorkflowSlices = {
  createFiltersSlice,
  createPopupSlice,
  createSelectionsSlice,
  createWorkflowSlice,
};
