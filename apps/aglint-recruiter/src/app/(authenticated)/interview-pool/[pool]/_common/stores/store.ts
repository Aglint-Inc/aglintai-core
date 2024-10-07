import { create } from 'zustand';

import { type SchedulingSlice } from '../types/pool';

export const initialStateSchedulingStore: SchedulingSlice = {
  isEditPoolDialogOpen: false,
  isCreateDialogOpen: false,
  isSettingDialogOpen: false,
  isDeleteMemberDialogOpen: false,
  isDeleteModuleDialogOpen: false,
  isPauseDialogOpen: false,
  isMovedToQualifiedDialogOpen: false,
  isAddMemberDialogOpen: false,
  isArchiveDialogOpen: false,
  isResumeDialogOpen: false,
  selectedUsers: [],
  selUser: null,
  pause_json: { isManual: true, start_date: '', end_date: '' },
  trainingStatus: 'qualified',
  initalOpen: null,
  localModule: null,
};

export const useModulesStore = create<SchedulingSlice>()(
  () => initialStateSchedulingStore,
);

export const setLocalModule = (localModule: SchedulingSlice['localModule']) =>
  useModulesStore.setState({ localModule });

export const setIsEditPoolDialogOpen = (isEditPoolDialogOpen: boolean) =>
  useModulesStore.setState({ isEditPoolDialogOpen });

export const setInitalOpen = (initalOpen: SchedulingSlice['initalOpen']) =>
  useModulesStore.setState({ initalOpen });

export const setIsCreateDialogOpen = (isCreateDialogOpen: boolean) =>
  useModulesStore.setState({ isCreateDialogOpen });

export const setIsArchiveDialogOpen = (isArchiveDialogOpen: boolean) =>
  useModulesStore.setState({ isArchiveDialogOpen });

export const setIsSettingsDialogOpen = (isSettingDialogOpen: boolean) =>
  useModulesStore.setState({ isSettingDialogOpen });

export const setIsMovedToQualifiedDialogOpen = (
  isMovedToQualifiedDialogOpen: boolean,
) => useModulesStore.setState({ isMovedToQualifiedDialogOpen });

export const setSelectedUsers = (
  selectedUsers: SchedulingSlice['selectedUsers'],
) => useModulesStore.setState({ selectedUsers });

export const setIsDeleteMemberDialogOpen = (
  isDeleteMemberDialogOpen: boolean,
) => useModulesStore.setState({ isDeleteMemberDialogOpen });

export const setIsAddMemberDialogOpen = (isAddMemberDialogOpen: boolean) =>
  useModulesStore.setState({ isAddMemberDialogOpen });

export const setIsResumeDialogOpen = (isResumeDialogOpen: boolean) =>
  useModulesStore.setState({ isResumeDialogOpen });

export const setIsDeleteModuleDialogOpen = (
  isDeleteModuleDialogOpen: boolean,
) => useModulesStore.setState({ isDeleteModuleDialogOpen });

export const setIsPauseDialogOpen = (isPauseDialogOpen: boolean) =>
  useModulesStore.setState({ isPauseDialogOpen });

export const setSelUser = (selUser: SchedulingSlice['selUser']) =>
  useModulesStore.setState({ selUser });

export const setPauseJson = (pause_json: SchedulingSlice['pause_json']) =>
  useModulesStore.setState({ pause_json });

export const resetModulesStore = () =>
  useModulesStore.setState(initialStateSchedulingStore);

export const setTrainingStatus = (
  trainingStatus: SchedulingSlice['trainingStatus'],
) => useModulesStore.setState({ trainingStatus });
