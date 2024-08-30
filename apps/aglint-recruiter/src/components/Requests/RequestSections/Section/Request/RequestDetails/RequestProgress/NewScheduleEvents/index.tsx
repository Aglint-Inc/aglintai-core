import { Stack } from '@mui/material';
import React, { createContext, useContext, useMemo } from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import {
  EventTargetMapType,
  RequestProgressMapType,
  TriggerActionMapType,
} from '../types';
import { getSchedulFlow } from '../utils/getScheduleFlow';
import CandidateAvailReceived from './CandidateAvailReceive';
import InterviewSchedule from './InterviewSchedule';
import SelectScheduleFlow from './SelectScheduleFlow';

// Define the types for the context values
interface RequestContextType {
  reqTriggerActionsMap: TriggerActionMapType;
  reqProgressMap: RequestProgressMapType;
  scheduleFlow: ReturnType<typeof getSchedulFlow>;
}

// Define the context with the proper type
const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const useNewScheduleRequestPr = (): RequestContextType => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequestContext must be used within a RequestProvider');
  }
  return context;
};

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
  const reqTriggerActionsMap = useMemo(() => {
    let mp: TriggerActionMapType = {};
    request_workflow.data.forEach((trigger_act) => {
      mp[trigger_act.trigger] = [...trigger_act.workflow_action];
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

  let scheduleFlow = getSchedulFlow({
    eventTargetMap: eventTargetMap,
    requestTargetMp: reqProgressMap,
  });

  return (
    <>
      <RequestContext.Provider
        value={{ reqTriggerActionsMap, reqProgressMap, scheduleFlow }}
      >
        <Stack rowGap={2}>
          <SelectScheduleFlow />
          <ShowCode.When isTrue={scheduleFlow === 'availability'}>
            <CandidateAvailReceived eventTargetMap={eventTargetMap} />
          </ShowCode.When>
          <InterviewSchedule
            eventTargetMap={eventTargetMap}
            reqProgressMap={reqProgressMap}
          />
        </Stack>
      </RequestContext.Provider>
    </>
  );
};

export default NewScheduleEvents;
