import { create } from 'zustand';

export interface CandidateAvailabilityFlow {
  candidateAvailabilityDrawerOpen: boolean;
  reRequestAvailability: boolean;
  candidateAvailabilityIdForReRequest: string;
}

const initialState: CandidateAvailabilityFlow = {
  candidateAvailabilityDrawerOpen: false,
  reRequestAvailability: false,
  candidateAvailabilityIdForReRequest: '',
};

export const useCandidateAvailabilitySchedulingFlowStore =
  create<CandidateAvailabilityFlow>()(() => ({
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
