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

import CandidateDetails from './CandidateDetails';
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
            application_id={request.applications.id}
          />
          <CandidateDetails
            candidateDetails={{
              name:getFullName(
                request.applications.candidates.first_name,
                request.applications.candidates.last_name,
              ),
              application_id: request.application_id,
            }}
            jobDetails={{
              id: request.applications.public_jobs.id,
              job_title: request.applications.public_jobs.job_title,
            }}
            dateRange={{
              start_date: request.schedule_start_date,
              end_date: request.schedule_end_date,
            }}
          />
          {/* <ReasonDetails />// reason */}
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
          <Stack
            direction={'row'}
            spacing={1}
            alignItems={'center'}
            justifyContent={'end'}
          >
            <Text
              size={1}
              color={'neutral'}
              content={dayjsLocal(request.created_at).fromNow()}
            />
            {/* <Text content={'Aglint'} /> */}
          </Stack>
        </>
      }
      isBodyVisible={true}
      slotBody={
        <>
          <RequestProgress
          
        // workflow={}
          request_type={request.type} />

          {Boolean(request.status === 'to_do') && (
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
                  },
                }}
                size={1}
                textButton={'Proceed'}
              />
            </Stack>
          )}
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
