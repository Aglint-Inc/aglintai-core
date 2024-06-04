import { create, StateCreator } from 'zustand';

import { DashboardSlices, DashboardSlicesType } from './[id]';
import { CandidateSlices, CandidateSlicesType } from './candidate-list';
import { WorkflowSlices, WorkflowSlicesType } from './workflow';

type SlicesType = DashboardSlicesType &
  WorkflowSlicesType &
  CandidateSlicesType;
const Slices = { ...DashboardSlices, ...WorkflowSlices, ...CandidateSlices };

export type CreateSlice<
  // eslint-disable-next-line no-unused-vars
  T extends Partial<SlicesType>,
> = StateCreator<SlicesType, [], [], T>;

type JobDashboardCustomSlice = {
  resetAll: () => void;
};

const createJobDasboardSlice: StateCreator<
  SlicesType,
  [],
  [],
  JobDashboardCustomSlice
> = (set, get) => ({
  resetAll: () => {
    get().resetDashboard();
    get().resetWorkflow();
  },
});

export type JobDashboardStore = SlicesType & JobDashboardCustomSlice;
export const useJobDashboardStore = create<JobDashboardStore>()((...a) => ({
  ...Object.assign(
    {},
    ...Object.values(Slices).map((f) => ({
      ...f(...a),
    })),
  ),
  ...createJobDasboardSlice(...a),
}));
