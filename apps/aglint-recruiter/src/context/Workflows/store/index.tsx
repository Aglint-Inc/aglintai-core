import { create, type StateCreator } from 'zustand';

import { type ActionsLoadSlice, createActionsLoadSlice } from './actionLoader';
import { createDeletionSlice, type DeletionSlice } from './delete';
import { createFiltersSlice, type FiltersSlice } from './filters';
import { createPopupSlice, type PopupSlice } from './popup';

type Slices = FiltersSlice & PopupSlice & ActionsLoadSlice & DeletionSlice;

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
    get().resetPopup();
    get().resetActionsLoad();
  },
});

export type WorkflowStore = Slices & WorkflowSlice;
export const useWorkflowStore = create<WorkflowStore>()((...a) => ({
  ...createFiltersSlice(...a),
  ...createPopupSlice(...a),
  ...createActionsLoadSlice(...a),
  ...createWorkflowSlice(...a),
  ...createDeletionSlice(...a),
}));
