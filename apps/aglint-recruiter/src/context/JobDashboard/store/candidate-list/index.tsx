import { StateCreator } from 'zustand';

import { ChecklistSlice, createChecklistSlice } from './checklist';
import { createSectionSlice, SectionSlice } from './currentSection';
import { createImportPopupSlice, ImportPopupSlice } from './importPopup';
import {
  createCurrentApplicationSlice,
  CurrentApplicationSlice,
} from './selection';

type Slices = ImportPopupSlice &
  SectionSlice &
  ChecklistSlice &
  CurrentApplicationSlice;

export type CreateSlice<
  // eslint-disable-next-line no-unused-vars
  T extends Partial<Slices>,
> = StateCreator<Slices, [], [], T>;

type CandidateListCustomSlice = {
  resetCandidateList: () => void;
};

const createCandidateListSlice: StateCreator<
  Slices,
  [],
  [],
  CandidateListCustomSlice
> = (set, get) => ({
  resetCandidateList: () => {
    get().resetImportPopup();
    get().resetSection();
    get().resetChecklist();
    get().resetCurrentApplication();
  },
});

export type CandidateSlicesType = Slices & CandidateListCustomSlice;
export const CandidateSlices = {
  createImportPopupSlice,
  createCandidateListSlice,
  createSectionSlice,
  createChecklistSlice,
  createCurrentApplicationSlice,
};
