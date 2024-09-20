import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { type MemberType } from 'src/app/_common/types/memberType';
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
  note: string;
  selectedAssignee: MemberType;
  requestType: DatabaseTable['request']['priority'];
  dateRange: { start: string; end: string };
}

const initialState: ApplicationDetail = {
  selectedSessionIds: [],
  isScheduleOpen: false,
  note: '',
  selectedAssignee: null,
  requestType: 'standard',
  dateRange: {
    start: dayjsLocal().toISOString(),
    end: dayjsLocal().add(7, 'day').toISOString(),
  },
};

export const useApplicationDetailStore = create<ApplicationDetail>()(() => ({
  ...initialState,
}));

export const setDateRange = (dateRange: ApplicationDetail['dateRange']) =>
  useApplicationDetailStore.setState({ dateRange });

export const setRequestType = (
  requestType: DatabaseTable['request']['priority'],
) => useApplicationDetailStore.setState({ requestType });

export const setSelectedAssignee = (selectedAssignee: MemberType) =>
  useApplicationDetailStore.setState({ selectedAssignee });

export const setNote = (note: string) =>
  useApplicationDetailStore.setState({ note });

export const setIsScheduleOpen = (isScheduleOpen: boolean) =>
  useApplicationDetailStore.setState({ isScheduleOpen });

export const setSelectedSessionIds = (selectedSessionIds: string[]) =>
  useApplicationDetailStore.setState({ selectedSessionIds });

export const resetApplicationDetailState = () =>
  useApplicationDetailStore.setState({ ...initialState });
