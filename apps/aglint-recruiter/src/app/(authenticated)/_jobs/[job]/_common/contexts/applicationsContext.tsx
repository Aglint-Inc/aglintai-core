/* eslint-disable security/detect-object-injection */
import React, { createContext, memo, useMemo } from 'react';

import { useApplicationsActions } from '@/job/hooks/useApplicationsActions';
import { useApplicationsStore } from '@/job/hooks/useApplicationsStore';
import { useJob } from '@/job/hooks/useJob';
import {
  useDeleteApplication,
  useMoveApplications,
  useMoveApplicationsToInterview,
  useReuploadResume,
} from '@/queries/job-applications';

const useApplicationsContext = () => {
  const { jobLoad, job, job_id, recruiter_id, manageJob } = useJob();

  const { resetChecklist } = useApplicationsActions();

  const checklist = useApplicationsStore((state) => state.checklist);

  const status = useApplicationsStore((state) => state.status);

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
    manageJob,
    applicationMutations,
    handleMoveApplications,
    handleReuploadResume,
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
