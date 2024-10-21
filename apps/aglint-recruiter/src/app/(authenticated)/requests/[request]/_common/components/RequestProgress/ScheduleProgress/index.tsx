/* eslint-disable no-unused-vars */
import { useRequest } from '@request/hooks';
import React from 'react';

import ProgressNode from '../ProgressNode';

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
            <ProgressNode
              {...{
                ...node,
                isLastNode: node.type === 'INTERVIEW_SCHEDULED',
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default ScheduleProgress;
