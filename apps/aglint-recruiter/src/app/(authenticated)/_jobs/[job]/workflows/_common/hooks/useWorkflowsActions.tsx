import { useWorkflowsStore } from './useWorkflowsStore';

export const useWorkflowsActions = () =>
  useWorkflowsStore((state) => state.actions);
