import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { TextWithIconSkeleton } from '@/devlink2/TextWithIconSkeleton';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';
import { createReqAvailWorkflowGraph } from '@/src/services/workflow/createReqAvailWorkflowGraph';
import { EventNode } from '@/src/services/workflow/node';

import { EventTitle } from './EventTitle';

function RequestProgress() {
  const {
    request_progress: { status },
  } = useRequest();
  const [orderedEvents, setOrderedEvents] = useState<EventNode[]>([]);
  useEffect(() => {
    const graph = createReqAvailWorkflowGraph();
    let events = graph.traverseGraph('FIND_CURR_AVAIL_SLOTS');
    events = [graph.getNode('FIND_CURR_AVAIL_SLOTS'), ...events];
    setOrderedEvents([...events]);
  }, []);

  return (
    <Stack gap={1}>
      <ShowCode>
        <ShowCode.When isTrue={status === 'pending'}>
          <RequestProgressSkeleton />
        </ShowCode.When>
        <ShowCode.When isTrue={status === 'error'}>
          <>Error</>
        </ShowCode.When>
        <ShowCode.Else>
          {orderedEvents.map((event, idx) => {
            return <EventTitle event={event} key={idx} />;
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
