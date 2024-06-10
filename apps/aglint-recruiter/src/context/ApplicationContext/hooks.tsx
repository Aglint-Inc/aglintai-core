import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

import { applicationQuery } from '@/src/queries/application';
import { diffApplication } from '@/src/queries/job-applications';

import { useApplications } from '../ApplicationsContext';
import { useApplicationStore } from './store';

export const useApplicationContext = (
  props: Parameters<(typeof applicationQuery)['application']>[0],
) => {
  const queryClient = useQueryClient();
  const updateApplication = useApplications()?.handleAsyncUpdateApplication;
  const { resetTab } = useApplicationStore(({ resetTab }) => ({
    resetTab,
  }));

  const meta = useQuery(applicationQuery.meta(props));
  const details = useQuery(applicationQuery.details(props));

  const handleUpdateApplication = useCallback(
    async (
      application: Parameters<typeof updateApplication>[0]['application'],
    ) => {
      const diffedApplication = diffApplication(application);
      if (props.placeholderData && Object.keys(diffedApplication).length) {
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
    resetTab();
    return () => resetTab();
  }, []);
  return { meta, details, handleUpdateApplication };
};
