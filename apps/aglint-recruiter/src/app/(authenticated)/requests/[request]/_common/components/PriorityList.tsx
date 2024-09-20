import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { Pencil } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import { useRequests } from '@/context/RequestsContext';
import { type Request } from '@/queries/requests/types';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import toast from '@/utils/toast';

function PriorityList({ selectedFilter }: { selectedFilter: string }) {
  const { handleAsyncUpdateRequest } = useRequests();
  const params = useParams();
  const requestId = params?.request as string;

  const [, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <UIButton variant='secondary' size='sm' onClick={handleClick}>
        <Pencil className='h-4 w-4' />
      </UIButton>
      <Popover>
        <PopoverTrigger asChild>
          <UIButton variant='secondary' size='sm'>
            <Pencil className='h-4 w-4' />
          </UIButton>
        </PopoverTrigger>
        <PopoverContent className='w-[130px] p-0'>
          <div className='flex flex-col'>
            {['urgent', 'standard'].map((priority: Request['priority']) => (
              <PopoverClose asChild key={priority}>
                <button
                  className='w-full cursor-pointer p-2 hover:bg-gray-100'
                  onClick={async () => {
                    if (selectedFilter !== priority) {
                      await handleAsyncUpdateRequest({
                        payload: {
                          requestId: requestId,
                          requestPayload: {
                            priority: priority,
                          },
                        },
                        loading: false,
                        toast: false,
                      });
                      toast.success('Request priority updated successfully');
                    }
                  }}
                >
                  <UIBadge
                    iconName={priority === 'urgent' ? 'ShieldAlert' : null}
                    color={priority === 'urgent' ? 'warning' : 'neutral'}
                    textBadge={capitalizeFirstLetter(priority)}
                  />
                </button>
              </PopoverClose>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default PriorityList;
