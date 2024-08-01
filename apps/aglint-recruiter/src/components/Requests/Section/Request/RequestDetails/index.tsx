import { Text } from '@/devlink/Text';
import { ButtonSoft } from '@/devlink2';
import { RequestCardDetail } from '@/devlink2/RequestCardDetail';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { useRequest } from '@/src/context/RequestContext';
import { Stack } from '@mui/material';
import React from 'react';
import SessionsCardAndActions from './SessionsCardAndActions';
import ReasonDetails from './ReasonDetails';
import CandidateDetails from './CandidateDetails';
import RequestProgress, { RequestProgressSkeleton } from './RequestProgress';
import { TextWithIconSkeleton } from '@/devlink2/TextWithIconSkeleton';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { RequestCardSkeleton } from '@/devlink2/RequestCardSkeleton';
import { ReqCardDetailSkeleton } from '@/devlink2/ReqCardDetailSkeleton';

function RequestDetails() {
  const {
    request_progress: { data, status },
  } = useRequest();

  // if (status === 'error') return <>Error</>;
  // if (status === 'pending') return <>Loading...</>;
  return (
    <RequestCardDetail
      slotTextWithIconDetail={
        <Stack direction={'column'} gap={1}>
          <SessionsCardAndActions />
          <CandidateDetails />
          <ReasonDetails />
        </Stack>
      }
      slotRightText={
        <>
          <Stack
            justifyContent={'end'}
            direction={'row'}
            spacing={1}
            alignItems={'center'}
          >
            <Text size={1} color={'neutral'} content={'From'} />
            <Text content={'Sara '} />
          </Stack>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Text size={1} color={'neutral'} content={'4 hours ago via'} />
            <Text content={'Greenhouse'} />
          </Stack>
        </>
      }
      isBodyVisible={true}
      slotBody={
        <ShowCode>
          <ShowCode.When isTrue={status === 'pending'}>
            <RequestProgressSkeleton />
          </ShowCode.When>
          <ShowCode.Else>
            <>
              <RequestProgress />
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Text
                  color={'accent'}
                  content={
                    'When you click “Proceed,” Aglint AI will perform above tasks for you'
                  }
                  highContrast={false}
                />
                <ButtonSoft size={1} textButton={'Proceed'} />
              </Stack>
            </>
          </ShowCode.Else>
        </ShowCode>
      }
    />
  );
}

export default RequestDetails;
