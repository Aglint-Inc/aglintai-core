import { InterviewModuleRelationType } from '@aglint/shared-types';
import { PauseJson } from '@aglint/shared-types';
import { create } from 'zustand';

import {
  MemberType,
  ModuleType,
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
  department: '',
  settings: {
    require_training: false,
    noShadow: 2,
    noReverseShadow: 2,
    reqruire_approval: false,
    approve_users: [],
  },
  description: '',
  instructions: '',
  created_by: '',
  is_archived: false,
};

export const initialStateSchedulingStore: SchedulingSlice = {
  isCreateDialogOpen: null,
  isSettingDialogOpen: false,
  isDeleteMemberDialogOpen: false,
  isDeleteModuleDialogOpen: false,
  isPauseDialogOpen: false,
  isMovedToQualifiedDialogOpen: false,
  isAddMemberDialogOpen: false,
  isProgressDialaogOpen: false,
  isArchiveDialogOpen: false,
  isResumeDialogOpen: false,
  isModuleSettingsDialogOpen: false,
  selectedUsers: [],
  selUser: null,
  pause_json: { isManual: true, start_date: '', end_date: '' },
  trainingStatus: 'qualified',
  initalOpen: null,
};

export const useModulesStore = create<SchedulingSlice>()(
  () => initialStateSchedulingStore,
);

export const setInitalOpen = (initalOpen: StatusTraining | null) =>
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
