import { use } from 'react';
import { create } from 'zustand';

import { InterviewPlanScheduleDbType } from '@/src/components/JobInterviewPlan/types';
import { InterviewScheduleContextType } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import {
  InterviewModuleType,
  InterviewScheduleTypeDB,
} from '@/src/types/data.types';

import { SelectedApplicationTypeDB, SessionsType } from './types';

export interface SchedulingApplication {
  initialLoading: boolean;
  tab: 'full_schedule' | 'candidate_info' | 'feedback';
  initialSessions: SessionsType;
  selectedSessionIds: string[];
  selectedApplication: SelectedApplicationTypeDB;
  selectedSchedule: InterviewScheduleTypeDB;
  interviewModules: InterviewModuleType[];
  scheduleName: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  members: InterviewScheduleContextType['members'];
  step: number;
  schedulingOptions: InterviewPlanScheduleDbType[];
  isScheduleNowOpen: boolean;
  isViewProfileOpen: boolean;
  fetchingPlan: boolean;
  fetchingSchedule: boolean;
  selCoordinator: string | null;
  noOptions: boolean;
  isSendToCandidateOpen: boolean;
}

const initialState: SchedulingApplication = {
  initialLoading: true,
  selectedApplication: null,
  selectedSessionIds: [],
  tab: 'full_schedule',
  initialSessions: null,
  selectedSchedule: null,
  interviewModules: [],
  isScheduleNowOpen: true,
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
};

export const useSchedulingApplicationStore = create<SchedulingApplication>()(
  () => ({
    ...initialState,
  }),
);

export const setInitalLoading = (initialLoading: boolean) =>
  useSchedulingApplicationStore.setState({ initialLoading });

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
  schedulingOptions: InterviewPlanScheduleDbType[],
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
