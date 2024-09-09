import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils';

import type { Request as RequestType } from '@/queries/requests/types';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { Notebook } from 'lucide-react';
import Link from 'next/link';
import { getStatusColor } from '../../utils/getStatusColor';
import MoreOptions from './MoreOptions';
import RequestDetails from './RequestDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';

type RequestProps = RequestType & { isExpanded?: boolean };

export const RequestCard = ({
  index,
  ...props
}: RequestProps & { index: number }) => {
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
                <MoreOptions request_id={props.id} />
              </div>
            </div>
          </CardHeader>
          <CardContent className='p-3'>
            <div onClick={(e) => e.stopPropagation()}>
              <RequestDetails request={props} index={index} />
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
