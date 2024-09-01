import {
  DatabaseEnums,
  DatabaseTable,
  DatabaseTableInsert,
} from '@aglint/shared-types';
import React, { act, useMemo, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { WorkflowItem } from '@/devlink3/WorkflowItem';
import MuiPopup from '@/src/components/Common/MuiPopup';
import UISelect from '@/src/components/Common/Uiselect';
import { ACTION_TRIGGER_MAP } from '@/src/components/Workflow/constants';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequest } from '@/src/context/RequestContext';
import toast from '@/src/utils/toast';

import { createRequestWorkflowAction } from '../../utils';
import { TargetAPIBody, WActionProps } from '../WorkflowComps/TargetAPIBody';
import { useNewScheduleRequestPr } from '.';
import { get } from 'lodash';
import { TriggerActionMapType } from '../types';

const WorkflowActionDialog = () => {
  const { recruiter } = useAuthDetails();
  const { request_workflow } = useRequest();
  const {
    reqTriggerActionsMap,
    companyEmailTemplatesMp,
    currentRequest,
    editTrigger,
    setShowEditDialog,
  } = useNewScheduleRequestPr();

  const [selectedActionsDetails, setSelectedActionsDetails] = useState<
    WActionProps['action']
  >(
    reqTriggerActionsMap[editTrigger] &&
      reqTriggerActionsMap[editTrigger].length > 0
      ? reqTriggerActionsMap[editTrigger][0]
      : {
          action_type: ACTION_TRIGGER_MAP[editTrigger][0].value
            .action_type as any,
          created_at: '',
          id: '',
          order: 0,
          target_api: ACTION_TRIGGER_MAP[editTrigger][0].value
            .target_api as any,
          workflow_id: '',
          payload: {
            body:
              companyEmailTemplatesMp[
                ACTION_TRIGGER_MAP[editTrigger][0].value.target_api
              ]?.body ?? '',
            subject:
              companyEmailTemplatesMp[
                ACTION_TRIGGER_MAP[editTrigger][0].value.target_api
              ]?.subject ?? '',
          },
        },
  );

  const [isAddingAction, setIsAddingAction] = useState(false);
  const handleChangeSelectedAction = (
    target_api: DatabaseEnums['email_slack_types'],
  ) => {
    if (
      get(reqTriggerActionsMap, editTrigger, []).length > 0 &&
      reqTriggerActionsMap[editTrigger][0].target_api === target_api
    ) {
      const existing_workflow_action = reqTriggerActionsMap[editTrigger][0];
      setSelectedActionsDetails(existing_workflow_action);
    } else {
      const emailSlackTemplate = companyEmailTemplatesMp[target_api];
      setSelectedActionsDetails({
        action_type: ACTION_TRIGGER_MAP[editTrigger][0].value
          .action_type as any,
        created_at: '',
        id: '',
        order: 0,
        target_api: target_api as any,
        workflow_id: '',
        payload: {
          body: emailSlackTemplate?.body || '',
          subject: emailSlackTemplate?.subject || '',
        },
      });
    }
  };

  const handleSaveScheduleAction = async (
    wAction: DatabaseTableInsert['workflow_action'],
  ) => {
    try {
      setIsAddingAction(true);
      await createRequestWorkflowAction({
        wAction,
        request_id: currentRequest.id,
        recruiter_id: recruiter.id,
      });
      request_workflow.refetch();
    } catch (err) {
      toast.error('Failed to add action');
    } finally {
      setIsAddingAction(false);
      setShowEditDialog(false);
    }
  };

  return (
    <WorkflowItem
      textWorkflowType={'Action'}
      textTypeDescription={'An action to be performed'}
      slotWorkflowIcon={<ActionIcon />}
      isDeleteVisible={false}
      slotInputFields={
        <>
          <UISelect
            label='Do this'
            onChange={(e) => {
              handleChangeSelectedAction(e.target.value as any);
            }}
            value={selectedActionsDetails.target_api}
            menuOptions={ACTION_TRIGGER_MAP[editTrigger].map((action) => ({
              name: action.name,
              value: action.value.target_api,
            }))}
          />
          <TargetAPIBody action={selectedActionsDetails} />
          <ButtonSolid
            textButton={isAddingAction ? 'Adding...' : 'Add Action'}
            onClickButton={{
              onClick: () => {
                handleSaveScheduleAction({
                  action_type: selectedActionsDetails.action_type as any,
                  target_api: selectedActionsDetails.target_api as any,
                  payload: selectedActionsDetails.payload as any,
                  order: 0,
                  workflow_id: selectedActionsDetails.workflow_id,
                });
              },
            }}
          />
        </>
      }
    />
  );
};

export default WorkflowActionDialog;

const ActionIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='20' height='20' rx='4' />
      <path
        d='M7.4502 6.8375C7.3502 6.7875 7.2502 6.7875 7.1502 6.8375C7.0502 6.9 7.0002 6.9875 7.0002 7.1V13.7C7.0002 13.8125 7.0502 13.9 7.1502 13.9625C7.2502 14.0125 7.3502 14.0125 7.4502 13.9625L12.8502 10.6625C12.9502 10.6 13.0002 10.5125 13.0002 10.4C13.0002 10.2875 12.9502 10.2 12.8502 10.1375L7.4502 6.8375ZM6.86895 6.3125C7.16895 6.15 7.46895 6.15625 7.76895 6.33125L13.1689 9.63125C13.4439 9.80625 13.5877 10.0625 13.6002 10.4C13.5877 10.7375 13.4439 10.9937 13.1689 11.1687L7.76895 14.4688C7.46895 14.6438 7.16895 14.65 6.86895 14.4875C6.56895 14.3125 6.4127 14.05 6.4002 13.7V7.1C6.4127 6.75 6.56895 6.4875 6.86895 6.3125Z'
        fill='#cc4e00'
      />
    </svg>
  );
};
ActionIcon.displayName = 'ActionIcon';
