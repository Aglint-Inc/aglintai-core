import { create } from 'zustand';

import { InterviewModuleRelationType } from '@/src/types/data.types';

import {
  MemberType,
  ModuleType,
  PauseJson,
  SchedulingSlice,
  StatusTraining,
} from './types';

export const initialEditModule: ModuleType = {
  id: '',
  name: '',
  relations: [],
  duration_available: { activeDuration: 0, availabletimeSlots: [] },
  created_at: '',
  recruiter_id: '',
  settings: {
    require_training: false,
    noShadow: 2,
    noReverseShadow: 2,
    reqruire_approval: false,
    approve_users: [],
  },
  description: '',
};

export const initialStateSchedulingStore: SchedulingSlice = {
  isCreateDialogOpen: null,
  isDeleteMemberDialogOpen: false,
  isDeleteModuleDialogOpen: false,
  isPauseDialogOpen: false,
  isMovedToQualifiedDialogOpen: false,
  isAddMemberDialogOpen: false,
  isProgressDialaogOpen: false,
  isResumeDialogOpen: false,
  isModuleSettingsDialogOpen: false,
  selectedUsers: [],
  selUser: null,
  pause_json: { isManual: true, start_date: '', end_date: '' },
  searchText: '',
  trainingStatus: 'qualified',
};

export const useModulesStore = create<SchedulingSlice>()(
  () => initialStateSchedulingStore,
);

export const setIsCreateDialogOpen = (isCreateDialogOpen: boolean) =>
  useModulesStore.setState({ isCreateDialogOpen });

export const setIsMovedToQualifiedDialogOpen = (
  isMovedToQualifiedDialogOpen: boolean,
) => useModulesStore.setState({ isMovedToQualifiedDialogOpen });

export const setSelectedUsers = (selectedUsers: MemberType[]) =>
  useModulesStore.setState({ selectedUsers });

export const setIsDeleteMemberDialogOpen = (
  isDeleteMemberDialogOpen: boolean,
) => useModulesStore.setState({ isDeleteMemberDialogOpen });

export const setIsProgressDialaogOpen = (isProgressDialaogOpen: boolean) =>
  useModulesStore.setState({ isProgressDialaogOpen });

export const setIsAddMemberDialogOpen = (isAddMemberDialogOpen: boolean) =>
  useModulesStore.setState({ isAddMemberDialogOpen });

export const setIsModuleSettingsDialogOpen = (
  isModuleSettingsDialogOpen: boolean,
) => useModulesStore.setState({ isModuleSettingsDialogOpen });

export const setSearchText = (searchText: string) =>
  useModulesStore.setState({ searchText });

export const setIsResumeDialogOpen = (isResumeDialogOpen: boolean) =>
  useModulesStore.setState({ isResumeDialogOpen });

export const setIsDeleteModuleDialogOpen = (
  isDeleteModuleDialogOpen: boolean,
) => useModulesStore.setState({ isDeleteModuleDialogOpen });

export const setIsPauseDialogOpen = (isPauseDialogOpen: boolean) =>
  useModulesStore.setState({ isPauseDialogOpen });

export const setSelUser = (selUser: InterviewModuleRelationType | null) =>
  useModulesStore.setState({ selUser });

export const setPauseJson = (pause_json: PauseJson | null) =>
  useModulesStore.setState({ pause_json });

export const resetModulesStore = () =>
  useModulesStore.setState(initialStateSchedulingStore);

export const setTrainingStatus = (trainingStatus: StatusTraining) =>
  useModulesStore.setState({ trainingStatus });
