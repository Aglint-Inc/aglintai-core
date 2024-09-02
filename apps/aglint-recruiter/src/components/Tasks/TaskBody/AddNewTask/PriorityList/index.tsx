/* eslint-disable no-unused-vars */
import { type DB } from '@aglint/shared-types';
import { Popover, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';

import { InterviewTaskPill } from '@/devlink3/InterviewTaskPill';
import { PriorityOption } from '@/devlink3/PriorityOption';
import { PriorityPill } from '@/devlink3/PriorityPill';

function PriorityList({
  selectedPriority,
  setSelectedPriority,
  isOptionList = true,
  onChange,
}: {
  selectedPriority: DB['public']['Enums']['task_priority'];
  setSelectedPriority?: (x: DB['public']['Enums']['task_priority']) => void;
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
          width: '100%',
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
            Select new priority
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
          horizontal: 'left',
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
