/* eslint-disable security/detect-object-injection */
import FilterHeader from 'aglint-recruiter/src/components/Common/FilterHeader';
import { memo, useMemo } from 'react';

import { JobIcon } from '@/src/components/Tasks/TaskBody/GroupBy';
import { useWorkflows } from '@/src/context/Workflows';

import {
  useWorkflowStore,
  WorkflowStore,
} from '../../../../context/Workflows/store';

const Filters = memo(() => {
  const { workflowJobFilter } = useWorkflows();
  const {
    filters: { search, ...filters },
    setFilters,
  } = useWorkflowStore(({ filters, setFilters }) => ({ filters, setFilters }));

  const jobOptions = useMemo(
    () =>
      (workflowJobFilter.data ?? []).map(
        ({ id, job_title, workflow_count }) => ({
          id,
          label: `${job_title} (${workflow_count})`,
        }),
      ),
    [workflowJobFilter.data],
  );

  const options = useMemo(() => ({ job: jobOptions }), [jobOptions]);

  const safeFilters: Parameters<typeof FilterHeader>[0]['filters'] = useMemo(
    () =>
      Object.entries(filters).map(([key, value]) => ({
        active: value.length,
        name: key,
        value: value,
        iconname: '',
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
});
Filters.displayName = 'Filters';

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
