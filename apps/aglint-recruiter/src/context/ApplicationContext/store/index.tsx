import { type StateCreator } from 'zustand';

import { type DrawerSlice } from './drawer';
import { type ResumePreviewSlice } from './resumePreview';
import { type TabSlice } from './tabs';

type SlicesType = DrawerSlice & TabSlice & ResumePreviewSlice;

export type CreateSlice<
  // eslint-disable-next-line no-unused-vars
  T extends Partial<SlicesType>,
> = StateCreator<SlicesType, [], [], T>;

type ApplicationCustomSlice = {
  resetAll: () => void;
};

export type ApplicationStore = SlicesType & ApplicationCustomSlice;
