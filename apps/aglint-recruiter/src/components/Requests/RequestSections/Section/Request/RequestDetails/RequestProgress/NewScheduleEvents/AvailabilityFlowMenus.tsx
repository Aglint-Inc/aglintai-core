import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import React, { useMemo } from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import { RequestProgressMapType } from '../types';
import { apiTargetToEvents } from '../utils/progressMaps';
import EventNode from './EventNode';
import { useNewScheduleRequestPr } from '.';

const AvailabilityFlowMenus = ({
  isManualSchedule,
  scheduleReqProgressMap,
}: {
  isManualSchedule: boolean;
  scheduleReqProgressMap: RequestProgressMapType;
}) => {
  const { reqTriggerActionsMap } = useNewScheduleRequestPr();
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

  //
  let eventWActions: DatabaseEnums['email_slack_types'][] = [];
  if (reqTriggerActionsMap['onRequestSchedule']) {
    eventWActions = [
      ...reqTriggerActionsMap['onRequestSchedule'].map((e) => e.target_api),
    ];
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
                    currEventMap={currEventMap}
                    currEventTrigger={'onRequestSchedule'}
                  />
                </>
              );
            })}
        </>
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
      </ShowCode.When>
    </>
  );
};

export default AvailabilityFlowMenus;
