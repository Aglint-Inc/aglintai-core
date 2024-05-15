import { create, StateCreator } from 'zustand';

import {
  type DismissWarningsSlice,
  createDismissWarningsSlice,
} from './dismissWarnings';
import {
  type PublishButtonSlice,
  createPublishButtonSlice,
} from './publishButtonStore';

type Slices = PublishButtonSlice & DismissWarningsSlice;

export type CreateSlice<
  // eslint-disable-next-line no-unused-vars
  T extends Partial<Slices>,
> = StateCreator<Slices, [], [], T>;

type JobDashboardSlice = {
  resetAll: () => void;
};

const createJobDasboardSlice: StateCreator<
  Slices,
  [],
  [],
  JobDashboardSlice
> = (set, get) => ({
  resetAll: () => {
    get().resetDismissWarnings();
    get().resetPublishing();
  },
});

export const useJobDashboardStore = create<Slices & JobDashboardSlice>()(
  (...a) => ({
    ...createPublishButtonSlice(...a),
    ...createDismissWarningsSlice(...a),
    ...createJobDasboardSlice(...a),
  }),
);
