import { CreateSlice } from '.';

type DismissWarnings = {
  job_description: boolean;
  interview_plan: boolean;
  interview_session: boolean;
  score_changed: boolean;
};

export type DismissWarningsSlice = {
  dismissWarnings: DismissWarnings;
  // eslint-disable-next-line no-unused-vars
  setDismissWarnings: (dismissWarnings: Partial<DismissWarnings>) => void;
  resetDismissWarnings: () => void;
};

const initialDismissWarning: DismissWarnings = {
  job_description: false,
  interview_plan: false,
  interview_session: false,
  score_changed: false,
};

export const createDismissWarningsSlice: CreateSlice<DismissWarningsSlice> = (
  set,
) => ({
  dismissWarnings: structuredClone(initialDismissWarning),
  setDismissWarnings: (dismissWarnings) =>
    set((state) => ({
      dismissWarnings: { ...state.dismissWarnings, ...dismissWarnings },
    })),
  resetDismissWarnings: () =>
    set({ dismissWarnings: structuredClone(initialDismissWarning) }),
});
