import {
  DatabaseTable,
  InterviewModuleType,
  InterviewScheduleTypeDB,
  PlanCombinationRespType,
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
  selectedApplication: SelectedApplicationTypeDB;
  selectedSession: SessionsType[0] | null;
  selectedSchedule: InterviewScheduleTypeDB;
  interviewModules: InterviewModuleType[];
  scheduleName: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  stepScheduling: 'pick_date' | 'preference' | 'slot_options' | 'reschedule';
  members: InterviewScheduleContextType['members'];
  schedulingOptions: PlanCombinationRespType[];
  isScheduleNowOpen: boolean;
  isViewProfileOpen: boolean;
  fetchingPlan: boolean;
  fetchingSchedule: boolean;
  selCoordinator: string | null;
  noOptions: boolean;
  isSendToCandidateOpen: boolean;
  isEditOpen: boolean;
  isEditBreakOpen: boolean;
  editSession: SessionsType[0];
  selectedSlots: PlanCombinationRespType[];
  selectedCombIds: string[];
  scheduleFlow:
    | 'self_scheduling'
    | 'email_agent'
    | 'phone_agent'
    | 'request_availibility'
    | 'debrief';

  isIndividualCancelOpen: boolean;
  isMultipleCancelOpen: boolean;
  isMultipleRescheduleOpen: boolean;
  isIndividualRescheduleOpen: boolean;
  selectedApplicationLog: DatabaseTable['application_logs'];
}

const initialState: SchedulingApplication = {
  initialLoading: true,
  selectedApplication: null,
  selectedSessionIds: [],
  tab: 'interview_plan',
  selectedSession: null,
  initialSessions: [],
  selectedSchedule: null,
  interviewModules: [],
  isScheduleNowOpen: false,
  scheduleName: '',
  dateRange: {
    start_date: '',
    end_date: '',
  },
  members: [],
  schedulingOptions: [],
  isIndividualCancelOpen: false,
  isMultipleCancelOpen: false,
  isMultipleRescheduleOpen: false,
  isIndividualRescheduleOpen: false,
  stepScheduling: 'pick_date',
  fetchingPlan: false,
  isViewProfileOpen: false,
  fetchingSchedule: true,
  selCoordinator: null,
  noOptions: false,
  isSendToCandidateOpen: false,
  isEditOpen: false,
  isEditBreakOpen: false,
  editSession: null,
  selectedSlots: [],
  selectedCombIds: [],
  scheduleFlow: 'self_scheduling',
  selectedApplicationLog: null,
};

export const useSchedulingApplicationStore = create<SchedulingApplication>()(
  () => ({
    ...initialState,
  }),
);

export const setInitalLoading = (initialLoading: boolean) =>
  useSchedulingApplicationStore.setState({ initialLoading });

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

export const setScheduleFlow = (
  scheduleFlow: SchedulingApplication['scheduleFlow'],
) => useSchedulingApplicationStore.setState({ scheduleFlow });

export const setIsEditOpen = (isEditOpen: boolean) =>
  useSchedulingApplicationStore.setState({ isEditOpen });

export const setIsEditBreakOpen = (isEditBreakOpen: boolean) =>
  useSchedulingApplicationStore.setState({ isEditBreakOpen });

export const setStepScheduling = (
  stepScheduling: SchedulingApplication['stepScheduling'],
) => useSchedulingApplicationStore.setState({ stepScheduling });

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

export const setDateRange = (dateRange: {
  start_date: string;
  end_date: string;
}) => useSchedulingApplicationStore.setState({ dateRange });

export const setSelectedSlots = (selectedSlots: PlanCombinationRespType[]) =>
  useSchedulingApplicationStore.setState({ selectedSlots });

export const setSelectedCombIds = (selectedCombIds: string[]) =>
  useSchedulingApplicationStore.setState({ selectedCombIds });

export const resetSchedulingApplicationState = () =>
  useSchedulingApplicationStore.setState({ ...initialState });
