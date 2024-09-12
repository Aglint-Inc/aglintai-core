import { IconButtonSoft } from '@devlink3/IconButtonSoft';
import { Popover, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { UIBadge } from '@/components/Common/UIBadge';
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
      <IconButtonSoft
        onClickButton={{
          onClick: handleClick,
        }}
        iconName={'edit_square'}
        color={'neutral'}
        size={1}
      />
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
        <Stack
          width={'130px'}
          padding={1}
          spacing={1}
          sx={{
            display: 'flex',
            alignItems: 'self-start',
          }}
        >
          {['urgent', 'standard'].map((priority: Request['priority']) => (
            <Stack
              sx={{
                cursor: 'pointer',
              }}
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
              direction={'row'}
              gap={1}
            >
              <UIBadge
                iconName={priority === 'urgent' ? 'ShieldAlert' : null}
                color={priority === 'urgent' ? 'warning' : 'neutral'}
                textBadge={capitalizeFirstLetter(priority)}
              />
            </Stack>
          ))}
        </Stack>
      </Popover>
    </>
  );
}

export default PriorityList;
