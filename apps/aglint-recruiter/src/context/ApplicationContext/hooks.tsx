import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

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
  const { setTab, tab } = useApplicationStore(({ setTab, tab }) => ({
    setTab,
    tab,
  }));

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
      enabled: tab === 'Interview' || !!props?.showTabs,
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
    ...props,
  };
};
