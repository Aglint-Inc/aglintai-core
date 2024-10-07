import { createContext, useContext } from 'react';
import {
  type AnalyticsContextInterface,
  type AnalyticsFilters,
} from 'src/app/(authenticated)/reports/_common/context/AnalyticsContext/Type';

const InitialAnalyticsContext: AnalyticsContextInterface = {
  filtersOptions: {
    job: [],
    department: [],
    location: [],
    dateRange: [
      { id: 'today', label: 'Today' },
      { id: 'yesterday', label: 'Yesterday' },
      { id: 'thisWeek', label: 'This Week' },
      { id: 'thisMonth', label: 'This Month' },
      { id: 'thisQuarter', label: 'This Quarter' },
      { id: 'thisYear', label: 'This Year' },
      { id: 'yearToDate', label: 'Year to Date' },
      { id: 'custom', label: 'Custom Range' },
    ],
  },
  filters: {
    job: null,
    department: null,
    location: null,
    dateRange: null,
  },
  handleSetFilter: (filter: {
    [key in keyof AnalyticsFilters]?: AnalyticsFilters[key];
  }) => {
    filter;
  },
};

const AnalyticsContext = createContext(InitialAnalyticsContext);

export function useAnalyticsContext() {
  return useContext(AnalyticsContext);
}
