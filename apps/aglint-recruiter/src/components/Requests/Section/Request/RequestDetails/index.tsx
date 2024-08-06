import { DatabaseTableUpdate } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

import { Text } from '@/devlink/Text';
import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { RequestCardDetail } from '@/devlink2/RequestCardDetail';
import { useRequests } from '@/src/context/RequestsContext';
import type { Request as RequestType } from '@/src/queries/requests/types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import CandidateDetails from './CandidateDetails';
import ReasonDetails from './ReasonDetails';
import RequestProgress from './RequestProgress';
import SessionsCardAndActions from './SessionsCardAndActions';

function RequestDetails({
  request,
}: {
  request: PropsWithChildren<RequestType>;
  index: number;
}) {
  const { handleAsyncUpdateRequest } = useRequests();

  return (
    <RequestCardDetail
      slotTextWithIconDetail={
        <Stack direction={'column'} gap={1}>
          <SessionsCardAndActions
            request={request}
            sessions={request.request_relation.map((relation) => {
              return {
                id: relation.interview_session.id,
                name: relation.interview_session.name,
              };
            })}
          />
          <CandidateDetails
            candidateName={getFullName(
              request.applications.candidates.first_name,
              request.applications.candidates.last_name,
            )}
            jobTitle={request.applications.public_jobs.job_title}
            dateRange={{
              start_date: dayjsLocal().format('YYYY-MM-DD'),
              end_date: dayjsLocal().add(7, 'day').format('YYYY-MM-DD'),
            }}
          />
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
            <Text
              content={getFullName(
                request.assigner.first_name,
                request.assigner.last_name,
              )}
            />
          </Stack>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Text
              size={1}
              color={'neutral'}
              content={dayjsLocal(request.created_at).fromNow()}
            />
            <Text content={'Aglint'} />
          </Stack>
        </>
      }
      isBodyVisible={true}
      slotBody={
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
            <ButtonSoft
              onClickButton={{
                onClick: async () => {
                  await handleAsyncUpdateRequest({
                    payload: {
                      requestId: request.id,
                      requestPayload: { status: 'in_progress' },
                    },
                  });
                  toast.message('Request updated successfully');
                },
              }}
              size={1}
              textButton={'Proceed'}
            />
          </Stack>
        </>
      }
    />
  );
}

export default RequestDetails;

export const updateRequestSessionRelations = async ({
  id,
  ...rest
}: DatabaseTableUpdate['request']) =>
  (
    await supabase
      .from('request')
      .update({ ...rest })
      .eq('id', id)
      .select('*')
      .throwOnError()
  ).data;
