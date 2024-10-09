/* eslint-disable security/detect-object-injection */
import { type DatabaseEnums } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import { useRequest } from '@request/hooks';
import React from 'react';

import { useTenant } from '@/company/hooks';
import { ShowCode } from '@/components/Common/ShowCode';

import { useRequestProgressProvider } from '../progressCtx';
import { RequestProgressTracker } from '../RequestProgressTracker';
import { createRequestWorkflowAction } from '../utils';
import { workflowCopy } from '../utils/copy';
import { progressStatusToTense } from '../utils/getProgressColor';
import { apiTargetToEvents } from '../utils/progressMaps';
import EventNode from './EventNode';
import SuggestionCard from './SuggestionCard';

type TenseType = 'past' | 'present' | 'future' | 'error';

const InterviewScheduled = () => {
  const { reqTriggerActionsMap: triggerActionMp, reqProgressMap } =
    useRequestProgressProvider();
  const { recruiter } = useTenant();
  const { request_workflow, requestDetails: currentRequest } = useRequest();
  const event_status = reqProgressMap['INTERVIEW_SCHEDULED']?.[0];

  let tense: TenseType = 'future';
  if (event_status) {
    tense = progressStatusToTense(event_status.status);
  }

  const handleAddAction = async (
    target_api: DatabaseEnums['email_slack_types'],
  ) => {
    try {
      await createRequestWorkflowAction({
        wActions: [
          {
            target_api: target_api as any,
            order: 0,
            action_type: 'slack',
            workflow_id: '',
          },
        ],
        recruiter_id: recruiter.id,
        request_id: currentRequest.id,
        interval: 0,
      });
      await request_workflow.refetch();
    } catch (err) {
      toast({ title: 'Failed to add action', variant: 'destructive' });
    }
  };

  let isWorkflowSet = false;
  if (
    triggerActionMp['candidateBook'] &&
    triggerActionMp['candidateBook'].length > 0
  ) {
    isWorkflowSet = true;
  }
  return (
    <RequestProgressTracker
      circleIndicator={tense === 'past' ? 'success' : 'neutral'}
      textRequestProgress={'When interview is scheduled'}
      isLastNode={true}
      slotProgress={
        <>
          {
            <ShowCode.When
              isTrue={Boolean(
                reqProgressMap['RECRUITER_SCHEDULED'] &&
                  reqProgressMap['RECRUITER_SCHEDULED'].length > 0,
              )}
            >
              <EventNode
                eventType='RECRUITER_SCHEDULED'
                reqProgresMap={reqProgressMap}
              />
            </ShowCode.When>
          }
          {
            <ShowCode.When
              isTrue={Boolean(
                reqProgressMap['CAND_CONFIRM_SLOT'] &&
                  reqProgressMap['CAND_CONFIRM_SLOT'].length > 0,
              )}
            >
              <EventNode
                eventType='CAND_CONFIRM_SLOT'
                reqProgresMap={reqProgressMap}
              />
            </ShowCode.When>
          }
          {triggerActionMp['candidateBook']?.map((action, idx) => {
            return (
              <EventNode
                key={idx}
                currEventTrigger='candidateBook'
                eventType={apiTargetToEvents[action.target_api]}
                reqProgresMap={reqProgressMap}
                currWAction={action}
              />
            );
          })}
          <ShowCode.When isTrue={!isWorkflowSet && tense === 'future'}>
            <>
              <SuggestionCard
                heading='Suggestion'
                description={
                  workflowCopy['SEND_INTERVIEWER_ATTENDANCE_RSVP'][tense]
                }
                buttonSlot={
                  <Button
                    variant='outline'
                    onClick={() =>
                      handleAddAction(
                        'candidateBook_slack_interviewerForConfirmation',
                      )
                    }
                  >
                    Add RSVP
                  </Button>
                }
              />
            </>
          </ShowCode.When>
        </>
      }
    />
  );
};

export default InterviewScheduled;
