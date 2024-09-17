import { keepPreviousData } from '@tanstack/react-query';

import {
  api,
  type RouterInputs,
  TRPC_CLIENT_CONTEXT,
  type Unvoid,
} from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';
import { useJobParams } from './useJobParams';

export const useJobApplications = () => {
  const { job_id } = useCurrentJob();
  const {
    filters: {
      bookmarked,
      search,
      badges,
      order,
      type,
      resume_match,
      section,
      locations,
      stages,
    },
  } = useJobParams();

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

  const payload: Unvoid<RouterInputs['jobs']['job']['applications']> = {
    job_id,
    status: section,
    bookmarked,
    search,
    badges,
    resume_match,
    city,
    state,
    country,
    session_names,
    type,
    order,
  };

  return api.jobs.job.applications.useInfiniteQuery(payload, {
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    trpc: TRPC_CLIENT_CONTEXT,
  });
};
