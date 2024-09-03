/* eslint-disable security/detect-object-injection */
import FilterHeader from 'aglint-recruiter/src/components/Common/FilterHeader';
import { memo, useMemo } from 'react';

import { GlobalBadge } from '@/devlink3/GlobalBadge';
import { JobIcon } from '@/src/components/Tasks/TaskBody/GroupBy';
import { useWorkflows } from '@/src/context/Workflows';
import { type Workflow } from '@/src/types/workflow.types';
import { SafeObject } from '@/src/utils/safeObject';

import {
  type WorkflowStore,
  useWorkflowStore,
} from '../../../../context/Workflows/store';
import { TAG_OPTIONS } from '../../constants';

const Filters = memo(() => {
  const {
    filters: { search, ...filters },
    setFilters,
  } = useWorkflowStore(({ filters, setFilters }) => ({ filters, setFilters }));

  const { tagOptions, jobOptions } = useWorkflowFilterOptions();

  const options = useMemo(
    () => ({ job: jobOptions, tags: tagOptions }),
    [jobOptions, tagOptions],
  );

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
    case 'tags':
      return <></>;
  }
};

export const useWorkflowFilterOptions = () => {
  const { workflowJobFilter } = useWorkflows();

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
  const tagOptions = useMemo(
    () =>
      SafeObject.values(TAG_OPTIONS)
        .toReversed()
        .map((option) => ({
          id: option.value,
          label: (
            <GlobalBadge
              key={option.value}
              textBadge={option.name}
              size={1}
              showIcon={!!option.iconName || !!option.icon}
              color={option.color}
              iconName={option.iconName}
              slotIcon={option.icon}
            />
          ),
        })),
    [],
  );
  return { tagOptions, jobOptions };
};

export const getFilteredWorkflows = (
  filters: WorkflowStore['filters'],
  data: Workflow[],
) => {
  return data.filter(({ title, jobs, tags }) => {
    return Object.entries(filters).reduce((acc, [key, value]) => {
      if (!acc) return acc;
      switch (key as keyof WorkflowStore['filters']) {
        case 'search':
          return title.toLowerCase().includes((value as string).toLowerCase());
        case 'job':
          return (
            value.length === 0 ||
            !!jobs.reduce((acc, curr) => {
              if ((value as string[]).includes(curr.id)) acc.push(curr);
              return acc;
            }, []).length
          );
        case 'tags':
          return (
            value.length === 0 ||
            !!tags.reduce((acc, curr) => {
              if (
                (value as WorkflowStore['filters']['tags']).find((tag) =>
                  curr.includes(tag),
                )
              )
                acc.push(curr);
              return acc;
            }, []).length
          );
      }
    }, true);
  });
};
