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
  Clock,
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
        'group transition-shadow duration-300 relative',
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
        <Link href={`/requests/${props.id}`} passHref className='flex-grow cursor-pointer '>
          <div className='flex items-center space-x-2 cursor-pointer hover:underline'>
            <Label
              className={cn(
                'line-clamp-1 flex-grow whitespace-normal cursor-pointer break-words text-md ',
                {
                  'font-medium': !isCompactList,
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
              className='text-xs'
                  variant={
                    props?.status === 'to_do'
                      ? 'secondary'
                      : props?.status === 'in_progress'
                        ? 'in_progress'
                        : props?.status === 'completed'
                          ? 'completed'
                          : 'destructive'
                  }
                >
                  {capitalizeFirstLetter(props.status)}
                </Badge>
                <Badge
                className='text-xs'
                  variant={
                    props?.type === 'decline_request'
                      ? 'destructive'
                      : 'secondary'
                  }
                >
                  {capitalizeFirstLetter(props.type)}
                </Badge>
              <div className=''>
                {props?.request_note[0]?.note && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant='outline'
                          className='px-3 py-0.5 text-xs capitalize '
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
                </div>
                <div className='flex items-start space-y-3'>
                  <InfoItem
                    icon={<></>}
                    label=''
                    value={
                      <>
                        <div className='flex flex-row items-center gap-4'>
                          <div className='flex flex-row items-center space-x-2 text-sm'>
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
                          <div className='text-sm flex items-center absolute bottom-4 right-4 text-muted-foreground'>
                          <Clock strokeWidth={1.5} className="w-4 h-4 mr-1" />
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
      <div className='flex flex-col items-start space-x-2 '>
        <div className='flex flex-row items-center gap-1 mt-1'>
          <div className=''>
            {React.cloneElement(icon as React.ReactElement, {
              className: 'w-4 h-4',
            })}
          </div>
          <p className='text-sm text-gray-500'>{label}</p>
        </div>
        <div className='flex flex-row items-start gap-1 pl-2'>
          {typeof value === 'string' ? (
            <p className='ml-3 text-sm font-medium'>{value}</p>
          ) : (
            <p className='text-sm '>{value}</p>
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
