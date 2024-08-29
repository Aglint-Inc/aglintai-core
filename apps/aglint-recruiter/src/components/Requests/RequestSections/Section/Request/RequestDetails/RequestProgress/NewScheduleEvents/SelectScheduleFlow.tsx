/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import { useMemo } from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import ScheduleFlows from '../Actions/Schedule';
import { EventTargetMapType, RequestProgressMapType } from '../types';
import { getSchedulFlow } from '../utils/getScheduleFlow';
import AvailabilityFlowMenus from './AvailabilityFlowMenus';
import SelfScheduleFlowMenus from './SelfScheduleFlowMenus';

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

  let isSelectScheduleFlowComplete = false;
  if (
    scheduleReqProgressMap['CAND_AVAIL_REC'] ||
    scheduleReqProgressMap['CAND_CONFIRM_SLOT']
  ) {
    isSelectScheduleFlowComplete = true;
  }
  return (
    <Stack>
      <TextWithIcon
        iconName='expand_circle_right'
        textContent={`Candidate Schedule`}
        iconSize={4}
        fontSize={1}
        color={isSelectScheduleFlowComplete ? 'success' : 'neutral'}
      />
      <Stack ml={4} mt={1} rowGap={1.5}>
        <ShowCode.When isTrue={scheduleFlow === null}>
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
