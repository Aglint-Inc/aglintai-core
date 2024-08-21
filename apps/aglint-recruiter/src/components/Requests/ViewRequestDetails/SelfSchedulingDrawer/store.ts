import { MultiDayPlanType } from '@aglint/shared-types';
import { create } from 'zustand';

import { ApiResponseFindAvailability } from '@/src/components/Scheduling/CandidateDetails/types';
import { ApiResponseSendToCandidate } from '@/src/pages/api/scheduling/application/sendtocandidate';
import dayjs from '@/src/utils/dayjs';

import { filterSchedulingOptionsArray } from './BodyDrawer/StepScheduleFilter/utils';

export interface SelfSchedulingFlow {
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
    | 'self_scheduling_email_preview'
    | 'success_screen';
  noOptions: boolean;
  isSendingToCandidate: boolean;
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
  noSlotReasons: ReturnType<typeof filterSchedulingOptionsArray>['combs'];
  errorNoSlotFilter: boolean;
}

const initialState: SelfSchedulingFlow = {
  isScheduleNowOpen: false, //scheduling drawer open
  dateRange: {
    start_date: dayjs().toISOString(),
    end_date: dayjs().add(7, 'day').toISOString(),
  },
  schedulingOptions: [], // find availability api response
  filteredSchedulingOptions: [], // filtered options based on filters self scheduling flow
  stepScheduling: 'pick_date',
  noOptions: false, // no options found in find availability api
  isSendingToCandidate: false, //loader for send to candidate api in self scheduling flow and also api in agent flow
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
  noSlotReasons: [],
  errorNoSlotFilter: false,
};

export const useSelfSchedulingFlowStore = create<SelfSchedulingFlow>()(() => ({
  ...initialState,
}));

export const setEmailData = (emailData: SelfSchedulingFlow['emailData']) =>
  useSelfSchedulingFlowStore.setState({ emailData });

export const setFilteredSchedulingOptions = (
  schedulingOptions: MultiDayPlanType[],
) =>
  useSelfSchedulingFlowStore.setState({
    filteredSchedulingOptions: schedulingOptions,
  });

export const setFilters = (filters: Partial<SelfSchedulingFlow['filters']>) =>
  useSelfSchedulingFlowStore.setState((state) => ({
    filters: { ...state.filters, ...filters },
  }));

export const setStepScheduling = (
  stepScheduling: SelfSchedulingFlow['stepScheduling'],
) => useSelfSchedulingFlowStore.setState({ stepScheduling });

export const setIsScheduleNowOpen = (isScheduleNowOpen: boolean) =>
  useSelfSchedulingFlowStore.setState({ isScheduleNowOpen });

export const setIsSendingToCandidate = (isSendingToCandidate: boolean) =>
  useSelfSchedulingFlowStore.setState({ isSendingToCandidate });

export const setNoOptions = (noOptions: boolean) =>
  useSelfSchedulingFlowStore.setState({ noOptions });

export const setSchedulingOptions = (
  schedulingOptions: ApiResponseFindAvailability,
) => useSelfSchedulingFlowStore.setState({ schedulingOptions });

export const setFetchingPlan = (fetchingPlan: boolean) =>
  useSelfSchedulingFlowStore.setState({ fetchingPlan });

export const setDateRange = (dateRange: {
  start_date: string;
  end_date: string;
}) => useSelfSchedulingFlowStore.setState({ dateRange });

export const setSelectedCombIds = (selectedCombIds: string[]) =>
  useSelfSchedulingFlowStore.setState({ selectedCombIds });

export const setNoSlotsReasons = (
  noSlotReasons: SelfSchedulingFlow['noSlotReasons'],
) => useSelfSchedulingFlowStore.setState({ noSlotReasons });

export const setErrorNoSlotFilter = (errorNoSlotFilter: boolean) =>
  useSelfSchedulingFlowStore.setState({ errorNoSlotFilter });

export const setResSendToCandidate = (
  resSendToCandidate: ApiResponseSendToCandidate['data'],
) => useSelfSchedulingFlowStore.setState({ resSendToCandidate });

export const resetSchedulingFlowStore = () =>
  useSelfSchedulingFlowStore.setState({
    ...initialState,
  });
