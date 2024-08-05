import { Stack } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TextWithIconSkeleton } from '@/devlink2/TextWithIconSkeleton';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';
import {
  createReqAvailWorkflowGraph,
  updateEventProgress,
} from '@/src/services/workflow/graphUtils';

import { EventHeading } from './EventHeading';

function RequestProgress() {
  const { request_progress } = useRequest();
  const graphRef = useRef(createReqAvailWorkflowGraph());
  const orderedEvents = useMemo(() => {
    graphRef.current = updateEventProgress(
      graphRef.current,
      request_progress.data,
    );
    let events = graphRef.current.traverseGraph('FIND_CURR_AVAIL_SLOTS');
    events = [graphRef.current.getNode('FIND_CURR_AVAIL_SLOTS'), ...events];
    return events;
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
