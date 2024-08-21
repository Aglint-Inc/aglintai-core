import { memo, useMemo } from 'react';

import { useSchedulingAnalytics } from '@/src/context/SchedulingAnalytics';

import FilterHeader from '../../Common/FilterHeader';

type FilterArg = Parameters<typeof FilterHeader>[0]['filters'][number];
export const Filters = memo(() => {
  const {
    filters: { status },
  } = useSchedulingAnalytics();
  if (status === 'error') return <></>;
  if (status === 'pending') return <></>;
  return <Content />;
});
Filters.displayName = 'Filters';

const Content = memo(() => {
  const {
    filters: { data },
    jobs,
    setJobs,
    departments,
    setDepartments,
  } = useSchedulingAnalytics();
  const safeDepartments = useMemo(
    () => departments.map((department) => String(department)),
    [departments],
  );
  const jobOptions = useMemo(
    () =>
      (data?.jobs ?? []).map(({ id, job_title }) => ({
        label: job_title,
        id,
      })),
    [data?.jobs],
  );
  const departmentOptions = useMemo(
    () =>
      (data?.departments ?? []).map(({ id, name }) => ({
        label: name,
        id: String(id),
      })),
    [data?.departments],
  );
  const jobFilter: FilterArg = useMemo(
    () => ({
      type: 'filter',
      name: 'Jobs',
      value: jobs,
      options: jobOptions,
      setValue: (newJobs) => setJobs(newJobs),
      iconname: '',
      icon: <></>,
    }),
    [jobs, jobOptions],
  );
  const deparmentFilter: FilterArg = useMemo(
    () => ({
      type: 'filter',
      name: 'Departments',
      value: safeDepartments,
      options: departmentOptions,
      setValue: (newJobs) =>
        setDepartments(newJobs.map((department) => Number(department))),
      iconname: '',
      icon: <></>,
    }),
    [safeDepartments, departmentOptions],
  );
  return <FilterHeader filters={[jobFilter, deparmentFilter]} />;
});
Content.displayName = 'Content';
