import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { useMemo } from 'react';

import { TextWithIconSkeleton } from '@/devlink2/TextWithIconSkeleton';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { traverseProgress } from '@/src/components/Requests/RequestSections/Section/Request/RequestDetails/RequestProgress/utils/traverseProgress';
import { useRequest } from '@/src/context/RequestContext';
import type { Request as RequestType } from '@/src/queries/requests/types';

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
    let eventActions: TriggerActionsType = [];
    if (request_workflow.data?.length > 0) {
      eventActions = request_workflow.data.map((r) => r.workflow);
    } else {
      eventActions = [...job_workflow];
    }

    return traverseProgress({
      eventActions,
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
