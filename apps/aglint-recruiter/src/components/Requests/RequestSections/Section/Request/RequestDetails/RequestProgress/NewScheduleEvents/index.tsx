import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React, { createContext, useContext, useEffect, useMemo } from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import { fetchEmailTemplates } from '@/src/components/CompanyDetailComp/SettingsSchedule/SchedulingEmailTemplates/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequest } from '@/src/context/RequestContext';

import { RequestProgressMapType, TriggerActionMapType } from '../types';
import { getSchedulFlow } from '../utils/getScheduleFlow';
import CandidateAvailReceived from './CandidateAvailReceive';
import InterviewSchedule from './InterviewSchedule';
import SelectScheduleFlow from './SelectScheduleFlow';

// Define the types for the context values
interface RequestContextType {
  reqTriggerActionsMap: TriggerActionMapType;
  reqProgressMap: RequestProgressMapType;
  scheduleFlow: ReturnType<typeof getSchedulFlow>;
  companyEmailTemplates: DatabaseTable['company_email_template'][];
  currentRequest: DatabaseTable['request'];
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

const NewScheduleEvents = ({
  requestDetails,
}: {
  requestDetails: DatabaseTable['request'];
}) => {
  const { request_progress, request_workflow } = useRequest();
  const { recruiter } = useAuthDetails();
  const [companyEmailTemplates, setCompanyEmailTemplates] = React.useState<
    DatabaseTable['company_email_template'][]
  >([]);

  useEffect(() => {
    (async () => {
      const companyEmailTemplates = await fetchEmailTemplates(recruiter.id);
      setCompanyEmailTemplates(companyEmailTemplates);
    })();
  }, []);

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
    eventTargetMap: reqTriggerActionsMap,
    requestTargetMp: reqProgressMap,
  });

  return (
    <>
      <RequestContext.Provider
        value={{
          reqTriggerActionsMap,
          reqProgressMap,
          scheduleFlow,
          companyEmailTemplates,
          currentRequest: requestDetails,
        }}
      >
        <Stack rowGap={2}>
          <SelectScheduleFlow />
          <ShowCode.When isTrue={scheduleFlow === 'availability'}>
            <CandidateAvailReceived eventTargetMap={{}} />
          </ShowCode.When>
          <InterviewSchedule
            eventTargetMap={{}}
            reqProgressMap={reqProgressMap}
          />
        </Stack>
      </RequestContext.Provider>
    </>
  );
};

export default NewScheduleEvents;
