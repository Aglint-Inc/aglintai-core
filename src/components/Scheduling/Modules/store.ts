import { create } from 'zustand';

import {
  InterviewModuleRelationType,
  InterviewModuleType,
  RecruiterUserType
} from '@/src/types/data.types';

interface SchedulingSlice {
  interviewModules: ModuleType[];
  isCreateDialogOpen: boolean;
  isDeleteMemberDialogOpen: boolean;
  isDeleteModuleDialogOpen: boolean;
  isPauseDialogOpen: boolean;
  isAddMemberDialogOpen: boolean;
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
  isDeleteMemberDialogOpen: false,
  isDeleteModuleDialogOpen: false,
  isPauseDialogOpen: false,
  isAddMemberDialogOpen: false,
  selectedUsers: [],
  moduleName: '',
  editModule: null,
  selUser: null,
  pause_json: { isManual: true, start_date: '', end_date: '' }
}));

export const setInterviewModules = (interviewModules: ModuleType[]) =>
  useSchedulingStore.setState({ interviewModules });

export const setIsCreateDialogOpen = (isCreateDialogOpen: boolean) =>
  useSchedulingStore.setState({ isCreateDialogOpen });

export const setSelectedUsers = (selectedUsers: RecruiterUserType[]) =>
  useSchedulingStore.setState({ selectedUsers });

export const setModuleName = (moduleName: string) =>
  useSchedulingStore.setState({ moduleName });

export const setIsDeleteMemberDialogOpen = (
  isDeleteMemberDialogOpen: boolean
) => useSchedulingStore.setState({ isDeleteMemberDialogOpen });

export const setIsAddMemberDialogOpen = (isAddMemberDialogOpen: boolean) =>
  useSchedulingStore.setState({ isAddMemberDialogOpen });

export const setIsDeleteModuleDialogOpen = (
  isDeleteModuleDialogOpen: boolean
) => useSchedulingStore.setState({ isDeleteModuleDialogOpen });

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
