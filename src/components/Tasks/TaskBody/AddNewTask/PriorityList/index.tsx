/* eslint-disable no-unused-vars */
import { Popover, Stack } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';

import { InterviewTaskPill, PriorityOption, PriorityPill } from '@/devlink3';
import { CustomDatabase } from '@/src/types/customSchema';

function PriorityList({
  selectedPriority,
  setSelectedPriority,
  isOptionList = true,
}: {
  selectedPriority: CustomDatabase['public']['Enums']['task_priority'];
  setSelectedPriority: (
    x: CustomDatabase['public']['Enums']['task_priority'],
  ) => void;
  isOptionList?: boolean;
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
        <PriorityPill
          isHighVisible={selectedPriority === 'high'}
          isLowVisible={selectedPriority === 'low'}
          isMediumVisible={selectedPriority === 'medium'}
        />
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
            },
          }}
          onClickLow={{
            onClick: () => {
              setSelectedPriority('low');
              setAnchorEl(null);
            },
          }}
          onClickMedium={{
            onClick: () => {
              setSelectedPriority('medium');
              setAnchorEl(null);
            },
          }}
        />
      </Popover>
    </>
  );
}

export default PriorityList;
