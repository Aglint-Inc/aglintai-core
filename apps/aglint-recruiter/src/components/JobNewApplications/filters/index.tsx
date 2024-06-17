/* eslint-disable security/detect-object-injection */
import type React from 'react';
import { useMemo } from 'react';

import { useApplications } from '@/src/context/ApplicationsContext';
import {
  ApplicationsStore,
  useApplicationsStore,
} from '@/src/context/ApplicationsContext/store';

import FilterHeader from '../../Common/FilterHeader';

const Filters = () => {
  const { locationFilterOptions } = useApplications();
  const {
    filters: { search, bookmarked, city, state, country, ...filters },
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

  const multiSectionFilter: Parameters<
    typeof FilterHeader
  >[0]['filters'][number] = useMemo(
    () => ({
      type: 'multi-section-filter',
      name: 'Locations',
      options: {
        country: Object.keys(locationFilterOptions?.data ?? {}).map(
          (country) => country,
        ),
        state: Object.entries(locationFilterOptions?.data ?? {}).map(
          ([country, states]) => ({
            header: country,
            options: Object.keys(states).map((state) => ({
              id: state,
              label: state,
            })),
          }),
        ),
        city: Object.entries(locationFilterOptions?.data ?? {})
          .map(([country, states]) =>
            Object.entries(states).map(([state, cities]) => ({
              header: `${country}, ${state}`,
              options: cities.map((city) => ({
                id: city,
                label: city,
              })),
            })),
          )
          .flatMap((location) => location),
      },
      setValue: ({ country, state, city }) =>
        setFilters({ country, state, city }),
      value: {
        country,
        state,
        city,
      },
    }),
    [locationFilterOptions?.data, country, state, city, setFilters],
  );

  const bookmarkedButton: Parameters<
    typeof FilterHeader
  >[0]['filters'][number] = useMemo(
    () => ({
      type: 'button',
      isActive: bookmarked,
      isVisible: true,
      name: 'Bookmarked',
      onClick: () => setFilters({ bookmarked: !bookmarked }),
    }),
    [bookmarked, safeFilters],
  );

  const safeSort: Parameters<typeof FilterHeader>[0]['sort'] = useMemo(
    () =>
      ({
        sortOptions: {
          options: sortTypes,
          order: [
            {
              id: 'asc',
              label: 'Ascending',
            },
            {
              id: 'desc',
              label: 'Descending',
            },
          ],
        },
        selected: {
          option: sort.type,
          order: sort.order,
        },
        setOrder: (payload) => setSort(payload as ApplicationsStore['sort']),
      }) as typeof safeSort,
    [sort],
  );
  const component = useMemo(
    () => (
      <FilterHeader
        filters={[...safeFilters, multiSectionFilter, bookmarkedButton]}
        sort={safeSort}
        search={{
          value: search,
          setValue: (newValue: typeof search) =>
            setFilters({ search: newValue }),
          placeholder: 'Search candidate',
        }}
      />
    ),
    [safeFilters, search, multiSectionFilter, bookmarkedButton, safeSort],
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
