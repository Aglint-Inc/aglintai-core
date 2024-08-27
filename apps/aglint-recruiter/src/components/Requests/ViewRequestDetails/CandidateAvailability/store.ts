import { create } from 'zustand';

export interface SelfSchedulingFlow {
  candidateAvailabilityDrawerOpen: boolean;
  reRequestAvailability: boolean;
  candidateAvailabilityIdForReRequest: string;
}

const initialState: SelfSchedulingFlow = {
  candidateAvailabilityDrawerOpen: false,
  reRequestAvailability: false,
  candidateAvailabilityIdForReRequest: '',
};

export const useCandidateAvailabilitySchedulingFlowStore =
  create<SelfSchedulingFlow>()(() => ({
    ...initialState,
  }));

export const setCandidateAvailabilityDrawerOpen = (
  candidateAvailabilityDrawerOpen: boolean,
) =>
  useCandidateAvailabilitySchedulingFlowStore.setState({
    candidateAvailabilityDrawerOpen,
  });

export const setReRequestAvailability = (reRequestAvailability: boolean) =>
  useCandidateAvailabilitySchedulingFlowStore.setState({
    reRequestAvailability,
  });

export const setCandidateAvailabilityIdForReRequest = (
  candidateAvailabilityIdForReRequest: string,
) =>
  useCandidateAvailabilitySchedulingFlowStore.setState({
    candidateAvailabilityIdForReRequest,
  });
