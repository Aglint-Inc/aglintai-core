import { create } from 'zustand';

export interface CompletedRequests {
  completedFilters?: {
    assigneeList?: string[];
    assignerList?: string[];
    title?: string;
    jobs?: string[];
    applications?: string[];
    type: string[];
    date: string[];
  };
}

const initialState: CompletedRequests = {
  completedFilters: {
    assigneeList: [],
    assignerList: [],
    title: '',
    jobs: [],
    applications: [],
    type: [],
    date: [],
  },
};

export const useCompletedRequestsStore = create<CompletedRequests>()(() => ({
  ...initialState,
}));

export const setCompletedFilters = (
  completedFilters: CompletedRequests['completedFilters'],
) =>
  useCompletedRequestsStore.setState({
    completedFilters,
  });
