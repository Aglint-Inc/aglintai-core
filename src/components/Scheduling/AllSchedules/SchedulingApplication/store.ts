import { create } from 'zustand';

import { InterviewScheduleContextType } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import {
  InterviewMeetingTypeDb,
  InterviewModuleType,
  InterviewScheduleTypeDB,
} from '@/src/types/data.types';
import { PlanCombinationRespType } from '@/src/utils/scheduling_v1/types';

import { SelectedApplicationTypeDB, SessionsType } from './types';

export interface SchedulingApplication {
  initialLoading: boolean;
  tab: 'full_schedule' | 'candidate_info' | 'feedback';
  initialSessions: SessionsType;
  selectedSessionIds: string[];
  selectedApplication: SelectedApplicationTypeDB;
  selectedMeeting: InterviewMeetingTypeDb | null;
  selectedSchedule: InterviewScheduleTypeDB;
  interviewModules: InterviewModuleType[];
  scheduleName: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  members: InterviewScheduleContextType['members'];
  step: number;
  schedulingOptions: PlanCombinationRespType[];
  totalSlots: number;
  isScheduleNowOpen: boolean;
  isViewProfileOpen: boolean;
  fetchingPlan: boolean;
  fetchingSchedule: boolean;
  selCoordinator: string | null;
  noOptions: boolean;
  isSendToCandidateOpen: boolean;
  isEditOpen: boolean;
  editSession: SessionsType[0];
}

const initialState: SchedulingApplication = {
  initialLoading: true,
  selectedApplication: null,
  selectedSessionIds: [],
  tab: 'full_schedule',
  selectedMeeting: null,
  initialSessions: [],
  selectedSchedule: null,
  totalSlots: 0,
  interviewModules: [],
  isScheduleNowOpen: false,
  scheduleName: '',
  dateRange: {
    start_date: '',
    end_date: '',
  },
  members: [],
  step: 1,
  schedulingOptions: [],
  fetchingPlan: false,
  isViewProfileOpen: false,
  fetchingSchedule: true,
  selCoordinator: null,
  noOptions: false,
  isSendToCandidateOpen: false,
  isEditOpen: false,
  editSession: null,
};

export const useSchedulingApplicationStore = create<SchedulingApplication>()(
  () => ({
    ...initialState,
  }),
);

export const setInitalLoading = (initialLoading: boolean) =>
  useSchedulingApplicationStore.setState({ initialLoading });

export const setIsEditOpen = (isEditOpen: boolean) =>
  useSchedulingApplicationStore.setState({ isEditOpen });

export const setSelectedMeeting = (selectedMeeting: InterviewMeetingTypeDb) =>
  useSchedulingApplicationStore.setState({ selectedMeeting });

export const setEditSession = (editSession: Partial<SessionsType[0]>) =>
  useSchedulingApplicationStore.setState((state) => ({
    editSession: { ...state.editSession, ...editSession },
  }));

export const setTotalSlots = (totalSlots: number) =>
  useSchedulingApplicationStore.setState({ totalSlots });

export const setSelectedSchedule = (
  selectedSchedule: InterviewScheduleTypeDB,
) => useSchedulingApplicationStore.setState({ selectedSchedule });

export const setinitialSessions = (initialSessions: SessionsType) =>
  useSchedulingApplicationStore.setState({ initialSessions });

export const setIsScheduleNowOpen = (isScheduleNowOpen: boolean) =>
  useSchedulingApplicationStore.setState({ isScheduleNowOpen });

export const setSelectedSessionIds = (selectedSessionIds: string[]) =>
  useSchedulingApplicationStore.setState({ selectedSessionIds });

export const setTab = (tab: SchedulingApplication['tab']) =>
  useSchedulingApplicationStore.setState({ tab });

export const setIsSendToCandidateOpen = (isSendToCandidateOpen: boolean) =>
  useSchedulingApplicationStore.setState({ isSendToCandidateOpen });

export const setNoOptions = (noOptions: boolean) =>
  useSchedulingApplicationStore.setState({ noOptions });

export const setSelectedApplication = (
  selectedApplication: SelectedApplicationTypeDB,
) => useSchedulingApplicationStore.setState({ selectedApplication });

export const setInterviewModules = (interviewModules: InterviewModuleType[]) =>
  useSchedulingApplicationStore.setState({ interviewModules });

export const setScheduleName = (scheduleName: string) =>
  useSchedulingApplicationStore.setState({ scheduleName });

export const setSchedulingOptions = (
  schedulingOptions: PlanCombinationRespType[],
) => useSchedulingApplicationStore.setState({ schedulingOptions });

export const setSelCoordinator = (selCoordinator: string | null) =>
  useSchedulingApplicationStore.setState({ selCoordinator });

export const setIsViewProfileOpen = (isViewProfileOpen: boolean) =>
  useSchedulingApplicationStore.setState({ isViewProfileOpen });

export const setFetchingSchedule = (fetchingSchedule: boolean) =>
  useSchedulingApplicationStore.setState({ fetchingSchedule });

export const setFetchingPlan = (fetchingPlan: boolean) =>
  useSchedulingApplicationStore.setState({ fetchingPlan });

export const setMembers = (members: InterviewScheduleContextType['members']) =>
  useSchedulingApplicationStore.setState({ members });

export const setStep = (step: number) =>
  useSchedulingApplicationStore.setState({ step });

export const setDateRange = (dateRange: {
  start_date: string;
  end_date: string;
}) => useSchedulingApplicationStore.setState({ dateRange });

export const resetSchedulingApplicationState = () =>
  useSchedulingApplicationStore.setState({ ...initialState });
