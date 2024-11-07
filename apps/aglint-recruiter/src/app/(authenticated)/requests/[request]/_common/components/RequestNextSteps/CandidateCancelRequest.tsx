import { type DatabaseTableInsert } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import { createRequestWorkflowAction } from '@request/components/RequestProgress/utils';
import { useRequest } from '@request/hooks';
import axios from 'axios';
import React, { useState } from 'react';

import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import { ACTION_TRIGGER_MAP } from '@/workflows/constants';

const CandidateCancelRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { recruiter } = useTenant();
  const { requestDetails, request_workflow } = useRequest();

  const handleAddWorkflows = async () => {
    try {
      setIsLoading(true);
      let cancelReqActions = ACTION_TRIGGER_MAP.onRequestCancel.map(
        (trigger, idx) => ({
          ...trigger.value,
          order: idx,
          action_type: trigger.value.action_type,
        }),
      ) as unknown as DatabaseTableInsert['workflow_action'][];
      if (!recruiter.recruiter_preferences.slack) {
        cancelReqActions = cancelReqActions.filter(
          (action) => action.action_type !== 'slack',
        );
      }
      await createRequestWorkflowAction({
        wActions: cancelReqActions,
        request_id: requestDetails.id,
        recruiter_id: recruiter.id,
        interval: 0,
        workflow_id: '',
      });
      await request_workflow.refetch();
      await axios.post('/api/request/execute-workflow', {
        request_id: requestDetails.id,
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Failed to perform action',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mt-4'>
      <UIButton
        isLoading={isLoading}
        disabled={isLoading}
        data-testid='cancel-schedule-btn'
        onClick={handleAddWorkflows}
      >
        Cancel Meetings
      </UIButton>
    </div>
  );
};

export default CandidateCancelRequest;
