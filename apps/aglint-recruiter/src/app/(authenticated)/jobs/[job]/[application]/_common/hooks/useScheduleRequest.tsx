import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { updateRequestNotes } from '@requests/functions';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useTenant } from '@/company/hooks';
import { useMemberList } from '@/hooks/useMemberList';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type APICreateScheduleRequest } from '@/pages/api/request/schedule-request';
import { api } from '@/trpc/client';
import ROUTES from '@/utils/routing/routes';
import toast from '@/utils/toast';

import {
  setSelectedAssignee,
  useApplicationDetailStore,
} from '../stores/applicationDetail';
import { type Interviewer } from '../types/types';
import { useApplicationMeta } from './useApplicationMeta';
import { useApplicationRequests } from './useApplicationRequests';
import { useInterviewStages } from './useInterviewStages';

export const useScheduleRequest = () => {
  const utils = api.useUtils();
  const router = useRouterPro();
  const {
    isScheduleOpen,
    selectedSessionIds,
    note,
    dateRange,
    requestType,
    selectedAssignee,
  } = useApplicationDetailStore();
  const [isSaving, setIsSaving] = useState(false);
  const { data: members, status: membersStatus } = useMemberList();
  const { recruiter_user } = useTenant();
  const { application_id } = useApplicationMeta();
  const { data: stages } = useInterviewStages();
  const { data: requests } = useApplicationRequests();
  const selectedStageId = router.queryParams.stage as string;

  const selectedStage = (stages || [])?.find(
    (stage) => stage.interview_plan.id === selectedStageId,
  );

  const requestSessionIds = (requests || [])
    .filter(
      (request) =>
        request.type === 'schedule_request' &&
        (request.status === 'to_do' || request.status === 'in_progress'),
    )
    .flatMap((request) => request.request_relation)
    .flatMap((relation) => relation.session_id);

  const sessions = (stages || [])
    .flatMap((stage) => stage.sessions)
    .filter((session) =>
      selectedSessionIds.includes(session.interview_session.id),
    );

  const sessionHasRequest = sessions.filter((session) =>
    requestSessionIds.includes(session.interview_session.id),
  );

  const optionsAssignees: Interviewer[] =
    membersStatus === 'success'
      ? members?.map((member) => {
          return {
            name: getFullName(member.first_name, member.last_name),
            value: member.user_id,
            start_icon_url: member.profile_image,
          };
        })
      : [];

  useEffect(() => {
    if (optionsAssignees?.length > 0 && membersStatus === 'success') {
      const selectedAssignee = members?.find(
        (member) => member.user_id === String(optionsAssignees[0].value),
      );
      if (selectedAssignee) setSelectedAssignee(selectedAssignee);
    }
  }, [optionsAssignees?.length, membersStatus]);

  const handleCreateRequest = async () => {
    if (!selectedAssignee || !recruiter_user) return;
    const sel_user_id = selectedAssignee.user_id;
    const assigned_user_id = recruiter_user.user_id;

    const sessionNames: string[] = sessions
      .map((session) => session?.interview_session?.name)
      .filter((name): name is string => Boolean(name));

    try {
      if (!sel_user_id) return;
      const creatReqPayload: APICreateScheduleRequest = {
        application_id,
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
          updated_at: dayjsLocal().toISOString(),
        });
        if (assigned_user_id !== recruiter_user.user_id) {
          router.push(
            ROUTES['/requests/[request]']({
              request: res.data,
            }),
          );
        }
        utils.application.applicationRequest.invalidate({
          application_id,
        });
      } else if (res.status === 201 || res.status === 200) {
        router.push(
          ROUTES['/requests/[request]']({
            request: res.data,
          }),
        );
        utils.application.applicationRequest.invalidate({
          application_id,
        });
      } else {
        toast.error('Failed to create request');
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to create request');
    }
  };

  return {
    isScheduleOpen,
    isSaving,
    setIsSaving,
    optionsAssignees,
    handleCreateRequest,
    sessionHasRequest,
    selectedStage,
    sessions,
  };
};
