/* eslint-disable security/detect-object-injection */
import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useMemo } from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import ScheduleFlows from '../Actions/Schedule';
import { EventTargetMapType, RequestProgressMapType } from '../types';
import { getSchedulFlow } from '../utils/getScheduleFlow';
import { apiTargetToEvents } from '../utils/progressMaps';
import EventNode from './EventNode';

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

  let scheduleFlow = getSchedulFlow({
    eventTargetMap,
    requestTargetMp: scheduleReqProgressMap,
  });

  return (
    <Stack>
      <TextWithIcon
        iconName='expand_circle_right'
        textContent={`Candidate Schedule`}
        iconSize={4}
        fontSize={1}
        // color={getProgressColor(tense)}
      />
      <Stack ml={4} mt={1} rowGap={1.5}>
        <ShowCode.When
          isTrue={isManualSchedule && request_progress.data.length === 0}
        >
          <ScheduleFlows />
        </ShowCode.When>

        <ShowCode.When isTrue={scheduleFlow === 'selfSchedule'}>
          <SelfScheduleFlowMenus
            isManualSchedule={isManualSchedule}
            eventTargetMap={eventTargetMap}
            scheduleReqProgressMap={scheduleReqProgressMap}
          />
        </ShowCode.When>
        <ShowCode.When isTrue={scheduleFlow === 'availability'}>
          <AvailabilityFlowMenus
            isManualSchedule={isManualSchedule}
            eventTargetMap={eventTargetMap}
            scheduleReqProgressMap={scheduleReqProgressMap}
          />
        </ShowCode.When>
      </Stack>
    </Stack>
  );
};

export default SelectScheduleFlow;

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

const SelfScheduleFlowMenus = ({
  isManualSchedule,
  scheduleReqProgressMap,
  eventTargetMap,
}: {
  eventTargetMap: EventTargetMapType;
  isManualSchedule: boolean;
  scheduleReqProgressMap: RequestProgressMapType;
}) => {
  const { request_progress } = useRequest();

  let scheduleFlowProg = useMemo(() => {
    let progres: DatabaseTable['request_progress'][] = [];
    if (request_progress.data.length === 0) {
      return progres;
    }
    request_progress.data.forEach((prog) => {
      if (prog.event_type !== 'CAND_CONFIRM_SLOT') {
        progres.push({
          ...prog,
        });
      }
    });
    return progres;
  }, [request_progress.data]);
  //
  let eventWActions: DatabaseEnums['email_slack_types'][] = [];
  if (eventTargetMap['onRequestSchedule']) {
    eventWActions = [
      ...eventTargetMap['onRequestSchedule'],
      ...(eventTargetMap['selfScheduleReminder'] ?? []),
    ];
  }

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
              <>
                <EventNode
                  key={prog.id}
                  eventNode={prog.event_type}
                  reqProgressMap={scheduleReqProgressMap}
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
                eventNode={ev}
                reqProgressMap={scheduleReqProgressMap}
              />
            );
          })}
        {scheduleReqProgressMap['SELF_SCHEDULE_FIRST_FOLLOWUP'] && (
          <EventNode
            eventNode='SELF_SCHEDULE_FIRST_FOLLOWUP'
            reqProgressMap={scheduleReqProgressMap}
          />
        )}
      </ShowCode.When>
    </>
  );
};
