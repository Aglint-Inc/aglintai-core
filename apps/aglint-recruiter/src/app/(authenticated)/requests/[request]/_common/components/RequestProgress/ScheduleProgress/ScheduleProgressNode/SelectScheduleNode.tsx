import React from 'react';
import { ProgressNodeParams } from '../../types';
import { ShowCode } from '@/common/ShowCode';
import { RequestProgressTracker } from '../../RequestProgressTracker';
import AvailabilityFlowMenus from '../AvailabilityFlowMenus';
import ChooseScheduleMode from '../ChooseScheduleMode';
import SelfScheduleFlowMenus from '../SelfScheduleFlowMenus';
import EventNode from '../EventNode';

const SelectScheduleNode = ({
  banners,
  progress,
  status,
  type,
  workflows,
}: ProgressNodeParams) => {
  return (
    <div>
      <RequestProgressTracker
        circleIndicator={status === 'completed' ? 'success' : 'neutral'}
        textRequestProgress={'When scheduling request received'}
        slotProgress={
          <>
            {progress.map((singleProgress) => {
              return (
                <EventNode
                  eventType={singleProgress.event_type}
                  reqProgresMap={{}}
                />
              );
            })}
            {/* banner */}
            {/* <ShowCode.When isTrue={scheduleFlow === null}>
              <ChooseScheduleMode />
            </ShowCode.When> */}
            {/* <ShowCode.When isTrue={scheduleFlow === 'selfSchedule'}> */}
            {/* <SelfScheduleFlowMenus
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
            </ShowCode.When> */}
          </>
        }
      />
    </div>
  );
};

export default SelectScheduleNode;
