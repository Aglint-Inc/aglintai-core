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
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  StickyNote,
  User,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import type { Request as RequestType } from '@/queries/requests/types';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { getStatusColor } from '../../utils';

interface RequestProps extends RequestType {
  isExpanded?: boolean;
  mode?: 'expanded' | 'compact' | 'column-view' | 'compact-list';
}

export const RequestCard = ({ ...props }: RequestProps) => {
  const { recruiterUser } = useAuthDetails();
  const request = { ...props };
  const { mode = 'expanded' } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const isCompactList = mode === 'compact-list';
  const isColumnView = mode === 'column-view';

  if (isColumnView) {
    return <ColumnViewRequestCard {...props} />;
  }

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
                        request.type === 'schedule_request',
                      'border-orange-300 bg-orange-100/50 text-orange-800/90':
                        request.type === 'cancel_schedule_request',
                      'border-pink-300 bg-pink-100/50 text-pink-800/90':
                        request.type === 'decline_request',
                      'border-indigo-300 bg-indigo-100/50 text-indigo-800/90':
                        request.type === 'reschedule_request',
                    },
                  )}
                >
                  {capitalizeFirstLetter(request.type)}
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
                              href={`/user/${request.assigner_id}`}
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
                          </div>
                          <div className='text-xs text-gray-500'>
                            {dayjsLocal(request.created_at).fromNow()}{' '}
                          </div>
                        </div>
                      </>
                    }
                  />
                  {/* <div className='flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                <Button
                  variant='default'
                  size='sm'
                  className='text-xs font-medium transition-colors duration-200'
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add your logic here to proceed with Aglint AI
                    //console.log('Proceeding with Aglint AI');
                  }}
                >
                  <Bot className='w-3 h-3 mr-1' />
                  Proceed with Aglint AI
                </Button>
              </div> */}
                  {/* hided hover button for now */}
                </div>
              </div>
              <InfoItem
                icon={<Calendar className='h-4 w-4' />}
                label='Proposed Interview Date'
                variant='column'
                value={
                  <>
                    <div className='mt-1'>
                      {request.request_relation.map((ele, index) => (
                        <span key={index}>
                          <Link
                            href={`/application/${request.application_id}/sessions/${ele.interview_session.id}`}
                            className='hover:underline'
                          >
                            {ele.interview_session.name}
                          </Link>
                          {index < request.request_relation.length - 1 &&
                            (index === request.request_relation.length - 2
                              ? ' and '
                              : ', ')}
                        </span>
                      ))}
                      {request.request_relation.length > 0 && ' on '}
                      {dayjsLocal(request.schedule_start_date).format(
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
                      href={`/candidate/${request.applications.candidates.id}`}
                      className='hover:underline'
                    >
                      {getFullName(
                        request.applications.candidates.first_name,
                        request.applications.candidates.last_name,
                      )}
                    </Link>
                    {' for '}
                    <Link
                      href={`/job/${request.applications.public_jobs.id}`}
                      className='hover:underline'
                    >
                      {request.applications.public_jobs.job_title}
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
};

const ColumnViewRequestCard = ({ ...props }: RequestProps) => {
  return (
    <Card className='group w-full cursor-pointer p-2 transition-shadow duration-300'>
      <Link href={`/requests/${props.id}`} passHref>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label className='line-clamp-1 text-xs font-semibold'>
              {props.title}
            </Label>
            {/* <RequestOverflowMenu request_id={props.id} /> */}
          </div>
          <div className='flex flex-wrap gap-1'>
            <Badge
              variant='secondary'
              className={cn('px-1 py-0.5 text-xs capitalize', {
                'border-purple-300 bg-purple-100/50 text-purple-800/90':
                  props.type === 'schedule_request',
                'border-orange-300 bg-orange-100/50 text-orange-800/90':
                  props.type === 'cancel_schedule_request',
                'border-pink-300 bg-pink-100/50 text-pink-800/90':
                  props.type === 'decline_request',
                'border-indigo-300 bg-indigo-100/50 text-indigo-800/90':
                  props.type === 'reschedule_request',
              })}
            >
              {capitalizeFirstLetter(props.type)}
            </Badge>
            <Badge
              variant='outline'
              className={cn(
                'px-1 py-0.5 text-xs capitalize',
                getStatusColor({ status: props.status }),
              )}
            >
              {capitalizeFirstLetter(props.status)}
            </Badge>
          </div>
          <div className='text-xs'>
            <div className='flex items-center'>
              <Calendar className='mr-1 h-3 w-3' />
              {dayjsLocal(props.schedule_start_date).format('MMM D, YYYY')}
            </div>
            <div className='mt-1 flex items-center'>
              <User className='mr-1 h-3 w-3' />
              {getFullName(
                props.applications.candidates.first_name,
                props.applications.candidates.last_name,
              )}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

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