import { create } from 'zustand';

import { InterviewPlanScheduleDbType } from '@/src/components/JobInterviewPlan/types';
import { InterviewScheduleContextType } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { InterviewModuleType } from '@/src/types/data.types';

import { ApplicationList } from '../store';

export type SchedulingOptionType = Array<
  InterviewPlanScheduleDbType & {
    transformedPlan: {
      [key: string]: InterviewPlanScheduleDbType['plans'];
    }[];
  }
>;

export interface SchedulingApplication {
  initialLoading: boolean;
  selectedApplication: ApplicationList;
  interviewModules: InterviewModuleType[];
  scheduleName: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  members: InterviewScheduleContextType['members'];
  step: number;
  schedulingOptions: SchedulingOptionType;
  isViewProfileOpen: boolean;
  fetchingPlan: boolean;
  fetchingSchedule: boolean;
}

const initialState: SchedulingApplication = {
  initialLoading: true,
  selectedApplication: null,
  interviewModules: [],
  scheduleName: '',
  dateRange: {
    start_date: '',
    end_date: ''
  },
  members: [],
  step: 1,
  schedulingOptions: [],
  fetchingPlan: false,
  isViewProfileOpen: false,
  fetchingSchedule: false
};

export const useSchedulingApplicationStore = create<SchedulingApplication>()(
  () => ({
    ...initialState
  })
);

export const setInitalLoading = (initialLoading: boolean) =>
  useSchedulingApplicationStore.setState({ initialLoading });

export const setSelectedApplication = (selectedApplication: ApplicationList) =>
  useSchedulingApplicationStore.setState({ selectedApplication });

export const setInterviewModules = (interviewModules: InterviewModuleType[]) =>
  useSchedulingApplicationStore.setState({ interviewModules });

export const setScheduleName = (scheduleName: string) =>
  useSchedulingApplicationStore.setState({ scheduleName });

export const setSchedulingOptions = (schedulingOptions: SchedulingOptionType) =>
  useSchedulingApplicationStore.setState({ schedulingOptions });

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
