import type { DatabaseTable } from '@aglint/shared-types';
import { TextWithIconSkeleton } from '@devlink2/TextWithIconSkeleton';
import { Stack } from '@mui/material';

import { ShowCode } from '@/components/Common/ShowCode';
import { useRequest } from '@/context/RequestContext';

import CandidateCancelled from './CandidateCancelled';
import NewScheduleEvents from './NewScheduleEvents';
function RequestProgress({
  requestDetails,
}: {
  requestDetails: DatabaseTable['request'];
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
            <ShowCode.When isTrue={requestDetails.type === 'schedule_request'}>
              <NewScheduleEvents />
            </ShowCode.When>
            <ShowCode.When isTrue={requestDetails.type === 'decline_request'}>
              <>decline</>
            </ShowCode.When>
            <ShowCode.When
              isTrue={requestDetails.type === 'reschedule_request'}
            >
              <NewScheduleEvents />
            </ShowCode.When>
            <ShowCode.When
              isTrue={requestDetails.type === 'cancel_schedule_request'}
            >
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
