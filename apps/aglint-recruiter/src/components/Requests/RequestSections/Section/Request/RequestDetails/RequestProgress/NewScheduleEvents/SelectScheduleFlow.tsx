/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
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
  let isAvailabilityRecieved = false;
  let lastEvent: DatabaseTable['request_progress'];

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

  let scheduleFlow: ScheduleFlow = getSchedulFlow({
    eventTargetMap,
    request_progress: request_progress.data,
  });
  if (scheduleFlowProg.length > 0) {
    lastEvent = scheduleFlowProg[scheduleFlowProg.length - 1];
  }
  if (request_progress.data.find((p) => p.event_type === 'CAND_AVAIL_REC')) {
    isAvailabilityRecieved = true;
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
        <ShowCode.When isTrue={isManualSchedule}>
          {scheduleFlowProg.map((prog) => {
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
              scheduleReqProgressMap[
                'SCHEDULED_FIRST_FOLLOWUP_AVAILABILITY_LINK'
              ],
            )}
          >
            <EventNode
              eventNode='SCHEDULED_FIRST_FOLLOWUP_AVAILABILITY_LINK'
              reqProgressMap={scheduleReqProgressMap}
            />
          </ShowCode.When>
        </ShowCode.When>
        <ShowCode.When
          isTrue={
            Boolean(
              !isAvailabilityRecieved &&
                lastEvent &&
                lastEvent.event_type === 'REQ_CAND_AVAIL_EMAIL_LINK' &&
                !scheduleReqProgressMap[
                  'SCHEDULED_FIRST_FOLLOWUP_AVAILABILITY_LINK'
                ],
            ) && !eventTargetMap['sendAvailReqReminder']
          }
        >
          <Button>Resend Link</Button>
        </ShowCode.When>
        <ShowCode.When isTrue={!isAvailabilityRecieved}>
          <Button>Re Request Availability</Button>
        </ShowCode.When>
      </Stack>
    </Stack>
  );
};

export default SelectScheduleFlow;

const getSchedulFlow = ({
  eventTargetMap,
  request_progress,
}: {
  eventTargetMap: EventTargetMapType;
  request_progress: DatabaseTable['request_progress'][];
}) => {
  let scheduleFlow: ScheduleFlow;

  let progrEndIdx = request_progress.findIndex(
    (prog) => prog.event_type === 'CAND_AVAIL_REC',
  );

  if (progrEndIdx !== -1) {
    if (
      request_progress[progrEndIdx].event_type === 'REQ_CAND_AVAIL_EMAIL_LINK'
    ) {
      scheduleFlow = 'availability';
    } else if (
      request_progress[progrEndIdx].event_type === 'SELF_SCHEDULE_LINK'
    ) {
      scheduleFlow = 'selfSchedule';
    }
  }
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
  return scheduleFlow;
};
