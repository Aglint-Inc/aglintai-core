import { getCityStateCountry } from '@/job/utils/getCityStateCountry';
import { getSessionNames } from '@/job/utils/getSessionNames';
import { api } from '@/trpc/client';

import type { Applications } from '../types';
import { useApplicationsStore } from './useApplicationsStore';
import { useCurrentJob } from './useCurrentJob';

export const useJobApplicationsPrefetch = () => {
  const { job_id } = useCurrentJob();
  const {
    badges,
    bookmarked,
    locations,
    application_match,
    search,
    type,
    order,
    stages,
  } = useApplicationsStore((state) => state.initial);
  const { city, state, country } = getCityStateCountry({ locations });
  const session_names = getSessionNames({ stages });
  const payload: Applications<'input'> = {
    badges,
    bookmarked,
    city,
    state,
    country,
    application_match,
    search,
    type,
    order,
    session_names,
    job_id,
  };
  void api.jobs.job.applications.usePrefetchInfiniteQuery(
    { ...payload, status: 'new' },
    {},
  );
  void api.jobs.job.applications.usePrefetchInfiniteQuery(
    { ...payload, status: 'interview' },
    {},
  );
  void api.jobs.job.applications.usePrefetchInfiniteQuery(
    { ...payload, status: 'qualified' },
    {},
  );
  void api.jobs.job.applications.usePrefetchInfiniteQuery(
    { ...payload, status: 'disqualified' },
    {},
  );
};
