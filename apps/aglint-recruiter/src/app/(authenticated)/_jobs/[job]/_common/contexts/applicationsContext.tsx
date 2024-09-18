/* eslint-disable security/detect-object-injection */
import React, { createContext, memo } from 'react';
import { useCallback, useMemo } from 'react';

import { useApplicationStore } from '@/context/ApplicationContext/store';
import { CASCADE_VISIBILITIES, EMAIL_VISIBILITIES } from '@/job/constants';
import { useApplicationsActions } from '@/job/hooks/useApplicationsActions';
import { useApplicationsStore } from '@/job/hooks/useApplicationsStore';
import { useJob } from '@/job/hooks/useJob';
import { useJobApplications } from '@/job/hooks/useJobApplications';
import {
  useDeleteApplication,
  useMoveApplications,
  useMoveApplicationsToInterview,
  useReuploadResume,
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

  const queryData = useJobApplications(applicationScoringPollEnabled);

  const status = useApplicationsStore((state) => state.status);

  const emailVisibilities = useMemo(
    () =>
      Object.entries(EMAIL_VISIBILITIES ?? {}).reduce(
        (acc, [key, value]) => {
          acc[key] = value.includes(status);
          return acc;
        },
        // eslint-disable-next-line no-unused-vars
        {} as { [_id in keyof typeof EMAIL_VISIBILITIES]: boolean },
      ),
    [EMAIL_VISIBILITIES, status],
  );

  const cascadeVisibilites = useMemo(
    () =>
      Object.entries(CASCADE_VISIBILITIES ?? {}).reduce(
        (acc, [key, value]) => {
          acc[key] = value.includes(status);
          return acc;
        },
        // eslint-disable-next-line no-unused-vars
        {} as { [_id in keyof typeof CASCADE_VISIBILITIES]: boolean },
      ),
    [CASCADE_VISIBILITIES, status],
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
    // mutateAsync: deleteApplication,
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

  // const handleDeleteApplication = async (
  //   payload: Parameters<typeof deleteApplication>[0],
  // ) => {
  //   try {
  //     return await deleteApplication(payload);
  //   } catch {
  //     //
  //   }
  // };

  const {
    drawer: { application_id },
    handleOpen,
  } = useApplicationStore(({ drawer, handleOpen }) => ({
    drawer,
    handleOpen,
  }));

  const applications = useMemo(
    () => (queryData?.data?.pages ?? []).flatMap(({ items }) => items),
    [queryData?.data?.pages],
  );

  const currentIndex = useMemo(
    () => applications.findIndex(({ id }) => id === application_id),
    [application_id, applications],
  );

  const applicationsCount = useMemo(() => applications.length, [applications]);

  const handleSelectNextApplication = useCallback(() => {
    handleOpen({
      application_id: applications[(currentIndex + 1) % applicationsCount].id,
    });
  }, [queryData, currentIndex, applicationsCount, handleOpen]);

  const handleSelectPrevApplication = useCallback(() => {
    handleOpen({
      application_id:
        applications[
          currentIndex - 1 < 0 ? applicationsCount - 1 : currentIndex - 1
        ].id,
    });
  }, [queryData, currentIndex, applicationsCount, handleOpen]);

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
    status,
    emailVisibilities,
    cascadeVisibilites,
    queryData,
    applications,
    manageJob,
    applicationMutations,
    // handleUpdateApplication,
    // handleAsyncUpdateApplication,
    handleMoveApplications,
    handleSelectNextApplication,
    handleSelectPrevApplication,
    handleReuploadResume,
    // handleDeleteApplication,
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
