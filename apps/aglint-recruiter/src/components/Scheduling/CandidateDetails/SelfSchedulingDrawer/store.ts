import { PlanCombinationRespType } from '@aglint/shared-types';
import { create } from 'zustand';

import { testData } from '../testdata';

export interface SchedulingFlow {
  isScheduleNowOpen: boolean;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  schedulingOptions: PlanCombinationRespType[];
  stepScheduling: 'pick_date' | 'preference' | 'slot_options' | 'reschedule';
  noOptions: boolean;
  isSendToCandidateOpen: boolean;
  scheduleFlow:
    | 'self_scheduling'
    | 'email_agent'
    | 'phone_agent'
    | 'request_availibility'
    | 'debrief';
  fetchingPlan: boolean;
  selectedSlots: PlanCombinationRespType[];
}

const initialState: SchedulingFlow = {
  isScheduleNowOpen: true,
  dateRange: {
    start_date: '',
    end_date: '',
  },
  schedulingOptions: testData,
  stepScheduling: 'preference',
  noOptions: false,
  isSendToCandidateOpen: false,
  scheduleFlow: 'self_scheduling',
  fetchingPlan: false,
  selectedSlots: [],
};

export const useSchedulingFlowStore = create<SchedulingFlow>()(() => ({
  ...initialState,
}));

export const setScheduleFlow = (scheduleFlow: SchedulingFlow['scheduleFlow']) =>
  useSchedulingFlowStore.setState({ scheduleFlow });

export const setSelectedSlots = (selectedSlots: PlanCombinationRespType[]) =>
  useSchedulingFlowStore.setState({ selectedSlots });

export const setStepScheduling = (
  stepScheduling: SchedulingFlow['stepScheduling'],
) => useSchedulingFlowStore.setState({ stepScheduling });

export const setIsScheduleNowOpen = (isScheduleNowOpen: boolean) =>
  useSchedulingFlowStore.setState({ isScheduleNowOpen });

export const setIsSendToCandidateOpen = (isSendToCandidateOpen: boolean) =>
  useSchedulingFlowStore.setState({ isSendToCandidateOpen });

export const setNoOptions = (noOptions: boolean) =>
  useSchedulingFlowStore.setState({ noOptions });

export const setSchedulingOptions = (
  schedulingOptions: PlanCombinationRespType[],
) => useSchedulingFlowStore.setState({ schedulingOptions });

export const setFetchingPlan = (fetchingPlan: boolean) =>
  useSchedulingFlowStore.setState({ fetchingPlan });

export const setDateRange = (dateRange: {
  start_date: string;
  end_date: string;
}) => useSchedulingFlowStore.setState({ dateRange });
