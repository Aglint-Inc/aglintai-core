/* eslint-disable no-unused-vars */
import { Popover, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';

import { InterviewTaskPill, PriorityOption, PriorityPill } from '@/devlink3';
import { CustomDatabase } from '@/src/types/customSchema';

function PriorityList({
  selectedPriority,
  setSelectedPriority,
  isOptionList = true,
  onChange,
}: {
  selectedPriority: CustomDatabase['public']['Enums']['task_priority'];
  setSelectedPriority: (
    x: CustomDatabase['public']['Enums']['task_priority'],
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
      <Stack
        sx={{
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {selectedPriority ? (
          <PriorityPill
            isHighVisible={selectedPriority === 'high'}
            isLowVisible={selectedPriority === 'low'}
            isMediumVisible={selectedPriority === 'medium'}
          />
        ) : (
          <Typography variant='caption' fontSize={'14px'}>
            Select priority
          </Typography>
        )}
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
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            border: 'none',
          },
        }}
      >
        <PriorityOption
          textScheduleHigh={<></>}
          textScheduleLow={<></>}
          textScheduleMedium={<></>}
          onClickHigh={{
            onClick: () => {
              setSelectedPriority('high');
              setAnchorEl(null);
              if (onChange) {
                onChange('high');
              }
            },
          }}
          onClickLow={{
            onClick: () => {
              setSelectedPriority('low');
              setAnchorEl(null);
              if (onChange) {
                onChange('low');
              }
            },
          }}
          onClickMedium={{
            onClick: () => {
              setSelectedPriority('medium');
              setAnchorEl(null);
              if (onChange) {
                onChange('medium');
              }
            },
          }}
        />
      </Popover>
    </>
  );
}

export default PriorityList;
