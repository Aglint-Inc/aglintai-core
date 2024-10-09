/* eslint-disable security/detect-object-injection */

import { ShowCode } from '@/components/Common/ShowCode';

import { useRequestProgressProvider } from '../progressCtx';
import { RequestProgressTracker } from '../RequestProgressTracker';
import AvailabilityFlowMenus from './AvailabilityFlowMenus';
import ChooseScheduleMode from './ChooseScheduleMode';
import SelfScheduleFlowMenus from './SelfScheduleFlowMenus';

const SelectScheduleFlow = ({ scheduleFlow }: { scheduleFlow: any }) => {
  const { reqTriggerActionsMap, reqProgressMap } = useRequestProgressProvider();

  let isManualSchedule = true;
  if (
    reqTriggerActionsMap['onRequestSchedule'] &&
    reqTriggerActionsMap['onRequestSchedule'].length > 0
  ) {
    isManualSchedule = false;
  }
  let isSelectScheduleFlowComplete = false;
  if (reqProgressMap['CAND_CONFIRM_SLOT'] || reqProgressMap['CAND_AVAIL_REC']) {
    isSelectScheduleFlowComplete = true;
  }

  return (
    <>
      <RequestProgressTracker
        circleIndicator={isSelectScheduleFlowComplete ? 'success' : 'neutral'}
        textRequestProgress={'When scheduling request recieved'}
        slotProgress={
          <>
            <ShowCode.When isTrue={scheduleFlow === null}>
              <ChooseScheduleMode />
            </ShowCode.When>
            <ShowCode.When isTrue={scheduleFlow === 'selfSchedule'}>
              <SelfScheduleFlowMenus
                isManualSchedule={isManualSchedule}
                isSelectScheduleFlowComplete={isSelectScheduleFlowComplete}
              />
            </ShowCode.When>
            <ShowCode.When isTrue={scheduleFlow === 'availability'}>
              <div>
                <AvailabilityFlowMenus
                  isManualSchedule={isManualSchedule}
                  isSelectScheduleFlowComplete={isSelectScheduleFlowComplete}
                />
              </div>
            </ShowCode.When>
          </>
        }
      />
    </>
  );
};

export default SelectScheduleFlow;
