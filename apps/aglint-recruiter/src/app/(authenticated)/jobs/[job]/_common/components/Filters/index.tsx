import { useMemo } from 'react';

import { useFlags } from '@/company/hooks/useFlags';
import FilterHeader from '@/components/Common/FilterHeader';
import {
  arrayToNestedObject,
  nestedObjectToArray,
} from '@/components/Common/FilterHeader/filters/utils';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import {
  useApplicationsActions,
  useApplicationsStore,
  useJob,
  useJobFilterBadges,
  useJobFilterLocations,
} from '@/job/hooks';
import type { Applications } from '@/job/types';
import { capitalize } from '@/utils/text/textUtils';

type Params = NonNullable<
  Parameters<typeof FilterHeader>[0]['filters']
>[number];

export const Filters = () => {
  const { isShowFeature } = useFlags();
  const {
    interviewPlans: { data: interviewPlans },
    job,
  } = useJob();
  const matches = job?.application_match;

  const filterLocations = useJobFilterLocations();
  const filterBadges = useJobFilterBadges();

  const badges = useApplicationsStore((state) => state.badges);
  // const bookmarked = useApplicationsStore((state) => state.bookmarked);
  const locations = useApplicationsStore((state) => state.locations);
  const application_match = useApplicationsStore(
    (state) => state.application_match,
  );
  const search = useApplicationsStore((state) => state.search);
  const stages = useApplicationsStore((state) => state.stages);

  const type = useApplicationsStore((state) => state.type);
  const order = useApplicationsStore((state) => state.order);

  const actions = useApplicationsActions();

  const { isScoringEnabled } = useRolesAndPermissions();

  const badgesOptions = useMemo(
    () =>
      badgesTypes.map((id) => ({
        id,
        label: `${badgeLabel(id)} ${filterBadges.data?.[id] ? `(${filterBadges.data[id]})` : ''}`,
      })),
    [badgesTypes, badgeLabel, filterBadges.data],
  );

  const application_matchOptions = useMemo(
    () =>
      applicationMatchTypes.map((id) => ({
        id,
        label: `${capitalize(id)} ${matches?.[id] ? `(${matches[id]})` : ''}`,
      })),
    [applicationMatchTypes, capitalize, matches],
  );

  const interviewPlanOptions = useMemo(
    () =>
      (interviewPlans ?? []).reduce((acc, { name, interview_session }) => {
        if ((interview_session ?? []).length)
          //@ts-ignore
          acc[name] = (interview_session ?? []).map(({ name: label, id }) => ({
            id,
            label,
          }));
        return acc;
      }, {}),
    [interviewPlans, capitalize],
  );

  const resumeMatchFilter: Params = (
    isScoringEnabled
      ? {
          name: 'Resume match',
          value: application_match,
          type: 'filter',
          icon: <></>,
          setValue: (newValue: string[]) =>
            actions.setApplication_match(newValue as typeof application_match),
          options: application_matchOptions,
        }
      : null
  )!;

  const badgesFilter: Params = (
    isScoringEnabled
      ? {
          name: 'Badges',
          value: badges,
          type: 'filter',
          icon: <></>,
          setValue: (newValue: string[]) =>
            actions.setBadges(newValue as typeof badges),
          options: badgesOptions,
        }
      : null
  )!;

  // const bookmarkedButton: Parameters<
  //   typeof FilterHeader
  // >[0]['filters'][number] = {
  //   type: 'button',
  //   isActive: bookmarked,
  //   isVisible: true,
  //   name: 'Bookmarked',
  //   onClick: () => actions.setBookmarked(!bookmarked),
  // };
  const Locations: Params = {
    type: 'nested-filter',
    name: 'Locations',
    options: filterLocations?.data ?? {},
    sectionHeaders: ['Country', 'State', 'City'],
    value: arrayToNestedObject(locations?.[locations.length - 1] ?? []),
    setValue: (value) => {
      const locations = nestedObjectToArray(
        filterLocations?.data ?? {},
        value,
      ).map((item) => item.filter(({ status }) => status !== 'inactive'));
      actions.setLocations(
        locations.flatMap((section) => section).length ? locations : [],
      );
    },
  };

  const interviewPlan: Params = {
    type: 'nested-filter',
    name: 'Interview Plan',
    options: interviewPlanOptions ?? {},
    sectionHeaders: ['Stage', 'Session'],
    value: arrayToNestedObject(stages?.[stages.length - 1] ?? []),
    setValue: (value) => {
      const stages = nestedObjectToArray(interviewPlanOptions ?? {}, value).map(
        (item) => item.filter(({ status }) => status !== 'inactive'),
      );
      actions.setStages(
        stages.flatMap((section) => section).length ? stages : [],
      );
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
    setOrder: (payload) => {
      if (payload.type) actions.setType(payload.type as typeof type);
      if (payload.order) actions.setOrder(payload.order as typeof order);
    },
  };

  return (
    <FilterHeader
      filters={[
        // ...(isShowFeature('SCHEDULING') ? [bookmarkedButton] : []),
        resumeMatchFilter,
        Locations,
        ...(isShowFeature('SCHEDULING') ? [badgesFilter, interviewPlan] : []),
      ].filter(Boolean)}
      sort={safeSort}
      isResetAll={true}
      search={{
        value: search!,
        setValue: (newValue: typeof search) => actions.setSearch(newValue),
        placeholder: 'Search candidate',
      }}
    />
  );
};

const badgesTypes: Applications['input']['badges'] = [
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

const applicationMatchTypes: Applications['input']['application_match'] = [
  'top_match',
  'good_match',
  'average_match',
  'poor_match',
  'not_a_match',
  'unknown_match',
];

// const scheduleStatus: Applications['input']['schedule_status'] = [
//   'cancelled',
//   'completed',
//   'confirmed',
//   'not_scheduled',
//   'reschedule',
//   'waiting',
// ];

const sortTypes: Applications['input']['type'][] = [
  'latest_activity',
  'application_match',
  'applied_at',
  'name',
  'location',
];
