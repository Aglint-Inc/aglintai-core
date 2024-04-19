/* eslint-disable no-unused-vars */
import { Popover, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';

import { PanelMemberPill } from '@/devlink2';
import { ListCard, ListPop } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useJobs } from '@/src/context/JobsContext';

import AssigneeChip from '../../../Components/AssigneeChip';
import { useTaskStatesContext } from '../../../TaskStatesContext';
import { assigneeType, JobCandidatesType } from '../../../utils';

function AssigneeList({
  selectedAssignee,
  setSelectedAssignee,
}: {
  selectedAssignee: assigneeType;
  setSelectedAssignee: (x: assigneeType) => void;
}) {
  const { assignerList } = useTaskStatesContext();
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

export default AssigneeList;
