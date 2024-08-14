import { Stack } from '@mui/material';

import { RequestCardSkeleton } from '@/devlink2/RequestCardSkeleton';
import { Text } from '@/devlink2/Text';
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
      <Stack width={'100%'} direction={'row'} spacing={2} alignItems={'center'}>
        <TextWithIcon
          color={color}
          iconName={sectionIconName}
          iconSize={4}
          textContent={`${capitalizeFirstLetter(sectionName)} (${requests.length})`}
        />
        {!requests.length && (
          <Text
            size={1}
            color={'neutral'}
            content={`No ${capitalizeFirstLetter(sectionName).replace('Request', '')} Requests.`}
          />
        )}
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

          <ShowCode.When isTrue={isLoadingRequests}>
            <RequestCardSkeletons />
          </ShowCode.When>
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
