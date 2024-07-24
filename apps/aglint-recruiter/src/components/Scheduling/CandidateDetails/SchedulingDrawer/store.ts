import { MultiDayPlanType } from '@aglint/shared-types';
import { create } from 'zustand';

import { ApiResponseSendToCandidate } from '@/src/pages/api/scheduling/application/sendtocandidate';

import { ApiResponseFindAvailability } from '../types';
import { filterSchedulingOptionsArray } from './StepScheduleFilter/utils';

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
    | 'self_scheduling_email_preview'
    | 'success_screen'
    | 'schedule_all_options'
    | 'agents_final_screen_cta';
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
  filteredSchedulingOptions: MultiDayPlanType[];
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
  resSendToCandidate: ApiResponseSendToCandidate['data'];
  selectedTaskId: string | null;
  requestAvailibityId: string | null;
  updateRequestAvailibityId: string | null;
  noSlotReasons: ReturnType<typeof filterSchedulingOptionsArray>['combs'];
}

const initialState: SchedulingFlow = {
  isScheduleNowOpen: false, //scheduling drawer open
  dateRange: {
    start_date: '',
    end_date: '',
  },
  schedulingOptions: [], // find availability api response
  filteredSchedulingOptions: [], // filtered options based on filters self scheduling flow
  stepScheduling: 'pick_date',
  noOptions: false, // no options found in find availability api
  isSendToCandidateOpen: false, //loader for send to candidate api in self scheduling flow and also api in agent flow
  scheduleFlow: 'self_scheduling',
  fetchingPlan: false, // in self scheduling flow fetching plan loader find_availability api
  filters: {
    isNoConflicts: true,
    isSoftConflicts: true,
    isHardConflicts: false,
    isOutSideWorkHours: false,
    preferredInterviewers: [],
    preferredDateRanges: [],
    isWorkLoad: true,
  }, // self scheduling flow filters
  selectedCombIds: [],
  emailData: null, // email data for showing preview
  resSendToCandidate: null, //used only in self scheduling flow last step copy link which contains ids
  selectedTaskId: null, // selected task id used when user come for scheduling via task
  requestAvailibityId: null, // request availibility id used when hr click schedule now after user submit request availibility
  updateRequestAvailibityId: null,
  noSlotReasons: [],
};

export const useSchedulingFlowStore = create<SchedulingFlow>()(() => ({
  ...initialState,
}));

export const setNoSlotReasons = (
  noSlotReasons: SchedulingFlow['noSlotReasons'],
) => useSchedulingFlowStore.setState({ noSlotReasons });

export const setUpdateRequestAvailibityId = (
  updateRequestAvailibityId: string | null,
) => useSchedulingFlowStore.setState({ updateRequestAvailibityId });

export const setRequestAvailibityId = (requestAvailibityId: string | null) =>
  useSchedulingFlowStore.setState({ requestAvailibityId });

export const setSelectedTaskId = (selectedTaskId: string | null) =>
  useSchedulingFlowStore.setState({ selectedTaskId });

export const setResSendToCandidate = (
  resSendToCandidate: SchedulingFlow['resSendToCandidate'],
) => useSchedulingFlowStore.setState({ resSendToCandidate });

export const setScheduleFlow = (scheduleFlow: SchedulingFlow['scheduleFlow']) =>
  useSchedulingFlowStore.setState({ scheduleFlow });

export const setEmailData = (emailData: SchedulingFlow['emailData']) =>
  useSchedulingFlowStore.setState({ emailData });

export const setFilteredSchedulingOptions = (
  schedulingOptions: MultiDayPlanType[],
) =>
  useSchedulingFlowStore.setState({
    filteredSchedulingOptions: schedulingOptions,
  });

export const setFilters = (filters: Partial<SchedulingFlow['filters']>) =>
  useSchedulingFlowStore.setState((state) => ({
    filters: { ...state.filters, ...filters },
  }));

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
