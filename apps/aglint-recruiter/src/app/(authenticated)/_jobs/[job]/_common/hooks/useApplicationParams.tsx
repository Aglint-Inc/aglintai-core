import type { DatabaseView } from '@aglint/shared-types';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { nestedObjectToArray } from '@/components/Common/FilterHeader/utils';
import ROUTES from '@/utils/routing/routes';

import { useApplicationsActions } from './useApplicationsActions';

type Application = DatabaseView['application_view'];

const filterParams = [
  'bookmarked',
  'search',
  'badges',
  'resume_match',
  'type',
  'order',
  'section',
] as const;

type FilterKeys = (typeof filterParams)[number];

type FilterValues = {
  section: Application['status'];
  bookmarked: boolean;
  search: Application['name'];
  badges: (keyof Application['badges'])[];
  resume_match: Application['application_match'][];
  type:
    | keyof Pick<Application, 'applied_at' | 'name' | 'latest_activity'>
    | 'location'
    | 'resume_match';
  order: 'asc' | 'desc';
};

// eslint-disable-next-line no-unused-vars
type Filters = { [id in FilterKeys]: FilterValues[id] };

type Locations = ReturnType<typeof nestedObjectToArray>;

type Stages = ReturnType<typeof nestedObjectToArray>;

const filterDefaults: Filters = {
  badges: [],
  bookmarked: false,
  resume_match: [],
  search: '',
  section: 'new',
  type: 'latest_activity',
  order: 'desc',
};

const locationDefaults: Locations = [];

const stagesDefaults: Stages = [];

export const useApplicationsParams = () => {
  const { resetChecklist } = useApplicationsActions();

  const [locations, setLocations] = useState<Locations>(locationDefaults);

  const [stages, setStages] = useState<Locations>(stagesDefaults);

  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = filterParams.reduce((acc, curr) => {
    const defaultFilter = filterDefaults[curr];
    const safeFilter = Array.isArray(defaultFilter)
      ? searchParams.getAll(curr)
      : typeof defaultFilter === 'boolean'
        ? searchParams.get(curr) === ''
          ? true
          : false
        : searchParams.get(curr);
    acc[curr] = (safeFilter ?? filterDefaults[curr]) as Filters[typeof curr];
    return acc;
  }, {}) as Filters;

  const safeFilters = { ...filters, locations, stages };

  const getParams = (newParams: Partial<typeof filters>) => {
    if (locations) setLocations(locations);
    if (stages) setStages(stages);
    return Object.entries(newParams ?? {})
      .reduce((acc, [key, value]) => {
        if (JSON.stringify(value) === JSON.stringify(filterDefaults[key]))
          return acc;
        if (Array.isArray(value))
          acc.push(value.map((val) => `${key}=${val}`).join('&'));
        else if (typeof value === 'boolean' && value) acc.push(key);
        else acc.push(`${key}=${value}`);
        return acc;
      }, [])
      .join('&');
  };

  const setFilters = (newFilters: Partial<typeof safeFilters>) => {
    const { locations, stages, ...rest } = newFilters;
    // eslint-disable-next-line no-unused-vars
    const { search, ...safeFilters } = filters;
    if (locations) setLocations(locations);
    if (stages) setStages(stages);
    const params = Object.entries({ ...(safeFilters ?? {}), ...(rest ?? {}) })
      .reduce((acc, [key, value]) => {
        if (JSON.stringify(value) === JSON.stringify(filterDefaults[key]))
          return acc;
        if (Array.isArray(filterDefaults[key])) {
          const newValues = (value as any[])
            .map((val) => `${key}=${val}`)
            .join('&');
          if (newValues) acc.push(newValues);
        } else if (typeof filterDefaults[key] === 'boolean') {
          if (value) acc.push(key);
        } else acc.push(`${key}=${value}`);
        return acc;
      }, [])
      .join('&');
    if (safeFilters['section']) resetChecklist();
    router.push(
      `${ROUTES['/jobs/[job]']({ job: router.query.job as string })}${params ? `?${params}` : ''}`,
      `${ROUTES['/jobs/[job]']({ job: router.query.job as string })}${params ? `?${params}` : ''}`,
    );
  };

  const setSection = (section: (typeof safeFilters)['section']) =>
    setFilters({ section });

  return {
    filters: safeFilters,
    setFilters,
    getParams,
    section: filters.section,
    setSection,
  };
};

export type ApplicationsParams = ReturnType<typeof useApplicationsParams>;
