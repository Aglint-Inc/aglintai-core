import { type CreateSlice } from '.';

type Selections = string[];

export type SelectionsSlice = {
  selections: Selections;
  // eslint-disable-next-line no-unused-vars
  setSelections: (selections: Selections) => void;
  resetSelections: () => void;
};

const initialSelections: Selections = [];

export const createSelectionsSlice: CreateSlice<SelectionsSlice> = (set) => ({
  selections: structuredClone(initialSelections),
  setSelections: (selections) =>
    set(() => ({
      selections: structuredClone(selections),
    })),
  resetSelections: () =>
    set({ selections: structuredClone(initialSelections) }),
});
