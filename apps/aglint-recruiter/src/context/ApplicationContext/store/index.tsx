import { type StateCreator,create } from 'zustand';

import { type DrawerSlice,createDrawerSlice } from './drawer';
import { type ResumePreviewSlice,createResumePreviewSlice } from './resumePreview';
import { type TabSlice,createTabSlice } from './tabs';

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
