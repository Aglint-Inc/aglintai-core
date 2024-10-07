import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useTenant } from '@/company/hooks';
import { supabase } from '@/utils/supabase/client';

import { type AnalyticsContextInterface, type AnalyticsFilters } from './Type';

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

export default function AnalyticsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { recruiter_id } = useTenant();
  const [filtersOptions, setFiltersOptions] = useState<
    AnalyticsContextInterface['filtersOptions']
  >({
    ...InitialAnalyticsContext.filtersOptions,
  });
  const [filters, setFilters] = useState<AnalyticsFilters>({
    ...InitialAnalyticsContext.filters,
  });
  const handleSetFilter: AnalyticsContextInterface['handleSetFilter'] = (
    data,
  ) => {
    setFilters((pre) => ({ ...pre, ...data }));
  };
  useEffect(() => {
    recruiter_id &&
      getOptions(recruiter_id).then((data) => {
        setFiltersOptions((pre) => ({ ...pre, ...data }));
      });
  }, [recruiter_id]);
  return (
    <AnalyticsContext.Provider
      value={{
        filtersOptions,
        filters,
        handleSetFilter,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  return useContext(AnalyticsContext);
}

async function getOptions(recruiter_id: string) {
  const job_details = (
    await supabase
      .from('public_jobs')
      .select('id, label:job_title, department_id, location_id')
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data!;
  const dep_id_filter = [
    ...new Set(job_details.map((item) => item.department_id).filter(Boolean)),
  ];
  const loc_id_filter = [
    ...new Set(job_details.map((item) => item.location_id).filter(Boolean)),
  ];
  const job_ids = (
    await supabase.from('interview_meeting').select('job_id').throwOnError()
  ).data!.map((item) => item.job_id);
  const department = (
    await supabase
      .from('departments')
      .select('id, label:name')
      .in('id', dep_id_filter)
      .throwOnError()
  ).data!.map((item) => ({ label: item.label, id: item.id }));
  const location = (
    await supabase
      .from('office_locations')
      .select('id, label:name')
      .in('id', loc_id_filter)
      .throwOnError()
  ).data!.map((item) => ({ label: item.label!, id: item.id }));
  return {
    department,
    location,
    job: job_details
      .filter((job) => job_ids.includes(job.id))
      .map((item) => ({ label: item.label, id: item.id })),
  };
}
