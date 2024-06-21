import { Stack } from '@mui/material';
import { useMemo, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Job } from '@/src/queries/jobs/types';

import FilterHeader from '../../../Common/FilterHeader';

function FilterJobDashboard({
  filterOptions,
  setFilterValues,
  filterValues,
  setSort,
  sortValue,
  sortOptions,
}: {
  filterOptions: ReturnType<typeof useJobFilterAndSort>['filterOptions'];
  setFilterValues: ReturnType<typeof useJobFilterAndSort>['setFilterValues'];
  filterValues: ReturnType<typeof useJobFilterAndSort>['filterValues'];
  setSort: ReturnType<typeof useJobFilterAndSort>['setSort'];
  sortValue: ReturnType<typeof useJobFilterAndSort>['sortValue'];
  sortOptions: ReturnType<typeof useJobFilterAndSort>['sortOptions'];
}) {
  return (
    <Stack width={'100%'}>
      <FilterHeader
        filters={[
          {
            type: 'filter',
            name: 'department',
            options: filterOptions.department,
            setValue: (val) => {
              setFilterValues({
                ...filterValues,
                department: val,
              });
            },
            value: filterValues.department,
          },
          {
            type: 'filter',
            name: 'Job Location',
            options: filterOptions.location,
            setValue: (val) => {
              setFilterValues({
                ...filterValues,
                location: val,
              });
            },
            value: filterValues.location,
          },
          {
            type: 'filter',
            name: 'Job type',
            options: filterOptions.type,
            setValue: (val) => {
              setFilterValues({
                ...filterValues,
                type: val,
              });
            },
            value: filterValues.type,
          },
          {
            type: 'filter',
            name: 'hiring manager',
            options: filterOptions.hiringManager,
            setValue: (val) => {
              setFilterValues({
                ...filterValues,
                hiringManager: val,
              });
            },
            value: filterValues.hiringManager,
          },
          {
            type: 'filter',
            name: 'recruiter',
            options: filterOptions.recruiter,
            setValue: (val) => {
              setFilterValues({
                ...filterValues,
                recruiter: val,
              });
            },
            value: filterValues.recruiter,
          },
        ]}
        sort={{
          selected: sortValue,
          setOrder: (order) => {
            setSort({
              ...sortValue,
              ...(order as unknown as typeof sortValue),
            });
          },
          sortOptions: sortOptions as unknown as {
            options: string[];
            order: string[];
          },
        }}
      />
    </Stack>
  );
}

export default FilterJobDashboard;

