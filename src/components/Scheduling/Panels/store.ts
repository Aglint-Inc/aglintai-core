import { create } from 'zustand';

import {
  InterviewPanelRelationType,
  InterviewPanelType,
  RecruiterUserType,
} from '@/src/types/data.types';

interface SchedulingSlice {
  interviewPanels: (InterviewPanelType & {
    relations: InterviewPanelRelationType[];
  })[];
  isCreateDialogOpen: 'edit' | 'create' | null;
  selectedUsers: RecruiterUserType[];
  panelName: string;
  editPanel:
    | (InterviewPanelType & {
        relations: InterviewPanelRelationType[];
      })
    | null;
}

export const useSchedulingStore = create<SchedulingSlice>()(() => ({
  interviewPanels: [],
  isCreateDialogOpen: null,
  selectedUsers: [],
  panelName: '',
  editPanel: null,
}));

export const setInterviewPanels = (
  interviewPanels: (InterviewPanelType & {
    relations: InterviewPanelRelationType[];
  })[],
) => useSchedulingStore.setState({ interviewPanels });

export const setIsCreateDialogOpen = (
  isCreateDialogOpen: 'edit' | 'create' | null,
) => useSchedulingStore.setState({ isCreateDialogOpen });

export const setSelectedUsers = (selectedUsers: RecruiterUserType[]) =>
  useSchedulingStore.setState({ selectedUsers });

export const setPanelName = (panelName: string) =>
  useSchedulingStore.setState({ panelName });

export const setEditPanel = (
  editPanel: InterviewPanelType & {
    relations: InterviewPanelRelationType[];
  },
) => useSchedulingStore.setState({ editPanel });
