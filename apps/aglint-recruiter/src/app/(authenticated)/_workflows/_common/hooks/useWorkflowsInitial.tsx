import { useWorkflowsStore } from './useWorkflowsStore';

export const useWorkflowsInitial = () =>
  useWorkflowsStore((state) => state.initial);
