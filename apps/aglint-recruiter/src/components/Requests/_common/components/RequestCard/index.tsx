import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils';

import type { Request as RequestType } from '@/queries/requests/types';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { Notebook } from 'lucide-react';
import Link from 'next/link';
import { getStatusColor } from '../../utils/getStatusColor';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import CandidateDetails from './Components/CandidateDetails';
import SessionsCardAndActions from './Components/SessionsCardAndActions';
import MenuOptions from './MenuOptions';

type RequestProps = RequestType & { isExpanded?: boolean };

export const RequestCard = ({ ...props }: RequestProps & { index: number }) => {
  const { recruiterUser } = useAuthDetails();
  const request = { ...props };
  return (
    <>
      <Link href={`/requests/${props.id}`} passHref>
        <Card className='cursor-pointer'>
          <CardHeader className='p-3'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-base'>{props.title}</CardTitle>
              <div className='flex items-center space-x-2'>
                <Badge
                  variant='outline'
                  className={cn(
                    'capitalize',
                    getStatusColor({ status: props.status }),
                  )}
                >
                  {capitalizeFirstLetter(props.status)}
                </Badge>
                <MenuOptions request_id={props.id} />
              </div>
            </div>
          </CardHeader>
          <CardContent className='p-3'>
            <div onClick={(e) => e.stopPropagation()}>
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
              </Card>
              {props?.request_note[0]?.note && (
                <div className='text-sm text-gray-600 flex items-center'>
                  <Notebook className='w-4 h-4 mr-1 flex-shrink-0' />
                  <span className='line-clamp-2 text-ellipsis'>
                    {props.request_note[0].note}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};
