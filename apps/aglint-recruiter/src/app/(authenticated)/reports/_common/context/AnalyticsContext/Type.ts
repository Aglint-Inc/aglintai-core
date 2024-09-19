export type AnalyticsFilters = {
  job: string | null;
  department: number | null;
  location: number | null;
  dateRange: { from: Date; to: Date } | null;
};

export interface AnalyticsContextInterface {
  filtersOptions: {
    // eslint-disable-next-line no-unused-vars
    [key in keyof Omit<AnalyticsFilters, 'dateRange'>]: {
      id: AnalyticsFilters[key];
      label: string;
    }[];
  } & {
    dateRange: {
      id: string;
      label: string;
    }[];
  };
  filters: AnalyticsFilters;
  // eslint-disable-next-line no-unused-vars
  handleSetFilter: (filters: {
    [key in keyof AnalyticsFilters]?: AnalyticsFilters[key];
  }) => void;
}
