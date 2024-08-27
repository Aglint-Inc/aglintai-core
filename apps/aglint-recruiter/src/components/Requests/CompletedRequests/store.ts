import { create } from 'zustand';

export interface CompletedRequests {
  completedMode: boolean;
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
  completedMode: false,
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

export const setCompletedMode = (completedMode: boolean) =>
  useCompletedRequestsStore.setState({
    completedMode,
  });

export const setCompletedFilters = (
  completedFilters: CompletedRequests['completedFilters'],
) =>
  useCompletedRequestsStore.setState({
    completedFilters,
  });
