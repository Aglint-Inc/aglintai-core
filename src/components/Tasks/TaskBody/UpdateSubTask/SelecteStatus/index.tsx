/* eslint-disable no-unused-vars */
import { Button, Popover, Stack } from '@mui/material';
import React from 'react';

import { TaskStatus } from '@/devlink3';
import { CustomDatabase } from '@/src/types/customSchema';

import StatusChip from '../../../Components/StatusChip';

function SelectStatus({
  status,
  setSelectedStatus,
}: {
  status: CustomDatabase['public']['Enums']['sub_task_status'];
  setSelectedStatus: (
    x: CustomDatabase['public']['Enums']['sub_task_status'],
  ) => void;
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
      <Button variant='text' onClick={handleClick}>
        <StatusChip status={status} />
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
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
        <Stack direction={'column'}>
          {[
            { status: 'pending', backgroundColor: '#FFF7ED' },
            { status: 'in_progress', backgroundColor: '#CEE2F2' },
            { status: 'completed', backgroundColor: '#D1E8DF' },
            { status: 'closed', backgroundColor: '#E9EBED' },
          ].map(
            (
              {
                backgroundColor,
                status,
              }: {
                backgroundColor: string;
                status: CustomDatabase['public']['Enums']['sub_task_status'];
              },
              i,
            ) => {
              return (
                <Button
                  onClick={() => {
                    setAnchorEl(null);
                    setSelectedStatus(status);
                  }}
                  sx={{
                    justifyContent: 'start',
                  }}
                  startIcon={
                    <TaskStatus
                      bgColorProps={{
                        style: { backgroundColor },
                      }}
                      key={i}
                      textStatus={status}
                    />
                  }
                  key={i}
                ></Button>
              );
            },
          )}
        </Stack>
      </Popover>
    </>
  );
}

export default SelectStatus;
