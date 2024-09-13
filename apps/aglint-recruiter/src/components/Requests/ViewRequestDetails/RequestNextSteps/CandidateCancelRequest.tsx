import { type DatabaseTableInsert } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequest } from '@/context/RequestContext';
import { useRequestsActions } from '@/context/RequestsContext/hooks';
import { ACTION_TRIGGER_MAP } from '@/workflows/constants';

import { createRequestWorkflowAction } from '../../_common/components/RequestProgress/utils';

const CandidateCancelRequest = () => {
  const { recruiter_id } = useAuthDetails();
  const { requestDetails, request_workflow } = useRequest();
  const { handleAsyncUpdateRequest } = useRequestsActions();

  const handleAddWorkflows = async () => {
    try {
      const cancelReqActions = ACTION_TRIGGER_MAP.onRequestCancel.map(
        (trigger) => trigger.value,
      ) as unknown as DatabaseTableInsert['workflow_action'][];

      await createRequestWorkflowAction({
        wActions: cancelReqActions,
        request_id: requestDetails.id,
        recruiter_id: recruiter_id,
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
