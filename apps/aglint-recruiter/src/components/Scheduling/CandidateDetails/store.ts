import {
  DatabaseTable,
  InterviewModuleType,
  InterviewScheduleTypeDB,
} from '@aglint/shared-types';
import { create } from 'zustand';

import { InterviewScheduleContextType } from '@/src/context/SchedulingMain/SchedulingMainProvider';

import { SelectedApplicationTypeDB, SessionsType } from './types';

export interface SchedulingApplication {
  initialLoading: boolean;
  tab:
    | 'interview_plan'
    | 'candidate_detail'
    | 'feedback'
    | 'candidate_feedback';
  initialSessions: SessionsType;
  selectedSessionIds: string[];
  requestSessionIds: string[];
  selectedApplication: SelectedApplicationTypeDB;
  selectedSession: SessionsType[0] | null;
  selectedSchedule: InterviewScheduleTypeDB;
  interviewModules: InterviewModuleType[];
  scheduleName: string;
  members: InterviewScheduleContextType['members'];
  isViewProfileOpen: boolean;
  fetchingSchedule: boolean;
  selCoordinator: string | null;
  isEditOpen: boolean;
  isEditBreakOpen: boolean;
  editSession: SessionsType[0];
  availabilities: DatabaseTable['candidate_request_availability'][];
  isIndividualCancelOpen: boolean;
  isMultipleCancelOpen: boolean;
  isMultipleRescheduleOpen: boolean;
  isSendingToCandidate: boolean;
  isIndividualRescheduleOpen: boolean;
  selectedApplicationLog: DatabaseTable['application_logs'];
}

const initialState: SchedulingApplication = {
  initialLoading: true,
  selectedApplication: null,
  selectedSessionIds: [],
  requestSessionIds: [],
  availabilities: [],
  tab: 'interview_plan',
  selectedSession: null,
  initialSessions: [],
  selectedSchedule: null,
  interviewModules: [],
  scheduleName: '',
  members: [],
  isIndividualCancelOpen: false,
  isMultipleCancelOpen: false,
  isMultipleRescheduleOpen: false,
  isIndividualRescheduleOpen: false,
  isViewProfileOpen: false,
  fetchingSchedule: true,
  selCoordinator: null,
  isEditOpen: false,
  isEditBreakOpen: false,
  isSendingToCandidate: false,
  editSession: null,
  selectedApplicationLog: null,
};

export const useSchedulingApplicationStore = create<SchedulingApplication>()(
  () => ({
    ...initialState,
  }),
);

export const setInitalLoading = (initialLoading: boolean) =>
  useSchedulingApplicationStore.setState({ initialLoading });

export const setIsSendingToCandidate = (isSendingToCandidate: boolean) =>
  useSchedulingApplicationStore.setState({ isSendingToCandidate });

export const setRequestSessionIds = (requestSessionIds: string[]) =>
  useSchedulingApplicationStore.setState({ requestSessionIds });

export const setAvailabilities = (
  availabilities: DatabaseTable['candidate_request_availability'][],
) => useSchedulingApplicationStore.setState({ availabilities });

export const setSelectedApplicationLog = (
  selectedApplicationLog: DatabaseTable['application_logs'],
) => useSchedulingApplicationStore.setState({ selectedApplicationLog });

export const setIndividualCancelOpen = (isIndividualCancelOpen: boolean) =>
  useSchedulingApplicationStore.setState({ isIndividualCancelOpen });

export const setMultipleCancelOpen = (isMultipleCancelOpen: boolean) =>
  useSchedulingApplicationStore.setState({ isMultipleCancelOpen });

export const setMultipleRescheduleOpen = (isMultipleRescheduleOpen: boolean) =>
  useSchedulingApplicationStore.setState({ isMultipleRescheduleOpen });

export const setIndividualRescheduleOpen = (
  isIndividualRescheduleOpen: boolean,
) => useSchedulingApplicationStore.setState({ isIndividualRescheduleOpen });

export const setIsEditOpen = (isEditOpen: boolean) =>
  useSchedulingApplicationStore.setState({ isEditOpen });

export const setIsEditBreakOpen = (isEditBreakOpen: boolean) =>
  useSchedulingApplicationStore.setState({ isEditBreakOpen });

export const setSelectedSession = (selectedSession: SessionsType[0]) =>
  useSchedulingApplicationStore.setState({ selectedSession });

export const setEditSession = (editSession: Partial<SessionsType[0]>) =>
  useSchedulingApplicationStore.setState((state) => ({
    editSession: { ...state.editSession, ...editSession },
  }));

export const setSelectedSchedule = (
  selectedSchedule: InterviewScheduleTypeDB,
) => useSchedulingApplicationStore.setState({ selectedSchedule });

export const setinitialSessions = (initialSessions: SessionsType) =>
  useSchedulingApplicationStore.setState({ initialSessions });

export const setSelectedSessionIds = (selectedSessionIds: string[]) =>
  useSchedulingApplicationStore.setState({ selectedSessionIds });

export const setTab = (tab: SchedulingApplication['tab']) =>
  useSchedulingApplicationStore.setState({ tab });

export const setSelectedApplication = (
  selectedApplication: SelectedApplicationTypeDB,
) => useSchedulingApplicationStore.setState({ selectedApplication });

export const setInterviewModules = (interviewModules: InterviewModuleType[]) =>
  useSchedulingApplicationStore.setState({ interviewModules });

export const setScheduleName = (scheduleName: string) =>
  useSchedulingApplicationStore.setState({ scheduleName });

export const setSelCoordinator = (selCoordinator: string | null) =>
  useSchedulingApplicationStore.setState({ selCoordinator });

export const setIsViewProfileOpen = (isViewProfileOpen: boolean) =>
  useSchedulingApplicationStore.setState({ isViewProfileOpen });

export const setFetchingSchedule = (fetchingSchedule: boolean) =>
  useSchedulingApplicationStore.setState({ fetchingSchedule });

export const setMembers = (members: InterviewScheduleContextType['members']) =>
  useSchedulingApplicationStore.setState({ members });

export const setApplicationCandidateFeedback = (
  feedback: SchedulingApplication['selectedApplication']['feedback'],
) =>
  useSchedulingApplicationStore.setState((pre) => {
    const temp = {
      selectedApplication: pre.selectedApplication,
    };
    if (temp.selectedApplication) {
      temp.selectedApplication.feedback = feedback;
    }
    return temp;
  });

export const resetSchedulingApplicationState = () =>
  useSchedulingApplicationStore.setState({ ...initialState });
