import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { type RequestProps } from '@requests/types';
import { Calendar, User } from 'lucide-react';
import Link from 'next/link';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

const ColumnViewRequestCard = ({ ...props }: RequestProps) => {
  return (
    <Card className='group w-full cursor-pointer p-3 transition-shadow duration-300'>
      <Link href={`/requests/${props.id}`} passHref>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label className='line-clamp-1 text-xs font-medium'>
              {props.title}
            </Label>
            {/* <RequestOverflowMenu request_id={props.id} /> */}
          </div>
          <div className='flex flex-wrap gap-1'>
          <Badge
              variant={
                props?.status === 'to_do'
                  ? 'secondary'
                  : props?.status === 'in_progress'
                    ? 'in_progress'
                    : props?.status === 'completed'
                      ? 'completed'
                      : 'destructive'
              }
              className='text-xs font-medium'
            >
              {capitalizeFirstLetter(props.status)}
            </Badge>
            <Badge
             className='text-xs font-medium'
              variant={
                props?.type === 'decline_request' ? 'destructive' : 'secondary'
              }
            >
              {capitalizeFirstLetter(props.type)}
            </Badge>
           
          </div>
          <div className='text-xs flex items-center gap-2'>
            <div className='flex items-center'>
              <Calendar className='mr-1 h-3 w-3' />
              {dayjsLocal(props.schedule_start_date).format('MMM D, YYYY')}
            </div>
            <div className='flex items-center'>
              <User className='mr-1 h-3 w-3' />
              {getFullName(
                props.applications?.candidates?.first_name ?? '',
                props.applications?.candidates?.last_name ?? '',
              )}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ColumnViewRequestCard;
