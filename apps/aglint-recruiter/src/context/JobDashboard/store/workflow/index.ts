import { type StateCreator } from 'zustand';

import { type FiltersSlice,createFiltersSlice } from './filter';
import { type PopupSlice,createPopupSlice } from './popup';
import { type SelectionsSlice,createSelectionsSlice } from './selections';

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
