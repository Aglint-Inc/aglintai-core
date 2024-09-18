import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { updateRequestNotes } from '@/components/Requests/_common/functions';
// import { updateRequestNotes } from '@/components/Requests/_common/functions';
import type { ResumePreviewer } from '@/job/components/Common/ResumePreviewer';
import { type APICreateScheduleRequest } from '@/pages/api/request/schedule-request';
import { applicationQuery } from '@/queries/application';
// import { diffApplication } from '@/queries/job-applications';
import dayjs from '@/utils/dayjs';
import ROUTES from '@/utils/routing/routes';
import toast from '@/utils/toast';

import { useRolesAndPermissions } from '../RolesAndPermissions/RolesAndPermissionsContext';
import { type ApplicationStore, useApplicationStore } from './store';

export const useApplicationContext = (
  props: Parameters<(typeof applicationQuery)['application']>[0] &
    Partial<Pick<Parameters<typeof ResumePreviewer>[0], 'navigation'>> & {
      showResumePreviewActions?: boolean;
      showTabs?: boolean;
      defaultTab?: ApplicationStore['tab'];
    },
) => {
  const { isScoringEnabled } = useRolesAndPermissions();
  const router = useRouter();
  const queryClient = useQueryClient();
  // const updateApplication = useApplications()?.handleAsyncUpdateApplication;
  // const resumeReupload = useApplications()?.handleReuploadResume;
  // const applicationMutations = useApplications()?.applicationMutations ?? [];
  // const deleteApplication = useApplications()?.handleDeleteApplication;

  const { setTab } = useApplicationStore(({ setTab, tab }) => ({
    setTab,
    tab,
    // handlClose,
  }));

  const tabs = useQuery(
    applicationQuery.tabs({
      ...props,
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
  // const { mutate } = useUpdateApplication(props);

  // const handleUpdateApplication = useCallback(
  //   async (
  //     application: Parameters<typeof updateApplication>[0]['application'],
  //   ) => {
  //     const diffedApplication = diffApplication(application);
  //     if (updateApplication && Object.keys(diffedApplication).length) {
  //       try {
  //         queryClient.setQueryData(applicationQuery.meta(props).queryKey, {
  //           ...meta.data,
  //           ...diffedApplication,
  //         });
  //         await updateApplication({
  //           application,
  //           application_id: props.application_id,
  //         });
  //       } catch {
  //         queryClient.setQueryData(
  //           applicationQuery.meta(props).queryKey,
  //           meta.data,
  //         );
  //       }
  //     } else {
  //       mutate({ application, application_id: props.application_id });
  //     }
  //   },
  //   [
  //     updateApplication,
  //     props.application_id,
  //     applicationQuery,
  //     meta,
  //     queryClient.setQueryData,
  //   ],
  // );

  // const handleResumeReUpload = async (
  //   files: Parameters<typeof resumeReupload>[0]['files'],
  // ) => {
  //   if (resumeReupload)
  //     return await resumeReupload({
  //       application_id: props.application_id,
  //       candidate_id: meta?.data?.candidate_id,
  //       files,
  //     });
  // };

  // const handleDeleteApplication = useCallback(async () => {
  //   if (deleteApplication) {
  //     handlClose();
  //     return await deleteApplication({ application_id: props.application_id });
  //   }
  // }, [deleteApplication, props.application_id]);

  const handleCreateRequest = async ({
    sel_user_id,
    assigned_user_id,
    requestType,
    dateRange,
    selectedSessionIds,
    sessionNames,
    note,
  }: {
    sel_user_id: string;
    assigned_user_id: string;
    requestType: 'standard' | 'urgent';
    dateRange: { start: string; end: string };
    selectedSessionIds: string[];
    sessionNames: string[];
    note: string;
  }) => {
    try {
      if (!sel_user_id) return;
      const creatReqPayload: APICreateScheduleRequest = {
        application_id: props.application_id,
        session_ids: selectedSessionIds,
        type: 'schedule',
        dates: {
          start: dateRange.start,
          end: dateRange.end,
        },
        assignee_id: sel_user_id,
        priority: requestType,
        assigner_id: assigned_user_id,
        session_names: sessionNames,
      };

      const res = await axios.post(
        '/api/request/schedule-request',
        creatReqPayload,
      );
      const request_id = res.data;

      if (note && (res.status === 201 || res.status === 200)) {
        await updateRequestNotes({
          id: uuidv4(),
          request_id,
          note,
          updated_at: dayjs().toISOString(),
        });
        router.push(
          ROUTES['/requests/[id]']({
            id: res.data,
          }),
        );
        queryClient.invalidateQueries({
          queryKey: applicationQuery.requests({
            application_id: props.application_id,
            job_id: props.job_id,
            enabled: true,
          }).queryKey,
        });
      } else if (res.status === 201 || res.status === 200) {
        router.push(
          ROUTES['/requests/[id]']({
            id: res.data,
          }),
        );

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
    // handleResumeReUpload,
    // handleDeleteApplication,
    handleCreateRequest,
    ...props,
  };
};
