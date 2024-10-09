/* eslint-disable no-unused-vars */
import { useRequest } from '@request/hooks';
import React from 'react';

import { ShowCode } from '@/components/Common/ShowCode';

import { useRequestProgressProvider } from '../progressCtx';
import { getSchedulFlow } from '../utils/getScheduleFlow';
import CandidateAvailReceived from './CandidateAvailReceive';
import InterviewScheduled from './InterviewScheduled';
import SelectScheduleFlow from './SelectScheduleFlow';

const ScheduleProgress = () => {
  const { requestDetails } = useRequest();
  const { reqProgressMap, reqTriggerActionsMap } = useRequestProgressProvider();
  const scheduleFlow = getSchedulFlow({
    eventTargetMap: reqTriggerActionsMap,
    requestTargetMp: reqProgressMap,
  });
  let isDebreifSchedule = false;
  if (
    requestDetails &&
    requestDetails.request_relation[0].interview_session?.session_type ===
      'debrief'
  ) {
    isDebreifSchedule = true;
  }
  return (
    <>
      <ShowCode.When isTrue={!isDebreifSchedule}>
        <SelectScheduleFlow scheduleFlow={scheduleFlow} />
        <ShowCode.When isTrue={scheduleFlow === 'availability'}>
          <>
            <CandidateAvailReceived />
          </>
        </ShowCode.When>
      </ShowCode.When>
      <InterviewScheduled />
    </>
  );
};

export default ScheduleProgress;
