import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils';
import type { Request as RequestType } from '@/queries/requests/types';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import { Notebook, Calendar, Briefcase, User, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { getStatusColor } from '../../utils/getStatusColor';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import MenuOptions from './MenuOptions';
import { Label } from '@components/ui/label';

type RequestProps = RequestType & {
  isExpanded?: boolean;
  mode?: 'expanded' | 'compact' | 'column-view';
};

export const RequestCard = ({ ...props, mode = 'expanded' }: RequestProps) => {
  const { recruiterUser } = useAuthDetails();
  const request = { ...props };

  return (
    <Link href={`/requests/${props.id}`} passHref>
      <Card className='cursor-pointer hover:shadow-md transition-shadow duration-300'>
        <CardHeader className='p-4'>
          <div className='flex justify-between items-center'>
            <CardTitle>
              <Label className='text-lg font-semibold break-words whitespace-normal line-clamp-2'>
                {props.title}
              </Label>
            </CardTitle>
            <div className='flex items-center space-x-2'>
              <Badge
                variant='outline'
                className={cn(
                  'capitalize text-sm px-2 py-1',
                  getStatusColor({ status: props.status }),
                )}
              >
                {capitalizeFirstLetter(props.status)}
              </Badge>
              <MenuOptions request_id={props.id} />
            </div>
          </div>
        </CardHeader>
        {(mode === 'expanded' || mode === 'column-view') && (
          <CardContent className='p-4 tspace-y-4'>
            <div
              className={`grid ${mode === 'column-view' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}
            >
              <div className='space-y-3'>
                <InfoItem
                  icon={<User className='w-4 h-4' />}
                  label='Candidate'
                  value={getFullName(
                    request.applications.candidates.first_name,
                    request.applications.candidates.last_name,
                  )}
                />
                <InfoItem
                  icon={<Briefcase className='w-4 h-4' />}
                  label='Job'
                  value={request.applications.public_jobs.job_title}
                />
              </div>
              <div className='space-y-3'>
                <InfoItem
                  icon={<Calendar className='w-4 h-4' />}
                  label='Schedule'
                  value={`${dayjsLocal(request.schedule_start_date).format('MMM D')} - ${dayjsLocal(request.schedule_end_date).format('MMM D, YYYY')}`}
                />
                <InfoItem
                  icon={<UserCircle className='w-4 h-4' />}
                  label='Created'
                  value={
                    <>
                      <p>
                        {dayjsLocal(request.created_at).fromNow()}{' '}
                        <span className='text-xs text-gray-500'>
                          by{' '}
                          <Link
                            href={`/user/profile/${request.assigner_id}`}
                            target='_blank'
                            className='hover:underline'
                          >
                            {getFullName(
                              request.assigner.first_name,
                              request.assigner.last_name,
                            )}
                            {request.assigner_id === recruiterUser.user_id
                              ? ' (You)'
                              : ''}
                          </Link>
                        </span>
                      </p>
                    </>
                  }
                />
              </div>
            </div>

            {props?.request_note[0]?.note && (
              <div className='text-sm text-gray-600 flex items-start mt-2'>
                <Notebook className='w-4 h-4 mr-2 mt-1 flex-shrink-0' />
                <p className='break-words whitespace-normal line-clamp-2'>
                  {props.request_note[0].note}
                </p>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </Link>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className='flex items-start space-x-2'>
    <div className='mt-1'>{icon}</div>
    <div>
      <p className='text-xs text-gray-500'>{label}</p>
      {typeof value === 'string' ? (
        <p className='text-sm font-medium'>{value}</p>
      ) : (
        value
      )}
    </div>
  </div>
);
