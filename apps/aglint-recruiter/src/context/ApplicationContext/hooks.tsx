import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';

import type { ResumePreviewer } from '@/src/components/Jobs/Job/Candidate-List/Common/ResumePreviewer';
import {
  applicationQuery,
  useUpdateApplication,
} from '@/src/queries/application';
import { diffApplication } from '@/src/queries/job-applications';

import { useApplications } from '../ApplicationsContext';
import { useAuthDetails } from '../AuthContext/AuthContext';
import { ApplicationStore, useApplicationStore } from './store';

export const useApplicationContext = (
  props: Parameters<(typeof applicationQuery)['application']>[0] &
    Partial<Pick<Parameters<typeof ResumePreviewer>[0], 'navigation'>> & {
      showResumePreviewActions?: boolean;
      showTabs?: boolean;
      defaultTab?: ApplicationStore['tab'];
    },
) => {
  const { isAssessmentEnabled, isSchedulingEnabled, isScreeningEnabled } =
    useAuthDetails();
  const queryClient = useQueryClient();
  const updateApplication = useApplications()?.handleAsyncUpdateApplication;
  const resumeReupload = useApplications()?.handleReuploadResume;
  const applicationMutations = useApplications()?.applicationMutations ?? [];
  const deleteApplication = useApplications()?.handleDeleteApplication;

  const { setTab, tab, handlClose } = useApplicationStore(
    ({ setTab, tab, handlClose }) => ({
      setTab,
      tab,
      handlClose,
    }),
  );

  const tabs = useQuery(
    applicationQuery.tabs({
      ...props,
      isAssessmentEnabled,
      isSchedulingEnabled,
      isScreeningEnabled,
      enabled: !!props?.showTabs,
    }),
  );
  const meta = useQuery(applicationQuery.meta(props));
  const details = useQuery(applicationQuery.details(props));
  const interview = useQuery(
    applicationQuery.interview({
      ...props,
      enabled: false, //tab === 'Interview' || !!props?.showTabs,
    }),
  );
  const tasks = useQuery(
    applicationQuery.tasks({
      ...props,
      enabled: tab === 'Tasks' || tab === 'Interview' || !!props?.showTabs,
    }),
  );
  const activity = useQuery(
    applicationQuery.activity({
      ...props,
      enabled: tab === 'Activity' || !!props?.showTabs,
    }),
  );
  const { mutate } = useUpdateApplication(props);

  const handleUpdateApplication = useCallback(
    async (
      application: Parameters<typeof updateApplication>[0]['application'],
    ) => {
      const diffedApplication = diffApplication(application);
      if (updateApplication && Object.keys(diffedApplication).length) {
        try {
          queryClient.setQueryData(applicationQuery.meta(props).queryKey, {
            ...meta.data,
            ...diffedApplication,
          });
          await updateApplication({
            application,
            application_id: props.application_id,
          });
        } catch {
          queryClient.setQueryData(
            applicationQuery.meta(props).queryKey,
            meta.data,
          );
        }
      } else {
        mutate({ application, application_id: props.application_id });
      }
    },
    [
      updateApplication,
      props.application_id,
      applicationQuery,
      meta,
      queryClient.setQueryData,
    ],
  );

  const handleResumeReUpload = async (
    files: Parameters<typeof resumeReupload>[0]['files'],
  ) => {
    if (resumeReupload)
      return await resumeReupload({
        application_id: props.application_id,
        candidate_id: meta?.data?.candidate_id,
        files,
      });
  };

  const handleDeleteApplication = useCallback(async () => {
    if (deleteApplication) {
      handlClose();
      return await deleteApplication({ application_id: props.application_id });
    }
  }, [deleteApplication, props.application_id]);

  const applicationUpdating = useMemo(
    () => applicationMutations.includes(props.application_id),
    [applicationMutations, props.application_id],
  );

  useEffect(() => {
    setTab(props?.defaultTab ?? 'Details');
    return () => setTab(props?.defaultTab ?? 'Details');
  }, []);

  return {
    tabs,
    meta,
    details,
    interview,
    tasks,
    activity,
    handleUpdateApplication,
    handleResumeReUpload,
    handleDeleteApplication,
    applicationUpdating,
    ...props,
  };
};
