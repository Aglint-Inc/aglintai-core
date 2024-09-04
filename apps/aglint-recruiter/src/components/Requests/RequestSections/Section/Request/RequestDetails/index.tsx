/* eslint-disable jsx-a11y/no-static-element-interactions */
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import { type PropsWithChildren } from 'react';

import { Text } from '@/devlink/Text';
import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { RequestCardDetail } from '@/devlink2/RequestCardDetail';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';
import type { Request as RequestType } from '@/src/queries/requests/types';

import CandidateDetails from './Components/CandidateDetails';
import SessionsCardAndActions from './Components/SessionsCardAndActions';
import RequestProgress from './RequestProgress';

function RequestDetails({
  request,
}: {
  request: PropsWithChildren<RequestType>;
  index: number;
}) {
  const { handleAsyncUpdateRequest } = useRequests();
  const { recruiterUser } = useAuthDetails();

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
            job_id={request.applications.public_jobs.id}
            application_id={request.application_id}
          />
          <CandidateDetails
            candidateDetails={{
              name: getFullName(
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
            <Text size={1} color={'neutral'} content={'Created by:'} />
            <div
              onClick={() => {
                window.open(`/user/profile/${request.assigner_id}`, '_blank');
              }}
              style={{
                cursor: 'pointer',
              }}
            >
              <Text
                content={
                  getFullName(
                    request.assigner.first_name,
                    request.assigner.last_name,
                  ) +
                  `${
                    request.assigner_id === recruiterUser.user_id
                      ? ' (You)'
                      : ''
                  }`
                }
              />
            </div>
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
      isBodyVisible={false}
      slotBody={
        <>
          <RequestProgress requestDetails={request} />
          {Boolean(
            request.status === 'to_do' &&
              request.type === 'schedule_request' &&
              request.applications.public_jobs.workflow_job_relation.length > 0,
          ) && (
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
