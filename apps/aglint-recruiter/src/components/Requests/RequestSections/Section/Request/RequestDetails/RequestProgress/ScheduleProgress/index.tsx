/* eslint-disable no-unused-vars */
import React from 'react';

import { ShowCode } from '@/components/Common/ShowCode';

import { useRequestProgressProvider } from '../progressCtx';
import { getSchedulFlow } from '../utils/getScheduleFlow';
import CandidateAvailReceived from './CandidateAvailReceive';
import InterviewScheduled from './InterviewScheduled';
import SelectScheduleFlow from './SelectScheduleFlow';

const ScheduleProgress = () => {
  const { reqProgressMap, reqTriggerActionsMap } = useRequestProgressProvider();

  let scheduleFlow = getSchedulFlow({
    eventTargetMap: reqTriggerActionsMap,
    requestTargetMp: reqProgressMap,
  });
  return (
    <>
      <SelectScheduleFlow scheduleFlow={scheduleFlow} />
      <ShowCode.When isTrue={scheduleFlow === 'availability'}>
        <>
          <CandidateAvailReceived />
        </>
      </ShowCode.When>
      <InterviewScheduled />
    </>
  );
};

export default ScheduleProgress;
