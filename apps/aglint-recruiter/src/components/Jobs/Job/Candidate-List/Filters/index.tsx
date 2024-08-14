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
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { capitalize } from '@/src/utils/text/textUtils';

const Filters = () => {
  const {
    job: { application_match },
    locationFilterOptions,
    badgesCount,
    filters: {
      search,
      bookmarked,
      locations,
      type,
      order,
      // eslint-disable-next-line no-unused-vars
      section,
      badges,
      resume_match,
      schedule_status,
    },
    setFilters,
  } = useApplications();

  const { isScoringEnabled, isSchedulingEnabled } = useAuthDetails();

  const badgesOptions = useMemo(
    () =>
      badgesTypes.map((id) => ({
        id,
        label: `${badgeLabel(id)} ${badgesCount.data?.[id] ? `(${badgesCount.data[id]})` : ''}`,
      })),
    [badgesTypes, badgeLabel, badgesCount.data],
  );

  const resume_matchOptions = useMemo(
    () =>
      resumeScoreTypes.map((id) => ({
        id,
        label: `${capitalize(id)} ${application_match?.[id] ? `(${application_match[id]})` : ''}`,
      })),
    [resumeScoreTypes, capitalize, application_match],
  );

  const schedule_statusOptions = useMemo(
    () => scheduleStatus.map((id) => ({ id, label: capitalize(id) })),
    [scheduleStatus, capitalize],
  );

  const resumeMatchFilter: Parameters<
    typeof FilterHeader
  >[0]['filters'][number] = isScoringEnabled && {
    name: 'Resume match',
    value: resume_match,
    type: 'filter',
    iconname: '',
    icon: <></>,
    setValue: (newValue: typeof resume_match) =>
      setFilters({ ['resume_match']: newValue }),
    options: resume_matchOptions,
  };

  const scheduleStatusFilter: Parameters<
    typeof FilterHeader
  >[0]['filters'][number] = isSchedulingEnabled && {
    name: 'Schedule Status',
    value: schedule_status,
    type: 'filter',
    iconname: '',
    icon: <></>,
    setValue: (newValue: typeof schedule_status) =>
      setFilters({ ['schedule_status']: newValue }),
    options: schedule_statusOptions,
  };

  const badgesFilter: Parameters<typeof FilterHeader>[0]['filters'][number] =
    isScoringEnabled && {
      name: 'Schedule Status',
      value: badges,
      type: 'filter',
      iconname: '',
      icon: <></>,
      setValue: (newValue: typeof badges) =>
        setFilters({ ['badges']: newValue }),
      options: badgesOptions,
    };

  const bookmarkedButton: Parameters<
    typeof FilterHeader
  >[0]['filters'][number] = {
    type: 'button',
    isActive: bookmarked,
    isVisible: true,
    name: 'Bookmarked',
    onClick: () => setFilters({ bookmarked: !bookmarked }),
  };
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

  const safeSort: Parameters<typeof FilterHeader>[0]['sort'] = {
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
      option: type,
      order: order,
    },
    setOrder: (payload) => setFilters({ ...payload } as any),
  } as typeof safeSort;

  return (
    <FilterHeader
      filters={[
        bookmarkedButton,
        badgesFilter,
        resumeMatchFilter,
        scheduleStatusFilter,
        Locations,
      ].filter(Boolean)}
      sort={safeSort}
      isResetAll={true}
      search={{
        value: search,
        setValue: (newValue: typeof search) => setFilters({ search: newValue }),
        placeholder: 'Search candidate',
      }}
    />
  );
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

const resumeScoreTypes: ApplicationsParams['filters']['resume_match'] = [
  'top_match',
  'good_match',
  'average_match',
  'poor_match',
  'not_a_match',
  'unknown_match',
];

const scheduleStatus: ApplicationsParams['filters']['schedule_status'] = [
  'cancelled',
  'completed',
  'confirmed',
  'not_scheduled',
  'reschedule',
  'waiting',
];

const sortTypes: ApplicationsParams['filters']['type'][] = [
  'latest_activity',
  'resume_match',
  'applied_at',
  'name',
  'location',
];
