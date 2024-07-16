import { cloneDeep } from 'lodash';
import { create } from 'zustand';

import { SessionsType } from '../../types';
import { Interviewer } from './types';

export interface EditSessionDrawer {
  selectedInterviewers: Interviewer[];
  trainingInterviewers: Interviewer[];
  debriefMembers: Interviewer[];
  trainingToggle: boolean;
  saving: boolean;
  editSession: SessionsType;
  errorValidation: {
    field: 'session_name' | 'qualified_interviewers' | 'training_interviewers';
    error: boolean;
    message: string;
  }[];
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
  saving: false,
  editSession: null,
  errorValidation: initialError(),
};

export const useEditSessionDrawerStore = create<EditSessionDrawer>()(() => ({
  ...initialState,
}));

export const setErrorValidation = (
  errorValidation: EditSessionDrawer['errorValidation'],
) => useEditSessionDrawerStore.setState({ errorValidation });

export const setSaving = (saving: boolean) =>
  useEditSessionDrawerStore.setState({ saving });

export const setTrainingToggle = (trainingToggle: boolean) =>
  useEditSessionDrawerStore.setState({ trainingToggle });

export const setDebriefMembers = (debriefMembers: Interviewer[]) =>
  useEditSessionDrawerStore.setState({ debriefMembers });

export const setTrainingInterviewers = (trainingInterviewers: Interviewer[]) =>
  useEditSessionDrawerStore.setState({ trainingInterviewers });

export const setSelectedInterviewers = (selectedInterviewers: Interviewer[]) =>
  useEditSessionDrawerStore.setState({ selectedInterviewers });

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
