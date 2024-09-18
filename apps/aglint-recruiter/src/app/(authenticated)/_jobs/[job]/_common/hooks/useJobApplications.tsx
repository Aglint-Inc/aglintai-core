import type { DatabaseView } from '@aglint/shared-types';
import { keepPreviousData } from '@tanstack/react-query';

import { api, TRPC_CLIENT_CONTEXT } from '@/trpc/client';

import type { Applications } from '../types';
import { useApplicationsStore } from './useApplicationsStore';
import { useCurrentJob } from './useCurrentJob';

export const useJobApplications = (
  status: DatabaseView['application_view']['status'],
  polling: boolean,
) => {
  const { job_id } = useCurrentJob();

  const badges = useApplicationsStore((state) => state.badges);
  const bookmarked = useApplicationsStore((state) => state.bookmarked);
  const locations = useApplicationsStore((state) => state.locations);
  const application_match = useApplicationsStore(
    (state) => state.application_match,
  );
  const search = useApplicationsStore((state) => state.search);
  const stages = useApplicationsStore((state) => state.stages);

  const type = useApplicationsStore((state) => state.type);
  const order = useApplicationsStore((state) => state.order);

  const { country, state, city } = (locations ?? []).reduce(
    (acc, curr, i) => {
      let type: keyof typeof acc = null;
      switch (i) {
        case 0:
          type = 'country';
          break;
        case 1:
          type = 'state';
          break;
        case 2:
          type = 'city';
          break;
      }
      acc[type].push(
        curr.filter(({ status }) => status === 'active').map(({ id }) => id),
      );
      return acc;
    },
    { country: [], state: [], city: [] },
  );

  const session_names = (stages?.[1] ?? []).map(({ id }) => id);

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

  return api.jobs.job.applications.useInfiniteQuery(payload, {
    refetchInterval: polling ? 20_000 : 0,
    refetchOnMount: polling,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    trpc: TRPC_CLIENT_CONTEXT,
  });
};
