import dayjs from 'dayjs';
import React from 'react';

import { Timeline, TimelineBlock, TimelineEmpty } from '@/devlink3';

import IconActivity from '../IconActivity';
import { useSchedulingAgentStore } from '../store';

function Activity() {
  const { activities, activityLoading } = useSchedulingAgentStore();
  return (
    <>
      {activities.length == 0 && !activityLoading && <TimelineEmpty />}
      <TimelineBlock
        slotTimeline={
          activities.length > 0 &&
          !activityLoading &&
          activities.map((activity, index) => {
            return (
              <Timeline
                key={activity.id}
                textTitle={activity.title}
                isConnecterVisible={activities.length !== index + 1}
                textTime={dayjs(activity.created_at).fromNow()}
                slotStatusIcon={
                  <IconActivity
                    his={{ status: activity.icon_status, user_id: '' } as any}
                  />
                }
              />
            );
          })
        }
      />
    </>
  );
}

export default Activity;
