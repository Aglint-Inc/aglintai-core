import { type MultiDayPlanType } from '@aglint/shared-types';
import { create } from 'zustand';

import { type ApiResponseFindAvailability } from '@/src/components/Scheduling/CandidateDetails/types';
import { type ApiResponseSendToCandidate } from '@/src/pages/api/scheduling/application/sendtocandidate';
import dayjs from '@/src/utils/dayjs';

import { type Event, type Resource } from '../../../Common/CalendarResourceView/types';
import { type filterSchedulingOptionsArray } from './BodyDrawer/ScheduleFilter/utils';

type PrefferedInterviewer = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  profile_image: string;
};
export interface SelfSchedulingFlow {
  isSelfScheduleDrawerOpen: boolean;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  schedulingOptions: ApiResponseFindAvailability['slots'];
  stepScheduling:
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
    preferredInterviewers: PrefferedInterviewer[];
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
  availabilities: {
    events: Event[];
    resources: Resource[];
  };
  localFilters: {
    isNoConflicts: boolean;
    isSoftConflicts: boolean;
    isHardConflicts: boolean;
    isOutSideWorkHours: boolean;
    preferredInterviewers: PrefferedInterviewer[];
    preferredDateRanges: {
      startTime: string;
      endTime: string;
    }[];
    isWorkLoad: boolean;
    dateRange: {
      start: string;
      end: string;
    };
  };
  filterLoading: boolean;
  anchorEl: null | HTMLButtonElement;
  calendarDate: string;
}

export const initialFilters = {
  isNoConflicts: true,
  isSoftConflicts: true,
  isHardConflicts: false,
  isOutSideWorkHours: false,
  preferredInterviewers: [],
  preferredDateRanges: [],
  isWorkLoad: true,
};

const initialState: SelfSchedulingFlow = {
  isSelfScheduleDrawerOpen: false, //scheduling drawer open
  dateRange: {
    start_date: dayjs().toISOString(),
    end_date: dayjs().add(7, 'day').toISOString(),
  },
  schedulingOptions: [], // find availability api response
  filteredSchedulingOptions: [], // filtered options based on filters self scheduling flow
  stepScheduling: 'slot_options',
  noOptions: false, // no options found in find availability api
  isSendingToCandidate: false, //loader for send to candidate api in self scheduling flow and also api in agent flow
  fetchingPlan: false, // in self scheduling flow fetching plan loader find_availability api
  filters: initialFilters, // self scheduling flow filters
  selectedCombIds: [],
  emailData: null, // email data for showing preview
  resSendToCandidate: null, //used only in self scheduling flow last step copy link which contains ids
  noSlotReasons: [],
  errorNoSlotFilter: false,
  availabilities: null,
  localFilters: {
    ...initialFilters,
    dateRange: {
      start: dayjs().toISOString(),
      end: dayjs().add(7, 'day').toISOString(),
    },
  },
  filterLoading: false,
  anchorEl: null,
  calendarDate: dayjs().toISOString(),
};

export const useSelfSchedulingFlowStore = create<SelfSchedulingFlow>()(() => ({
  ...initialState,
}));

export const setEmailData = (emailData: SelfSchedulingFlow['emailData']) =>
  useSelfSchedulingFlowStore.setState({ emailData });

export const setCalendarDate = (
  calendarDate: SelfSchedulingFlow['calendarDate'],
) => useSelfSchedulingFlowStore.setState({ calendarDate });

export const setAnchorEl = (anchorEl: SelfSchedulingFlow['anchorEl']) =>
  useSelfSchedulingFlowStore.setState({ anchorEl });

export const setFilterLoading = (filterLoading: boolean) =>
  useSelfSchedulingFlowStore.setState({ filterLoading });

export const setLocalFilters = (
  localFilters: Partial<SelfSchedulingFlow['localFilters']>,
) =>
  useSelfSchedulingFlowStore.setState((state) => ({
    localFilters: { ...state.localFilters, ...localFilters },
  }));

export const setAvailabilities = (
  availabilities: SelfSchedulingFlow['availabilities'],
) => useSelfSchedulingFlowStore.setState({ availabilities });

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

export const setIsSelfScheduleDrawerOpen = (
  isSelfScheduleDrawerOpen: boolean,
) => useSelfSchedulingFlowStore.setState({ isSelfScheduleDrawerOpen });

export const setIsSendingToCandidate = (isSendingToCandidate: boolean) =>
  useSelfSchedulingFlowStore.setState({ isSendingToCandidate });

export const setNoOptions = (noOptions: boolean) =>
  useSelfSchedulingFlowStore.setState({ noOptions });

export const setSchedulingOptions = (
  schedulingOptions: ApiResponseFindAvailability['slots'],
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
