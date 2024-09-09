import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils';

import type { Request as RequestType } from '@/queries/requests/types';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { getStatusColor } from '../../utils';
import MoreOptions from './MoreOptions';
import RequestDetails from './RequestDetails';
import { Notebook } from 'lucide-react';
import Link from 'next/link';

type RequestProps = RequestType & { isExpanded?: boolean };

export const RequestCard = ({
  isExpanded = false,
  index,
  ...props
}: RequestProps & { index: number }) => {
  const [isOpen, setIsOpen] = useState(isExpanded);

  return (
    <div>
      <Collapsible
        open={isOpen}
        onOpenChange={(open) => {
          if (!isExpanded) {
            setIsOpen(open);
          }
        }}
      >
        <Link href={`/requests/${props.id}`} passHref>
          <div className='flex flex-col cursor-pointer border border-neutral-200 p-3 rounded-lg hover:bg-gray-50'>
            <div className='flex justify-between items-center'>
              <h3 className='text-normak font-semibold'>{props.title}</h3>
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
            <div className='flex justify-between items-center mt-2'>
              {props?.request_note[0]?.note && (
                <div className='text-sm text-gray-600'>
                  <Notebook className='w-4 h-4 inline-block mr-1' />
                  {props.request_note[0].note}
                </div>
              )}
              {!isExpanded && (
                <CollapsibleTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsOpen(!isOpen);
                    }}
                  >
                    {isOpen ? 'View Less' : 'View More'}
                  </Button>
                </CollapsibleTrigger>
              )}
            </div>
            <CollapsibleContent>
              <div onClick={(e) => e.stopPropagation()}>
                <RequestDetails request={props} index={index} />
              </div>
            </CollapsibleContent>
          </div>
        </Link>
      </Collapsible>
    </div>
  );
};
