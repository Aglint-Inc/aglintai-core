import { type DatabaseEnums } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import { createRequestWorkflowAction } from '@request/components/RequestProgress/utils';
import { workflowCopy } from '@request/components/RequestProgress/utils/copy';
import { useRequest } from '@request/hooks';
import React from 'react';

import { useTenant } from '@/company/hooks';

import SuggestionCard from '../../SuggestionCard';

const SlackConfirmation = () => {
  const { request_workflow, requestDetails } = useRequest();
  const { recruiter } = useTenant();

  const handleAddAction = async (
    target_api: DatabaseEnums['email_slack_types'],
  ) => {
    try {
      await createRequestWorkflowAction({
        wActions: [
          {
            target_api: target_api as any,
            order: 0,
            action_type: 'slack',
            workflow_id: '',
          },
        ],
        recruiter_id: recruiter.id,
        request_id: requestDetails.id,
        interval: 0,
      });
      await request_workflow.refetch();
    } catch (err) {
      toast({ title: 'Failed to add action', variant: 'destructive' });
    }
  };

  return (
    <>
      {' '}
      <SuggestionCard
        heading='Suggestion'
        description={workflowCopy['SEND_INTERVIEWER_ATTENDANCE_RSVP']['future']}
        buttonSlot={
          <Button
            variant='outline'
            onClick={() =>
              handleAddAction('candidateBook_slack_interviewerForConfirmation')
            }
          >
            Add RSVP
          </Button>
        }
      />
    </>
  );
};

export default SlackConfirmation;
