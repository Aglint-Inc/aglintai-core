import { Stack } from '@mui/material';

import { RequestCardSkeleton } from '@/devlink2/RequestCardSkeleton';
import { RequestSection } from '@/devlink2/RequestSection';
import { Skeleton } from '@/devlink2/Skeleton';
import { Text } from '@/devlink2/Text';
import { useRequests } from '@/src/context/RequestsContext';

import { ShowCode } from '../../Common/ShowCode';
import { Request } from './Request';

function Section({ textSectionHeader }: { textSectionHeader: string }) {
  const {
    requests: { status },
    filteredRequest,
  } = useRequests();

  return (
    <>
      <RequestSection
        textSectionHeader={
          <Stack direction={'row'} spacing={1}>
            <Text
              color={'neutral'}
              size={1}
              content={`${textSectionHeader}:`}
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
                  content={`${filteredRequest?.length}`}
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
              {(filteredRequest ?? []).map((props, i) => {
                return (
                  <Request key={props.id ?? i} {...{ ...props, index: i }} />
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
