/* eslint-disable security/detect-object-injection */

import { useMemo } from 'react';

import { useRequests } from '@/src/context/RequestsContext';
import { GetRequestParams } from '@/src/queries/requests';

import FilterHeader from '../../Common/FilterHeader';
import { useJobs } from '@/src/context/JobsContext';

// const sortOptions: GetRequestParams['sort']['type'][] = [
//   'created_at',
//   'title',
//   'updated_at',
// ];

function FilterAndSorting() {
  const {
    // eslint-disable-next-line no-unused-vars
    filters: { created_at, end_at, is_new, title, jobs, ...filters },
    setFilters,
  } = useRequests();

  const { jobs: jobList } = useJobs();

  const options: Partial<GetRequestParams['filters']> = {
    status: ['blocked', 'completed', 'in_progress', 'to_do'],
    type: [
      'schedule_request',
      'cancel_schedule_request',
      'decline_request',
      'reschedule_request',
    ],
  };

  const safeOptions = useMemo(
    () =>
      Object.keys(filters).reduce(
        (acc, curr) => {
          const safeKey = curr as keyof typeof filters;
          let value;
          switch (safeKey) {
            case 'status':
              value = options.status;
              break;
            case 'type':
              value = options.type;
              break;
          }
          acc[safeKey] = value;
          return acc;
        },
        {} as typeof filters,
      ),
    [options, filters],
  );

  const safeFilters: Parameters<typeof FilterHeader>[0]['filters'] =
    Object.entries(filters).map(
      ([key, value]) =>
        ({
          active: value.length,
          name: key,
          value: value ?? [],
          type: 'filter',
          iconname: '',
          icon: <></>,
          setValue: (newValue: typeof value) =>
            setFilters((prev) => ({ ...prev, [key]: newValue })),
          options: safeOptions[key] ?? [],
        }) as (typeof safeFilters)[number],
    );

  const jobFilter = {
    active: jobs.length,
    name: 'Jobs',
    value: jobs ?? [],
    type: 'filter',
    iconname: '',
    icon: <></>,
    setValue: (newValue) => {
      setFilters((prev) => ({ ...prev, jobs: newValue }));
    },
    options: jobList.data
      .filter((ele) => ele.status === 'published')
      .map((ele) => {
        return {
          id: ele.id,
          label: ele.job_title,
        };
      }),
  } as (typeof safeFilters)[number];

  return (
    <FilterHeader
      layoutMode='left-align'
      filters={[...safeFilters, jobFilter]}
      search={{
        value: title,
        setValue: (newValue: typeof title) => {
          setFilters((prev) => ({ ...prev, title: newValue }));
        },
        placeholder: 'Search Requests',
      }}
    />
  );
}

export default FilterAndSorting;
