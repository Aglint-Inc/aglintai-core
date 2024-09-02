import { type CandidateListTypeDB } from '@aglint/shared-types';
import { create } from 'zustand';

import {
  type Candidate,
  type CandidateSearchHistoryType,
  type FetchCandidatesParams,
} from './types';
import { initialQuery } from './utils';

export type CandidateDatabaseSlice = {
  isEditDialogOpen: boolean;
  candidateHistory: CandidateSearchHistoryType;
  candidates: Candidate[] | null;
  isfilterOpen: boolean;
  isFilterLoading: boolean;
  emailOutReach: 'single' | 'multiple' | null;
  selectedCandidate: Candidate | null;
  selectedCandidates: Candidate[];
  isSelectAll: boolean;
  filters: FetchCandidatesParams;
  lists: CandidateListTypeDB[];
  list: CandidateListTypeDB;
};

export let initialCandidateDatabaseState: CandidateDatabaseSlice = {
  isEditDialogOpen: false,
  candidateHistory: null,
  candidates: null,
  isfilterOpen: false,
  isFilterLoading: false,
  emailOutReach: null,
  selectedCandidate: null,
  selectedCandidates: [],
  isSelectAll: false,
  filters: initialQuery(),
  lists: [],
  list: null,
};

export const useCandidateStore = create<CandidateDatabaseSlice>()(() => ({
  ...initialCandidateDatabaseState,
}));

export const setList = (list: CandidateListTypeDB) =>
  useCandidateStore.setState({ list });

export const setLists = (lists: CandidateListTypeDB[]) =>
  useCandidateStore.setState({ lists });

export const setFilters = (filters: FetchCandidatesParams) =>
  useCandidateStore.setState({ filters });

export const setIsSelectAll = (isSelectAll: boolean) =>
  useCandidateStore.setState({ isSelectAll });

export const setSelectedCandidates = (selectedCandidates: Candidate[]) =>
  useCandidateStore.setState({ selectedCandidates });

export const setSelectedCandidate = (selectedCandidate: Candidate | null) =>
  useCandidateStore.setState({ selectedCandidate });

export const setEmailOutReach = (emailOutReach: 'single' | 'multiple' | null) =>
  useCandidateStore.setState({ emailOutReach });

export const setIsFilterLoading = (isFilterLoading: boolean) =>
  useCandidateStore.setState({ isFilterLoading });

export const setIsFilterOpen = (isfilterOpen: boolean) =>
  useCandidateStore.setState({ isfilterOpen });

export const setCandidates = (candidates: Candidate[] | null) =>
  useCandidateStore.setState({ candidates });

export const setCandidateHistory = (
  candidateHistory: CandidateSearchHistoryType,
) => useCandidateStore.setState({ candidateHistory });

export const setIsEditDialogOpen = (isEditDialogOpen: boolean) =>
  useCandidateStore.setState({ isEditDialogOpen });

export const resetCandidateStore = () =>
  useCandidateStore.setState({ ...initialCandidateDatabaseState });
