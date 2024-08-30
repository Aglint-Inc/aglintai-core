/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import { useMemo } from 'react';

import { RequestProgress } from '@/devlink2/RequestProgress';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import ScheduleFlows from '../Actions/Schedule';
import { RequestProgressMapType } from '../types';
import { useNewScheduleRequestPr } from '.';
import AvailabilityFlowMenus from './AvailabilityFlowMenus';
import SelfScheduleFlowMenus from './SelfScheduleFlowMenus';

const SelectScheduleFlow = () => {
  const { request_progress } = useRequest();
  const { reqTriggerActionsMap, scheduleFlow } = useNewScheduleRequestPr();
  const eventWActions = reqTriggerActionsMap['onRequestSchedule'] ?? [];
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

  let isSelectScheduleFlowComplete = false;
  if (
    scheduleReqProgressMap['CAND_AVAIL_REC'] ||
    scheduleReqProgressMap['CAND_CONFIRM_SLOT']
  ) {
    isSelectScheduleFlowComplete = true;
  }
  return (
    <Stack>
      <RequestProgress
        circleIndicator={isSelectScheduleFlowComplete ? 'success' : 'neutral'}
        slotProgress={
          <>
            <ShowCode.When isTrue={scheduleFlow === null}>
              <ScheduleFlows />
            </ShowCode.When>

            <ShowCode.When isTrue={scheduleFlow === 'selfSchedule'}>
              <SelfScheduleFlowMenus isManualSchedule={isManualSchedule} />
            </ShowCode.When>
            <ShowCode.When isTrue={scheduleFlow === 'availability'}>
              <AvailabilityFlowMenus
                isManualSchedule={isManualSchedule}
                eventTargetMap={{}}
                scheduleReqProgressMap={scheduleReqProgressMap}
              />
            </ShowCode.When>
          </>
        }
        textRequestProgress={'Scheduling Request Recieved'}
      />
    </Stack>
  );
};

export default SelectScheduleFlow;
