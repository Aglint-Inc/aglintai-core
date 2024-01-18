import { StateCreator } from 'zustand';

import { Candidate, CandidateSearchHistoryType } from './types';
import { initialQuery } from './utils';

export const createCandidateDatabaseSlice: StateCreator<
  CandidateDatabaseSlice
> = (set) => ({
  isEditDialogOpen: false,
  setIsEditDialogOpen: (isEditDialogOpen) =>
    set((state) => ({ ...state, isEditDialogOpen })),
  candidateHistory: null,
  setCandidateHistory: (candidateHistory) =>
    set((state) => ({ ...state, candidateHistory })),
  candidates: null,
  setCandidates: (candidates) => set((state) => ({ ...state, candidates })),
  bookmark: false,
  setBookmark: (bookmark) => set((state) => ({ ...state, bookmark })),
  isfilterOpen: false,
  setIsFilterOpen: (isfilterOpen) =>
    set((state) => ({ ...state, isfilterOpen })),
  isFilterLoading: false,
  setIsFilterLoading: (isFilterLoading) =>
    set((state) => ({ ...state, isFilterLoading })),
  emailOutReach: false,
  setEmailOutReach: (emailOutReach) =>
    set((state) => ({ ...state, emailOutReach })),
  selectedCandidate: null,
  setSelectedCandidate: (selectedCandidate) =>
    set((state) => ({ ...state, selectedCandidate })),
  selectedCandidates: [],
  setSelectedCandidates: (selectedCandidates) =>
    set((state) => ({ ...state, selectedCandidates })),
  isSelectAll: false,
  setIsSelectAll: (isSelectAll) => set((state) => ({ ...state, isSelectAll })),
  filters: initialQuery(),
  setFilters: (filters) => set((state) => ({ ...state, filters })),
});

export type CandidateDatabaseSlice = {
  isEditDialogOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsEditDialogOpen: (isEditDialogOpen: boolean) => void;
  candidateHistory: CandidateSearchHistoryType;
  // eslint-disable-next-line no-unused-vars
  setCandidateHistory: (candidates: CandidateSearchHistoryType) => void;
  candidates: Candidate[] | null;
  // eslint-disable-next-line no-unused-vars
  setCandidates: (candidates: Candidate[] | null) => void;
  bookmark: boolean;
  // eslint-disable-next-line no-unused-vars
  setBookmark: (bookmark: boolean) => void;
  isfilterOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsFilterOpen: (isfilterOpen: boolean) => void;
  isFilterLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsFilterLoading: (isFilterLoading: boolean) => void;
  emailOutReach: boolean;
  // eslint-disable-next-line no-unused-vars
  setEmailOutReach: (emailOutReach: boolean) => void;
  selectedCandidate: Candidate | null;
  // eslint-disable-next-line no-unused-vars
  setSelectedCandidate: (selectedCandidate: Candidate | null) => void;
  selectedCandidates: Candidate[];
  // eslint-disable-next-line no-unused-vars
  setSelectedCandidates: (selectedCandidates: Candidate[]) => void;
  isSelectAll: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsSelectAll: (isSelectAll: boolean) => void;
  filters: any;
  // eslint-disable-next-line no-unused-vars
  setFilters: (filters: any) => void;
};
