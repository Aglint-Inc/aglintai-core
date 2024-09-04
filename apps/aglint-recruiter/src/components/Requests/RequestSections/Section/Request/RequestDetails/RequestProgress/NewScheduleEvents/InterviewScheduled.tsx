/* eslint-disable security/detect-object-injection */
import { type DatabaseEnums } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { ButtonSoft } from '@devlink/ButtonSoft';
import { IconButtonSoft } from '@devlink/IconButtonSoft';
import { RequestProgress } from '@devlink2/RequestProgress';
import { ScheduleProgress } from '@devlink2/ScheduleProgress';
import { Stack } from '@mui/material';
import axios from 'axios';
import React from 'react';

import LottieAnimations from '@/components/Common/Lotties/LottieIcons';
import { ShowCode } from '@/components/Common/ShowCode';
import { ACTION_TRIGGER_MAP } from '@/components/Workflow/constants';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequest } from '@/context/RequestContext';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import {
  createRequestWorkflowAction,
  deleteRequestWorkflowAction,
} from '../../utils';
import { workflowCopy } from '../utils/copy';
import {
  getProgressCompStatus,
  progressStatusToTense,
} from '../utils/getProgressColor';
import { apiTargetToEvents } from '../utils/progressMaps';
import { useNewScheduleRequestPr } from '.';
type TenseType = 'past' | 'present' | 'future' | 'error';

const InterviewScheduled = () => {
  const {
    reqTriggerActionsMap: triggerActionMp,
    currentRequest,
    reqProgressMap,
  } = useNewScheduleRequestPr();
  const { recruiter } = useAuthDetails();
  const { request_workflow } = useRequest();
  const [rsvpSending, setRsvpSending] = React.useState(false);
  const event_status = reqProgressMap['CAND_CONFIRM_SLOT']?.[0];

  let tense: TenseType = 'future';
  if (event_status) {
    tense = progressStatusToTense(event_status.status);
  }

  const handleAddAction = async (
    target_api: DatabaseEnums['email_slack_types'],
  ) => {
    try {
      await createRequestWorkflowAction({
        wAction: {
          target_api: target_api as any,
          order: 0,
          action_type: 'slack',
        },
        recruiter_id: recruiter.id,
        request_id: currentRequest.id,
      });
      await request_workflow.refetch();
    } catch (err) {
      toast.error('Failed to add action');
    }
  };

  const handleDeleteScheduleAction = async (workflowActionId: string) => {
    try {
      await deleteRequestWorkflowAction(workflowActionId);
      await request_workflow.refetch();
    } catch (err) {
      toast.error('Failed to remove action');
    }
  };
  const handleSendRsVpReminder = async () => {
    try {
      setRsvpSending(true);
      const sesn_reln = supabaseWrap(
        await supabase
          .from('request_relation')
          .select()
          .eq('request_id', currentRequest.id),
      );

      for (let reln of sesn_reln) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_AGENT_API}/api/slack/candidateBook_slack_interviewerForConfirmation`,
          {
            session_id: reln.session_id,
            application_id: currentRequest.application_id,
            request_id: currentRequest.id,
          },
        );
      }
    } catch (err) {
      toast.error('Failed to send RSVP reminder');
      setRsvpSending(false);
    }
  };
  return (
    <RequestProgress
      circleIndicator={tense === 'past' ? 'success' : 'neutral'}
      textRequestProgress={'On Inteview is Scheduled'}
      slotProgress={
        <>
          {ACTION_TRIGGER_MAP.candidateBook.map((action, idx) => {
            const eventAction = apiTargetToEvents[action.value.target_api];
            const addedAction = (triggerActionMp['candidateBook'] ?? []).find(
              (a) => a.target_api === action.value.target_api,
            );
            const slack_status =
              reqProgressMap['SEND_INTERVIEWER_ATTENDANCE_RSVP']?.[0];

            return (
              <ScheduleProgress
                key={idx}
                textProgress={workflowCopy[eventAction][tense]}
                status={getProgressCompStatus(slack_status?.status)}
                slotRightIcon={
                  <>
                    <ShowCode.When isTrue={tense === 'future'}>
                      <ShowCode.When isTrue={!addedAction}>
                        <IconButtonSoft
                          iconName={'add'}
                          size={1}
                          color={'neutral'}
                          onClickButton={{
                            onClick: () => {
                              handleAddAction(action.value.target_api);
                            },
                          }}
                        />
                      </ShowCode.When>
                      <ShowCode.When isTrue={Boolean(addedAction)}>
                        <IconButtonSoft
                          iconName={'delete'}
                          size={1}
                          color={'error'}
                          onClickButton={{
                            onClick: () => {
                              handleDeleteScheduleAction(addedAction.id);
                            },
                          }}
                        />
                      </ShowCode.When>
                    </ShowCode.When>
                  </>
                }
                slotAiText={
                  <>
                    <ShowCode.When
                      isTrue={
                        tense === 'past' &&
                        !reqProgressMap['SEND_INTERVIEWER_ATTENDANCE_RSVP']
                      }
                    >
                      <Stack direction={'row'}>
                        <ButtonSoft
                          size={1}
                          textButton={
                            rsvpSending ? 'Sending' : 'Send rsvp reminder'
                          }
                          onClickButton={{
                            onClick: () => {
                              handleSendRsVpReminder();
                            },
                          }}
                        />
                      </Stack>
                    </ShowCode.When>
                  </>
                }
                slotLoader={
                  tense === 'present' ? (
                    <LottieAnimations animation='loading_spinner' size={1.5} />
                  ) : undefined
                }
              />
            );
          })}
        </>
      }
    />
  );
};

export default InterviewScheduled;
