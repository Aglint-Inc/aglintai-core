import { create } from 'zustand';

import { InterviewPanelContextType } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { InterviewModuleType } from '@/src/types/data.types';

import { ApplicationList } from '../store';

export interface SchedulingApplication {
  initialLoading: boolean;
  selectedApplication: ApplicationList;
  interviewModules: InterviewModuleType[];
  scheduleName: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  members: InterviewPanelContextType['members'];
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
  members: []
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

export const setMembers = (members: InterviewPanelContextType['members']) =>
  useSchedulingApplicationStore.setState({ members });

export const setDateRange = (dateRange: {
  start_date: string;
  end_date: string;
}) => useSchedulingApplicationStore.setState({ dateRange });
