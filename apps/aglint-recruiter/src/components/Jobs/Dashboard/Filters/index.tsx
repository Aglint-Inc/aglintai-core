import { Stack } from '@mui/material';
import _ from 'lodash';
import { useMemo, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Job } from '@/src/queries/jobs/types';
import { useAllMembers } from '@/src/queries/members';

import FilterHeader from '../../../Common/FilterHeader';
import { initalFilterValue } from '..';

const ORDER = {
  published: 0,
  draft: 1,
  closed: 2,
} satisfies {
  // eslint-disable-next-line no-unused-vars
  [id in Job['status']]: 0 | 1 | 2;
};

function FilterJobDashboard({
  filterOptions,
  setFilterValues,
  filterValues,
  setSort,
  sortValue,
  sortOptions,
  searchText,
  handlerFilter,
}: {
  filterOptions: ReturnType<typeof useJobFilterAndSort>['filterOptions'];
  setFilterValues: ReturnType<typeof useJobFilterAndSort>['setFilterValues'];
  filterValues: ReturnType<typeof useJobFilterAndSort>['filterValues'];
  setSort: ReturnType<typeof useJobFilterAndSort>['setSort'];
  sortValue: ReturnType<typeof useJobFilterAndSort>['sortValue'];
  sortOptions: ReturnType<typeof useJobFilterAndSort>['sortOptions'];
  searchText: string;
  // eslint-disable-next-line no-unused-vars
  handlerFilter: (value: string) => void;
}) {
  const isResetAll = _.isEqual(filterValues, initalFilterValue);

  return (
    <Stack width={'100%'}>
      <FilterHeader
        isResetAll={!isResetAll}
        filters={[
          {
            type: 'filter',
            name: 'status',
            iconname: '',
            options: filterOptions.status,
            setValue: (val) => {
              setFilterValues({
                ...filterValues,
                status: val,
              });
            },
            value: filterValues.status,
          },
          {
            type: 'filter',
            name: 'department',
            iconname: 'apartment',
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
            name: 'Job type',
            iconname: 'work',
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
            iconname: 'person',
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
            iconname: 'person',
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
            const safeOrder = {};
            if (order.order) safeOrder['order'] = order.order;
            if (order.type) safeOrder['option'] = order.type;
            setSort((prev) => ({ ...prev, ...safeOrder }));
          },
          sortOptions: sortOptions as unknown as {
            options: string[];
            order: string[];
          },
        }}
        search={{
          value: searchText,
          setValue: (value) => handlerFilter(value),
          placeholder: 'Search jobs',
        }}
      />
    </Stack>
  );
}

export default FilterJobDashboard;

export const useJobFilterAndSort = (jobs: Job[]) => {
  const {
    recruiter: {
      recruiter_preferences: { greenhouse },
    },
  } = useAuthDetails();
  const { members } = useAllMembers();
  const sortOptions = {
    options: ['published_date', 'name', 'status'] as const,
    order: ['descending', 'ascending'] as const,
  };
  const [searchText, setSearchText] = useState<string>('');
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
      status: [
        ...new Set(
          jobs.map((job) => job.status).filter((item) => Boolean(item)),
        ),
      ],
    };
  };
  // console.log(sort);
  const statusFilterValues = String(
    filterValues.status.sort((a, b) => a.localeCompare(b)),
  );
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
    if (searchText.length)
      temp = temp.filter((job) =>
        (job?.job_title ?? '')
          .toLowerCase()
          .includes((searchText ?? '').toLowerCase()),
      );
    if (filterValues.status.length)
      temp = temp.filter((job) => filterValues.status.includes(job.status));
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
    statusFilterValues,
    searchText,
  ]);
  const sortedJobs = useMemo(() => {
    if (sort.option === 'status') {
      const statusSortedJobs = filteredJobs
        .reduce(
          (acc, curr) => {
            acc[ORDER[curr.status]].push(curr);
            return acc;
          },
          [[], [], []] as Job[][],
        )
        .flatMap((jobs) => jobs);
      if (sort.order === 'descending') return statusSortedJobs;
      return statusSortedJobs.toReversed();
    }
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

  const safeOptions = useMemo(
    () =>
      greenhouse
        ? {
            ...sortOptions,
            options: sortOptions.options.filter((type) => type !== 'status'),
          }
        : sortOptions,
    [greenhouse, sortOptions],
  );

  return {
    searchText,
    setSearchText,
    sortOptions: safeOptions,
    setSort,
    sortValue: sort,
    filterOptions,
    filterValues,
    setFilterValues,
    jobs: sortedJobs,
  };
};
