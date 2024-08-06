import { Stack } from '@mui/material';

import { RequestCardSkeleton } from '@/devlink2/RequestCardSkeleton';
import { RequestSection } from '@/devlink2/RequestSection';
import { Skeleton } from '@/devlink2/Skeleton';
import { Text } from '@/devlink2/Text';
import { RequestProvider } from '@/src/context/RequestContext';
import { useRequests } from '@/src/context/RequestsContext';
import { Request as RequestType } from '@/src/queries/requests/types';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { ShowCode } from '../../Common/ShowCode';
import { Request } from './Request';

function Section({
  requests,
  priority,
}: {
  requests: RequestType[];
  priority: RequestType['priority'];
}) {
  const {
    requests: { status },
  } = useRequests();

  return (
    <ShowCode>
      <ShowCode.When isTrue={Boolean(status === 'success' && requests.length)}>
        <RequestSection
          textSectionHeader={
            <Stack direction={'row'} spacing={1}>
              <Text
                color={'neutral'}
                size={1}
                content={`${capitalizeAll(priority)} Requests:`}
              />

              <Text color={'neutral'} size={1} content={`${requests.length}`} />
            </Stack>
          }
          slotRequestCard={requests.map((props, i) => {
            return (
              <RequestProvider key={props.id ?? i} request_id={props.id}>
                <Request {...{ ...props, index: i }} />
              </RequestProvider>
            );
          })}
        />
      </ShowCode.When>
      <ShowCode.When isTrue={Boolean(status === 'pending')}>
        <RequestSection
          textSectionHeader={
            <Stack direction={'row'} spacing={1}>
              <Text
                color={'neutral'}
                size={1}
                content={`${capitalizeAll(priority)} Requests:`}
              />

              <Stack
                borderRadius={'3px'}
                position={'relative'}
                width={'20px'}
                height={`20px`}
              >
                <Skeleton />
              </Stack>
            </Stack>
          }
          slotRequestCard={<RequestCardSkeletons />}
        />
      </ShowCode.When>
      <ShowCode.When isTrue={Boolean(status === 'error')}>Error</ShowCode.When>
    </ShowCode>
  );
}

export default Section;

function RequestCardSkeletons() {
  return (
    <>
      <RequestCardSkeleton />
      <RequestCardSkeleton />
      <RequestCardSkeleton />
    </>
  );
}
