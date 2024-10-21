import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { useUpdateRequestNote } from '@requests/hooks/useRequestNotes';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMemberList } from 'src/app/_common/hooks/useMemberList';

import { useTenant } from '@/company/hooks';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type APICreateScheduleRequest } from '@/pages/api/request/schedule-request';
import ROUTES from '@/utils/routing/routes';
import toast from '@/utils/toast';

import {
  setIsScheduleOpen,
  setSelectedAssignee,
  setSelectedSessionIds,
  useApplicationDetailStore,
} from '../stores/applicationDetail';
import { type Interviewer } from '../types/types';
import { useApplicationRequests } from './useApplicationRequests';
import { useInterviewStages } from './useInterviewStages';

export const useScheduleRequest = () => {
  const router = useRouterPro();
  const {
    isScheduleOpen,
    selectedSessionIds,
    note,
    dateRange,
    requestType,
    selectedAssignee,
  } = useApplicationDetailStore();
  const { updateRequestNote } = useUpdateRequestNote();

  const [isSaving, setIsSaving] = useState(false);
  const { data: members, status: membersStatus } = useMemberList();
  const { recruiter_user } = useTenant();
  const application_id = router.params.application;
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
    setIsSaving(true);

    if (!selectedAssignee) return;

    const sel_user_id = selectedAssignee.user_id;

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
        assigner_id: recruiter_user.user_id,
        session_names: sessionNames,
      };

      const res = await axios.post(
        '/api/request/schedule-request',
        creatReqPayload,
      );
      const request_id = res.data;

      if (res.status === 201 || res.status === 200) {
        if (note) {
          const payload = {
            note,
            request_id,
            updated_at: dayjsLocal().toISOString(),
          };
          updateRequestNote(payload);
        }
        if (sel_user_id === recruiter_user.user_id) {
          router.push(
            ROUTES['/requests/[request]']({
              request: res.data,
            }),
          );
        }
      } else {
        throw new Error();
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to create request');
    } finally {
      setIsSaving(false);
      setSelectedSessionIds([]);
      setIsScheduleOpen(false);
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
