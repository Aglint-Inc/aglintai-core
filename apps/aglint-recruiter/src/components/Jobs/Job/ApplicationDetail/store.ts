import { DatabaseTable } from '@aglint/shared-types';
import { use } from 'react';
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
  selectedStageId: string;
  selectedSessionIds: string[];
}

const initialState: ApplicationDetail = {
  selectedStageId: null,
  selectedSessionIds: [],
};

export const useApplicationDetailStore = create<ApplicationDetail>()(() => ({
  ...initialState,
}));

export const setSelectedStageId = (selectedStageId: string) =>
  useApplicationDetailStore.setState({ selectedStageId });

export const setSelectedSessionIds = (selectedSessionIds: string[]) =>
  useApplicationDetailStore.setState({ selectedSessionIds });

export const resetApplicationDetailState = () =>
  useApplicationDetailStore.setState({ ...initialState });
