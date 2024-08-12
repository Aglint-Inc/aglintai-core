import { Stack } from '@mui/material';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { RequestCardSkeleton } from '@/devlink2/RequestCardSkeleton';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { RequestProvider } from '@/src/context/RequestContext';
import { useRequests } from '@/src/context/RequestsContext';
import {
  Request as RequestType,
  RequestResponse,
} from '@/src/queries/requests/types';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import { ShowCode } from '../../../Common/ShowCode';
import { Request } from './Request';

function Section({
  requests,
  sectionName,
  sectionIconName,
  color,
  isLoadingRequests,
}: {
  requests: RequestType[];
  sectionName: keyof RequestResponse;
  sectionIconName: string;
  color: string;
  isLoadingRequests: boolean;
}) {
  const {
    requests: { status },
  } = useRequests();
  return (
    <Stack gap={2}>
      <Stack
        width={'100%'}
        direction={'row'}
        justifyContent={'space-between'}
        alignContent={'center'}
        sx={{
          cursor: 'pointer',
        }}
      >
        <TextWithIcon
          color={color}
          iconName={sectionIconName}
          textContent={`${capitalizeFirstLetter(sectionName)} (${requests.length})`}
        />
      </Stack>
      <Stack
        gap={1}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ShowCode>
          <ShowCode.When
            isTrue={Boolean(status === 'success' && requests.length)}
          >
            {requests.map((props, i) => {
              return (
                <RequestProvider key={props.id ?? i} request_id={props.id}>
                  <Request {...{ ...props, index: i }} />
                </RequestProvider>
              );
            })}
          </ShowCode.When>

          <ShowCode.When
            isTrue={Boolean(
              !isLoadingRequests && status === 'success' && !requests.length,
            )}
          >
            <GlobalEmptyState
              iconName={sectionIconName}
              styleEmpty={{
                style: {
                  background: 'var(--neutral-2)',
                },
              }}
              
              textDesc={`No ${capitalizeFirstLetter(sectionName).replace('Request', '')} Requests.`}
              // textDesc={`No ${capitalizeFirstLetter(sectionName).replace('Request', '')} requests at the moment please check back later.`}
            />
          </ShowCode.When>
          <ShowCode.Else>
            <RequestCardSkeletons />
          </ShowCode.Else>
        </ShowCode>
      </Stack>
    </Stack>
  );
}

export default Section;

export function RequestCardSkeletons() {
  return (
    <>
      <RequestCardSkeleton />
      <RequestCardSkeleton />
      <RequestCardSkeleton />
      <RequestCardSkeleton />
      <RequestCardSkeleton />
    </>
  );
}
