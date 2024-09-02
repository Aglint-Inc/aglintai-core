import { create } from 'zustand';

import dayjs from '@/src/utils/dayjs';

export interface SelfSchedulingFlow {
  candidateAvailabilityId: string;
  applicationIdForConfirmAvailability: string;
  calendarDate: string;
}

const initialState: SelfSchedulingFlow = {
  candidateAvailabilityId: '',
  applicationIdForConfirmAvailability: '',
  calendarDate: dayjs().toISOString(),
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

export const setCalendarDate = (calendarDate: string) =>
  useConfirmAvailabilitySchedulingFlowStore.setState({
    calendarDate,
  });
