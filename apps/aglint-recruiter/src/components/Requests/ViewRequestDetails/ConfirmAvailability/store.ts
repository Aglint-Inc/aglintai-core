import { create } from 'zustand';

export interface SelfSchedulingFlow {
  candidateAvailabilityId: string;
  applicationIdForConfirmAvailability: string;
}

const initialState: SelfSchedulingFlow = {
  candidateAvailabilityId: '',
  applicationIdForConfirmAvailability: '',
};

export const useConfirmAvailabilitySchedulingFlowStore =
  create<SelfSchedulingFlow>()(() => ({
    ...initialState,
  }));

export const setApplicationIdForConfirmAvailability = (
  applicationIdForConfirmAvailability: string,
) =>
  useConfirmAvailabilitySchedulingFlowStore.setState({
    applicationIdForConfirmAvailability,
  });
export const setCandidateAvailabilityId = (candidateAvailabilityId: string) =>
  useConfirmAvailabilitySchedulingFlowStore.setState({
    candidateAvailabilityId,
  });
