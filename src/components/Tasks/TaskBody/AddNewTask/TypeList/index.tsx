/* eslint-disable no-unused-vars */
import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';

import { InterviewTaskPill } from '@/devlink3';
import { CustomDatabase } from '@/src/types/customSchema';

function TypeList({
  selectedType,
  setSelectedType,
}: {
  selectedType: CustomDatabase['public']['Enums']['task_type_enum'];
  setSelectedType: (
    x: CustomDatabase['public']['Enums']['task_type_enum'],
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
      <Stack
        sx={{
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <InterviewTaskPill textInterviewName={capitalize(selectedType)} />
      </Stack>
      {/* <Popover
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
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            border: 'none',
          },
        }}
      >
        <ListPop
          slotListCard={['schedule', 'training'].map((ele, i) => {
            return (
              <Stack
                key={i}
                width={'100%'}
                p={'4px'}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
                onClick={() => {
                  setSelectedType(
                    ele as CustomDatabase['public']['Enums']['task_type_enum'],
                  );
                  handleClose();
                }}
              >
                <ListCard textList={capitalize(ele)} />
              </Stack>
            );
          })}
        />
      </Popover> */}
    </>
  );
}

export default TypeList;
