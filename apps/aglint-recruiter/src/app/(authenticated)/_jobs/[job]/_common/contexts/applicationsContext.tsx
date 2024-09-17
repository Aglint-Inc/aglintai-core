/* eslint-disable security/detect-object-injection */
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { createContext, memo } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { useApplicationStore } from '@/context/ApplicationContext/store';
import { CASCADE_VISIBILITIES, EMAIL_VISIBILITIES } from '@/job/constants';
import { useApplicationsParams } from '@/job/hooks/useApplicationParams';
import { useApplicationsActions } from '@/job/hooks/useApplicationsActions';
import { useApplicationsStore } from '@/job/hooks/useApplicationsStore';
import { useJob } from '@/job/hooks/useJob';
import {
  applicationsQueries,
  useDeleteApplication,
  useMoveApplications,
  useMoveApplicationsToInterview,
  useReuploadResume,
  useUpdateApplication,
} from '@/queries/job-applications';

const useApplicationsContext = () => {
  const {
    jobLoad,
    job,
    job_id,
    recruiter_id,
    applicationScoringPollEnabled,
    manageJob,
  } = useJob();

  const { resetChecklist } = useApplicationsActions();

  const checklist = useApplicationsStore((state) => state.checklist);

  const { filters, section, setFilters, setSection } = useApplicationsParams();

  const [params, setParams] = useState(filters);
  const ref = useRef(true);

  useDeepCompareEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    const timeout = setTimeout(() => setParams(filters), 200);
    return () => clearTimeout(timeout);
  }, [filters]);

  const {
    mutate: handleUpdateApplication,
    mutateAsync: handleAsyncUpdateApplication,
  } = useUpdateApplication({
    job_id,
    recruiter_id,
    polling: applicationScoringPollEnabled,
    status: section,
    ...params,
  });

  // eslint-disable-next-line no-unused-vars
  const { section: _section, ...queryParams } = params;

  const newApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      recruiter_id,
      polling: applicationScoringPollEnabled,
      status: 'new',
      count: job?.section_count?.new ?? 0,
      ...queryParams,
    }),
  );
  const interviewApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      recruiter_id,
      polling: applicationScoringPollEnabled,
      status: 'interview',
      count: job?.section_count?.interview ?? 0,
      ...queryParams,
    }),
  );
  const qualifiedApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      recruiter_id,
      polling: applicationScoringPollEnabled,
      status: 'qualified',
      count: job?.section_count?.qualified ?? 0,
      ...queryParams,
    }),
  );
  const disqualifiedApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      recruiter_id,
      polling: applicationScoringPollEnabled,
      status: 'disqualified',
      count: job?.section_count?.disqualified ?? 0,
      ...queryParams,
    }),
  );

  const emailVisibilities = useMemo(
    () =>
      Object.entries(EMAIL_VISIBILITIES ?? {}).reduce(
        (acc, [key, value]) => {
          acc[key] = value.includes(section);
          return acc;
        },
        // eslint-disable-next-line no-unused-vars
        {} as { [_id in keyof typeof EMAIL_VISIBILITIES]: boolean },
      ),
    [EMAIL_VISIBILITIES, section],
  );

  const cascadeVisibilites = useMemo(
    () =>
      Object.entries(CASCADE_VISIBILITIES ?? {}).reduce(
        (acc, [key, value]) => {
          acc[key] = value.includes(section);
          return acc;
        },
        // eslint-disable-next-line no-unused-vars
        {} as { [_id in keyof typeof CASCADE_VISIBILITIES]: boolean },
      ),
    [CASCADE_VISIBILITIES, section],
  );

  const { mutateAsync: moveApplications, mutationQueue: moveMutationQueue } =
    useMoveApplications({
      job_id,
      recruiter_id,
    });

  const handleMoveApplications = async (
    payload: Omit<
      Parameters<typeof moveApplications>[0],
      'applications' | 'recruiter_id'
    >,
  ) => {
    try {
      await moveApplications({
        ...payload,
        applications: checklist,
        recruiter_id,
      });
      resetChecklist();
    } catch {
      //
    }
  };

  const { mutateAsync: moveApplicationsToInterview } =
    useMoveApplicationsToInterview({
      job_id,
      recruiter_id,
    });

  const handleMoveApplicationToInterview = async (
    payload: Omit<
      Parameters<typeof moveApplicationsToInterview>[0],
      'applications'
    >,
  ) => {
    try {
      await moveApplicationsToInterview({
        ...payload,
        applications: checklist,
      });
      resetChecklist();
    } catch {
      //
    }
  };

  const { mutateAsync: reuploadResume, mutationQueue: reuploadMutationQueue } =
    useReuploadResume({ job_id, recruiter_id });

  const {
    mutateAsync: deleteApplication,
    mutationQueue: deleteApplicationQueue,
  } = useDeleteApplication({
    job_id,
    recruiter_id,
  });

  const handleReuploadResume = async (
    payload: Parameters<typeof reuploadResume>[0],
  ) => {
    try {
      return await reuploadResume(payload);
    } catch {
      //
    }
  };

  const handleDeleteApplication = async (
    payload: Parameters<typeof deleteApplication>[0],
  ) => {
    try {
      return await deleteApplication(payload);
    } catch {
      //
    }
  };

  const sectionApplication = useMemo(() => {
    switch (section) {
      case 'new':
        return newApplications;
      case 'qualified':
        return qualifiedApplications;
      case 'disqualified':
        return disqualifiedApplications;
      case 'interview':
        return interviewApplications;
    }
  }, [
    newApplications,
    interviewApplications,
    qualifiedApplications,
    disqualifiedApplications,
    section,
  ]);

  const {
    drawer: { application_id },
    handleOpen,
  } = useApplicationStore(({ drawer, handleOpen }) => ({
    drawer,
    handleOpen,
  }));

  const sectionApplications = useMemo(
    () => (sectionApplication?.data?.pages ?? []).flatMap((page) => page),
    [sectionApplication?.data?.pages],
  );

  const currentIndex = useMemo(
    () => sectionApplications.findIndex(({ id }) => id === application_id),
    [application_id, sectionApplications],
  );

  const applicationsCount = useMemo(
    () => sectionApplications.length,
    [sectionApplications],
  );

  const handleSelectNextApplication = useCallback(() => {
    handleOpen({
      application_id:
        sectionApplications[(currentIndex + 1) % applicationsCount].id,
    });
  }, [sectionApplication, currentIndex, applicationsCount, handleOpen]);

  const handleSelectPrevApplication = useCallback(() => {
    handleOpen({
      application_id:
        sectionApplications[
          currentIndex - 1 < 0 ? applicationsCount - 1 : currentIndex - 1
        ].id,
    });
  }, [sectionApplication, currentIndex, applicationsCount, handleOpen]);

  const applicationMutations = useMemo(() => {
    const reuploads = reuploadMutationQueue.map(
      ({ application_id }) => application_id,
    );
    const deletes = deleteApplicationQueue.map(
      ({ application_id }) => application_id,
    );
    const moves = moveMutationQueue.flatMap(({ applications }) => applications);
    return [...reuploads, ...deletes, ...moves];
  }, [reuploadMutationQueue, deleteApplicationQueue, moveMutationQueue]);

  return {
    job,
    jobLoad,
    section,
    emailVisibilities,
    cascadeVisibilites,
    sectionApplication,
    filters,
    manageJob,
    applicationMutations,
    setFilters,
    setSection,
    handleUpdateApplication,
    handleAsyncUpdateApplication,
    handleMoveApplications,
    handleSelectNextApplication,
    handleSelectPrevApplication,
    handleReuploadResume,
    handleDeleteApplication,
    handleMoveApplicationToInterview,
  };
};

export const ApplicationsContext =
  createContext<ReturnType<typeof useApplicationsContext>>(undefined);

export const ApplicationsProvider = memo((props: React.PropsWithChildren) => {
  const value = useApplicationsContext();
  return (
    <ApplicationsContext.Provider value={value}>
      {props.children ?? <></>}
    </ApplicationsContext.Provider>
  );
});
ApplicationsProvider.displayName = 'ApplicationsProvider';