export const useJobFilterAndSort = (jobs: Job[]) => {
  const { members } = useAuthDetails();
  const sortOptions = {
    options: ['published_date', 'name'] as const,
    order: ['descending', 'ascending'] as const,
  };
  const [sort, setSort] = useState<{
    option: (typeof sortOptions.options)[number];
    order: (typeof sortOptions.order)[number];
  }>({
    option: 'published_date',
    order: 'descending',
  });
  const [filterValues, setFilterValues] = useState({
    status: [] as string[],
    location: [] as string[],
    type: [] as string[],
    hiringManager: [] as string[],
    recruiter: [] as string[],
    source: [] as string[],
    department: [] as string[],
    workplace: [] as string[],
    coOrdinator: [] as string[],
  });

  const getFilterOptions = (jobs: Job[]) => {
    const managerId = [
      ...new Set(
        jobs
          .map((job) => job.hiring_manager)
          .filter((item) => Boolean(item))
          .sort((a, b) => a.localeCompare(b)),
      ),
    ];
    const recId = [
      ...new Set(
        jobs
          .map((job) => job.recruiter)
          .filter((item) => Boolean(item))
          .sort((a, b) => a.localeCompare(b)),
      ),
    ];
    return {
      location: [...new Set(jobs.map((job) => job.location || ''))],
      type: [...new Set(jobs.map((job) => job.job_type || ''))],
      hiringManager: members
        .filter((member) => {
          return managerId.includes(member.user_id);
        })
        .map((item) => {
          return {
            id: item.user_id,
            label: `${item.first_name} ${item.last_name}`.trim(),
          };
        }),
      recruiter: members
        .filter((member) => {
          return recId.includes(member.user_id);
        })
        .map((item) => {
          return {
            id: item.user_id,
            label: `${item.first_name} ${item.last_name}`.trim(),
          };
        }),
      source: [
        ...new Set(
          jobs.map((job) => job.posted_by).filter((item) => Boolean(item)),
        ),
      ],
      department: [
        ...new Set(
          jobs.map((job) => job.department).filter((item) => Boolean(item)),
        ),
      ],
      workplace: [
        ...new Set(
          jobs.map((job) => job.workplace_type).filter((item) => Boolean(item)),
        ),
      ],
      coOrdinator: [
        ...new Set(
          jobs
            .map((job) => job.interview_coordinator)
            .filter((item) => Boolean(item)),
        ),
      ],
    };
  };
  // console.log(sort);

  const locationFilterValues = String(
    filterValues.location.sort((a, b) => a.localeCompare(b)),
  );
  const typeFilterValues = String(
    filterValues.type.sort((a, b) => a.localeCompare(b)),
  );
  const hiringManagerFilterValues = String(
    filterValues.hiringManager.sort((a, b) => a.localeCompare(b)),
  );
  const recruiterFilterValues = String(
    filterValues.recruiter.sort((a, b) => a.localeCompare(b)),
  );
  const sourceFilterValues = String(
    filterValues.source.sort((a, b) => a.localeCompare(b)),
  );
  const departmentFilterValues = String(
    filterValues.department.sort((a, b) => a.localeCompare(b)),
  );
  const workplaceFilterValues = String(
    filterValues.workplace.sort((a, b) => a.localeCompare(b)),
  );
  const coOrdinatorFilterValues = String(
    filterValues.coOrdinator.sort((a, b) => a.localeCompare(b)),
  );

  const filteredJobs = useMemo(() => {
    let temp = [...jobs];
    if (filterValues.location.length)
      temp = temp.filter((job) => filterValues.location.includes(job.location));
    if (filterValues.type.length)
      temp = temp.filter((job) => filterValues.type.includes(job.job_type));
    if (filterValues.hiringManager.length)
      temp = temp.filter((job) =>
        filterValues.hiringManager.includes(job.hiring_manager || ''),
      );
    if (filterValues.source.length)
      temp = temp.filter((job) =>
        filterValues.source.includes(job.posted_by || ''),
      );
    if (filterValues.department.length)
      temp = temp.filter((job) =>
        filterValues.department.includes(job.department || ''),
      );
    if (filterValues.workplace.length)
      temp = temp.filter((job) =>
        filterValues.workplace.includes(job.workplace_type || ''),
      );
    if (filterValues.recruiter.length)
      temp = temp.filter((job) =>
        filterValues.recruiter.includes(job.recruiter || ''),
      );
    if (filterValues.coOrdinator.length)
      temp = temp.filter((job) =>
        filterValues.coOrdinator.includes(job.interview_coordinator || ''),
      );
    return temp;
  }, [
    jobs,
    locationFilterValues,
    typeFilterValues,
    hiringManagerFilterValues,
    recruiterFilterValues,
    sourceFilterValues,
    departmentFilterValues,
    workplaceFilterValues,
    coOrdinatorFilterValues,
  ]);
  const sortedJobs = useMemo(() => {
    return filteredJobs.sort((a, b) => {
      if (sort.option === 'name') {
        return (
          a.job_title.localeCompare(b.job_title) *
          (sort.order === 'ascending' ? 1 : -1)
        );
      } else {
        return (
          (new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()) *
          (sort.order === 'descending' ? 1 : -1)
        );
      }
    });
  }, [filteredJobs, sort.order, sort.option]);
  let filterOptions = getFilterOptions(jobs);
  return {
    sortOptions,
    setSort,
    sortValue: sort,
    filterOptions,
    filterValues,
    setFilterValues,
    jobs: sortedJobs,
  };
};
