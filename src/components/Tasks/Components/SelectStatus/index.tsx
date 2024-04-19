/* eslint-disable no-unused-vars */
import { Button, Popover, Stack } from '@mui/material';
import React from 'react';

import { TaskStatus } from '@/devlink3';
import { CustomDatabase } from '@/src/types/customSchema';

import StatusChip from '../StatusChip';

function SelectStatus({
  status,
  setSelectedStatus,
}: {
  status: CustomDatabase['public']['Enums']['task_status'];
  setSelectedStatus: (
    x: CustomDatabase['public']['Enums']['task_status'],
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
      <Stack onClick={handleClick}>
        <StatusChip status={status} />
      </Stack>

      <Popover
        id={id}
        open={open}
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
        <Stack direction={'column'}>
          {[
            {
              status: 'not_started',
              backgroundColor: '#e9ebed',
              label: 'Not Started',
              color: '#49545c',
            },
            {
              status: 'in_progress',
              backgroundColor: '#CEE2F2',
              label: 'In Progress',
              color: '#337FBD',
            },
            {
              status: 'completed',
              backgroundColor: '#D1E8DF',
              label: 'completed',
              color: '#228F67',
            },
            {
              status: 'closed',
              backgroundColor: '#f5d5d8',
              label: 'closed',
              color: '#CC3340',
            },
          ].map(
            (
              {
                backgroundColor,
                status,
                label,
                color,
              }: {
                backgroundColor: string;
                status: CustomDatabase['public']['Enums']['task_status'];
                label: string;
                color: string;
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
                        style: {
                          backgroundColor,
                          color,
                          fontWeight: 400,
                        },
                      }}
                      key={i}
                      textStatus={label}
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
