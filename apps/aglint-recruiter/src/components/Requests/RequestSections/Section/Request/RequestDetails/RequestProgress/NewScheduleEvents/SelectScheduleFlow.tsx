/* eslint-disable security/detect-object-injection */

import { RequestProgress } from '@/devlink2/RequestProgress';
import { ShowCode } from '@/src/components/Common/ShowCode';

import { useNewScheduleRequestPr } from '.';
import AvailabilityFlowMenus from './AvailabilityFlowMenus';
import ChooseScheduleMode from './ChooseScheduleMode';
import SelfScheduleFlowMenus from './SelfScheduleFlowMenus';

const SelectScheduleFlow = () => {
  const { reqTriggerActionsMap, scheduleFlow, reqProgressMap } =
    useNewScheduleRequestPr();

  const isManualSchedule = !reqTriggerActionsMap['onRequestSchedule'];
  let isSelectScheduleFlowComplete = false;
  if (reqProgressMap['CAND_CONFIRM_SLOT'] || reqProgressMap['CAND_AVAIL_REC']) {
    isSelectScheduleFlowComplete = true;
  }
  return (
    <>
      <RequestProgress
        circleIndicator={isSelectScheduleFlowComplete ? 'success' : 'neutral'}
        textRequestProgress={'Scheduling Request Recieved'}
        slotProgress={
          <>
            <ShowCode.When isTrue={scheduleFlow === null}>
              <ChooseScheduleMode />
            </ShowCode.When>
            <ShowCode.When isTrue={scheduleFlow === 'selfSchedule'}>
              <SelfScheduleFlowMenus isManualSchedule={isManualSchedule} />
            </ShowCode.When>
            <ShowCode.When isTrue={scheduleFlow === 'availability'}>
              <AvailabilityFlowMenus isManualSchedule={isManualSchedule} />
            </ShowCode.When>
          </>
        }
      />
    </>
  );
};

export default SelectScheduleFlow;
