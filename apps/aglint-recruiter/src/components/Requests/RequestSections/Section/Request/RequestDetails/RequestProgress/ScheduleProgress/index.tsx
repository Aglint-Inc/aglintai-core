/* eslint-disable no-unused-vars */
import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import React from 'react';

import MuiPopup from '@/components/Common/MuiPopup';
import { ShowCode } from '@/components/Common/ShowCode';
import { ACTION_TRIGGER_MAP } from '@/components/Workflow/constants';

import { useRequestProgressProvider } from '../progressCtx';
import { type TriggerActionMapType } from '../types';
import { getSchedulFlow } from '../utils/getScheduleFlow';
import CandidateAvailReceived from './CandidateAvailReceive';
import { SelectedActionsDetailsProvider } from './dialogCtx';
import InterviewScheduled from './InterviewScheduled';
import SelectScheduleFlow from './SelectScheduleFlow';
import WorkflowActionDialog from './WorkflowActionDialog';

const ScheduleProgress = () => {
  const {
    companyEmailTemplatesMp,
    editTrigger,
    reqProgressMap,
    reqTriggerActionsMap,
    setShowEditDialog,
    showEditDialog,
  } = useRequestProgressProvider();

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
    </>
  );
};

export default ScheduleProgress;

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
