/* eslint-disable no-unused-vars */
import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { ListPop } from '@/devlink3/ListPop';
import AssigneeChip from '@/src/components/Tasks/Components/AssigneeChip';
import { useTaskStatesContext } from '@/src/components/Tasks/TaskStatesContext';
import { assigneeType } from '@/src/components/Tasks/utils';

function TaskOwners({
  selectedAssignee,
  setSelectedAssignee,
  onChange,
}: {
  selectedAssignee: assigneeType;
  setSelectedAssignee: (x: assigneeType) => void;
  onChange: any;
}) {
  const { assignerList } = useTaskStatesContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        {selectedAssignee ? (
          <AssigneeChip assigneeId={selectedAssignee.user_id} />
        ) : (
          <Typography variant='caption' fontSize={'14px'}>
            Select Assignee
          </Typography>
        )}
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
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            border: 'none',
          },
        }}
      >
        <ListPop
          slotListCard={(assignerList ?? []).map((ele, i) => {
            return (
              <Stack
                width={'100%'}
                p={'var(--space-1)'}
                key={i}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'var(--neutral-2)',
                  },
                }}
                onClick={() => {
                  setSelectedAssignee(ele);
                  handleClose();
                  if (onChange) {
                    onChange(ele);
                  }
                }}
              >
                <AssigneeChip assigneeId={ele.user_id} />
              </Stack>
            );
          })}
        />
      </Popover>
    </>
  );
}

export default TaskOwners;
