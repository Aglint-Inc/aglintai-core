/* eslint-disable no-unused-vars */
import { type DatabaseEnums, type DB } from '@aglint/shared-types';
import { Popover, Stack } from '@mui/material';
import React from 'react';

import { InterviewTaskPill } from '@/devlink3/InterviewTaskPill';
import { ListCard } from '@/devlink3/ListCard';
import { ListPop } from '@/devlink3/ListPop';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

function TypeList({
  selectedType,
  setSelectedType,
}: {
  selectedType: DB['public']['Enums']['task_type_enum'];
  setSelectedType: (x: DB['public']['Enums']['task_type_enum']) => void;
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
        <InterviewTaskPill
          textInterviewName={capitalizeFirstLetter(selectedType)}
        />
      </Stack>
      <Popover
        id={id}
        open={open}
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
            height: '100px',
            width: '300px',
          },
        }}
      >
        <Stack bgcolor={'#fff'} p={0.5} overflow={'scroll'} height={'100%'}>
          {typeArray.map((ele, i) => {
            return (
              <Stack
                key={i}
                width={'100%'}
                px={1}
                py={0.5}
                borderRadius={`6px`}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'var(--neutral-2)',
                  },
                }}
                onClick={() => {
                  setSelectedType(ele as DatabaseEnums['task_type_enum']);
                  handleClose();
                }}
              >
                <ListCard textList={capitalizeFirstLetter(ele)} />
              </Stack>
            );
          })}
        </Stack>
      </Popover>
    </>
  );
}

export default TypeList;

export const typeArray = [
  // 'training',
  'schedule',
  'self_schedule',
  'availability',
  // 'empty',
] as DatabaseEnums['task_type_enum'][];
