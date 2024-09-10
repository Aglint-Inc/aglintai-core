import { useJobDashboardStore } from './useJobDashboardStore';

export const useJobDashboardSelections = () =>
  useJobDashboardStore((state) => state.selections);
