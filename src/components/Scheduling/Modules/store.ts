import { create } from 'zustand';

import {
  InterviewModuleRelationType,
  InterviewModuleType,
  RecruiterUserType
} from '@/src/types/data.types';

interface SchedulingSlice {
  interviewModules: ModuleType[];
  isCreateDialogOpen: 'edit' | 'create' | null;
  isDeleteDialogOpen: boolean;
  isPauseDialogOpen: boolean;
  selectedUsers: RecruiterUserType[];
  moduleName: string;
  editModule: ModuleType | null;
  selUser: InterviewModuleRelationType | null;
  pause_json: {
    start_date: string;
    end_date: string;
    isManual: boolean;
  } | null;
}

export const useSchedulingStore = create<SchedulingSlice>()(() => ({
  interviewModules: [],
  isCreateDialogOpen: null,
  isDeleteDialogOpen: false,
  isPauseDialogOpen: false,
  selectedUsers: [],
  moduleName: '',
  editModule: null,
  selUser: null,
  pause_json: null
}));

export const setInterviewModules = (interviewModules: ModuleType[]) =>
  useSchedulingStore.setState({ interviewModules });

export const setIsCreateDialogOpen = (
  isCreateDialogOpen: 'edit' | 'create' | null
) => useSchedulingStore.setState({ isCreateDialogOpen });

export const setSelectedUsers = (selectedUsers: RecruiterUserType[]) =>
  useSchedulingStore.setState({ selectedUsers });

export const setModuleName = (moduleName: string) =>
  useSchedulingStore.setState({ moduleName });

export const setIsDeleteDialogOpen = (isDeleteDialogOpen: boolean) =>
  useSchedulingStore.setState({ isDeleteDialogOpen });

export const setIsPauseDialogOpen = (isPauseDialogOpen: boolean) =>
  useSchedulingStore.setState({ isPauseDialogOpen });

export const setSelUser = (selUser: InterviewModuleRelationType | null) =>
  useSchedulingStore.setState({ selUser });

export const setPauseJson = (
  pause_json: {
    start_date: string;
    end_date: string;
    isManual: boolean;
  } | null
) => useSchedulingStore.setState({ pause_json });

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
