import { create } from 'zustand';

import {
  InterviewModuleRelationType,
  InterviewModuleType,
  RecruiterUserType
} from '@/src/types/data.types';

interface SchedulingSlice {
  interviewModules: ModuleType[];
  isCreateDialogOpen: 'edit' | 'create' | null;
  selectedUsers: RecruiterUserType[];
  moduleName: string;
  editModule: ModuleType | null;
}

export const useSchedulingStore = create<SchedulingSlice>()(() => ({
  interviewModules: [],
  isCreateDialogOpen: null,
  selectedUsers: [],
  moduleName: '',
  editModule: null
}));

export const setInterviewModules = (interviewModules: ModuleType[]) =>
  useSchedulingStore.setState({ interviewModules });

export const setIsCreateDialogOpen = (
  isCreateDialogOpen: 'edit' | 'create' | null
) => useSchedulingStore.setState({ isCreateDialogOpen });

export const setSelectedUsers = (selectedUsers: RecruiterUserType[]) =>
  useSchedulingStore.setState({ selectedUsers });

export const setPanelName = (moduleName: string) =>
  useSchedulingStore.setState({ moduleName });

export const setEditModule = (editModule: ModuleType) =>
  useSchedulingStore.setState({ editModule });

export type ModuleType = InterviewModuleType & {
  relations: InterviewModuleRelationType[];
  duration_available: TimeSlotsData;
};

interface TimeSlotsData {
  activeDuration: number;
  availabletimeSlots: number[];
}
