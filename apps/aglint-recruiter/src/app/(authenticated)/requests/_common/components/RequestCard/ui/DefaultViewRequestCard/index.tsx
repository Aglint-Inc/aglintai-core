import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Label } from '@components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { cn } from '@lib/utils';
import { getStatusColor } from '@requests/utils';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  StickyNote,
  User,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

function DefaultViewRequestCard({
  props,
  isCompactList,
  isExpanded,
  setIsExpanded,
  currentUserId,
}) {
  const { mode = 'expanded' } = props;
  return (
    <Card
      className={cn(
        'group cursor-pointer transition-shadow duration-300',
        isCompactList &&
          'rounded-none border-none shadow-none hover:bg-gray-50',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between p-4',
          isCompactList && 'px-2 py-3',
        )}
      >
        <Link href={`/requests/${props.id}`} passHref className='flex-grow'>
          <div className='flex items-center space-x-2'>
            <Label
              className={cn(
                'line-clamp-1 flex-grow whitespace-normal break-words text-base',
                {
                  'font-semibold': !isCompactList,
                  'text-sm font-normal': isCompactList,
                },
              )}
            >
              {props.title}
            </Label>
            {isCompactList ? (
              <Button
                variant='ghost'
                size='sm'
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </Button>
            ) : (
              <></>
              // <RequestOverflowMenu request_id={props.id} />
            )}
          </div>
        </Link>
      </div>
      {(mode === 'expanded' || (isCompactList && isExpanded)) && (
        <CardContent
          className={cn(
            'space-y-4 p-4 pt-0',
            isCompactList && 'space-y-2 bg-gray-50 p-2',
          )}
        >
          <div
            className={cn(
              '',
              mode === 'compact-list' && '',
              mode !== 'compact-list' && '',
            )}
          >
            <div className='space-y-3'>
              <div className='flex gap-2'>
                <Badge
                  variant='secondary'
                  className={cn(
                    'px-3 py-0.5 text-xs capitalize',
                    mode === 'compact-list' && 'px-1.5 py-0.5 text-xs',
                    {
                      'border-purple-300 bg-purple-100/50 text-purple-800/90':
                        props.type === 'schedule_request',
                      'border-orange-300 bg-orange-100/50 text-orange-800/90':
                        props.type === 'cancel_schedule_request',
                      'border-pink-300 bg-pink-100/50 text-pink-800/90':
                        props.type === 'decline_request',
                      'border-indigo-300 bg-indigo-100/50 text-indigo-800/90':
                        props.type === 'reschedule_request',
                    },
                  )}
                >
                  {capitalizeFirstLetter(props.type)}
                </Badge>
                <Badge
                  variant='outline'
                  className={cn(
                    'px-3 py-0.5 text-xs capitalize',
                    getStatusColor({ status: props.status }),
                    mode === 'compact-list' && 'px-1.5 py-0.5 text-xs',
                    {
                      'border-yellow-300 bg-yellow-100/50 text-yellow-800/90':
                        props.status === 'to_do',
                      'border-blue-300 bg-blue-100/50 text-blue-800/90':
                        props.status === 'in_progress',
                      'border-red-300 bg-red-100/50 text-red-800/90':
                        props.status === 'blocked',
                      'border-green-300 bg-green-100/50 text-green-800/90':
                        props.status === 'completed',
                    },
                  )}
                >
                  {capitalizeFirstLetter(props.status)}
                </Badge>
                {props?.request_note[0]?.note && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant='outline'
                          className='px-3 py-0.5 text-xs capitalize'
                        >
                          {' '}
                          <StickyNote className='mr-1 h-3 w-3' />
                          Note
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent className='max-w-xs p-2'>
                        <p className='text-sm'>{props.request_note[0].note}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <div className='flex items-start space-y-3'>
                  <InfoItem
                    icon={<></>}
                    label=''
                    value={
                      <>
                        <div className='flex flex-row items-center gap-4'>
                          <div className='flex flex-row items-center space-x-2'>
                            {<UserCircle className='h-4 w-4' />}
                            <Link
                              href={`/user/${props.assigner_id}`}
                              target='_blank'
                              className='hover:underline'
                            >
                              {getFullName(
                                props.assigner.first_name,
                                props.assigner.last_name,
                              )}
                              {props.assigner_id === currentUserId
                                ? ' (You)'
                                : ''}
                            </Link>
                          </div>
                          <div className='text-xs text-gray-500'>
                            {dayjsLocal(props.created_at).fromNow()}{' '}
                          </div>
                        </div>
                      </>
                    }
                  />
                </div>
              </div>
              <InfoItem
                icon={<Calendar className='h-4 w-4' />}
                label='Proposed Interview Date'
                variant='column'
                value={
                  <>
                    <div className='mt-1'>
                      {props.request_relation.map((ele, index) => (
                        <span key={index}>
                          <Link
                            href={`/application/${props.application_id}/sessions/${ele.interview_session.id}`}
                            className='hover:underline'
                          >
                            {ele.interview_session.name}
                          </Link>
                          {index < props.request_relation.length - 1 &&
                            (index === props.request_relation.length - 2
                              ? ' and '
                              : ', ')}
                        </span>
                      ))}
                      {props.request_relation.length > 0 && ' on '}
                      {dayjsLocal(props.schedule_start_date).format(
                        'MMMM D, YYYY',
                      )}
                    </div>
                  </>
                }
              />
              <InfoItem
                icon={<User className='h-4 w-4' />}
                label='Candidate and Job'
                variant='column'
                value={
                  <>
                    <Link
                      href={`/candidate/${props.applications.candidates.id}`}
                      className='hover:underline'
                    >
                      {getFullName(
                        props.applications.candidates.first_name,
                        props.applications.candidates.last_name,
                      )}
                    </Link>
                    {' for '}
                    <Link
                      href={`/job/${props.applications.public_jobs.id}`}
                      className='hover:underline'
                    >
                      {props.applications.public_jobs.job_title}
                    </Link>
                  </>
                }
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default DefaultViewRequestCard;

const InfoItem = ({
  icon,
  label,
  value,
  variant = 'row', // Added variant prop
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  variant?: 'row' | 'column'; // Added variant type
}) => {
  if (variant === 'column') {
    return (
      <div className='flex flex-col items-start space-x-2'>
        <div className='flex flex-row items-center gap-1'>
          <div className=''>
            {React.cloneElement(icon as React.ReactElement, {
              className: 'w-3 h-3',
            })}
          </div>
          <p className='text-2xs text-gray-500'>{label}</p>
        </div>
        <div className='flex flex-row items-start gap-1 pl-2'>
          {typeof value === 'string' ? (
            <p className='ml-3 text-xs font-medium'>{value}</p>
          ) : (
            value
          )}
        </div>
      </div>
    );
  }

  // Default row layout
  return (
    <div className='flex items-start space-x-2'>
      <div className='mt-0.5'>
        {React.cloneElement(icon as React.ReactElement, {
          className: 'w-3 h-3',
        })}
      </div>
      <div className='flex flex-row items-center gap-2'>
        <p className='text-2xs text-gray-500'>{label}</p>
        {typeof value === 'string' ? (
          <p className='text-xs font-medium'>{value}</p>
        ) : (
          value
        )}
      </div>
    </div>
  );
};
