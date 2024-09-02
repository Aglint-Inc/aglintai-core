import { type DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React, { useMemo } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import { type RequestProgressMapType } from '../types';
import { apiTargetToEvents } from '../utils/progressMaps';
import { useNewScheduleRequestPr } from '.';
import EventNode from './EventNode';

const SelfScheduleFlowMenus = ({
  isManualSchedule,
  isSelectScheduleFlowComplete,
}: {
  isManualSchedule: boolean;
  isSelectScheduleFlowComplete: boolean;
}) => {
  const { reqTriggerActionsMap, setEditTrigger, setShowEditDialog } =
    useNewScheduleRequestPr();
  const { request_progress } = useRequest();

  let { progres: scheduleFlowProg, reqProgresMap } = useMemo(() => {
    let reqProgresMap: RequestProgressMapType = {};
    let progres: DatabaseTable['request_progress'][] = [];

    if (request_progress.data.length === 0) {
      return {
        progres,
        reqProgresMap,
      };
    }

    for (let prog of request_progress.data) {
      if (prog.event_type === 'CAND_CONFIRM_SLOT') {
        break;
      }
      if (!reqProgresMap[prog.event_type]) {
        reqProgresMap[prog.event_type] = [];
      }
      reqProgresMap[prog.event_type].push(prog);
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
          .filter((s) => s.is_progress_step === false)
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
            return apiTargetToEvents[eA.target_api].map((ev) => {
              return (
                <EventNode
                  key={ev}
                  eventType={ev}
                  reqProgresMap={reqProgresMap}
                  currEventTrigger={'onRequestSchedule'}
                  currWAction={eA}
                />
              );
            });
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
        <Stack direction={'row'}>
          <ButtonSoft
            size={1}
            textButton={'Schedule Reminder'}
            onClickButton={{
              onClick: () => {
                setEditTrigger('selfScheduleReminder');
                setShowEditDialog(true);
              },
            }}
          />
        </Stack>
      </ShowCode.When>
      <ShowCode.When
        isTrue={Boolean(
          reqTriggerActionsMap['selfScheduleReminder'] &&
            reqTriggerActionsMap['selfScheduleReminder'].length > 0,
        )}
      >
        {reqTriggerActionsMap['selfScheduleReminder'] &&
          reqTriggerActionsMap['selfScheduleReminder'].length > 0 &&
          apiTargetToEvents['selfScheduleReminder_email_applicant'].map(
            (ev) => {
              const action = reqTriggerActionsMap.selfScheduleReminder[0];
              return (
                <EventNode
                  key={ev}
                  eventType={ev}
                  reqProgresMap={reqProgresMap}
                  currEventTrigger={'selfScheduleReminder'}
                  currWAction={action}
                />
              );
            },
          )}
      </ShowCode.When>
    </>
  );
};

export default SelfScheduleFlowMenus;
