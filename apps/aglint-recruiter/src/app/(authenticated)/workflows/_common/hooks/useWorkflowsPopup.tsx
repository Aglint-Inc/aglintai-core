import { useWorkflowsStore } from './useWorkflowsStore';

export const useWorkflowsPopup = () =>
  useWorkflowsStore((state) => state.popup);
