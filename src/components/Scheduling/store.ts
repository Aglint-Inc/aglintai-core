/* eslint-disable no-unused-vars */
import { StateCreator } from 'zustand';

import { useBoundStore } from '@/src/store';
import { InterviewPanelType } from '@/src/types/data.types';

export const createSchedulingSlice: StateCreator<SchedulingSlice> = (set) => ({
  interviewPanels: [],
});

export type SchedulingSlice = {
  interviewPanels: InterviewPanelType[];
};

export const setInterviewPanels = (interviewPanels: InterviewPanelType[]) =>
  useBoundStore.setState({ interviewPanels });
