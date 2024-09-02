import { type DatabaseTable } from '@aglint/shared-types';
import { create } from 'zustand';

import { type useModuleRelations } from './hooks';

type InterviewerDetailSlice = {
  isPauseDialogOpen: boolean;
  isResumeDialogOpen: boolean;
  isRemoveModuleDialogOpen: boolean;
  isAddInterviewTypeDialogOpen: boolean;
  selRelation: ReturnType<typeof useModuleRelations>['data'][0];
  addInterviewType: DatabaseTable['interview_module_relation']['training_status'];
};

export const initialInterviewerDetailStore: InterviewerDetailSlice = {
  isPauseDialogOpen: false,
  isResumeDialogOpen: false,
  isRemoveModuleDialogOpen: false,
  isAddInterviewTypeDialogOpen: false,
  selRelation: null,
  addInterviewType: 'qualified',
};

export const useInterviewerDetailStore = create<InterviewerDetailSlice>()(
  () => initialInterviewerDetailStore,
);

export const setAddInterviewType = (
  addInterviewType: InterviewerDetailSlice['addInterviewType'],
) => useInterviewerDetailStore.setState({ addInterviewType });

export const setIsAddInterviewTypeDialogOpen = (
  isAddInterviewTypeDialogOpen: boolean,
) => useInterviewerDetailStore.setState({ isAddInterviewTypeDialogOpen });

export const setSelRelation = (
  selRelation: ReturnType<typeof useModuleRelations>['data'][0],
) => useInterviewerDetailStore.setState({ selRelation });

export const setIsResumeDialogOpen = (isResumeDialogOpen: boolean) =>
  useInterviewerDetailStore.setState({ isResumeDialogOpen });

export const setIsPauseDialogOpen = (isPauseDialogOpen: boolean) =>
  useInterviewerDetailStore.setState({ isPauseDialogOpen });

export const setisRemoveModuleDialogOpen = (
  isRemoveModuleDialogOpen: boolean,
) => useInterviewerDetailStore.setState({ isRemoveModuleDialogOpen });

export const resetModulesStore = () =>
  useInterviewerDetailStore.setState(initialInterviewerDetailStore);
