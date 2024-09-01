import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import React, { useMemo } from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import { RequestProgressMapType } from '../types';
import { apiTargetToEvents } from '../utils/progressMaps';
import EventNode from './EventNode';
import { useNewScheduleRequestPr } from '.';
import { ButtonSoft } from '@/devlink';
import { Stack } from '@mui/material';

const AvailabilityFlowMenus = ({
  isManualSchedule,
}: {
  isManualSchedule: boolean;
}) => {
  const { reqTriggerActionsMap, setEditTrigger, setShowEditDialog } =
    useNewScheduleRequestPr();
  const { request_progress } = useRequest();

  let { progres: availFlowProg, currEventMap } = useMemo(() => {
    let currEventMap: RequestProgressMapType = {};
    let progres: DatabaseTable['request_progress'][] = [];

    if (request_progress.data.length === 0) {
      return {
        progres,
        currEventMap,
      };
    }

    for (let prog of request_progress.data) {
      if (prog.event_type === 'CAND_AVAIL_REC') {
        break;
      }
      if (!currEventMap[prog.event_type]) {
        currEventMap[prog.event_type] = [];
      }
      currEventMap[prog.event_type].push(prog);
      progres.push({
        ...prog,
      });
    }
    return { progres, currEventMap };
  }, [request_progress.data]);

  let eventWActions: DatabaseTable['workflow_action'][] = [];
  if (reqTriggerActionsMap['onRequestSchedule']) {
    eventWActions = [...reqTriggerActionsMap['onRequestSchedule']];
  }

  return (
    <>
      <ShowCode.When isTrue={isManualSchedule}>
        <>
          {availFlowProg
            .filter((s) => s.is_progress_step === false)
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
        {eventWActions.map((eA) => {
          return apiTargetToEvents[eA.target_api].map((ev) => {
            return (
              <EventNode
                key={ev}
                eventType={ev}
                reqProgresMap={currEventMap}
                currEventTrigger={'onRequestSchedule'}
                currWAction={eA}
              />
            );
          });
        })}
      </ShowCode.When>
      <ShowCode.When
        isTrue={
          Boolean(!reqTriggerActionsMap['sendAvailReqReminder']) ||
          Boolean(
            reqTriggerActionsMap['sendAvailReqReminder'] &&
              reqTriggerActionsMap['sendAvailReqReminder'].length === 0,
          )
        }
      >
        <Stack direction={'row'}>
          <ButtonSoft
            size={1}
            textButton={'Schedule Reminder'}
            onClickButton={{
              onClick: () => {
                setEditTrigger('sendAvailReqReminder');
                setShowEditDialog(true);
              },
            }}
          />
        </Stack>
      </ShowCode.When>
      <ShowCode.When
        isTrue={Boolean(
          reqTriggerActionsMap['sendAvailReqReminder'] &&
            reqTriggerActionsMap['sendAvailReqReminder'].length > 0,
        )}
      >
        {reqTriggerActionsMap['sendAvailReqReminder'].length > 0 &&
          apiTargetToEvents['sendAvailReqReminder_email_applicant'].map(
            (ev) => {
              const action = reqTriggerActionsMap.sendAvailReqReminder[0];
              return (
                <EventNode
                  key={ev}
                  eventType={ev}
                  reqProgresMap={currEventMap}
                  currEventTrigger={'sendAvailReqReminder'}
                  currWAction={action}
                />
              );
            },
          )}
      </ShowCode.When>
    </>
  );
};

export default AvailabilityFlowMenus;
