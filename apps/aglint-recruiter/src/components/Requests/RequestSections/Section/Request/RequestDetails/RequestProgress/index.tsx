import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { useMemo, useRef } from 'react';

import { TextWithIconSkeleton } from '@/devlink2/TextWithIconSkeleton';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';
import {
  createReqAvailWorkflowGraph,
  createRescheduleWorkflowGraph,
  updateEventProgress,
} from '@/src/services/workflow/graphUtils';

import { EventHeading } from './EventHeading';

function RequestProgress({
  request_type,
}: {
  request_type: DatabaseTable['request']['type'];
}) {
  const { request_progress } = useRequest();
  const graphRef = useRef(createWorkflowGraph(request_type));
  const orderedEvents = useMemo(() => {
    if (request_progress.data && graphRef.current) {
      graphRef.current = updateEventProgress(
        graphRef.current,
        request_progress.data,
      );
    }
    const traverseGraphNodes = () => {
      if (
        request_type === 'schedule_request' ||
        request_type === 'reschedule_request'
      ) {
        let events = graphRef.current.traverseGraph(
          'FIND_CURR_AVAIL_SLOTS',
          new Set(),
        );
        events = [graphRef.current.getNode('FIND_CURR_AVAIL_SLOTS'), ...events];
        return events;
      }
      return [];
    };
    return traverseGraphNodes();
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
            return <EventHeading event={event} key={idx} />;
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
  }
};
