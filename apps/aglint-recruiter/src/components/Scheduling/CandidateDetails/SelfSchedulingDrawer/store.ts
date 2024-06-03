import { PlanCombinationRespType } from '@aglint/shared-types';
import { create } from 'zustand';

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
  filteredSchedulingOptions: PlanCombinationRespType[];
  filters: {
    isNoConflicts: boolean;
    isSoftConflicts: boolean;
    isHardConflicts: boolean;
    isOutSideWorkHours: boolean;
    preferredInterviewers: {
      user_id: string;
      first_name: string;
      last_name: string;
      email: string;
      position: string;
      profile_image: string;
    }[];
    preferredDateRanges: {
      startTime: string;
      endTime: string;
    }[];
    isWorkLoad: boolean;
  };
}

const initialState: SchedulingFlow = {
  isScheduleNowOpen: false,
  dateRange: {
    start_date: '',
    end_date: '',
  },
  schedulingOptions: [],
  filteredSchedulingOptions: [],
  stepScheduling: 'pick_date',
  noOptions: false,
  isSendToCandidateOpen: false,
  scheduleFlow: 'self_scheduling',
  fetchingPlan: false,
  selectedSlots: [],
  filters: {
    isNoConflicts: true,
    isSoftConflicts: true,
    isHardConflicts: true,
    isOutSideWorkHours: true,
    preferredInterviewers: [],
    preferredDateRanges: [],
    isWorkLoad: true,
  },
};

export const useSchedulingFlowStore = create<SchedulingFlow>()(() => ({
  ...initialState,
}));

export const setScheduleFlow = (scheduleFlow: SchedulingFlow['scheduleFlow']) =>
  useSchedulingFlowStore.setState({ scheduleFlow });

export const setFilteredSchedulingOptions = (
  schedulingOptions: PlanCombinationRespType[],
) =>
  useSchedulingFlowStore.setState({
    filteredSchedulingOptions: schedulingOptions,
  });

export const setFilters = (filters: Partial<SchedulingFlow['filters']>) =>
  useSchedulingFlowStore.setState((state) => ({
    filters: { ...state.filters, ...filters },
  }));

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

export const resetFilterStore = () =>
  useSchedulingFlowStore.setState({
    ...initialState,
  });
