/* eslint-disable no-unused-vars */
import { type DB } from '@aglint/shared-types';
import { Popover, selectClasses, Stack, Typography } from '@mui/material';
import React from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';

import StatusChip, { statusList } from '../StatusChip';

function SelectStatus({
  status,
  setSelectedStatus,
  isOptionList = true,
  onChange,
}: {
  status: DB['public']['Enums']['task_status'];
  setSelectedStatus: (x: DB['public']['Enums']['task_status']) => void;
  isOptionList?: boolean;
  onChange?: any;
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Stack onClick={handleClick}>
        <ShowCode>
          <ShowCode.When isTrue={Boolean(status)}>
            <StatusChip arrowDown={true} status={status} />
          </ShowCode.When>
          <ShowCode.Else>
            <Typography
              sx={{
                cursor: 'pointer',
              }}
              variant='caption'
              fontSize={'14px'}
            >
              Select new status
            </Typography>
          </ShowCode.Else>
        </ShowCode>
      </Stack>

      <Popover
        id={id}
        open={open && isOptionList}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        // sx={{
        //   '& .MuiPaper-outlined': {
        //     // border: 'none',
        //     borderRadius: 'var(--radius-4)',
        //   },
        // }}
      >
        <Stack
          bgcolor={'#fff'}
          width={150}
          spacing={'var(--space-2)'}
          p={'var(--space-2)'}
        >
          {statusList
            .filter((ele) => !['failed'].includes(ele.id))
            .map(
              (
                {
                  id,
                }: {
                  id: DB['public']['Enums']['task_status'];
                },
                i,
              ) => {
                return (
                  <Stack
                    onClick={() => {
                      setAnchorEl(null);
                      setSelectedStatus(id);
                      if (onChange) onChange(id);
                    }}
                    direction={'row'}
                    key={i}
                  >
                    <StatusChip status={id} />
                  </Stack>
                );
              },
            )}
        </Stack>
      </Popover>
    </>
  );
}

export default SelectStatus;
