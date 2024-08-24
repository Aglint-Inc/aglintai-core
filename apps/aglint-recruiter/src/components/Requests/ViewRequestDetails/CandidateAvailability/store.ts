import { create } from 'zustand';



export interface SelfSchedulingFlow {
  candidateAvailabilityDrawerOpen: boolean;
}

const initialState: SelfSchedulingFlow = {
  candidateAvailabilityDrawerOpen: false,
};

export const useCandidateAvailabilitySchedulingFlowStore = create<SelfSchedulingFlow>()(() => ({
  ...initialState,
}));

export const setCandidateAvailabilityDrawerOpen = (
  candidateAvailabilityDrawerOpen: boolean,
) => useCandidateAvailabilitySchedulingFlowStore.setState({ candidateAvailabilityDrawerOpen });
