import { type DatabaseTableInsert } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import { createRequestWorkflowAction } from '@request/components/RequestProgress/utils';
import { useRequest } from '@request/hooks';
import { useRequests } from '@requests/hooks';
import React from 'react';

import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import { ACTION_TRIGGER_MAP } from '@/workflows/constants';

const CandidateCancelRequest = () => {
  const { recruiter_id } = useTenant();
  const { requestDetails, request_workflow } = useRequest();
  const { handleAsyncUpdateRequest } = useRequests();

  const handleAddWorkflows = async () => {
    try {
      const cancelReqActions = ACTION_TRIGGER_MAP.onRequestCancel.map(
        (trigger, idx) => ({ ...trigger.value, order: idx }),
      ) as unknown as DatabaseTableInsert['workflow_action'][];

      await createRequestWorkflowAction({
        wActions: cancelReqActions,
        request_id: requestDetails.id,
        recruiter_id: recruiter_id,
        interval: 0,
        workflow_id: null,
      });
      await request_workflow.refetch();
      await handleAsyncUpdateRequest({
        payload: {
          requestId: requestDetails.id,
          requestPayload: { status: 'in_progress' },
        },
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Failed to perform action',
      });
    }
  };

  return (
    <>
      <UIButton onClick={handleAddWorkflows}>
        Cancel Meeting and Notify Interviewers
      </UIButton>
    </>
  );
};

export default CandidateCancelRequest;
