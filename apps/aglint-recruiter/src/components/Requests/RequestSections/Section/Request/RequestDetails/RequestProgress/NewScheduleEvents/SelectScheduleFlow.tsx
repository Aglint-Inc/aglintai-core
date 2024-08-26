/* eslint-disable security/detect-object-injection */
import { Button, Stack } from '@mui/material';
import React, { useMemo } from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import ScheduleFlows from '../Actions/Schedule';
import { EventTargetMapType, RequestProgressMapType } from '../types';
import { apiTargetToEvents } from '../utils/progressMaps';
import EventNode from './EventNode';

type ScheduleFlow = 'availability' | 'selfSchedule';
const SelectScheduleFlow = ({
  eventTargetMap,
}: {
  eventTargetMap: EventTargetMapType;
}) => {
  const { request_progress } = useRequest();
  const eventWActions = eventTargetMap['onRequestSchedule'] ?? [];
  const isManualSchedule = eventWActions.length === 0;

  const scheduleReqProgressMap: RequestProgressMapType = useMemo(() => {
    let mp: RequestProgressMapType = {};

    request_progress.data.forEach((row) => {
      if (!mp[row.event_type]) {
        mp[row.event_type] = [];
      }
      mp[row.event_type].push({ ...row });
    });
    return mp;
  }, [request_progress]);
  let scheduleFlow: ScheduleFlow;
  let progrEndIdx = request_progress.data.findIndex(
    (prog) =>
      prog.event_type === 'SELF_SCHEDULE_LINK' ||
      prog.event_type === 'REQ_CAND_AVAIL_EMAIL_LINK',
  );

  if (progrEndIdx !== -1) {
    if (
      request_progress.data[progrEndIdx].event_type ===
      'REQ_CAND_AVAIL_EMAIL_LINK'
    ) {
      scheduleFlow = 'availability';
    } else if (
      request_progress.data[progrEndIdx].event_type === 'SELF_SCHEDULE_LINK'
    ) {
      scheduleFlow = 'selfSchedule';
    }
  }

  let scheduleFlowProg = request_progress.data.slice(0, progrEndIdx);

  if (
    eventTargetMap['onRequestSchedule'] &&
    eventTargetMap['onRequestSchedule'].length > 0
  ) {
    if (
      eventTargetMap['onRequestSchedule'][0] ===
      'onRequestSchedule_emailLink_getCandidateAvailability'
    ) {
      scheduleFlow = 'availability';
    } else {
      scheduleFlow = 'selfSchedule';
    }
  }

  return (
    <Stack>
      <TextWithIcon
        textContent={<>EVENT : Candidate Schedule</>}
        iconSize={3}
        fontSize={1}
        // color={getProgressColor(tense)}
      />
      <Stack ml={4} mt={1} rowGap={1.5}>
        <ShowCode.When
          isTrue={isManualSchedule && scheduleFlowProg.length === 0}
        >
          <ScheduleFlows />
        </ShowCode.When>

        <ShowCode.When isTrue={scheduleFlow === 'selfSchedule'}>
          {/* <AvailabilityFlow
            eventTargetMap={eventTargetMap}
            reqProgressMap={reqProgressMap}
          /> */}
          <></>
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
            isTrue={Boolean(scheduleReqProgressMap['REQ_AVAIL_FIRST_FOLLOWUP'])}
          >
            <EventNode
              eventNode='REQ_AVAIL_FIRST_FOLLOWUP'
              reqProgressMap={scheduleReqProgressMap}
            />
          </ShowCode.When>
        </ShowCode.When>
        <ShowCode.When
          isTrue={
            Boolean(!scheduleReqProgressMap['REQ_AVAIL_FIRST_FOLLOWUP']) &&
            !eventTargetMap['sendAvailReqReminder']
          }
        >
          <Button>manual reminder</Button>
        </ShowCode.When>

        <ShowCode.When
          isTrue={Boolean(scheduleReqProgressMap['REQ_AVAIL_FIRST_FOLLOWUP'])}
        >
          {scheduleFlowProg.map((prog) => {
            return (
              <>
                <EventNode
                  eventNode={prog.event_type}
                  reqProgressMap={scheduleReqProgressMap}
                  key={prog.id}
                />
              </>
            );
          })}
        </ShowCode.When>
      </Stack>
    </Stack>
  );
};

export default SelectScheduleFlow;
