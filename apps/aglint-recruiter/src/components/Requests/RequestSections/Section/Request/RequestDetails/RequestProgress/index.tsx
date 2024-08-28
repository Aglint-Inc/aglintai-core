import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';

import { TextWithIconSkeleton } from '@/devlink2/TextWithIconSkeleton';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import NewScheduleEvents from './NewScheduleEvents';
import { TriggerActionsType } from './types';
function RequestProgress({
  request_type,
}: {
  request_type: DatabaseTable['request']['type'];
}) {
  const { request_progress, request_workflow } = useRequest();

  let eventActions: TriggerActionsType = [];
  // console.log(request_workflow.data);
  // if (request_workflow.data) {
  //   eventActions = request_workflow.data.map((r) => r.workflow);
  // }

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
          <ShowCode.When isTrue={request_type === 'schedule_request'}>
            <NewScheduleEvents eventActions={eventActions} />
          </ShowCode.When>
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
