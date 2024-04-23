/* eslint-disable no-unused-vars */
import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { ListPop } from '@/devlink3';
import AssigneeChip, {
  useInterviewerList,
} from '@/src/components/Tasks/Components/AssigneeChip';
import { assigneeType } from '@/src/components/Tasks/utils';

function TaskOwners({
  selectedAssignee,
  setSelectedAssignee,
}: {
  selectedAssignee: assigneeType;
  setSelectedAssignee: (x: assigneeType) => void;
}) {
  const { data: members } = useInterviewerList();

  let assignerList = members
    .map((ele) => ele.rec_user)
    .filter((ele) => ele.first_name)
    .map((item) => {
      return { ...item, assignee: 'Interviewers' };
    }) as assigneeType[];
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
          slotListCard={assignerList.map((ele, i) => {
            return (
              <Stack
                width={'100%'}
                p={'4px'}
                key={i}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
                onClick={() => {
                  setSelectedAssignee(ele);
                  handleClose();
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
