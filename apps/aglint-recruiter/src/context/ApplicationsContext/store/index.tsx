import { create, StateCreator } from 'zustand';

import { ActionPopupSlice, createActionPopupSlice } from './actionPopup';
import { ChecklistSlice, createChecklistSlice } from './checklist';
import { createLocationsSlice, LocationsSlice } from './filters';
import { createImportPopupSlice, ImportPopupSlice } from './importPopup';
type SlicesType = ImportPopupSlice &
  ChecklistSlice &
  LocationsSlice &
  ActionPopupSlice;

const Slices = {
  createChecklistSlice,
  createImportPopupSlice,
  createLocationsSlice,
  createActionPopupSlice,
};

export type CreateSlice<
  // eslint-disable-next-line no-unused-vars
  T extends Partial<SlicesType>,
> = StateCreator<SlicesType, [], [], T>;

type ApplicationsCustomSlice = {
  resetAll: () => void;
};

const createApplicationsSlice: StateCreator<
  SlicesType,
  [],
  [],
  ApplicationsCustomSlice
> = (set, get) => ({
  resetAll: () => {
    get().resetImportPopup();
    get().resetChecklist();
    get().resetLocations();
    get().resetActionPopup();
  },
});

export type ApplicationsStore = SlicesType & ApplicationsCustomSlice;

export const useApplicationsStore = create<ApplicationsStore>()((...a) => ({
  ...Object.assign(
    {},
    ...Object.values(Slices).map((f) => ({
      ...f(...a),
    })),
  ),
  ...createApplicationsSlice(...a),
}));
