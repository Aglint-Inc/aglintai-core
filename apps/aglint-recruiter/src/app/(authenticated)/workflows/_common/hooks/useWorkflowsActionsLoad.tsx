import { useWorkflowsStore } from './useWorkflowsStore';

export const useWorkflowsActionsLoad = () =>
  useWorkflowsStore((state) => state.actionsLoad);
