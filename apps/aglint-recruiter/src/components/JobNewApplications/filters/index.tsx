/* eslint-disable security/detect-object-injection */
import type React from 'react';
import { useMemo } from 'react';

import {
  ApplicationsStore,
  useApplicationsStore,
} from '@/src/context/ApplicationsContext/store';
import { FilterHeader } from '@/src/context/Tasks/Filters/FilterHeader';

const Filters = () => {
  const {
    filters: { search, ...filters },
    setFilters,
    sort,
    setSort,
  } = useApplicationsStore(({ filters, setFilters, sort, setSort }) => ({
    filters,
    setFilters,
    sort,
    setSort,
  }));
  const filterOptions = { badges, resume_score };
  const safeFilters: Parameters<typeof FilterHeader>[0]['filters'] = useMemo(
    () =>
      Object.entries(filters).map(
        ([key, value]) =>
          ({
            active: value.length,
            name: key,
            value: value ?? [],
            type: 'filter',
            icon: <></>,
            setValue: (newValue: typeof value) =>
              setFilters({ [key]: structuredClone(newValue) }),
            options: filterOptions[key] ?? [],
          }) as (typeof safeFilters)[number],
      ),
    [filters],
  );

  const safeSort: Parameters<typeof FilterHeader>[0]['sort'] = useMemo(
    () =>
      ({
        sortOptions: {
          order: ['asc', 'desc'],
          type: sortTypes,
        },
        selected: {
          order: sort.order,
          type: sort.type,
        },
        setOrder: (payload) => setSort(payload as ApplicationsStore['sort']),
      }) as typeof safeSort,
    [sort],
  );
  const component = useMemo(
    () => (
      <FilterHeader
        filters={safeFilters}
        sort={safeSort}
        search={{
          value: search,
          setValue: (newValue: typeof search) =>
            setFilters({ search: newValue }),
          placeholder: 'Search in workflows',
        }}
      />
    ),
    [safeFilters, search],
  );
  return component;
};

export default Filters;

const badgesTypes: ApplicationsStore['filters']['badges'] = [
  'careerGrowth',
  'jobStability',
  'leadership',
  'positions',
  'schools',
  'skills',
  'jobHopping',
];
const badges = badgesTypes.map((id) => ({
  id,
  label: badgeLabel(id),
}));

function badgeLabel(key: (typeof badgesTypes)[number]) {
  switch (key) {
    case 'skills':
      return 'Skilled';
    case 'schools':
      return 'Knowledgable';
    case 'positions':
      return 'Experienced';
    case 'leadership':
      return 'Leader';
    case 'jobStability':
      return 'Reliable';
    case 'careerGrowth':
      return 'Ambitious';
    case 'jobHopping':
      return 'Job hopper';
  }
}

const resumeScoreTypes: ApplicationsStore['filters']['resume_score'] = [
  'Top match',
  'Good match',
  'Average match',
  'Poor match',
  'Not a match',
];

const resume_score = resumeScoreTypes.map((id) => ({
  id,
  label: id,
}));

const sortTypes: ApplicationsStore['sort']['type'][] = [
  'applied_at',
  'name',
  'resume_score',
];
