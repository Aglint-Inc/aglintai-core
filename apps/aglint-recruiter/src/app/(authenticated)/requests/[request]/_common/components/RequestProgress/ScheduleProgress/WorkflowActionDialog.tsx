import {
  type DatabaseEnums,
  type DatabaseTableInsert,
} from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { ScrollArea } from '@components/ui/scroll-area';
import { useRequest } from '@request/hooks';
import { Terminal } from 'lucide-react';
import React, { useState } from 'react';

import { useTenant } from '@/company/hooks';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import {
  availReminder,
  selfScheduleReminder,
} from '@/services/event-triggers/trigger-funcs/onUpdateRequestProgress';
import { getSlackWorkflowActions } from '@/utils/getSlackWorkflowActions';
import { supabase } from '@/utils/supabase/client';
import { ACTION_TRIGGER_MAP } from '@/workflows/constants';

import { useRequestProgressProvider } from '../progressCtx';
import { createRequestWorkflowAction } from '../utils';
import { TargetAPIBody } from '../WorkflowComps/TargetAPIBody';
import {
  agentTargetApiEmailEndPoint,
  useSelectedActionsDetails,
} from './dialogCtx';

const WorkflowActionDialog = () => {
  const { recruiter } = useTenant();
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
    const trigAction =
      reqTriggerActionsMap[editTrigger] &&
      reqTriggerActionsMap[editTrigger].actions.length > 0
        ? reqTriggerActionsMap[editTrigger].actions[0]
        : null;
    if (trigAction) {
      const existing_workflow_action = trigAction;
      setEmailTemplate({
        body: (existing_workflow_action.payload as any)?.email?.body || '',
        subject:
          (existing_workflow_action.payload as any)?.email?.subject || '',
      });
      existing_workflow_action.payload = {};
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
      )!;
      setSelectedActionsDetails({
        id: '',
        action_type: defaultActDetails.value.action_type,
        created_at: new Date().toISOString(),
        order: 0,
        target_api: target_api as any,
        workflow_id: '',
      });
    }

    setTiptapLoadStatus({ email: false, agent: false });
  };

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
        wAction.payload &&
        wAction.payload.email &&
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
        wAction.payload = {
          email: {
            body: emailTemplate.body,
            subject: emailTemplate.subject,
          },
          agent: {
            instruction: agentInstructions,
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
      // trigger reminders
      if (
        triggerDetails.trigger === 'sendAvailReqReminder' &&
        currentRequest.status === 'in_progress' &&
        !isDialogEdit
      ) {
        await availReminder({
          request_id: currentRequest.id,
          supabase,
        });
      }
      if (
        triggerDetails.trigger === 'selfScheduleReminder' &&
        currentRequest.status === 'in_progress' &&
        !isDialogEdit
      ) {
        await selfScheduleReminder({
          request_id: currentRequest.id,
          supabase,
        });
      }
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
    <>
      <DialogHeader className='border-b border-border p-4'>
        <DialogTitle className='flex text-lg'>
          <Terminal width={24} height={24} className='mr-4' />
          Action
        </DialogTitle>
        <DialogDescription>An action to be performed</DialogDescription>
      </DialogHeader>
      <ScrollArea className='h-96'>
        <div className='space-y-4 px-4'>
          <UISelectDropDown
            label='Do this'
            onValueChange={(value) => {
              handleChangeSelectedAction(value as any);
            }}
            value={selectedActionsDetails.target_api}
            menuOptions={getSlackWorkflowActions(
              triggerDetails.trigger,
              recruiter.recruiter_preferences.slack,
            ).map((action) => ({
              name: action.name,
              value: action.value.target_api,
            }))}
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
      </ScrollArea>
      <DialogFooter className='flex justify-end gap-2 rounded-b-lg bg-gray-100 p-4'>
        <Button variant='outline' onClick={() => setShowEditDialog(false)}>
          Cancel
        </Button>
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
      </DialogFooter>
    </>
  );
};

export default WorkflowActionDialog;
