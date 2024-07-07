import { PlanCombinationRespType } from '@aglint/shared-types';
import { create } from 'zustand';

import { ApiResponseFindAvailability } from '../types';

export interface SchedulingFlow {
  isScheduleNowOpen: boolean;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  schedulingOptions: ApiResponseFindAvailability;
  stepScheduling:
    | 'pick_date'
    | 'preference'
    | 'slot_options'
    | 'reschedule'
    | 'request_availibility'
    | 'self_scheduling_email_preview';
  noOptions: boolean;
  isSendToCandidateOpen: boolean;
  scheduleFlow:
    | 'self_scheduling'
    | 'email_agent'
    | 'phone_agent'
    | 'create_request_availibility'
    | 'update_request_availibility'
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
  selectedCombIds: string[];
  emailData: { html: string; subject: string } | null;
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
    isHardConflicts: false,
    isOutSideWorkHours: false,
    preferredInterviewers: [],
    preferredDateRanges: [],
    isWorkLoad: true,
  },
  selectedCombIds: [],
  emailData: null,
};

export const useSchedulingFlowStore = create<SchedulingFlow>()(() => ({
  ...initialState,
}));

export const setScheduleFlow = (scheduleFlow: SchedulingFlow['scheduleFlow']) =>
  useSchedulingFlowStore.setState({ scheduleFlow });

export const setEmailData = (emailData: SchedulingFlow['emailData']) =>
  useSchedulingFlowStore.setState({ emailData });

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
  schedulingOptions: ApiResponseFindAvailability,
) => useSchedulingFlowStore.setState({ schedulingOptions });

export const setFetchingPlan = (fetchingPlan: boolean) =>
  useSchedulingFlowStore.setState({ fetchingPlan });

export const setDateRange = (dateRange: {
  start_date: string;
  end_date: string;
}) => useSchedulingFlowStore.setState({ dateRange });

export const setSelectedCombIds = (selectedCombIds: string[]) =>
  useSchedulingFlowStore.setState({ selectedCombIds });

export const resetSchedulingFlowStore = () =>
  useSchedulingFlowStore.setState({
    ...initialState,
  });
