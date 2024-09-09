import { useJobDashboardStore } from './useJobDashboardStore';

export const useJobDashboardFilters = () =>
  useJobDashboardStore((state) => state.filters);
