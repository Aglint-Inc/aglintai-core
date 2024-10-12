/* eslint-disable no-unused-vars */
import { useRequest } from '@request/hooks';
import React from 'react';

import ScheduleProgressNode from './ScheduleProgressNode';

const ScheduleProgress = () => {
  const { progressMetaInfo } = useRequest();
  if (!progressMetaInfo) {
    return <></>;
  }
  return (
    <>
      {progressMetaInfo.scheduleProgressNodes.map((node) => {
        return (
          <div key={node.type}>
            <ScheduleProgressNode {...node} />
          </div>
        );
      })}
    </>
  );
};

export default ScheduleProgress;
