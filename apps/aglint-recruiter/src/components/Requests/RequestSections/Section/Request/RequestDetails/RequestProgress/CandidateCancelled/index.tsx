/* eslint-disable security/detect-possible-timing-attacks */
import { DatabaseEnums } from '@aglint/shared-types';
import { CircularProgress } from '@mui/material';
import { useMemo, useState } from 'react';

import { ButtonSolid } from '@/devlink2/ButtonSolid';
import { RequestProgress } from '@/devlink2/RequestProgress';
import { ScheduleProgress } from '@/devlink2/ScheduleProgress';
import axios from '@/src/client/axios';
import { useRequest } from '@/src/context/RequestContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { SlackIcon } from '../../Components/SlackIcon';
import { RequestProgressMapType } from '../types';
import { workflowCopy } from '../utils/copy';
import { apiTargetToEvents } from '../utils/progressMaps';
import { getWorkflowText } from './utils';

function CandidateCancelled() {
  const { requestDetails, request_progress, request_workflow } = useRequest();

  const [manualEvents] = useState<DatabaseEnums['email_slack_types'][]>([
    'onRequestCancel_agent_cancelEvents',
    'onRequestCancel_slack_interviewersOrganizer',
  ]);
  const isManualFlow = request_workflow.data.length === 0;
  let eventTargetMap = useMemo(() => {
    let mp: any = {};
    let workFlow = request_workflow.data;

    workFlow.forEach((eA) => {
      mp[eA.trigger] = eA.workflow_action.map((wA) => {
        return wA.target_api;
      });
    });
    return mp;
  }, [request_workflow.data]);

  const reqProgressMap: RequestProgressMapType = useMemo(() => {
    let mp: RequestProgressMapType = {};

    request_progress.data.forEach((row) => {
      if (!mp[row.event_type]) {
        mp[row.event_type] = [];
      }
      mp[row.event_type].push({ ...row });
    });
    return mp;
  }, [request_progress]);

  const events = isManualFlow ? manualEvents : eventTargetMap.onRequestCancel;
  const EventProgress = events
    .map((api) => {
      return { api: api, eventType: apiTargetToEvents[api][0] };
    })
    .flat()
    .map(({ eventType, api }) => {
      const requestProgress =
        reqProgressMap[eventType] &&
        reqProgressMap[eventType].find((row) => {
          return !row.is_progress_step;
        });
      const workflow = workflowCopy[eventType];
      return {
        eventType: eventType,
        slotInput: null, // ai instructions
        slotRequestIcon:
          api === 'onRequestCancel_slack_interviewersOrganizer' ? (
            <SlackIcon />
          ) : (
            ''
          ), // left icon
        slotHoverIcon: '', //right icon
        status: requestProgress?.status ?? null, // status
        textProgress: getWorkflowText({
          workflow,
          status: requestProgress?.status,
        }),
        slotButton: isManualFlow && requestProgress?.status !== 'completed' && (
          <ButtonSolid
            textButton={
              api === 'onRequestCancel_agent_cancelEvents'
                ? 'Cancel'
                : api === 'onRequestCancel_slack_interviewersOrganizer'
                  ? 'Send slack'
                  : ''
            }
            onClickButton={{
              onClick: () => {
                handleClick(api);
              },
            }}
            size={1}
          />
        ),
        slotLoader:
          requestProgress?.status === 'in_progress' ? (
            <CircularProgress size={20} />
          ) : null,
      };
    })
    .flat();

  const requestProgressData = [
    {
      id: 'cancel_request',
      isDividerVisible: false,
      textRequestProgress: 'Cancel request received from the candidate',
      indicator: 'error',
      circleIndicator: 'error',
      slotIndicator: null,
      eventProgress: [...EventProgress],
      addActionButton: false,
    },
  ];

  async function handleClick(api) {
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
          {
            ...meta,
          },
        );
      } catch (error) {
        toast.error('Slack server not started');
      }
      // send slack message
    } else if (api === 'onRequestCancel_agent_cancelEvents') {
      await supabase
        .from('request_progress')
        .insert({
          status: 'in_progress',
          event_type: 'CANCEL_INTERVIEW_MEETINGS',
          request_id: requestDetails.id,
        })
        .select()
        .single()
        .then(async ({ data }) => {
          await axios.post(
            `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/cancel_interview_scheduling`,
            {
              session_ids: requestDetails.request_relation.map(
                (r) => r.session_id,
              ),
            },
          );
          await supabase
            .from('request_progress')
            .update({
              status: 'completed',
            })
            .eq('id', data.id)
            .then(() => {});
        });
    }
  }
  return (
    <>
      {requestProgressData.map((progress, index) => (
        <RequestProgress
          key={index}
          isDividerVisible={progress.isDividerVisible}
          indicator={progress.indicator}
          circleIndicator={progress.circleIndicator}
          slotIndicator={progress.slotIndicator}
          textRequestProgress={progress.textRequestProgress}
          slotProgress={
            <>
              {progress.eventProgress.map((event, i) => {
                return (
                  <ScheduleProgress
                    key={i}
                    slotAiText={event.slotInput}
                    isAiTextVisible={event.slotInput}
                    slotLoader={event.slotLoader}
                    slotLeftIcon={event.slotRequestIcon} // left icon
                    slotRightIcon={event.slotHoverIcon} // right icon
                    status={event.status}
                    textProgress={event.textProgress}
                    slotButton={event.slotButton}
                  />
                );
              })}
              {progress.addActionButton}
            </>
          }
        />
      ))}
    </>
  );
}

export default CandidateCancelled;
