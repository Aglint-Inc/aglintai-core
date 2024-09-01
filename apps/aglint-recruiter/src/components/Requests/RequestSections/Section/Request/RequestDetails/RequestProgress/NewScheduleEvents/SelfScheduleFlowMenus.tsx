import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import React, { useMemo } from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import { apiTargetToEvents } from '../utils/progressMaps';
import { useNewScheduleRequestPr } from '.';
import { RequestProgressMapType } from '../types';
import EventNode from './EventNode';

const SelfScheduleFlowMenus = ({
  isManualSchedule,
}: {
  isManualSchedule: boolean;
}) => {
  const { reqTriggerActionsMap } = useNewScheduleRequestPr();
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
  let eventWActions: DatabaseEnums['email_slack_types'][] = [];

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
    </>
  );
};

export default SelfScheduleFlowMenus;
