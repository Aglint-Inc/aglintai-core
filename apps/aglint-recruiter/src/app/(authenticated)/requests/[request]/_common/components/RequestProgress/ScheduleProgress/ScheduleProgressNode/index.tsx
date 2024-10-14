import React from 'react';

import { useTenant } from '@/company/hooks';

import { RequestProgressTracker } from '../../RequestProgressTracker';
import { type ProgressNodeParams } from '../../types';
import { bannerMap } from '../../utils/bannerMap';
import { progressNodeCopy } from '../../utils/progressNodeCopy';
import ActionNode from './ActionNode';
import EventNode from './EventNode';

const ScheduleProgressNode = ({
  banners,
  status,
  type,
  workflows,
  grouped_progress,
}: ProgressNodeParams) => {
  const { recruiter } = useTenant();
  const isWorkflowEnabled = recruiter.recruiter_preferences.workflow;
  const isSlackEnabled = recruiter.recruiter_preferences.slack;
  return (
    <div>
      <RequestProgressTracker
        circleIndicator={status === 'completed' ? 'success' : 'neutral'}
        textRequestProgress={progressNodeCopy[type]}
        slotProgress={
          <>
            {grouped_progress.map((group) => {
              return (
                <EventNode {...{ groupProgress: group }} key={group.group_id} />
              );
            })}
            {isWorkflowEnabled &&
              workflows.map((workflow) => {
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

            {isWorkflowEnabled &&
              banners
                .filter(
                  (banner) => isSlackEnabled || banner !== 'SLACK_CONFIRMATION',
                )
                .map((bannerKey) => {
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
        isLastNode={type === 'INTERVIEW_SCHEDULED'}
      />
    </div>
  );
};

export default ScheduleProgressNode;
