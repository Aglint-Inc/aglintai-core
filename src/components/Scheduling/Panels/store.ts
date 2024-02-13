import { create } from 'zustand';

import {
  InterviewPanelRelationType,
  InterviewPanelType,
  RecruiterUserType,
} from '@/src/types/data.types';

interface SchedulingSlice {
  interviewPanels: PanelType[];
  isCreateDialogOpen: 'edit' | 'create' | null;
  selectedUsers: RecruiterUserType[];
  panelName: string;
  editPanel: PanelType | null;
}

export const useSchedulingStore = create<SchedulingSlice>()(() => ({
  interviewPanels: [],
  isCreateDialogOpen: null,
  selectedUsers: [],
  panelName: '',
  editPanel: null,
}));

export const setInterviewPanels = (interviewPanels: PanelType[]) =>
  useSchedulingStore.setState({ interviewPanels });

export const setIsCreateDialogOpen = (
  isCreateDialogOpen: 'edit' | 'create' | null,
) => useSchedulingStore.setState({ isCreateDialogOpen });

export const setSelectedUsers = (selectedUsers: RecruiterUserType[]) =>
  useSchedulingStore.setState({ selectedUsers });

export const setPanelName = (panelName: string) =>
  useSchedulingStore.setState({ panelName });

export const setEditPanel = (editPanel: PanelType) =>
  useSchedulingStore.setState({ editPanel });

export type PanelType = InterviewPanelType & {
  relations: InterviewPanelRelationType[];
};
