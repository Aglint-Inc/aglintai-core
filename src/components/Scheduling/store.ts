import { create } from 'zustand';

import { InterviewPanelType } from '@/src/types/data.types';

interface SchedulingSlice {
  interviewPanels: InterviewPanelType[];
}

export const useSchedulingStore = create<SchedulingSlice>()(() => ({
  interviewPanels: [],
}));

export const setInterviewPanels = (interviewPanels: InterviewPanelType[]) =>
  useSchedulingStore.setState({ interviewPanels });
