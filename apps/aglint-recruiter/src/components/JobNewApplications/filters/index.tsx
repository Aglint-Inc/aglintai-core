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
  } = useApplicationsStore(({ filters, setFilters }) => ({
    filters,
    setFilters,
  }));
  const options = { badges, resume_score };
  const safeFilters: Parameters<typeof FilterHeader>[0]['filters'] = useMemo(
    () =>
      Object.entries(filters).map(([key, value]) => ({
        active: value.length,
        name: key,
        value: value ?? [],
        type: 'filter',
        icon: <></>,
        setValue: (newValue) =>
          setFilters({ [key]: structuredClone(newValue) }),
        options: options[key] ?? [],
      })),
    [filters],
  );
  const component = useMemo(
    () => (
      <FilterHeader
        filters={safeFilters}
        search={{
          value: search,
          setValue: (newValue) => setFilters({ search: newValue }),
          placeholder: 'Search in workflows',
        }}
      />
    ),
    [safeFilters, search],
  );
  return component;
};

export default Filters;

// type FilterOptions = {
//   // eslint-disable-next-line no-unused-vars
//   [id in keyof ApplicationsStore['filters']]: {
//     id: string;
//     label: string | React.ReactNode;
//   }[];
// };

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

const resume_score = resumeScoreTypes.map((id) => {
  return {
    id,
    label: id,
  };
});
