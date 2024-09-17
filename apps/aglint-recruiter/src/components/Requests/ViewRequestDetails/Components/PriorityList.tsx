import { Popover } from '@mui/material';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import { useRequests } from '@/context/RequestsContext';
import { type Request } from '@/queries/requests/types';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import toast from '@/utils/toast';

function PriorityList({ selectedFilter }: { selectedFilter: string }) {
  const { handleAsyncUpdateRequest } = useRequests();
  const { query } = useRouter();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <UIButton variant='secondary' size='sm' onClick={handleClick}>
        <Pencil className='h-4 w-4' />
      </UIButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className='flex w-[130px] flex-col'>
          {['urgent', 'standard'].map((priority: Request['priority']) => (
            <div
              className='cursor-pointer'
              key={priority}
              onClick={async () => {
                setAnchorEl(null);
                if (selectedFilter !== priority) {
                  await handleAsyncUpdateRequest({
                    payload: {
                      requestId: String(query?.id),
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
            </div>
          ))}
        </div>
      </Popover>
    </>
  );
}

export default PriorityList;
