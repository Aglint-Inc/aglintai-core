import {
  type DatabaseEnums,
  type DatabaseTableInsert,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { get } from 'lodash';
import { Terminal } from 'lucide-react';
import React, { useState } from 'react';

import UISelectDropDown from '@/components/Common/UISelectDropDown';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequest } from '@/context/RequestContext';
import { api } from '@/trpc/client';
import { ACTION_TRIGGER_MAP } from '@/workflows/constants';

import { useRequestProgressProvider } from '../progressCtx';
import { createRequestWorkflowAction } from '../utils';
import { TargetAPIBody } from '../WorkflowComps/TargetAPIBody';
import {
  agentTargetApiEmailEndPoint,
  useSelectedActionsDetails,
} from './dialogCtx';

const WorkflowActionDialog = () => {
  const { recruiter } = useAuthDetails();
  const { request_workflow, requestDetails: currentRequest } = useRequest();
  const {
    reqTriggerActionsMap,
    companyEmailTemplatesMp,
    triggerDetails,
    setShowEditDialog,
    setTriggerDetails,
  } = useRequestProgressProvider();

  const {
    selectedActionsDetails,
    setSelectedActionsDetails,
    setEmailTemplate,
    emailTemplate,
    agentInstructions,
    setTiptapLoadStatus,
  } = useSelectedActionsDetails();

  const [isSaving, setIsSaving] = useState(false);
  const handleChangeSelectedAction = (
    target_api: DatabaseEnums['email_slack_types'],
  ) => {
    const editTrigger = triggerDetails.trigger;
    setTiptapLoadStatus({ email: true, agent: true });
    if (
      get(reqTriggerActionsMap, editTrigger, []).length > 0 &&
      reqTriggerActionsMap[editTrigger][0].target_api === target_api
    ) {
      const existing_workflow_action = reqTriggerActionsMap[editTrigger][0];
      setEmailTemplate({
        body: (existing_workflow_action.payload as any)?.email?.body || '',
        subject:
          (existing_workflow_action.payload as any)?.email?.subject || '',
      });
      existing_workflow_action.payload = undefined;
      setSelectedActionsDetails({
        ...existing_workflow_action,
      });
    } else {
      let emailTempKey = target_api;
      if (agentTargetApiEmailEndPoint[target_api]) {
        emailTempKey = agentTargetApiEmailEndPoint[target_api];
      }
      const emailSlackTemplate = companyEmailTemplatesMp[emailTempKey];
      setEmailTemplate({
        body: emailSlackTemplate?.body || '',
        subject: emailSlackTemplate?.subject || '',
      });
      const defaultActDetails = ACTION_TRIGGER_MAP[editTrigger].find(
        (t) => t.value.target_api === target_api,
      );
      setSelectedActionsDetails({
        id: undefined,
        action_type: defaultActDetails.value.action_type,
        created_at: new Date().toISOString(),
        order: 0,
        target_api: target_api as any,
        workflow_id: undefined,
      });
    }

    setTiptapLoadStatus({ email: false, agent: false });
  };
  const { mutateAsync } =
    api.textTransform.selfScheduleInstruction.useMutation();
  let isDialogEdit = false;
  if (selectedActionsDetails?.id && selectedActionsDetails.id.length > 0) {
    isDialogEdit = true;
  }
  const handleSaveScheduleAction = async (
    wAction: DatabaseTableInsert['workflow_action'],
  ) => {
    try {
      if (
        wAction.target_api ===
          'onRequestSchedule_emailLink_sendSelfSchedulingLink' &&
        wAction.action_type == 'email' &&
        (wAction.payload.email.subject.length == 0 ||
          wAction.payload.email.body.length == 0)
      ) {
        toast({
          title: 'Email Subject and Body cannot be empty',
          variant: 'destructive',
        });
        return;
      }
      setIsSaving(true);
      if (agentInstructions.length > 0) {
        const availabilityResp = await mutateAsync({
          instruction: agentInstructions,
          user_tz: dayjsLocal.tz.guess(),
        });
        wAction.payload = {
          email: {
            body: emailTemplate.body,
            subject: emailTemplate.subject,
          },
          agent: {
            instruction: agentInstructions,
            ai_response: availabilityResp,
          },
        };
      }
      await createRequestWorkflowAction({
        wActions: [wAction],
        request_id: currentRequest.id,
        recruiter_id: recruiter.id,
        interval: triggerDetails.interval,
        workflow_id: selectedActionsDetails.workflow_id,
      });
      await request_workflow.refetch();
      setShowEditDialog(false);
    } catch (err) {
      toast({
        title: 'Failed to add action',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <Card className='border-0 shadow-none'>
      <CardHeader>
        <CardTitle className='flex text-lg'>
          <Terminal width={24} height={24} className='mr-4' />
          Action
        </CardTitle>
        <CardDescription>An action to be performed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <UISelectDropDown
            label='Do this'
            onValueChange={(value) => {
              handleChangeSelectedAction(value as any);
            }}
            value={selectedActionsDetails.target_api}
            menuOptions={ACTION_TRIGGER_MAP[triggerDetails.trigger].map(
              (action) => ({
                name: action.name,
                value: action.value.target_api,
              }),
            )}
          />
          {(triggerDetails.trigger === 'sendAvailReqReminder' ||
            triggerDetails.trigger === 'selfScheduleReminder') && (
            <UISelectDropDown
              label='Remind After'
              value={String(triggerDetails.interval)}
              onValueChange={(value) => {
                setTriggerDetails({
                  trigger: triggerDetails.trigger,
                  interval: Number(value),
                });
              }}
              menuOptions={[
                { name: '1 day', value: String(24 * 60) },
                { name: '2 day', value: String(48 * 60) },
                { name: '3 day', value: String(72 * 60) },
              ]}
            />
          )}
          <TargetAPIBody action={selectedActionsDetails} />
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button
          variant='default'
          onClick={() => {
            handleSaveScheduleAction({
              action_type: selectedActionsDetails.action_type as any,
              target_api: selectedActionsDetails.target_api as any,
              order: 0,
              workflow_id: selectedActionsDetails.workflow_id,
              payload: {
                email: emailTemplate,
              },
            });
          }}
        >
          {isDialogEdit ? (
            <>{isSaving ? 'Saving...' : 'Save Action'}</>
          ) : (
            <>{isSaving ? 'Adding...' : 'Add Action'}</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkflowActionDialog;