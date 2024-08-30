import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';

import { TextWithIconSkeleton } from '@/devlink2/TextWithIconSkeleton';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

import CandidateCancelled from './CandidateCancelled';
import NewScheduleEvents from './NewScheduleEvents';
function RequestProgress({
  request_type,
}: {
  request_type: DatabaseTable['request']['type'];
}) {
  const { request_progress } = useRequest();
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
          <ShowCode>
            <ShowCode.When isTrue={request_type === 'schedule_request'}>
              <NewScheduleEvents />
            </ShowCode.When>
            <ShowCode.When isTrue={request_type === 'cancel_schedule_request'}>
              <CandidateCancelled />
            </ShowCode.When>
          </ShowCode>
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
