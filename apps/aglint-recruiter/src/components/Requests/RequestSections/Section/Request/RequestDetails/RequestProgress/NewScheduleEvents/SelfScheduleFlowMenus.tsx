import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import React, { useMemo } from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import { apiTargetToEvents } from '../utils/progressMaps';
import { useNewScheduleRequestPr } from '.';
import EventNode from './EventNode';
import { RequestProgressMapType } from '../types';

const SelfScheduleFlowMenus = ({
  isManualSchedule,
}: {
  isManualSchedule: boolean;
}) => {
  const { reqTriggerActionsMap } = useNewScheduleRequestPr();
  const { request_progress } = useRequest();

  let { progres: scheduleFlowProg, currEventMap } = useMemo(() => {
    let currEventMap: RequestProgressMapType = {};
    let progres: DatabaseTable['request_progress'][] = [];

    if (request_progress.data.length === 0) {
      return {
        progres,
        currEventMap,
      };
    }

    for (let prog of request_progress.data) {
      if (prog.event_type === 'CAND_CONFIRM_SLOT') {
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
  //
  let eventWActions: DatabaseEnums['email_slack_types'][] = [];
  if (reqTriggerActionsMap['onRequestSchedule']) {
    eventWActions = [
      ...reqTriggerActionsMap['onRequestSchedule'].map((e) => e.target_api),
      ...(reqTriggerActionsMap['selfScheduleReminder']?.map(
        (e) => e.target_api,
      ) ?? []),
    ];
  }

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
                  eventType={prog.event_type}
                  currEventMap={currEventMap}
                  currEventTrigger={'onRequestSchedule'}
                />
              </>
            );
          })}
      </ShowCode.When>
      <ShowCode.When isTrue={!isManualSchedule}>
        {eventWActions
          .map((eA) => {
            return apiTargetToEvents[eA];
          })
          .flat()
          .map((ev) => {
            return (
              <EventNode
                key={ev}
                eventType={ev}
                currEventMap={currEventMap}
                currEventTrigger={'onRequestSchedule'}
              />
            );
          })}
        {/* {scheduleReqProgressMap['SELF_SCHEDULE_FIRST_FOLLOWUP'] && (
          <EventNode
            eventNode='SELF_SCHEDULE_FIRST_FOLLOWUP'
            reqProgressMap={scheduleReqProgressMap}
          />
        )} */}
      </ShowCode.When>
    </>
  );
};

export default SelfScheduleFlowMenus;
