import Link from 'next/link';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequests } from '@/context/RequestsContext';
import type { Request as RequestType } from '@/queries/requests/types';

import CandidateDetails from './Components/CandidateDetails';
import SessionsCardAndActions from './Components/SessionsCardAndActions';
import RequestProgress from './RequestProgress';

function RequestDetails({ request }: { request: RequestType; index: number }) {
  const { handleAsyncUpdateRequest } = useRequests();
  const { recruiterUser } = useAuthDetails();
  var showFooter = false;

  return (
    <Card className='p-0 border-none shadow-none'>
      <CardContent className='p-0'>
        <div className='flex flex-col md:flex-row justify-between gap-4'>
          <div className='flex-1'>
            <SessionsCardAndActions
              request={request}
              sessions={request.request_relation.map((relation) => ({
                id: relation.interview_session.id,
                name: relation.interview_session.name,
              }))}
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
          </div>
          <div className='flex flex-col items-end gap-2'>
            <div className='flex items-center gap-2'>
              <p className='text-sm text-gray-500'>Created by:</p>
              <Link
                href={`/user/profile/${request.assigner_id}`}
                target='_blank'
              >
                <span className='cursor-pointer'>
                  {getFullName(
                    request.assigner.first_name,
                    request.assigner.last_name,
                  )}
                  {request.assigner_id === recruiterUser.user_id
                    ? ' (You)'
                    : ''}
                </span>
              </Link>
            </div>
            <p className='text-sm text-gray-500'>
              {dayjsLocal(request.created_at).fromNow()}
            </p>
          </div>
        </div>
      </CardContent>
      {showFooter && (
        <CardFooter className='flex flex-col gap-4'>
          <RequestProgress />
          {request.status === 'to_do' &&
            request.type === 'schedule_request' &&
            request.applications.public_jobs.workflow_job_relation.length >
              0 && (
              <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                <p className='text-accent'>
                  When you click &quot;Proceed,&quot; Aglint AI will perform
                  above tasks for you
                </p>
                <Button
                  onClick={async () => {
                    await handleAsyncUpdateRequest({
                      payload: {
                        requestId: request.id,
                        requestPayload: { status: 'in_progress' },
                      },
                    });
                  }}
                  size='sm'
                >
                  Proceed
                </Button>
              </div>
            )}
        </CardFooter>
      )}
    </Card>
  );
}

export default RequestDetails;
