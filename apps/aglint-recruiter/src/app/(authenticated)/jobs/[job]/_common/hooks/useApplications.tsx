import { useMemo } from 'react';

import { getCityStateCountry } from '@/job/utils/getCityStateCountry';
import { getSessionNames } from '@/job/utils/getSessionNames';
import { api } from '@/trpc/client';

import { useApplicationsStore } from './useApplicationsStore';
import { useCurrentJob } from './useCurrentJob';

export const useApplications = () => {
  const { job_id } = useCurrentJob();

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

  const query = api.jobs.job.applications.read.useInfiniteQuery(
    {
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
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const applications = useMemo(
    () => (query.data?.pages ?? []).flatMap(({ items }) => items),
    [query?.data?.pages],
  );

  return { query, applications };
};
