/* eslint-disable security/detect-possible-timing-attacks */
import { DatabaseEnums } from '@aglint/shared-types';
import { useMemo } from 'react';

import axios from '@/src/client/axios';
import { Request } from '@/src/queries/requests/types';
import { supabase } from '@/src/utils/supabase/client';

import { RequestProgressMapType } from '../types';
import { workflowCopy } from '../utils/copy';

export function getWorkflowText({
  status,
  workflow,
}: {
  status: string;
  workflow: (typeof workflowCopy)['CANDIDATE_AVAILABILITY_RE_REQUESTED'];
}) {
  return status === `completed`
    ? workflow.past
    : status === `in_progress`
      ? workflow.present
      : workflow.future;
}

export function useEventTargetMap(workflowData) {
  return useMemo(() => {
    let mp: any = {};
    workflowData.forEach((eA) => {
      mp[eA.trigger] = eA.workflow_action.map((wA) => wA.target_api);
    });
    return mp;
  }, [workflowData]);
}

export function useReqProgressMap(progressData) {
  return useMemo(() => {
    let mp: RequestProgressMapType = {};
    progressData.forEach((row) => {
      if (!mp[row.event_type]) {
        mp[row.event_type] = [];
      }
      mp[row.event_type].push({ ...row });
    });
    return mp;
  }, [progressData]);
}

// Handle button click actions
export async function handleClick(
  api: DatabaseEnums['email_slack_types'],
  requestDetails: Request,
) {
  if (api === 'onRequestCancel_slack_interviewersOrganizer') {
    const meta = {
      session_ids: requestDetails.request_relation.map((r) => r.session_id),
      request_id: requestDetails.id,
      event_run_id: null,
      target_api: api,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_AGENT_API}/api/slack/${meta.target_api}`,
        meta,
      );
    } catch (error) {
      return 'An error occurred during the cancellation process';
    }
  } else if (api === 'onRequestCancel_agent_cancelEvents') {
    const { data } = await supabase
      .from('request_progress')
      .insert({
        status: 'in_progress',
        event_type: 'CANCEL_INTERVIEW_MEETINGS',
        request_id: requestDetails.id,
      })
      .select()
      .single();

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/cancel_interview_scheduling`,
        {
          session_ids: requestDetails.request_relation.map((r) => r.session_id),
        },
      );

      await supabase
        .from('request_progress')
        .update({ status: 'completed' })
        .eq('id', data.id)
        .then(() => {});
    } catch (error) {
      return 'An error occurred during the cancellation process';
    }
  }
}
