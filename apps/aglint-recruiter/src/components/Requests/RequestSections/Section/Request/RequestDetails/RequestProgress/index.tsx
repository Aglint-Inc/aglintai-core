import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { useMemo, useRef } from 'react';

import { TextWithIconSkeleton } from '@/devlink2/TextWithIconSkeleton';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';
import type { Request as RequestType } from '@/src/queries/requests/types';
import {
  createCancelWorkflowGraph,
  createInterviewerDeclineRequest,
  createReqAvailWorkflowGraph,
  createRescheduleWorkflowGraph,
} from '@/src/services/workflow/graphUtils';

import { traverseProgress } from '@/src/services/workflow/traverseProgress';
import EventRow from './EventRow';
type TriggerActionsType =
  RequestType['applications']['public_jobs']['workflow_job_relation'][0]['workflow'][];
function RequestProgress({
  request_type,
  job_workflow,
}: {
  request_type: DatabaseTable['request']['type'];
  job_workflow: TriggerActionsType;
}) {
  const { request_progress, request_workflow } = useRequest();
  const orderedEvents = useMemo(() => {
    let event_actions: TriggerActionsType = [];
    if (request_workflow.data?.length > 0) {
      event_actions = request_workflow.data.map((r) => r.workflow);
    } else {
      event_actions = [...job_workflow];
    }
    return traverseProgress({
      event_actions,
      request_progress: request_progress.data ?? [],
      request_type,
    });
  }, [request_progress.data]);

  //
  return (
    <Stack gap={1}>
      <ShowCode>
        <ShowCode.When isTrue={request_progress.status === 'pending'}>
          <RequestProgressSkeleton />
        </ShowCode.When>
        <ShowCode.When isTrue={request_progress.status === 'error'}>
          <>Error</>
        </ShowCode.When>
        <ShowCode.Else>
          {orderedEvents.map((event, idx) => {
            return <EventRow requestLog={event} key={idx} />;
          })}
        </ShowCode.Else>
      </ShowCode>
    </Stack>
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

const createWorkflowGraph = (
  request_type: DatabaseTable['request']['type'],
) => {
  if (request_type === 'reschedule_request') {
    return createRescheduleWorkflowGraph();
  }
  if (request_type === 'schedule_request') {
    return createReqAvailWorkflowGraph();
  } else if (request_type === 'cancel_schedule_request') {
    return createCancelWorkflowGraph();
  } else {
    return createInterviewerDeclineRequest();
  }
};
