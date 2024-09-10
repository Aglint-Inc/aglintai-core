import { useWorkflowsStore } from './useWorkflowsStore';

export const useWorkflowsDeletion = () =>
  useWorkflowsStore((state) => state.deletion);
