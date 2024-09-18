import { keepPreviousData } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getCityStateCountry } from '@/job/utils/getCityStateCountry';
import { getSessionNames } from '@/job/utils/getSessionNames';
import { api, TRPC_CLIENT_CONTEXT } from '@/trpc/client';

import type { Applications } from '../types';
import { useApplicationsStore } from './useApplicationsStore';
import { useCurrentJob } from './useCurrentJob';
import { useJob } from './useJob';

export const useJobApplications = () => {
  const { job_id } = useCurrentJob();
  const { applicationScoringPollEnabled: polling } = useJob();

  const application_match = useApplicationsStore(
    (state) => state.application_match,
  );
  const badges = useApplicationsStore((state) => state.badges);
  const bookmarked = useApplicationsStore((state) => state.bookmarked);
  const locations = useApplicationsStore((state) => state.locations);
  const search = useApplicationsStore((state) => state.search);
  const stages = useApplicationsStore((state) => state.stages);
  const status = useApplicationsStore((state) => state.status);

  const type = useApplicationsStore((state) => state.type);
  const order = useApplicationsStore((state) => state.order);

  const { country, state, city } = getCityStateCountry({ locations });

  const session_names = getSessionNames({ stages });

  const payload: Applications<'input'> = {
    job_id,
    status,
    bookmarked,
    search,
    badges,
    application_match,
    city,
    state,
    country,
    session_names,
    type,
    order,
  };

  const query = api.jobs.job.applications.useInfiniteQuery(payload, {
    refetchInterval: polling ? 30_000 : 0,
    refetchOnMount: polling,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    trpc: TRPC_CLIENT_CONTEXT,
  });

  const applications = useMemo(
    () => (query.data?.pages ?? []).flatMap(({ items }) => items),
    [query?.data?.pages],
  );

  return { query, applications };
};
