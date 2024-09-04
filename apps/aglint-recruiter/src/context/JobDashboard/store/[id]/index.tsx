import { type StateCreator } from 'zustand';

import {
  type PublishButtonSlice,
  createPublishButtonSlice,
} from './publishButtonStore';

type Slices = PublishButtonSlice;

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
    get().resetPublishing();
  },
});

export type DashboardSlicesType = Slices & DashboardCustomSlice;
export const DashboardSlices = {
  createPublishButtonSlice,
  createDashboardSlice,
};
