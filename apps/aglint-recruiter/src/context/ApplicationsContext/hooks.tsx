import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { applicationsQueries } from '@/src/queries/job-applications';

import { useJob } from '../JobContext';
import { useApplicationsStore } from './store';

export const useApplicationsActions = () => {
  const { jobLoad, job, job_id } = useJob();
  const { filters, sort } = useApplicationsStore(({ filters, sort }) => ({
    filters,
    sort,
  }));

  const [params, setParams] = useState({ filters, sort });
  const ref = useRef(true);

  useDeepCompareEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    const timeout = setTimeout(() => setParams({ filters, sort }), 800);
    return () => clearTimeout(timeout);
  }, [filters, sort]);

  const newApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      status: 'new',
      count: job?.count?.new ?? 0,
      ...params,
    }),
  );
  const screeningApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      status: 'screening',
      count: job?.count?.screening ?? 0,
      ...params,
    }),
  );
  const assessmentApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      status: 'assessment',
      count: job?.count?.assessment ?? 0,
      ...params,
    }),
  );
  const interviewApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      status: 'interview',
      count: job?.count?.interview ?? 0,
      ...params,
    }),
  );
  const qualifiedApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      status: 'qualified',
      count: job?.count?.qualified ?? 0,
      ...params,
    }),
  );
  const disqualifiedApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      status: 'disqualified',
      count: job?.count?.disqualified ?? 0,
      ...params,
    }),
  );
  return {
    job,
    jobLoad,
    newApplications,
    screeningApplications,
    assessmentApplications,
    interviewApplications,
    qualifiedApplications,
    disqualifiedApplications,
  };
};
