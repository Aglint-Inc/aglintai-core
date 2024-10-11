/* eslint-disable no-unused-vars */
import { useRequest } from '@request/hooks';
import React from 'react';

import ScheduleProgressNode from './ScheduleProgressNode';

const ScheduleProgress = () => {
  const { progressMetaInfo } = useRequest();
  return (
    <>
      {progressMetaInfo.scheduleProgressNodes.map((node) => {
        return (
          <div key={node.type}>
            <ScheduleProgressNode {...node} />
          </div>
        );
      })}
      {/* <ShowCode.When isTrue={!isDebreifSchedule}>
        <SelectScheduleFlow scheduleFlow={scheduleFlow} />
        <ShowCode.When isTrue={scheduleFlow === 'availability'}>
          <>
            <CandidateAvailReceived />
          </>
        </ShowCode.When>
      </ShowCode.When>
      <InterviewScheduled /> */}
    </>
  );
};

export default ScheduleProgress;
