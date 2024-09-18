import type { MemberTypeAutoComplete } from 'src/app/_common/components/MembersTextField';
import { create } from 'zustand';

import { type StageWithSessions } from '@/queries/application';

export interface EditSessionDrawer {
  selectedInterviewers: (MemberTypeAutoComplete & {
    module_relation_id: string;
  })[];
  trainingInterviewers: (MemberTypeAutoComplete & {
    module_relation_id: string;
  })[];
  debriefMembers: MemberTypeAutoComplete[];
  trainingToggle: boolean;
  saving: string | null;
  editSession: StageWithSessions[0]['sessions'][0];
  errorValidation: {
    field: 'session_name' | 'qualified_interviewers' | 'training_interviewers';
    error: boolean;
    message: string;
  }[];
  isEditOpen: boolean;
}

export const initialError = () => {
  const error: EditSessionDrawer['errorValidation'] = [
    {
      field: 'session_name',
      error: false,
      message: 'Session name is required',
    },
    {
      field: 'qualified_interviewers',
      error: false,
      message: 'Interviewers are required',
    },
    {
      field: 'training_interviewers',
      error: false,
      message: 'Interviewers are required',
    },
  ];
  return error;
};

const initialState: EditSessionDrawer = {
  selectedInterviewers: [],
  trainingInterviewers: [],
  debriefMembers: [],
  trainingToggle: false,
  saving: null,
  editSession: null,
  errorValidation: initialError(),
  isEditOpen: false,
};

export const useEditSessionDrawerStore = create<EditSessionDrawer>()(() => ({
  ...initialState,
}));

export const setIsEditOpen = (isEditOpen: boolean) =>
  useEditSessionDrawerStore.setState({ isEditOpen });

export const setErrorValidation = (
  errorValidation: EditSessionDrawer['errorValidation'],
) => useEditSessionDrawerStore.setState({ errorValidation });

export const setSaving = (saving: string | null) =>
  useEditSessionDrawerStore.setState({ saving });

export const setTrainingToggle = (trainingToggle: boolean) =>
  useEditSessionDrawerStore.setState({ trainingToggle });

export const setDebriefMembers = (debriefMembers: MemberTypeAutoComplete[]) =>
  useEditSessionDrawerStore.setState({ debriefMembers });

export const setTrainingInterviewers = (
  trainingInterviewers: (MemberTypeAutoComplete & {
    module_relation_id: string;
  })[],
) => useEditSessionDrawerStore.setState({ trainingInterviewers });

export const setSelectedInterviewers = (
  selectedInterviewers: (MemberTypeAutoComplete & {
    module_relation_id: string;
  })[],
) => useEditSessionDrawerStore.setState({ selectedInterviewers });

export const setEditSession = (
  editSession: Partial<EditSessionDrawer['editSession']> | null,
) =>
  useEditSessionDrawerStore.setState((state) => ({
    editSession: editSession
      ? { ...state.editSession, ...editSession }
      : state.editSession,
  }));

export const resetEditSessionDrawerState = () =>
  useEditSessionDrawerStore.setState({ ...initialState });
