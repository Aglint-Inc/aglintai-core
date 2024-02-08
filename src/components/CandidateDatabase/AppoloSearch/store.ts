import { StateCreator } from 'zustand';

import { useBoundStore } from '@/src/store';
import { CandidateListTypeDB } from '@/src/types/data.types';

import {
  Candidate,
  CandidateSearchHistoryType,
  FetchCandidatesParams,
} from './types';
import { initialQuery } from './utils';

export const createCandidateDatabaseSlice: StateCreator<
  CandidateDatabaseSlice
> = () => ({
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
});

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

export const setList = (list: CandidateListTypeDB) =>
  useBoundStore.setState({ list });

export const setLists = (lists: CandidateListTypeDB[]) =>
  useBoundStore.setState({ lists });

export const setFilters = (filters: FetchCandidatesParams) =>
  useBoundStore.setState({ filters });

export const setIsSelectAll = (isSelectAll: boolean) =>
  useBoundStore.setState({ isSelectAll });

export const setSelectedCandidates = (selectedCandidates: Candidate[]) =>
  useBoundStore.setState({ selectedCandidates });

export const setSelectedCandidate = (selectedCandidate: Candidate | null) =>
  useBoundStore.setState({ selectedCandidate });

export const setEmailOutReach = (emailOutReach: 'single' | 'multiple' | null) =>
  useBoundStore.setState({ emailOutReach });

export const setIsFilterLoading = (isFilterLoading: boolean) =>
  useBoundStore.setState({ isFilterLoading });

export const setIsFilterOpen = (isfilterOpen: boolean) =>
  useBoundStore.setState({ isfilterOpen });

export const setCandidates = (candidates: Candidate[] | null) =>
  useBoundStore.setState({ candidates });

export const setCandidateHistory = (
  candidateHistory: CandidateSearchHistoryType,
) => useBoundStore.setState({ candidateHistory });

export const setIsEditDialogOpen = (isEditDialogOpen: boolean) =>
  useBoundStore.setState({ isEditDialogOpen });
