import { CreateSlice } from '.';

type Tab =
  | 'Details'
  | 'Resume'
  | 'Screening'
  | 'Assessment'
  | 'Interview'
  | 'Tasks'
  | 'Activity';

export type TabSlice = {
  tab: Tab;
  // eslint-disable-next-line no-unused-vars
  setTab: (tab: Tab) => void;
  // eslint-disable-next-line no-unused-vars
  // resetTab: () => void;
  initialTab: Tab;
};

const initialTab: Tab = 'Resume';

export const createTabSlice: CreateSlice<TabSlice> = (set) => ({
  tab: initialTab,
  setTab: (tab) => set({ tab }),
  initialTab,
  // resetTab: () => set({ tab: initialTab }),
});
