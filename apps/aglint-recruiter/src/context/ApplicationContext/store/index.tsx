import { create, type StateCreator } from 'zustand';

import { createDrawerSlice, type DrawerSlice } from './drawer';
import {
  createResumePreviewSlice,
  type ResumePreviewSlice,
} from './resumePreview';
import { createTabSlice, type TabSlice } from './tabs';

type SlicesType = DrawerSlice & TabSlice & ResumePreviewSlice;

const Slices = {
  createDrawerSlice,
  createTabSlice,
  createResumePreviewSlice,
};

export type CreateSlice<
  // eslint-disable-next-line no-unused-vars
  T extends Partial<SlicesType>,
> = StateCreator<SlicesType, [], [], T>;

type ApplicationCustomSlice = {
  resetAll: () => void;
};

const createApplicationSlice: StateCreator<
  SlicesType,
  [],
  [],
  ApplicationCustomSlice
> = (set, get) => ({
  resetAll: () => {
    get().resetDrawer();
    get().resetPreview();
  },
});

export type ApplicationStore = SlicesType & ApplicationCustomSlice;

export const useApplicationStore = create<ApplicationStore>()((...a) => ({
  ...Object.assign(
    {},
    ...Object.values(Slices).map((f) => ({
      ...f(...a),
    })),
  ),
  ...createApplicationSlice(...a),
}));
