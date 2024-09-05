import type { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { TextWithIconSkeleton } from '@devlink2/TextWithIconSkeleton';
import { Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';

import MuiPopup from '@/components/Common/MuiPopup';
import { ShowCode } from '@/components/Common/ShowCode';
import { fetchEmailTemplates } from '@/components/CompanyDetailComp/Templates/utils';
import { ACTION_TRIGGER_MAP } from '@/components/Workflow/constants';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequest } from '@/context/RequestContext';

import CandidateCancelled from './CandidateCancelled';
import InterviewerDecline from './InterviewerDecline';
import { RequestProgressContext } from './progressCtx';
import ScheduleProgress from './ScheduleProgress';
import { SelectedActionsDetailsProvider } from './ScheduleProgress/dialogCtx';
import WorkflowActionDialog from './ScheduleProgress/WorkflowActionDialog';
import { RequestProgressMapType, TriggerActionMapType } from './types';

function RequestProgress() {
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
  }, [request_progress.data]);

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

  return (
    <RequestProgressContext.Provider
      value={{
        companyEmailTemplatesMp,
        editTrigger,
        reqProgressMap,
        reqTriggerActionsMap,
        setEditTrigger,
        setShowEditDialog,
        showEditDialog,
      }}
    >
      <Stack gap={1}>
        <ShowCode>
          <ShowCode.When isTrue={request_progress.status === 'pending'}>
            <RequestProgressSkeleton />
          </ShowCode.When>
          <ShowCode.When isTrue={request_progress.status === 'error'}>
            <>Error</>
          </ShowCode.When>
          <ShowCode.Else>
            <ShowCode>
              <ShowCode.When
                isTrue={requestDetails.type === 'schedule_request'}
              >
                <ScheduleProgress />
              </ShowCode.When>
              <ShowCode.When isTrue={requestDetails.type === 'decline_request'}>
                <>
                  <InterviewerDecline />
                </>
              </ShowCode.When>
              <ShowCode.When
                isTrue={requestDetails.type === 'reschedule_request'}
              >
                <ScheduleProgress />
              </ShowCode.When>
              <ShowCode.When
                isTrue={requestDetails.type === 'cancel_schedule_request'}
              >
                <CandidateCancelled />
              </ShowCode.When>
            </ShowCode>
          </ShowCode.Else>
        </ShowCode>
      </Stack>

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
        <SelectedActionsDetailsProvider
          defaultSelectedActionsDetails={getInitialActionDetails({
            companyEmailTemplatesMp,
            editTrigger,
            reqTriggerActionsMap,
          })}
          companyTemplatesMp={companyEmailTemplatesMp}
        >
          <WorkflowActionDialog />
        </SelectedActionsDetailsProvider>
      </MuiPopup>
    </RequestProgressContext.Provider>
  );
}

export default RequestProgress;

export function RequestProgressSkeleton() {
  return (
    <Stack gap={1}>
      <TextWithIconSkeleton />
      <TextWithIconSkeleton />
      <TextWithIconSkeleton />
    </Stack>
  );
}

const getInitialActionDetails = ({
  companyEmailTemplatesMp,
  editTrigger,
  reqTriggerActionsMap,
}: {
  reqTriggerActionsMap: TriggerActionMapType;
  companyEmailTemplatesMp: Partial<
    Record<
      DatabaseEnums['email_slack_types'],
      DatabaseTable['company_email_template']
    >
  >;
  editTrigger: DatabaseTable['workflow']['trigger'];
}) => {
  if (
    reqTriggerActionsMap[editTrigger] &&
    reqTriggerActionsMap[editTrigger].length > 0
  ) {
    return reqTriggerActionsMap[editTrigger][0];
  } else {
    let template: DatabaseTable['company_email_template'];
    if (editTrigger === 'onRequestSchedule') {
      template =
        companyEmailTemplatesMp['sendSelfScheduleRequest_email_applicant'];
    } else if (editTrigger === 'sendAvailReqReminder') {
      template =
        companyEmailTemplatesMp['sendAvailReqReminder_email_applicant'];
    } else if (editTrigger === 'selfScheduleReminder') {
      template =
        companyEmailTemplatesMp['selfScheduleReminder_email_applicant'];
    }

    let wAction: DatabaseTable['workflow_action'] = {
      action_type: ACTION_TRIGGER_MAP[editTrigger][0].value.action_type as any,
      created_at: '',
      id: '',
      order: 0,
      target_api: ACTION_TRIGGER_MAP[editTrigger][0].value.target_api as any,
      workflow_id: '',
      payload: {
        email: {
          body: template?.body ?? '',
          subject: template?.subject ?? '',
        },
      },
    };
    return wAction;
  }
};
