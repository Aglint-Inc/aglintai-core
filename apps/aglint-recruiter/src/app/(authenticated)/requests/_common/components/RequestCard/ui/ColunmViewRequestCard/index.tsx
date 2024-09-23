import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { cn } from '@lib/utils';
import { type RequestProps } from '@requests/types';
import { getStatusColor } from '@requests/utils';
import { Calendar, User } from 'lucide-react';
import Link from 'next/link';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

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

export default ColumnViewRequestCard;
