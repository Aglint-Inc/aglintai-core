import { type DatabaseTable } from '@aglint/shared-types';
import { Alert, AlertDescription } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { useRequest } from '@request/hooks';
import { Lightbulb } from 'lucide-react';
import React, { useMemo } from 'react';

import { ShowCode } from '@/components/Common/ShowCode';

import { useRequestProgressProvider } from '../progressCtx';
import { type RequestProgressMapType } from '../types';
import { apiTargetToEvents } from '../utils/progressMaps';
import EventNode from './EventNode';

const AvailabilityFlowMenus = ({
  isManualSchedule,
  isSelectScheduleFlowComplete,
}: {
  isManualSchedule: boolean;
  isSelectScheduleFlowComplete: boolean;
}) => {
  const { reqTriggerActionsMap, setTriggerDetails, setShowEditDialog } =
    useRequestProgressProvider();
  const { request_progress } = useRequest();

  const { progres: availFlowProg, currEventMap } = useMemo(() => {
    const currEventMap: RequestProgressMapType = {};
    const progres: DatabaseTable['request_progress'][] = [];

    if (request_progress.data.length === 0) {
      return {
        progres,
        currEventMap,
      };
    }

    for (const prog of request_progress.data) {
      const key = prog.event_type;
      if (key === 'CAND_AVAIL_REC') {
        break;
      }
      if (!currEventMap[key]) {
        currEventMap[key] = [];
      }
      currEventMap[key].push(prog);
      progres.push({
        ...prog,
      });
    }
    return { progres, currEventMap };
  }, [request_progress.data]);

  let eventWActions: (DatabaseTable['workflow_action'] & {
    target_api: keyof typeof apiTargetToEvents;
  })[] = [];
  if (reqTriggerActionsMap['onRequestSchedule']) {
    eventWActions = [...reqTriggerActionsMap['onRequestSchedule']];
  }

  return (
    <>
      <ShowCode.When isTrue={isManualSchedule}>
        <>
          {availFlowProg
            .filter(
              (s) =>
                s.is_progress_step === false &&
                s.event_type === 'REQ_CAND_AVAIL_EMAIL_LINK',
            )
            .map((prog) => {
              return (
                <>
                  <EventNode
                    key={prog.id}
                    eventType={prog.event_type}
                    currEventTrigger={'onRequestSchedule'}
                    reqProgresMap={currEventMap}
                  />
                </>
              );
            })}
        </>
      </ShowCode.When>
      <ShowCode.When isTrue={!isManualSchedule}>
        {eventWActions.map((action) => {
          const eventAction = apiTargetToEvents[action.target_api];
          return (
            <EventNode
              eventType={eventAction}
              reqProgresMap={currEventMap}
              currEventTrigger={'onRequestSchedule'}
              currWAction={action}
              key={action.id}
            />
          );
        })}
      </ShowCode.When>
      <ShowCode.When
        isTrue={
          (!isSelectScheduleFlowComplete &&
            Boolean(!reqTriggerActionsMap['sendAvailReqReminder'])) ||
          Boolean(
            reqTriggerActionsMap['sendAvailReqReminder'] &&
              reqTriggerActionsMap['sendAvailReqReminder'].length === 0,
          )
        }
      >
        <div className='ml-[32px]'>
          <div>
            <Alert
              variant='default'
              className='mb-4 border-purple-200 bg-purple-100 p-3'
            >
              <div className='flex flex-row items-center gap-1 text-purple-600 mb-2'>
              <Lightbulb className='h-4 w-4  ' />
              <div className='text-sm'>Suggestion</div>
              </div>
              <AlertDescription className='flex flex-col items-start'>
                <p className='mb-2 w-full text-sm'>
                  Add Reminders to candidate for follow up.
                </p>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setTriggerDetails({
                      trigger: 'sendAvailReqReminder',
                      interval: 24 * 60,
                    });
                    setShowEditDialog(true);
                  }}
                >
                  Schedule Reminder
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </ShowCode.When>
      <ShowCode.When
        isTrue={Boolean(
          reqTriggerActionsMap['sendAvailReqReminder'] &&
            reqTriggerActionsMap['sendAvailReqReminder'].length > 0,
        )}
      >
        {reqTriggerActionsMap['sendAvailReqReminder'] &&
          reqTriggerActionsMap['sendAvailReqReminder'].length > 0 && (
            <EventNode
              eventType={
                apiTargetToEvents['sendAvailReqReminder_email_applicant']
              }
              reqProgresMap={currEventMap}
              currEventTrigger={'sendAvailReqReminder'}
              currWAction={reqTriggerActionsMap.sendAvailReqReminder[0]}
            />
          )}
      </ShowCode.When>
    </>
  );
};

export default AvailabilityFlowMenus;
