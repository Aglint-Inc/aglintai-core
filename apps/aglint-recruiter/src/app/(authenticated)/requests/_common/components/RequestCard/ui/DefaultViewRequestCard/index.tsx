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
import { type RequestProps } from '@requests/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import React, { type Dispatch, type SetStateAction } from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import IconFlex from './IconFlex';

function DefaultViewRequestCard({
  props,
  isCompactList,
  isExpanded,
  setIsExpanded,
  currentUserId,
}: {
  props: RequestProps;
  isCompactList: boolean;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  currentUserId: string;
}) {
  const { mode = 'expanded' } = props;
  return (
    <Card
      className={cn(
        'duration-400 group border-border transition-all hover:border-foreground/50',
        isCompactList && 'rounded-none border-none shadow-none',
      )}
      data-testid='request-card'
    >
      <div
        className={cn(
          'flex items-center justify-between p-6',
          isCompactList && 'px-2 py-3',
        )}
      >
        <Link
          href={`/requests/${props.id}`}
          passHref
          className='flex-grow cursor-pointer'
        >
          <div className='flex cursor-pointer items-center space-x-2 hover:underline'>
            <Label
              className={cn(
                'text-md line-clamp-1 flex-grow cursor-pointer whitespace-normal break-words',
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
            'space-y-4 p-6 pt-0',
            isCompactList && 'space-y-2 bg-gray-50 p-2',
          )}
        >
          <div className={`flex flex-col gap-4`}>
            <div className='flex flex-row gap-6'>
              <IconFlex icon='CircleDashed' size={16}>
                <Badge
                  className={`rounded-md text-sm font-normal ${props.status === 'to_do' ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white' : ''} ${props.status === 'in_progress' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:dark:text-white' : ''} ${props.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:dark:text-white' : ''} `}
                >
                  {capitalizeFirstLetter(props.status)}
                </Badge>
              </IconFlex>
              <IconFlex icon='Tag' size={16}>
                <Badge className='rounded-md bg-muted text-sm font-normal text-foreground'>
                  {capitalizeFirstLetter(props.type)}
                </Badge>
              </IconFlex>
              <IconFlex icon='CalendarClock' size={18}>
                <div className='text-sm'>
                  {props.request_relation.length > 0}
                  {dayjsLocal(props.schedule_start_date).format('MMMM D, YYYY')}
                </div>
              </IconFlex>
            </div>
            <div className='flex flex-row gap-6'>
              <IconFlex icon='UserSquare' size={16}>
                <div className='flex items-center gap-1.5'>
                  {props.request_relation.map((ele, index) => (
                    <Badge
                      key={index}
                      variant={'secondary'}
                      className='rounded-md text-sm font-normal hover:bg-muted/80'
                    >
                      <Link
                        href={`/application/${props.application_id}/sessions/${ele.interview_session?.id}`}
                        className='hover:no-underline'
                      >
                        {ele.interview_session?.name}
                      </Link>
                    </Badge>
                  ))}
                </div>
              </IconFlex>
            </div>
            <div className='flex flex-row gap-6'>
              <IconFlex icon='Briefcase' size={16}>
                <Link
                  href={`/job/${props?.applications?.public_jobs?.id}`}
                  className='text-sm hover:underline'
                >
                  {props?.applications?.public_jobs?.job_title}
                </Link>
              </IconFlex>
              <IconFlex icon='User' size={16}>
                <Link
                  href={`/candidate/${props?.applications?.candidates?.id}`}
                  className='hover:underline'
                >
                  {getFullName(
                    props?.applications?.candidates?.first_name ?? '',
                    props?.applications?.candidates?.last_name ?? '',
                  )}
                </Link>
              </IconFlex>
            </div>
            <div className='flex flex-row gap-6'>
              <IconFlex icon='CircleUser' size={16}>
                <span className='mr-2 text-sm'>Assigned to</span>
                <Link
                  href={`/user/${props.assignee_id}`}
                  target='_blank'
                  className='text-sm hover:underline'
                >
                  {getFullName(
                    props?.assignee?.first_name ?? '',
                    props?.assignee?.last_name ?? '',
                  )}
                  {props.assignee_id === currentUserId ? ' (You)' : ''}
                </Link>
              </IconFlex>
              <IconFlex icon='FileInput' size={16}>
                <span className='mr-2 text-sm'>Requested by</span>
                <Link
                  href={`/user/${props.assigner_id}`}
                  target='_blank'
                  className='text-sm hover:underline'
                >
                  {getFullName(
                    props?.assigner?.first_name ?? '',
                    props?.assigner?.last_name ?? '',
                  )}
                  {props.assigner_id === currentUserId ? ' (You)' : ''}
                </Link>
                <span className='mr-1 text-sm'>,</span>
                <span className='text-sm'>
                  {' '}
                  {dayjsLocal(props.updated_at).fromNow()}{' '}
                </span>
              </IconFlex>
            </div>
            {props.request_note[0]?.note && (
              <div className='flex flex-row gap-6'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className='pt-[10px]'>
                      <IconFlex icon='StickyNote' size={16}>
                        <p className='line-clamp-1 max-w-[500px] items-start text-sm'>
                          {props.request_note[0].note}
                        </p>
                      </IconFlex>
                    </TooltipTrigger>
                    <TooltipContent className='max-w-[500px]'>
                      <p className='text-sm'>{props.request_note[0].note}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default DefaultViewRequestCard;

// const InfoItem = ({
//   icon,
//   label,
//   value,
//   variant = 'row', // Added variant prop
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: React.ReactNode;
//   variant?: 'row' | 'column'; // Added variant type
// }) => {
//   if (variant === 'column') {
//     return (
//       <div className='flex flex-col items-start space-x-2'>
//         <div className='mt-1 flex flex-row items-center gap-1'>
//           <div>
//             {React.cloneElement(icon as React.ReactElement, {
//               className: 'w-4 h-4',
//             })}
//           </div>
//           <p className='text-sm text-muted-foreground'>{label}</p>
//         </div>
//         <div className='flex flex-row items-start gap-1 pl-2'>
//           {typeof value === 'string' ? (
//             <p className='ml-3 text-sm font-medium'>{value}</p>
//           ) : (
//             <p className='text-sm'>{value}</p>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // Default row layout
//   return (
//     <div className='flex items-start space-x-2'>
//       <div className='mt-0.5'>
//         {React.cloneElement(icon as React.ReactElement, {
//           className: 'w-3 h-3',
//         })}
//       </div>
//       <div className='flex flex-row items-center gap-2'>
//         <p className='text-2xs text-muted-foreground'>{label}</p>
//         {typeof value === 'string' ? (
//           <p className='text-xs font-medium'>{value}</p>
//         ) : (
//           value
//         )}
//       </div>
//     </div>
//   );
// };
