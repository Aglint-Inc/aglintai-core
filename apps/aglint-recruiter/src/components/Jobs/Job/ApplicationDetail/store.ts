import { type DatabaseTable } from '@aglint/shared-types';
import { create } from 'zustand';

export type TabSchedulingType =
  | 'interview_plan'
  | 'candidate_detail'
  | 'feedback'
  | 'candidate_feedback';

export interface AvailabilitiesApplicationDetail {
  candidate_request_availability: DatabaseTable['candidate_request_availability'];
  request_session_relations: DatabaseTable['request_session_relation'][];
}
export interface ApplicationDetail {
  selectedSessionIds: string[];
  isScheduleOpen: boolean;
}

const initialState: ApplicationDetail = {
  selectedSessionIds: [],
  isScheduleOpen: false,
};

export const useApplicationDetailStore = create<ApplicationDetail>()(() => ({
  ...initialState,
}));

export const setIsScheduleOpen = (isScheduleOpen: boolean) =>
  useApplicationDetailStore.setState({ isScheduleOpen });

export const setSelectedSessionIds = (selectedSessionIds: string[]) =>
  useApplicationDetailStore.setState({ selectedSessionIds });

export const resetApplicationDetailState = () =>
  useApplicationDetailStore.setState({ ...initialState });
