import { create, StateCreator } from 'zustand';

import { createDrawerSlice, DrawerSlice } from './currentApplication';
import { createTabSlice, TabSlice } from './tabs';

type SlicesType = DrawerSlice & TabSlice;

const Slices = {
  createDrawerSlice,
  createTabSlice,
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
    get().resetTab();
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
