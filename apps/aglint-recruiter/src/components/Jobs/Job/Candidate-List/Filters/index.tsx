/* eslint-disable security/detect-object-injection */
import { useMemo } from 'react';

import FilterHeader from '@/components/Common/FilterHeader';
import {
  arrayToNestedObject,
  nestedObjectToArray,
} from '@/components/Common/FilterHeader/utils';
import { useApplications } from '@/context/ApplicationsContext';
import type { ApplicationsParams } from '@/context/ApplicationsContext/hooks';
import { useJob } from '@/context/JobContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { capitalize } from '@/utils/text/textUtils';

const Filters = () => {
  const {
    interviewPlans: { data: interviewPlans },
  } = useJob();
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
      badges,
      resume_match,
      stages,
    },
    setFilters,
  } = useApplications();

  const { isScoringEnabled } = useRolesAndPermissions();

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

  const interviewPlanOptions = useMemo(
    () =>
      (interviewPlans ?? []).reduce((acc, { name, interview_session }) => {
        if ((interview_session ?? []).length)
          acc[name] = (interview_session ?? []).map(({ name: label, id }) => ({
            id,
            label,
          }));
        return acc;
      }, {}),
    [interviewPlans, capitalize],
  );

  const resumeMatchFilter: Parameters<
    typeof FilterHeader
  >[0]['filters'][number] = isScoringEnabled && {
    name: 'Resume match',
    value: resume_match,
    type: 'filter',
    icon: <></>,
    setValue: (newValue: typeof resume_match) =>
      setFilters({ ['resume_match']: newValue }),
    options: resume_matchOptions,
  };

  const badgesFilter: Parameters<typeof FilterHeader>[0]['filters'][number] =
    isScoringEnabled && {
      name: 'Schedule Status',
      value: badges,
      type: 'filter',
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

  const InterviewPlan: Parameters<typeof FilterHeader>[0]['filters'][number] = {
    type: 'nested-filter',
    name: 'Interview Plan',
    options: interviewPlanOptions ?? {},
    sectionHeaders: ['Stage', 'Session'],
    value: arrayToNestedObject(stages?.[stages.length - 1] ?? []),
    setValue: (value) => {
      const stages = nestedObjectToArray(interviewPlanOptions ?? {}, value).map(
        (item) => item.filter(({ status }) => status !== 'inactive'),
      );
      setFilters({
        stages: stages.flatMap((section) => section).length ? stages : [],
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
        Locations,
        InterviewPlan,
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

// const scheduleStatus: ApplicationsParams['filters']['schedule_status'] = [
//   'cancelled',
//   'completed',
//   'confirmed',
//   'not_scheduled',
//   'reschedule',
//   'waiting',
// ];

const sortTypes: ApplicationsParams['filters']['type'][] = [
  'latest_activity',
  'resume_match',
  'applied_at',
  'name',
  'location',
];
