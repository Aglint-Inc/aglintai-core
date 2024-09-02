import { Stack } from '@mui/material';
import React, { useMemo } from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import { EventTargetMapType, RequestProgressMapType } from '../types';
import { getSchedulFlow } from '../utils/getScheduleFlow';
import CandidateAvailReceived from './CandidateAvailReceive';
import InterviewSchedule from './InterviewSchedule';
import SelectScheduleFlow from './SelectScheduleFlow';

const NewScheduleEvents = () => {
  const { request_progress, request_workflow } = useRequest();
  const eventTargetMap = useMemo(() => {
    let mp: EventTargetMapType = {};
    request_workflow.data.forEach((eA) => {
      mp[eA.trigger] = eA.workflow_action.map((wA) => {
        return wA.target_api;
      });
    });
    return mp;
  }, [request_workflow.data]);
  const reqProgressMap: RequestProgressMapType = useMemo(() => {
    let mp: RequestProgressMapType = {};

    request_progress.data.forEach((row) => {
      if (!mp[row.event_type]) {
        mp[row.event_type] = [];
      }
      mp[row.event_type].push({ ...row });
    });
    return mp;
  }, [request_progress]);
  const requestTargetMp = useMemo(() => {
    let mp: RequestProgressMapType = {};
    request_progress.data.forEach((row) => {
      if (!mp[row.event_type]) {
        mp[row.event_type] = [];
      }
      mp[row.event_type].push({ ...row });
    });
    return mp;
  }, [request_progress.data]);

  let scheduleFlow = getSchedulFlow({
    eventTargetMap: eventTargetMap,
    requestTargetMp: requestTargetMp,
  });

  return (
    <>
      <Stack rowGap={2}>
        <SelectScheduleFlow eventTargetMap={eventTargetMap} />
        <ShowCode.When isTrue={scheduleFlow === 'availability'}>
          <CandidateAvailReceived eventTargetMap={eventTargetMap} />
        </ShowCode.When>
        <InterviewSchedule
          eventTargetMap={eventTargetMap}
          reqProgressMap={reqProgressMap}
        />
      </Stack>
    </>
  );
};

export default NewScheduleEvents;
