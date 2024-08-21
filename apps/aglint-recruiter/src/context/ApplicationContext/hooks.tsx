import { APICreateCandidateRequest } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';

import type { ResumePreviewer } from '@/src/components/Jobs/Job/Candidate-List/Common/ResumePreviewer';
import {
  applicationQuery,
  useUpdateApplication,
} from '@/src/queries/application';
import { diffApplication } from '@/src/queries/job-applications';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

import { useApplications } from '../ApplicationsContext';
import { useRolesAndPermissions } from '../RolesAndPermissions/RolesAndPermissionsContext';
import { ApplicationStore, useApplicationStore } from './store';

export const useApplicationContext = (
  props: Parameters<(typeof applicationQuery)['application']>[0] &
    Partial<Pick<Parameters<typeof ResumePreviewer>[0], 'navigation'>> & {
      showResumePreviewActions?: boolean;
      showTabs?: boolean;
      defaultTab?: ApplicationStore['tab'];
    },
) => {
  const {
    isAssessmentEnabled,
    isSchedulingEnabled,
    isScreeningEnabled,
    isScoringEnabled,
  } = useRolesAndPermissions();
  const router = useRouter();
  const queryClient = useQueryClient();
  const updateApplication = useApplications()?.handleAsyncUpdateApplication;
  const resumeReupload = useApplications()?.handleReuploadResume;
  const applicationMutations = useApplications()?.applicationMutations ?? [];
  const deleteApplication = useApplications()?.handleDeleteApplication;

  const { setTab, handlClose } = useApplicationStore(
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
      isScoringEnabled,
      enabled: !!props?.showTabs,
    }),
  );
  const meta = useQuery(applicationQuery.meta(props));
  const details = useQuery(applicationQuery.details(props));
  const interview = useQuery(
    applicationQuery.interview({
      ...props,
      enabled: true,
    }),
  );
  const activity = useQuery(
    applicationQuery.activity({
      ...props,
      enabled: true,
    }),
  );
  const requests = useQuery(
    applicationQuery.requests({
      ...props,
      enabled: true,
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

  const handleCreateRequest = async ({
    sel_user_id,
    isCreateRequest,
    assigned_user_id,
    requestType,
    dateRange,
    selectedSessionIds,
    sessionNames,
  }: {
    sel_user_id: string;
    isCreateRequest: boolean;
    assigned_user_id: string;
    requestType: 'standard' | 'urgent';
    dateRange: { start: string; end: string };
    selectedSessionIds: string[];
    sessionNames: string[];
  }) => {
    try {
      if (!sel_user_id) return;
      const creatReqPayload: APICreateCandidateRequest = {
        application_id: props.application_id,
        session_ids: selectedSessionIds,
        type: 'schedule',
        dates: {
          start: dateRange.start,
          end: dateRange.end,
        },
        assignee_id: isCreateRequest ? sel_user_id : assigned_user_id,
        priority: requestType,
        assigner_id: assigned_user_id,
        session_names: sessionNames,
      };

      const res = await axios.post(
        '/api/request/candidate-request',
        creatReqPayload,
      );

      if (res.status === 201 || res.status === 200) {
        if (isCreateRequest) {
          toast.success('Request Created Successfully');
          router.push(
            ROUTES['/jobs/[id]/application/[application_id]']({
              application_id: props.application_id,
              id: props.job_id,
            }) + '?tab=requests',
          );
        } else {
          router.push(
            ROUTES['/requests/[id]']({
              id: res.data,
            }),
          );
        }
        queryClient.invalidateQueries({
          queryKey: applicationQuery.requests({
            application_id: props.application_id,
            job_id: props.job_id,
            enabled: true,
          }).queryKey,
        });
      } else {
        toast.error('Failed to create request');
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to create request');
    }
  };

  useEffect(() => {
    setTab(props?.defaultTab ?? 'Details');
    return () => setTab(props?.defaultTab ?? 'Details');
  }, []);

  return {
    tabs,
    meta,
    details,
    interview,
    activity,
    requests,
    handleUpdateApplication,
    handleResumeReUpload,
    handleDeleteApplication,
    handleCreateRequest,
    applicationUpdating,
    ...props,
  };
};
