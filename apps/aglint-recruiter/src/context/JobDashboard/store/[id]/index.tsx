import { StateCreator } from 'zustand';

import {
  createDismissWarningsSlice,
  DismissWarningsSlice,
} from './dismissWarnings';
import {
  createPublishButtonSlice,
  PublishButtonSlice,
} from './publishButtonStore';

type Slices = DismissWarningsSlice & PublishButtonSlice;

export type CreateSlice<
  // eslint-disable-next-line no-unused-vars
  T extends Partial<Slices>,
> = StateCreator<Slices, [], [], T>;

type DashboardCustomSlice = {
  resetDashboard: () => void;
};

const createDashboardSlice: StateCreator<
  Slices,
  [],
  [],
  DashboardCustomSlice
> = (set, get) => ({
  resetDashboard: () => {
    get().resetDismissWarnings();
    get().resetPublishing();
  },
});

export type DashboardSlicesType = Slices & DashboardCustomSlice;
export const DashboardSlices = {
  createDismissWarningsSlice,
  createPublishButtonSlice,
  createDashboardSlice,
};
