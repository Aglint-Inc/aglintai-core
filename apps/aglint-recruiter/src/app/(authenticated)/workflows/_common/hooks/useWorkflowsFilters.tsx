import { useWorkflowsStore } from './useWorkflowsStore';

export const useWorkflowsFilters = () =>
  useWorkflowsStore((state) => state.filters);
