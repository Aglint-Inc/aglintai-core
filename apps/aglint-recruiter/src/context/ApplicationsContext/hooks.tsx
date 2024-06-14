/* eslint-disable security/detect-object-injection */
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {
  applicationsQueries,
  useMoveApplications,
  useUpdateApplication,
  useUploadApplication,
  useUploadCsv,
  useUploadResume,
} from '@/src/queries/job-applications';

import { useJob } from '../JobContext';
import { ApplicationsStore, useApplicationsStore } from './store';

export const useApplicationsActions = () => {
  const { jobLoad, job, job_id, applicationScoringPollEnabled } = useJob();
  const { filters, sort, section, checklist, resetChecklist } =
    useApplicationsStore(
      ({ filters, sort, section, checklist, resetChecklist }) => ({
        filters,
        sort,
        section,
        checklist,
        resetChecklist,
      }),
    );

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

  const {
    mutate: handleUpdateApplication,
    mutateAsync: handleAsyncUpdateApplication,
  } = useUpdateApplication({
    job_id,
    polling: applicationScoringPollEnabled,
    status: section,
    ...params,
  });

  const locationFilterOptions = useQuery(
    applicationsQueries.locationFilters({ job_id }),
  );

  const newApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      polling: applicationScoringPollEnabled,
      status: 'new',
      count: job?.count?.new ?? 0,
      ...params,
    }),
  );
  const screeningApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      polling: applicationScoringPollEnabled,
      status: 'screening',
      count: job?.count?.screening ?? 0,
      ...params,
    }),
  );
  const assessmentApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      polling: applicationScoringPollEnabled,
      status: 'assessment',
      count: job?.count?.assessment ?? 0,
      ...params,
    }),
  );
  const interviewApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      polling: applicationScoringPollEnabled,
      status: 'interview',
      count: job?.count?.interview ?? 0,
      ...params,
    }),
  );
  const qualifiedApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      polling: applicationScoringPollEnabled,
      status: 'qualified',
      count: job?.count?.qualified ?? 0,
      ...params,
    }),
  );
  const disqualifiedApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      polling: applicationScoringPollEnabled,
      status: 'disqualified',
      count: job?.count?.disqualified ?? 0,
      ...params,
    }),
  );

  const emailVisibilities = useMemo(
    () =>
      Object.entries(EMAIL_VISIBILITIES ?? {}).reduce(
        (acc, [key, value]) => {
          acc[key] =
            (job?.activeSections ?? []).includes(
              key as keyof typeof EMAIL_VISIBILITIES,
            ) && value.includes(section);
          return acc;
        },
        // eslint-disable-next-line no-unused-vars
        {} as { [id in keyof typeof EMAIL_VISIBILITIES]: boolean },
      ),
    [EMAIL_VISIBILITIES, job?.activeSections, section],
  );

  const cascadeVisibilites = useMemo(
    () =>
      Object.entries(CASCADE_VISIBILITIES ?? {}).reduce(
        (acc, [key, value]) => {
          acc[key] =
            (job?.activeSections ?? []).includes(
              key as keyof typeof CASCADE_VISIBILITIES,
            ) && value.includes(section);
          return acc;
        },
        // eslint-disable-next-line no-unused-vars
        {} as { [id in keyof typeof CASCADE_VISIBILITIES]: boolean },
      ),
    [CASCADE_VISIBILITIES, job?.activeSections, section],
  );

  const { mutate: handleUploadApplication } = useUploadApplication({
    job_id,
    ...params,
  });
  const { mutate: handleUploadResume } = useUploadResume({
    job_id,
    ...params,
  });
  const { mutate: handleUploadCsv } = useUploadCsv({
    job_id,
    ...params,
  });

  const { mutateAsync: moveApplications } = useMoveApplications(
    {
      job_id,
    },
    section,
    checklist,
  );

  const handleMoveApplications = async (
    payload: Parameters<typeof moveApplications>[0],
  ) => {
    try {
      await moveApplications(payload);
      resetChecklist();
    } catch {
      //
    }
  };

  const sectionApplication = useMemo(() => {
    switch (section) {
      case 'assessment':
        return assessmentApplications;
      case 'new':
        return newApplications;
      case 'qualified':
        return qualifiedApplications;
      case 'disqualified':
        return disqualifiedApplications;
      case 'screening':
        return screeningApplications;
      case 'interview':
        return interviewApplications;
    }
  }, [
    newApplications,
    screeningApplications,
    assessmentApplications,
    interviewApplications,
    qualifiedApplications,
    disqualifiedApplications,
    section,
  ]);

  return {
    job,
    jobLoad,
    section,
    emailVisibilities,
    cascadeVisibilites,
    sectionApplication,
    locationFilterOptions,
    handleUpdateApplication,
    handleAsyncUpdateApplication,
    handleUploadApplication,
    handleUploadResume,
    handleUploadCsv,
    handleMoveApplications,
  };
};

const EMAIL_VISIBILITIES: {
  // eslint-disable-next-line no-unused-vars
  [id in ApplicationsStore['section']]: ApplicationsStore['section'][];
} = {
  new: ['disqualified'],
  screening: ['new'],
  assessment: ['new', 'screening'],
  interview: ['new', 'screening', 'assessment'],
  qualified: ['new', 'screening', 'assessment', 'interview'],
  disqualified: ['new', 'screening', 'assessment', 'interview', 'qualified'],
} as const;

const CASCADE_VISIBILITIES: {
  // eslint-disable-next-line no-unused-vars
  [id in ApplicationsStore['section']]: ApplicationsStore['section'][];
} = {
  new: [
    'new',
    'screening',
    'assessment',
    'interview',
    'qualified',
    'disqualified',
  ],
  screening: [
    'screening',
    'assessment',
    'interview',
    'qualified',
    'disqualified',
  ],
  assessment: ['assessment', 'interview', 'qualified', 'disqualified'],
  interview: ['interview', 'qualified', 'disqualified'],
  qualified: ['qualified', 'disqualified'],
  disqualified: ['disqualified'],
} as const;
