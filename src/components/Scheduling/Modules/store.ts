import { create } from 'zustand';

import {
  InterviewModuleRelationType,
  RecruiterUserType
} from '@/src/types/data.types';

import {
  initialEditModule,
  initialStateSchedulingStore,
  ModuleType,
  PauseJson,
  SchedulingSlice,
  StatusTraining
} from './types';

export const useSchedulingStore = create<SchedulingSlice>()(
  () => initialStateSchedulingStore
);

export const setIsCreateDialogOpen = (isCreateDialogOpen: boolean) =>
  useSchedulingStore.setState({ isCreateDialogOpen });

export const setSelectedUsers = (selectedUsers: RecruiterUserType[]) =>
  useSchedulingStore.setState({ selectedUsers });

export const setIsDeleteMemberDialogOpen = (
  isDeleteMemberDialogOpen: boolean
) => useSchedulingStore.setState({ isDeleteMemberDialogOpen });

export const setIsAddMemberDialogOpen = (isAddMemberDialogOpen: boolean) =>
  useSchedulingStore.setState({ isAddMemberDialogOpen });

export const setIsModuleSettingsDialogOpen = (
  isModuleSettingsDialogOpen: boolean
) => useSchedulingStore.setState({ isModuleSettingsDialogOpen });

export const setSearchText = (searchText: string) =>
  useSchedulingStore.setState({ searchText });

export const setIsResumeDialogOpen = (isResumeDialogOpen: boolean) =>
  useSchedulingStore.setState({ isResumeDialogOpen });

export const setIsDeleteModuleDialogOpen = (
  isDeleteModuleDialogOpen: boolean
) => useSchedulingStore.setState({ isDeleteModuleDialogOpen });

export const setIsPauseDialogOpen = (isPauseDialogOpen: boolean) =>
  useSchedulingStore.setState({ isPauseDialogOpen });

export const setSelUser = (selUser: InterviewModuleRelationType | null) =>
  useSchedulingStore.setState({ selUser });

export const setPauseJson = (pause_json: PauseJson | null) =>
  useSchedulingStore.setState({ pause_json });

export const setEditModule = (editModule: Partial<ModuleType>) => {
  if (editModule.settings) {
    useSchedulingStore.setState((state) => ({
      editModule: { ...state.editModule, ...editModule }
    }));
  } else {
    useSchedulingStore.setState((state) => ({
      editModule: {
        ...state.editModule,
        ...editModule,
        settings: initialEditModule.settings
      }
    }));
  }
};

export const resetSchedulingStore = () =>
  useSchedulingStore.setState(initialStateSchedulingStore);

export const setTrainingStatus = (trainingStatus: StatusTraining) =>
  useSchedulingStore.setState({ trainingStatus });

export const deleteMemberSchedulingStore = (id: string) => {
  setIsDeleteMemberDialogOpen(false);
  const { editModule } = useSchedulingStore.getState();
  useSchedulingStore.setState({
    editModule: {
      ...editModule,
      relations: editModule.relations.filter((rel) => rel.user_id !== id)
    }
  });
};

export const addMembersSchedulingStore = (
  members: InterviewModuleRelationType[]
) => {
  const { editModule } = useSchedulingStore.getState();
  useSchedulingStore.setState({
    editModule: {
      ...editModule,
      relations: [...editModule.relations, ...members]
    }
  });
  setIsAddMemberDialogOpen(false);
  setSelectedUsers([]);
};

export const resetEditModule = () =>
  useSchedulingStore.setState({ editModule: initialEditModule });
