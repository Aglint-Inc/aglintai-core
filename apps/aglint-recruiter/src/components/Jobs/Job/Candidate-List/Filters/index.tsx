/* eslint-disable security/detect-object-injection */
import type React from 'react';
import { useMemo } from 'react';

import FilterHeader from '@/src/components/Common/FilterHeader';
import {
  arrayToNestedObject,
  nestedObjectToArray,
} from '@/src/components/Common/FilterHeader/utils';
import { useApplications } from '@/src/context/ApplicationsContext';
import type { ApplicationsParams } from '@/src/context/ApplicationsContext/hooks';
import { capitalize } from '@/src/utils/text/textUtils';

const Filters = () => {
  const {
    job: { application_match },
    locationFilterOptions,
    badgesCount,
    filters: { search, bookmarked, locations, ...filters },
    sort,
    setFilters,
    setSort,
  } = useApplications();

  const badges = useMemo(
    () =>
      badgesTypes.map((id) => ({
        id,
        label: `${badgeLabel(id)} ${badgesCount.data?.[id] ? `(${badgesCount.data[id]})` : ''}`,
      })),
    [badgesTypes, badgeLabel, badgesCount.data],
  );

  const resume_score = useMemo(
    () =>
      resumeScoreTypes.map((id) => ({
        id,
        label: `${capitalize(id)} ${application_match?.[id] ? `(${application_match[id]})` : ''}`,
      })),
    [resumeScoreTypes, capitalize, application_match],
  );
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
            iconname: '',
            icon: <></>,
            setValue: (newValue: typeof value) =>
              setFilters({ [key]: structuredClone(newValue) }),
            options: filterOptions[key] ?? [],
          }) as (typeof safeFilters)[number],
      ),
    [filters],
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

  const Locations: Parameters<typeof FilterHeader>[0]['filters'][number] = {
    type: 'nested-filter',
    name: 'Locations',
    options: locationFilterOptions?.data ?? {},
    sectionHeaders: ['Country', 'State', 'City'],
    value: arrayToNestedObject(locations?.[locations.length - 1] ?? []),
    setValue: (value) => {
      const locations = nestedObjectToArray(
        locationFilterOptions?.data ?? {},
        value,
      ).map((item) => item.filter(({ status }) => status !== 'inactive'));
      setFilters({
        locations: locations.flatMap((section) => section).length
          ? locations
          : [],
      });
    },
  };

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
        setOrder: (payload) => setSort(payload as typeof sort),
      }) as typeof safeSort,
    [sort],
  );
  const component = useMemo(
    () => (
      <FilterHeader
        filters={[bookmarkedButton, ...safeFilters, Locations]}
        sort={safeSort}
        isResetAll={true}
        search={{
          value: search,
          setValue: (newValue: typeof search) =>
            setFilters({ search: newValue }),
          placeholder: 'Search candidate',
        }}
      />
    ),
    [safeFilters, search, Locations, bookmarkedButton, safeSort],
  );
  return component;
};

export default Filters;

const badgesTypes: ApplicationsParams['filters']['badges'] = [
  'careerGrowth',
  'jobStability',
  'leadership',
  'positions',
  'schools',
  'skills',
  'jobHopping',
];

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

const resumeScoreTypes: ApplicationsParams['filters']['resume_score'] = [
  'top_match',
  'good_match',
  'average_match',
  'poor_match',
  'not_a_match',
];

const sortTypes: ApplicationsParams['sort']['type'][] = [
  'latest_activity',
  'resume_score',
  'applied_at',
  'name',
  'location',
];
