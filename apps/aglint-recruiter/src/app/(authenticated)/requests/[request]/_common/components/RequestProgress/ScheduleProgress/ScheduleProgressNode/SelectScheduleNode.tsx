import React from 'react';

import { RequestProgressTracker } from '../../RequestProgressTracker';
import { type ProgressNodeParams } from '../../types';
import { bannerMap } from '../../utils/bannerMap';
import ActionNode from './ActionNode';
import EventNode from './EventNode';

const SelectScheduleNode = ({
  banners,
  status,
  type,
  workflows,
  grouped_progress,
}: ProgressNodeParams) => {
  return (
    <div>
      <RequestProgressTracker
        circleIndicator={status === 'completed' ? 'success' : 'neutral'}
        textRequestProgress={'When scheduling request received'}
        slotProgress={
          <>
            {grouped_progress.map((group) => {
              return (
                <EventNode {...{ groupProgress: group }} key={group.group_id} />
              );
            })}
            {workflows.map((workflow) => {
              return workflow.actions.map((action) => {
                return (
                  <ActionNode
                    key={action.id}
                    eventTrigger={workflow.trigger_details.trigger}
                    triggerAction={action}
                  />
                );
              });
            })}

            {banners.map((bannerKey) => {
              const Banner = bannerMap[bannerKey];
              return (
                <div key={bannerKey}>
                  <Banner />
                </div>
              );
            })}
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
