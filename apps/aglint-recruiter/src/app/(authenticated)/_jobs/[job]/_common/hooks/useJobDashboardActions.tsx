import { useJobDashboardStore } from './useJobDashboardStore';

export const useJobDashboardActions = () =>
  useJobDashboardStore((state) => state.actions);
