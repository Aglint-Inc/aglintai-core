import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import React, { useMemo } from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import { EventTargetMapType, RequestProgressMapType } from '../types';
import { apiTargetToEvents } from '../utils/progressMaps';
import EventNode from './EventNode';

const AvailabilityFlowMenus = ({
  isManualSchedule,
  scheduleReqProgressMap,
  eventTargetMap,
}: {
  eventTargetMap: EventTargetMapType;
  isManualSchedule: boolean;
  scheduleReqProgressMap: RequestProgressMapType;
}) => {
  const { request_progress } = useRequest();
  let eventWActions: DatabaseEnums['email_slack_types'][] = [];
  if (eventTargetMap['onRequestSchedule']) {
    eventWActions = [
      ...eventTargetMap['onRequestSchedule'],
      ...eventTargetMap['sendAvailReqReminder'],
    ];
  }
  let scheduleFlowProg = useMemo(() => {
    let progres: DatabaseTable['request_progress'][] = [];
    if (request_progress.data.length === 0) {
      return progres;
    }
    request_progress.data.forEach((prog) => {
      if (prog.event_type !== 'CAND_AVAIL_REC') {
        progres.push({
          ...prog,
        });
      }
    });
    return progres;
  }, [request_progress.data]);

  return (
    <>
      <ShowCode.When isTrue={isManualSchedule}>
        {scheduleFlowProg
          .filter((s) => s.is_progress_step === false)
          .sort(
            (p1, p2) =>
              dayjsLocal(p1.created_at).unix() -
              dayjsLocal(p2.created_at).unix(),
          )
          .map((prog) => {
            return (
              <EventNode
                key={prog.id}
                eventNode={prog.event_type}
                reqProgressMap={scheduleReqProgressMap}
              />
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
                eventNode={ev}
                reqProgressMap={scheduleReqProgressMap}
              />
            );
          })}
        <ShowCode.When
          isTrue={Boolean(
            scheduleReqProgressMap['SCHEDULE_FIRST_FOLLOWUP_AVAILABILITY_LINK'],
          )}
        >
          <EventNode
            eventNode='SCHEDULE_FIRST_FOLLOWUP_AVAILABILITY_LINK'
            reqProgressMap={scheduleReqProgressMap}
          />
        </ShowCode.When>
        <ShowCode.When
          isTrue={Boolean(
            scheduleReqProgressMap['SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE'],
          )}
        >
          <EventNode
            eventNode='SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE'
            reqProgressMap={scheduleReqProgressMap}
          />
        </ShowCode.When>
      </ShowCode.When>
    </>
  );
};

export default AvailabilityFlowMenus;
