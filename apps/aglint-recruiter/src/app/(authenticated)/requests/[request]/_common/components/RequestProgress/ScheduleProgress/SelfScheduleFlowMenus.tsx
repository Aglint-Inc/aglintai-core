import { type DatabaseTable } from '@aglint/shared-types';
import { Alert, AlertDescription } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { useRequest } from '@request/hooks';
import { Bell, Lightbulb } from 'lucide-react';
import React, { useMemo } from 'react';

import { ShowCode } from '@/components/Common/ShowCode';

import { useRequestProgressProvider } from '../progressCtx';
import { type RequestProgressMapType } from '../types';
import { apiTargetToEvents } from '../utils/progressMaps';
import EventNode from './EventNode';

const SelfScheduleFlowMenus = ({
  isManualSchedule,
  isSelectScheduleFlowComplete,
}: {
  isManualSchedule: boolean;
  isSelectScheduleFlowComplete: boolean;
}) => {
  const { reqTriggerActionsMap, setTriggerDetails, setShowEditDialog } =
    useRequestProgressProvider();
  const { request_progress } = useRequest();

  const { progres: scheduleFlowProg, reqProgresMap } = useMemo(() => {
    const reqProgresMap: RequestProgressMapType = {};
    const progres: DatabaseTable['request_progress'][] = [];

    if (request_progress.data.length === 0) {
      return {
        progres,
        reqProgresMap,
      };
    }

    for (const prog of request_progress.data) {
      const key = prog.event_type;
      if (key === 'CAND_CONFIRM_SLOT') {
        break;
      }
      if (!reqProgresMap[key]) {
        reqProgresMap[key] = [];
      }
      reqProgresMap[key].push(prog);
      progres.push({
        ...prog,
      });
    }
    return { progres, reqProgresMap };
  }, [request_progress.data]);
  //

  return (
    <>
      <ShowCode.When isTrue={isManualSchedule}>
        {scheduleFlowProg
          .filter(
            (s) =>
              s.is_progress_step === false &&
              s.event_type === 'SELF_SCHEDULE_LINK',
          )
          .map((prog) => {
            return (
              <>
                <EventNode
                  key={prog.id}
                  reqProgresMap={reqProgresMap}
                  eventType={prog.event_type}
                  currEventTrigger={'onRequestSchedule'}
                />
              </>
            );
          })}
      </ShowCode.When>
      <ShowCode.When isTrue={!isManualSchedule}>
        {(reqTriggerActionsMap['onRequestSchedule'] ?? [])
          .map((eA) => {
            const actionEvent = apiTargetToEvents[eA.target_api];
            return (
              <EventNode
                key={actionEvent}
                eventType={actionEvent}
                reqProgresMap={reqProgresMap}
                currEventTrigger={'onRequestSchedule'}
                currWAction={eA}
              />
            );
          })
          .flat()}
      </ShowCode.When>
      <ShowCode.When
        isTrue={
          !isSelectScheduleFlowComplete &&
          (Boolean(!reqTriggerActionsMap['selfScheduleReminder']) ||
            Boolean(
              reqTriggerActionsMap['selfScheduleReminder'] &&
                reqTriggerActionsMap['selfScheduleReminder'].length === 0,
            ))
        }
      >
        <div>
          <Alert
            variant='default'
            className='mb-4 border-purple-200 bg-purple-100'
          >
            <Lightbulb className='h-4 w-4 text-purple-500' />
            <AlertDescription className='flex flex-col items-start'>
              <p className='mb-4 w-full'>
                Add Riminders to candidate for follow up.
              </p>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setTriggerDetails({
                    trigger: 'selfScheduleReminder',
                    interval: 24 * 60,
                  });
                  setShowEditDialog(true);
                }}
              >
                <Bell className='mr-2 h-4 w-4' />
                Schedule Reminder
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </ShowCode.When>
      <ShowCode.When
        isTrue={Boolean(
          reqTriggerActionsMap['selfScheduleReminder'] &&
            reqTriggerActionsMap['selfScheduleReminder'].length > 0,
        )}
      >
        {reqTriggerActionsMap['selfScheduleReminder'] &&
          reqTriggerActionsMap['selfScheduleReminder'].length > 0 && (
            <EventNode
              eventType={
                apiTargetToEvents['selfScheduleReminder_email_applicant']
              }
              reqProgresMap={reqProgresMap}
              currEventTrigger={'selfScheduleReminder'}
              currWAction={reqTriggerActionsMap.selfScheduleReminder[0]}
            />
          )}
      </ShowCode.When>
    </>
  );
};

export default SelfScheduleFlowMenus;
