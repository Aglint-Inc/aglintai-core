/* eslint-disable no-unused-vars */
import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import { CustomDatabase } from '@/src/types/customSchema';

import StatusChip, { statusList } from '../StatusChip';

function SelectStatus({
  status,
  setSelectedStatus,
  isOptionList = true,
  onChange,
}: {
  status: CustomDatabase['public']['Enums']['task_status'];
  setSelectedStatus: (
    x: CustomDatabase['public']['Enums']['task_status'],
  ) => void;
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
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPaper-outlined': {
            // border: 'none',
            borderRadius: '10px',
          },
        }}
      >
        <Stack width={150} spacing={'10px'} p={'10px'}>
          {statusList
            .filter((ele) => !['failed'].includes(ele.id))
            .map(
              (
                {
                  id,
                }: {
                  id: CustomDatabase['public']['Enums']['task_status'];
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
