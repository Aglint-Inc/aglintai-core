import { create, StateCreator } from 'zustand';

import { ActionPopupSlice, createActionPopupSlice } from './actionPopup';
import { ChecklistSlice, createChecklistSlice } from './checklist';
import { createSectionSlice, SectionSlice } from './currentSection';
import { createFiltersSlice, FilterSortSlice } from './filters';
import { createImportPopupSlice, ImportPopupSlice } from './importPopup';
import {
  createCurrentApplicationSlice,
  CurrentApplicationSlice,
} from './selection';

type SlicesType = ImportPopupSlice &
  SectionSlice &
  ChecklistSlice &
  CurrentApplicationSlice &
  FilterSortSlice &
  ActionPopupSlice;

const Slices = {
  createChecklistSlice,
  createSectionSlice,
  createImportPopupSlice,
  createCurrentApplicationSlice,
  createFiltersSlice,
  createActionPopupSlice,
};

export type CreateSlice<
  // eslint-disable-next-line no-unused-vars
  T extends Partial<SlicesType>,
> = StateCreator<SlicesType, [], [], T>;

type ApplicationsCustomSlice = {
  resetAll: () => void;
  changeSection: SectionSlice['setSection'];
};

const createApplicationsSlice: StateCreator<
  SlicesType,
  [],
  [],
  ApplicationsCustomSlice
> = (set, get) => ({
  resetAll: () => {
    get().resetImportPopup();
    get().resetSection();
    get().resetChecklist();
    get().resetCurrentApplication();
    get().resetFilterSort();
    get().resetActionPopup();
  },
  changeSection: (section: SectionSlice['section']) => {
    get().resetChecklist();
    get().setSection(section);
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
