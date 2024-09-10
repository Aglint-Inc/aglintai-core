import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import type { Request as RequestType } from '@/queries/requests/types';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Badge } from '@components/ui/badge';
import { Card, CardContent } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { cn } from '@lib/utils';
import { Bot, Calendar, UserCircle, User, StickyNote } from 'lucide-react';
import Link from 'next/link';
import { getStatusColor } from '../../utils/getStatusColor';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@components/ui/button';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import MenuOptions from './MenuOptions';

type RequestProps = RequestType & {
  isExpanded?: boolean;
  mode?: 'expanded' | 'compact' | 'column-view' | 'compact-list';
};

export const RequestCard = ({ ...props }: RequestProps) => {
  const { recruiterUser } = useAuthDetails();
  const request = { ...props };
  const { mode = 'expanded' } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const isCompactList = mode === 'compact-list';

  return (
    <Card
      className={cn(
        'cursor-pointer transition-shadow duration-300 group',
        isCompactList &&
          'border-none hover:bg-gray-50 shadow-none rounded-none',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between p-4',
          isCompactList && 'py-3 px-2',
        )}
      >
        <Link href={`/requests/${props.id}`} passHref className='flex-grow'>
          <div className='flex items-center space-x-2'>
            {props?.request_note[0]?.note && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <StickyNote className='w-4 h-4 text-yellow-500' />
                  </TooltipTrigger>
                  <TooltipContent className='max-w-xs p-2'>
                    <p className='text-sm'>{props.request_note[0].note}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <Label
              className={cn(
                'text-base break-words whitespace-normal line-clamp-1 flex-grow',
                {
                  'font-semibold': !isCompactList,
                  'font-normal text-sm': isCompactList,
                },
              )}
            >
              {props.title}
            </Label>
            <Badge
              variant='secondary'
              className={cn(
                'capitalize text-xs px-1.5 py-0.5',
                mode === 'compact-list' && 'text-xs px-1.5 py-0.5',
                {
                  'bg-purple-100/50 text-purple-800/90 border-purple-300':
                    request.type === 'schedule_request',
                  'bg-orange-100/50 text-orange-800/90 border-orange-300':
                    request.type === 'cancel_schedule_request',
                  'bg-pink-100/50 text-pink-800/90 border-pink-300':
                    request.type === 'decline_request',
                  'bg-indigo-100/50 text-indigo-800/90 border-indigo-300':
                    request.type === 'reschedule_request',
                },
              )}
            >
              {capitalizeFirstLetter(request.type)}
            </Badge>
            <Badge
              variant='outline'
              className={cn(
                'capitalize text-xs px-1.5 py-0.5',
                getStatusColor({ status: props.status }),
                mode === 'compact-list' && 'text-xs px-1.5 py-0.5',
                {
                  'bg-yellow-100/50 text-yellow-800/90 border-yellow-300':
                    props.status === 'to_do',
                  'bg-blue-100/50 text-blue-800/90 border-blue-300':
                    props.status === 'in_progress',
                  'bg-red-100/50 text-red-800/90 border-red-300':
                    props.status === 'blocked',
                  'bg-green-100/50 text-green-800/90 border-green-300':
                    props.status === 'completed',
                },
              )}
            >
              {capitalizeFirstLetter(props.status)}
            </Badge>
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
              <MenuOptions request_id={props.id} />
            )}
          </div>
        </Link>
      </div>
      {(mode === 'expanded' ||
        mode === 'column-view' ||
        (isCompactList && isExpanded)) && (
        <CardContent
          className={cn(
            'p-4 space-y-4',
            isCompactList && 'p-2 space-y-2 bg-gray-50',
          )}
        >
          <div
            className={cn(
              'grid gap-2',
              mode === 'column-view' && 'grid-cols-1',
              mode === 'compact-list' && 'grid-cols-3',
              mode !== 'column-view' &&
                mode !== 'compact-list' &&
                'grid-cols-[70%_30%]',
            )}
          >
            <div className='space-y-3'>
              <InfoItem
                icon={<Calendar className='w-4 h-4' />}
                label='Proposed Interview Date'
                value={
                  <>
                    <div className='mt-1'>
                      {request.request_relation.map((ele, index) => (
                        <span key={index}>
                          <Link
                            href={`/application/${request.application_id}/sessions/${ele.interview_session.id}`}
                            className='text-blue-600 hover:underline'
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
                icon={<User className='w-4 h-4' />}
                label='Candidate and Job'
                value={
                  <>
                    <Link
                      href={`/candidate/${request.applications.candidates.id}`}
                      className='text-blue-600 hover:underline'
                    >
                      {getFullName(
                        request.applications.candidates.first_name,
                        request.applications.candidates.last_name,
                      )}
                    </Link>
                    {' for '}
                    <Link
                      href={`/job/${request.applications.public_jobs.id}`}
                      className='text-blue-600 hover:underline'
                    >
                      {request.applications.public_jobs.job_title}
                    </Link>
                  </>
                }
              />
            </div>

            <div className='space-y-3'>
              <InfoItem
                icon={<UserCircle className='w-4 h-4' />}
                label='Created'
                value={
                  <>
                    <p>
                      <div>
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
                      </div>
                      <div className='text-xs text-gray-500'>
                        {dayjsLocal(request.created_at).fromNow()}{' '}
                      </div>
                    </p>
                  </>
                }
              />
              <div className='flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
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
              </div>
            </div>
          </div>

          {/* {props?.request_note[0]?.note && (
            <div
              className={cn(
                'text-xs text-gray-600 flex items-start mt-2',
                isCompactList && 'text-xs',
              )}
            >
              <Notebook
                className={cn(
                  'w-3 h-3 mr-2 mt-0.5 flex-shrink-0',
                  isCompactList && 'w-3 h-3',
                )}
              />
              <p className='break-words whitespace-normal line-clamp-2'>
                {props.request_note[0].note}
              </p>
            </div>
          )} */}
        </CardContent>
      )}
    </Card>
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
    <div className='mt-0.5'>
      {React.cloneElement(icon as React.ReactElement, { className: 'w-3 h-3' })}
    </div>
    <div>
      <p className='text-2xs text-gray-500'>{label}</p>
      {typeof value === 'string' ? (
        <p className='text-xs font-medium'>{value}</p>
      ) : (
        value
      )}
    </div>
  </div>
);
