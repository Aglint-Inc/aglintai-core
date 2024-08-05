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

function Section({ priority }: Pick<RequestType, 'priority'>) {
  const {
    requests: { status },
  } = useRequests();

  const requests = [].filter((payload) => payload.priority === priority);
  return (
    <>
      <RequestSection
        textSectionHeader={
          <Stack direction={'row'} spacing={1}>
            <Text
              color={'neutral'}
              size={1}
              content={`${capitalizeAll(priority)} Requests:`}
            />
            <ShowCode>
              <ShowCode.When isTrue={status === 'pending'}>
                <Stack
                  borderRadius={'3px'}
                  position={'relative'}
                  width={'20px'}
                  height={`20px`}
                >
                  <Skeleton />
                </Stack>
              </ShowCode.When>
              <ShowCode.Else>
                <Text
                  color={'neutral'}
                  size={1}
                  // content={`${filteredRequest?.length}`}
                />
              </ShowCode.Else>
            </ShowCode>
          </Stack>
        }
        slotRequestCard={
          <ShowCode>
            <ShowCode.When isTrue={status === 'error'}>
              <>Error</>
            </ShowCode.When>
            <ShowCode.When isTrue={status === 'pending'}>
              <RequestCardSkeletons />
            </ShowCode.When>
            <ShowCode.Else>
              {requests.map((props, i) => {
                return (
                  <RequestProvider key={props.id ?? i} request_id={props.id}>
                    <Request {...{ ...props, index: i }} />
                  </RequestProvider>
                );
              })}
            </ShowCode.Else>
          </ShowCode>
        }
      />
    </>
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
