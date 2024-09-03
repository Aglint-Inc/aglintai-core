/* eslint-disable no-unused-vars */
import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React, { createContext, useContext, useEffect, useMemo } from 'react';

import { RequestProgress } from '@/devlink2/RequestProgress';
import MuiPopup from '@/src/components/Common/MuiPopup';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { fetchEmailTemplates } from '@/src/components/CompanyDetailComp/SettingsSchedule/SchedulingEmailTemplates/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequest } from '@/src/context/RequestContext';

import {
  type RequestProgressMapType,
  type TriggerActionMapType,
} from '../types';
import { getSchedulFlow } from '../utils/getScheduleFlow';
import CandidateAvailReceived from './CandidateAvailReceive';
import InterviewScheduled from './InterviewScheduled';
import SelectScheduleFlow from './SelectScheduleFlow';
import WorkflowActionDialog from './WorkflowActionDialog';

// Define the types for the context values
interface RequestContextType {
  reqTriggerActionsMap: TriggerActionMapType;
  reqProgressMap: RequestProgressMapType;
  scheduleFlow: ReturnType<typeof getSchedulFlow>;
  companyEmailTemplatesMp: Partial<
    Record<
      DatabaseEnums['email_slack_types'],
      DatabaseTable['company_email_template']
    >
  >;
  currentRequest: DatabaseTable['request'];
  editTrigger: DatabaseTable['workflow']['trigger'];
  setEditTrigger: (trigger: DatabaseTable['workflow']['trigger']) => void;
  showEditDialog: boolean;
  setShowEditDialog: (show: boolean) => void;
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
  const { request_progress, request_workflow, requestDetails } = useRequest();
  const [editTrigger, setEditTrigger] =
    React.useState<DatabaseTable['workflow']['trigger']>('onRequestSchedule');
  const [showEditDialog, setShowEditDialog] = React.useState(false);
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

  const companyEmailTemplatesMp = useMemo(() => {
    let mp: Partial<
      Record<
        DatabaseEnums['email_slack_types'],
        DatabaseTable['company_email_template']
      >
    > = {};
    companyEmailTemplates.forEach((row) => {
      mp[row.type] = row;
    });
    return mp;
  }, [companyEmailTemplates]);
  //
  let scheduleFlow = getSchedulFlow({
    eventTargetMap: reqTriggerActionsMap,
    requestTargetMp: reqProgressMap,
  });
  let isSelectScheduleFlowComplete = false;
  if (
    reqTriggerActionsMap['CAND_AVAIL_REC'] ||
    reqTriggerActionsMap['CAND_CONFIRM_SLOT']
  ) {
    isSelectScheduleFlowComplete = true;
  }

  return (
    <>
      <RequestContext.Provider
        value={{
          reqTriggerActionsMap,
          reqProgressMap,
          scheduleFlow,
          companyEmailTemplatesMp: companyEmailTemplatesMp,
          currentRequest: requestDetails,
          editTrigger,
          setEditTrigger,
          showEditDialog,
          setShowEditDialog,
        }}
      >
        <>
          <SelectScheduleFlow />
          <ShowCode.When isTrue={scheduleFlow === 'availability'}>
            <>
              <CandidateAvailReceived />
            </>
          </ShowCode.When>
          <InterviewScheduled />

          <MuiPopup
            props={{
              open: showEditDialog,
              maxWidth: 'sm',
              fullWidth: true,
              onClose: () => {
                setShowEditDialog(false);
              },
            }}
          >
            <WorkflowActionDialog />
          </MuiPopup>
        </>
      </RequestContext.Provider>
    </>
  );
};

export default NewScheduleEvents;
