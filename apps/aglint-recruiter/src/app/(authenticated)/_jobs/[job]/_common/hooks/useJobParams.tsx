import type { DatabaseView } from '@aglint/shared-types';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import ROUTES from '@/utils/routing/routes';

import { useApplicationsActions } from './useApplicationsActions';
import { useApplicationsStore } from './useApplicationsStore';
import { useCurrentJob } from './useCurrentJob';

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

const filterDefaults: Filters = Object.freeze({
  badges: [],
  bookmarked: false,
  resume_match: [],
  search: '',
  section: 'new',
  type: 'latest_activity',
  order: 'desc',
});

export const useJobParams = () => {
  const { job_id } = useCurrentJob();
  const locations = useApplicationsStore((store) => store.locations);
  const stages = useApplicationsStore((store) => store.stages);
  const { resetChecklist, setLocations, setStages } = useApplicationsActions();

  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () =>
      filterParams.reduce((acc, curr) => {
        const defaultFilter = filterDefaults[curr];
        const safeFilter = Array.isArray(defaultFilter)
          ? searchParams.getAll(curr)
          : typeof defaultFilter === 'boolean'
            ? searchParams.get(curr) === ''
              ? true
              : false
            : searchParams.get(curr);
        acc[curr] = (safeFilter ??
          filterDefaults[curr]) as Filters[typeof curr];
        return acc;
      }, {}) as Filters,
    [searchParams],
  );

  const safeFilters = { ...filters, locations, stages };

  const getParams = useCallback((newParams: Partial<typeof filters>) => {
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
  }, []);

  const setFilters = useCallback(
    (newFilters: Partial<typeof safeFilters>) => {
      const { locations, stages, ...rest } = newFilters;
      // eslint-disable-next-line no-unused-vars
      const { search: _search, ...safeFilters } = filters;
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
        `${ROUTES['/jobs/[job]']({ job: job_id })}${params ? `?${params}` : ''}`,
      );
    },
    [filters],
  );

  const setSection = useCallback(
    (section: (typeof safeFilters)['section']) => setFilters({ section }),
    [],
  );

  return {
    filters: safeFilters,
    setFilters,
    getParams,
    section: filters.section,
    setSection,
  };
};
