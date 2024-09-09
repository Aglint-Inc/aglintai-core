import { RequestProgress } from '@devlink2/RequestProgress';
import React from 'react';

import { ShowCode } from '@/components/Common/ShowCode';

import { useRequestProgressProvider } from '../progressCtx';
import EventNode from '../ScheduleProgress/EventNode';
import { apiTargetToEvents } from '../utils/progressMaps';
import { Button } from '@components/ui/button';

const InterviewerDecline = () => {
  const {
    setEditTrigger,
    reqTriggerActionsMap,
    setShowEditDialog,
    reqProgressMap,
  } = useRequestProgressProvider();

  return (
    <>
      <RequestProgress
        circleIndicator={'neutral'}
        textRequestProgress={'The interviewer declines the interview'}
        slotProgress={
          <>
            <ShowCode.When
              isTrue={
                !reqTriggerActionsMap['onRequestInterviewerDecline'] ||
                (reqTriggerActionsMap['onRequestInterviewerDecline'] &&
                  reqTriggerActionsMap['onRequestInterviewerDecline'].length ===
                    0)
              }
            >
              {(!reqTriggerActionsMap['onRequestInterviewerDecline'] ||
                (reqTriggerActionsMap['onRequestInterviewerDecline'] &&
                  reqTriggerActionsMap['onRequestInterviewerDecline'].length ===
                    0)) && (
                <Button
                  size={'sm'}
                  onClick={() => {
                    setEditTrigger('onRequestInterviewerDecline');
                    setShowEditDialog(true);
                  }}
                >
                  Add Ai Actions
                </Button>
              )}
            </ShowCode.When>
            <ShowCode.When
              isTrue={Boolean(
                reqTriggerActionsMap['onRequestInterviewerDecline'] &&
                  reqTriggerActionsMap['onRequestInterviewerDecline'].length >
                    0,
              )}
            >
              {reqTriggerActionsMap['onRequestInterviewerDecline'] &&
                reqTriggerActionsMap['onRequestInterviewerDecline'].map(
                  (action) => {
                    const event = apiTargetToEvents[action.target_api];
                    return (
                      <EventNode
                        currEventTrigger='onRequestInterviewerDecline'
                        eventType={event}
                        reqProgresMap={reqProgressMap}
                        currWAction={action}
                        key={action.id}
                      />
                    );
                  },
                )}
            </ShowCode.When>
          </>
        }
      />
    </>
  );
};

export default InterviewerDecline;
