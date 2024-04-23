/* eslint-disable no-unused-vars */
import { Button, Popover, Stack } from '@mui/material';
import React from 'react';

import { ListPop, TaskStatus } from '@/devlink3';
import { palette } from '@/src/context/Theme/Theme';
import { CustomDatabase } from '@/src/types/customSchema';

import StatusChip, { colorsData } from '../StatusChip';

function SelectStatus({
  status,
  setSelectedStatus,
  isOptionList = true,
}: {
  status: CustomDatabase['public']['Enums']['task_status'];
  setSelectedStatus: (
    x: CustomDatabase['public']['Enums']['task_status'],
  ) => void;
  isOptionList: boolean;
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
        <StatusChip status={status} />
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
        sx={{
          '& .MuiPaper-outlined': {
            // border: 'none',
            borderRadius: '10px',
          },
        }}
      >
        <Stack spacing={'10px'} p={'10px'} direction={'column'}>
          {colorsData.map(
            (
              {
                backgroundColor,
                id,
                label,
                color,
              }: {
                backgroundColor: string;
                id: CustomDatabase['public']['Enums']['task_status'];
                label: string;
                color: string;
              },
              i,
            ) => {
              return (
                <TaskStatus
                  bgColorProps={{
                    style: {
                      backgroundColor,
                      color,
                      fontWeight: 400,
                    },
                    onClick: () => {
                      setAnchorEl(null);
                      setSelectedStatus(id);
                    },
                  }}
                  key={i}
                  textStatus={label}
                />
              );
            },
          )}
        </Stack>
      </Popover>
    </>
  );
}

export default SelectStatus;
