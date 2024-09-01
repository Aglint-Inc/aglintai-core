/* eslint-disable security/detect-object-injection */
import { useMemo } from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import ScheduleFlows from '../Actions/Schedule';
import { RequestProgressMapType } from '../types';
import { useNewScheduleRequestPr } from '.';
import AvailabilityFlowMenus from './AvailabilityFlowMenus';
import SelfScheduleFlowMenus from './SelfScheduleFlowMenus';
import { RequestProgress } from '@/devlink2';

const SelectScheduleFlow = () => {
  const { request_progress } = useRequest();
  const { reqTriggerActionsMap, scheduleFlow } = useNewScheduleRequestPr();

  const isManualSchedule = !reqTriggerActionsMap['onRequestSchedule'];

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

  return (
    <>
      <RequestProgress
        // circleIndicator={isSelectScheduleFlowComplete ? 'success' : 'neutral'}
        circleIndicator={'neutral'}
        textRequestProgress={'Scheduling Request Recieved'}
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
                scheduleReqProgressMap={scheduleReqProgressMap}
              />
            </ShowCode.When>
          </>
        }
      />
    </>
  );
};

export default SelectScheduleFlow;
