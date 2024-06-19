/* eslint-disable security/detect-object-injection */
import FilterHeader from 'aglint-recruiter/src/components/Common/FilterHeader';
import { useMemo } from 'react';

import { JobIcon } from '@/src/components/Tasks/TaskBody/GroupBy';
import { useJobs } from '@/src/context/JobsContext';

import {
  useWorkflowStore,
  WorkflowStore,
} from '../../../../context/Workflows/store';

const Filters = () => {
  const {
    filters: { search, ...filters },
    setFilters,
  } = useWorkflowStore(({ filters, setFilters }) => ({ filters, setFilters }));
  const options = useFilterOptions();
  const safeFilters: Parameters<typeof FilterHeader>[0]['filters'] = useMemo(
    () =>
      Object.entries(filters).map(([key, value]) => ({
        active: value.length,
        name: key,
        value: value,
        type: 'filter',
        icon: <FilterIcon filter={key as FilterIconProps['filter']} />,
        setValue: (newValue) =>
          setFilters({ [key]: structuredClone(newValue) }),
        options: options[key] ?? [],
      })),
    [filters],
  );
  const component = useMemo(
    () => (
      <FilterHeader
        filters={safeFilters}
        search={{
          value: search,
          setValue: (newValue) => setFilters({ search: newValue }),
          placeholder: 'Search for a workflow',
        }}
      />
    ),
    [safeFilters, search],
  );
  return component;
};

export default Filters;

type FilterIconProps = {
  filter: keyof Omit<WorkflowStore['filters'], 'search'>;
};
const FilterIcon = ({ filter }: FilterIconProps) => {
  switch (filter) {
    case 'job':
      return <JobIcon />;
  }
};

type FilterOptions = {
  // eslint-disable-next-line no-unused-vars
  [id in FilterIconProps['filter']]: { id: string; label: string }[];
};
const useFilterOptions = (): FilterOptions => {
  const {
    jobs: { data },
  } = useJobs();
  const job = (data ?? []).map((job) => ({
    id: job.id,
    label: job.job_title,
  }));
  return { job };
};
