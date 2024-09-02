import { type DatabaseTable } from '@aglint/shared-types';

import { type CreateSlice } from '.';

type Checklist = DatabaseTable['applications']['id'][];

export type ChecklistSlice = {
  checklist: Checklist;
  // eslint-disable-next-line no-unused-vars
  setChecklist: (checklist: Checklist) => void;
  resetChecklist: () => void;
};

const initialSelections: Checklist = [];

export const createChecklistSlice: CreateSlice<ChecklistSlice> = (set) => ({
  checklist: [...initialSelections],
  setChecklist: (checklist: Checklist) => set({ checklist }),
  resetChecklist: () => set({ checklist: [...initialSelections] }),
});
