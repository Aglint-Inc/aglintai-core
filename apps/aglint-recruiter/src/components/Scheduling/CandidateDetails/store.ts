import {
  DatabaseTable,
  InterviewModuleType,
  InterviewScheduleTypeDB,
} from '@aglint/shared-types';
import { create } from 'zustand';

import { InterviewScheduleContextType } from '@/src/context/SchedulingMain/SchedulingMainProvider';

import { SelectedApplicationTypeDB, SessionsType } from './types';

export type TabSchedulingType =
  | 'interview_plan'
  | 'candidate_detail'
  | 'feedback'
  | 'candidate_feedback';

export interface AvailabilitiesSchedulingApplication {
  candidate_request_availability: DatabaseTable['candidate_request_availability'];
  request_session_relations: DatabaseTable['request_session_relation'][];
}
export interface SchedulingApplication {
  initialLoading: boolean;
  initialSessions: SessionsType[];
  selectedSessionIds: string[];
  requestSessionIds: string[];
  selectedApplication: SelectedApplicationTypeDB;
  selectedSession: SessionsType | null;
  selectedSchedule: InterviewScheduleTypeDB;
  interviewModules: InterviewModuleType[];
  scheduleName: string;
  members: InterviewScheduleContextType['members'];
  fetchingSchedule: boolean;
  isEditOpen: boolean;
  isEditBreakOpen: boolean;
  availabilities: AvailabilitiesSchedulingApplication[];
  isIndividualCancelOpen: boolean;
  isMultipleCancelOpen: boolean;
  isMultipleRescheduleOpen: boolean;
  isSendingToCandidate: boolean;
  isIndividualRescheduleOpen: boolean;
  selectedApplicationLog: DatabaseTable['application_logs'];
  rescheduleSessionIds: string[];
  cancelSessions:
    | {
        session_id: string;
        meeting_id: string;
        session_name: string;
        application_id: string;
      }[]
    | null;
}

const initialState: SchedulingApplication = {
  initialLoading: true,
  selectedApplication: null, // selected application details
  selectedSessionIds: [], // selected session ids
  requestSessionIds: [], // selected session ids in request candidate availability
  availabilities: [], // candidate availabilities sent to candidate for showing banner
  selectedSession: null, // used for cancelling individual session
  cancelSessions: null, // used for cancelling multiple session from activities right panel
  initialSessions: [], // sessions with meeting details based on this plan in getting rendered in candidate details
  selectedSchedule: null, // selected schedule details (interview_schedule table) used to find session is cached or not (if schedule exits then session is cached or else sessions are fetched from job plan)
  interviewModules: [], // all the interview modules for showing in the dropdown in edit session drawer
  scheduleName: '', // schedule name for the schedule
  members: [], // all the members in the organization for showing in the dropdown in edit session drawer
  isIndividualCancelOpen: false, // individual cancel dialog open state from interview plan
  isMultipleCancelOpen: false, // multiple cancel dialog open state from activity panel
  isMultipleRescheduleOpen: false, // multiple reschedule dialog open state from activity panel
  isIndividualRescheduleOpen: false, // individual reschedule dialog open state from interview plan
  fetchingSchedule: true, // plan fetching loader state
  isEditOpen: false, // edit session drawer open state from interview plan
  isEditBreakOpen: false, // edit break drawer open state from interview plan
  isSendingToCandidate: false, // sending to candidate loader state for api call
  selectedApplicationLog: null, // selected application log details while cancelling or rescheduling from activity panel
  rescheduleSessionIds: [], // reschedule session ids,
};

export const useSchedulingApplicationStore = create<SchedulingApplication>()(
  () => ({
    ...initialState,
  }),
);

export const setInitalLoading = (initialLoading: boolean) =>
  useSchedulingApplicationStore.setState({ initialLoading });

export const setCancelSessions = (
  cancelReasons: SchedulingApplication['cancelSessions'],
) => useSchedulingApplicationStore.setState({ cancelSessions: cancelReasons });

export const setRescheduleSessionIds = (rescheduleSessionIds: string[]) =>
  useSchedulingApplicationStore.setState({ rescheduleSessionIds });

export const setIsSendingToCandidate = (isSendingToCandidate: boolean) =>
  useSchedulingApplicationStore.setState({ isSendingToCandidate });

export const setRequestSessionIds = (requestSessionIds: string[]) =>
  useSchedulingApplicationStore.setState({ requestSessionIds });

export const setAvailabilities = (
  availabilities: AvailabilitiesSchedulingApplication[],
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

export const setSelectedSession = (
  selectedSession: SchedulingApplication['selectedSession'],
) => useSchedulingApplicationStore.setState({ selectedSession });

export const setSelectedSchedule = (
  selectedSchedule: InterviewScheduleTypeDB,
) => useSchedulingApplicationStore.setState({ selectedSchedule });

export const setinitialSessions = (
  initialSessions: SchedulingApplication['initialSessions'],
) => useSchedulingApplicationStore.setState({ initialSessions });

export const setSelectedSessionIds = (selectedSessionIds: string[]) =>
  useSchedulingApplicationStore.setState({ selectedSessionIds });

export const setSelectedApplication = (
  selectedApplication: SelectedApplicationTypeDB,
) => useSchedulingApplicationStore.setState({ selectedApplication });

export const setInterviewModules = (interviewModules: InterviewModuleType[]) =>
  useSchedulingApplicationStore.setState({ interviewModules });

export const setScheduleName = (scheduleName: string) =>
  useSchedulingApplicationStore.setState({ scheduleName });

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
