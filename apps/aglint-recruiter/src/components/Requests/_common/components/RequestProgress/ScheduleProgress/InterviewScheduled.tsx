/* eslint-disable security/detect-object-injection */
import { type DatabaseEnums } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { Alert, AlertDescription } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import axios from 'axios';
import { Lightbulb, Loader, Plus, Trash } from 'lucide-react';
import React from 'react';

import { ShowCode } from '@/components/Common/ShowCode';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequest } from '@/context/RequestContext';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';
import { ACTION_TRIGGER_MAP } from '@/workflows/constants';

import { useRequestProgressProvider } from '../progressCtx';
import { RequestProgressTracker } from '../RequestProgressTracker';
import ScheduleProgressTracker from '../ScheduleProgressTracker';
import {
  createRequestWorkflowAction,
  deleteRequestWorkflowAction,
} from '../utils';
import { workflowCopy } from '../utils/copy';
import {
  getProgressCompStatus,
  progressStatusToTense,
} from '../utils/getProgressColor';
import { apiTargetToEvents } from '../utils/progressMaps';

type TenseType = 'past' | 'present' | 'future' | 'error';

const InterviewScheduled = () => {
  const { reqTriggerActionsMap: triggerActionMp, reqProgressMap } =
    useRequestProgressProvider();
  const { recruiter } = useAuthDetails();
  const { request_workflow, requestDetails: currentRequest } = useRequest();
  const [rsvpSending, setRsvpSending] = React.useState(false);
  const event_status =
    reqProgressMap['CAND_CONFIRM_SLOT']?.[0] ??
    reqProgressMap['SCHEDULE_INTERVIEW_SLOT']?.[0];

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

      for (const reln of sesn_reln) {
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
    <RequestProgressTracker
      circleIndicator={tense === 'past' ? 'success' : 'default'}
      textRequestProgress={'When inteview is scheduled'}
      slotProgress={
        <>
          {triggerActionMp['candidateBook']?.length > 0 &&
            ACTION_TRIGGER_MAP.candidateBook.map((action, idx) => {
              const eventAction = apiTargetToEvents[action.value.target_api];
              const addedAction = (triggerActionMp['candidateBook'] ?? []).find(
                (a) => a.target_api === action.value.target_api,
              );
              const slack_status =
                reqProgressMap['SEND_INTERVIEWER_ATTENDANCE_RSVP']?.[0];

              return (
                <ScheduleProgressTracker
                  key={idx}
                  textProgress={workflowCopy[eventAction][tense]}
                  status={getProgressCompStatus(slack_status?.status)}
                  slotRightIcon={
                    <>
                      <ShowCode.When isTrue={Boolean(addedAction)}>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() =>
                            handleDeleteScheduleAction(addedAction.id)
                          }
                        >
                          <Trash className='h-4 w-4 text-destructive' />
                        </Button>
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
                        <Button
                          size={'sm'}
                          onClick={() => {
                            handleSendRsVpReminder();
                          }}
                        >
                          {rsvpSending ? 'Sending' : 'Send rsvp reminder'}
                        </Button>
                      </ShowCode.When>
                    </>
                  }
                  slotLoader={
                    tense === 'present' ? (
                      <Loader className='h-6 w-6 animate-spin text-gray-500' />
                    ) : undefined
                  }
                />
              );
            })}
          <ShowCode.When
            isTrue={triggerActionMp['candidateBook']?.length === 0}
          >
            <Alert
              variant='default'
              className='bg-purple-100 border-purple-200 mb-4'
            >
              <Lightbulb className='h-4 w-4 text-purple-500' />
              <AlertDescription className='flex flex-col items-end'>
                <p className='mb-4 w-full'>
                  {workflowCopy['SEND_INTERVIEWER_ATTENDANCE_RSVP'][tense]}
                </p>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() =>
                    handleAddAction(
                      'candidateBook_slack_interviewerForFeedback',
                    )
                  }
                >
                  <Plus className='h-4 w-4' />
                  Add RSVP
                </Button>
              </AlertDescription>
            </Alert>
          </ShowCode.When>
        </>
      }
    />
  );
};

export default InterviewScheduled;