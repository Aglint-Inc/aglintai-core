import { Button } from '@components/ui/button';
import { WandSparkles } from 'lucide-react';
import React from 'react';

import { ShowCode } from '@/components/Common/ShowCode';

import { useRequestProgressProvider } from '../progressCtx';
import { RequestProgressTracker } from '../RequestProgressTracker';
import EventNode from '../ScheduleProgress/EventNode';
import { apiTargetToEvents } from '../utils/progressMaps';

const InterviewerDecline = () => {
  const {
    setEditTrigger,
    reqTriggerActionsMap,
    setShowEditDialog,
    reqProgressMap,
  } = useRequestProgressProvider();

  return (
    <>
      <RequestProgressTracker
        circleIndicator={'default'}
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
                  variant='outline'
                  size={'sm'}
                  onClick={() => {
                    setEditTrigger('onRequestInterviewerDecline');
                    setShowEditDialog(true);
                  }}
                >
                  <WandSparkles className='mr-2 h-4 w-4' />
                  Add Automation
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
