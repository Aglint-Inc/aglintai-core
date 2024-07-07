/* eslint-disable no-unused-vars */
import {
  EmailAgentId,
  PhoneAgentId,
  SystemAgentId,
} from '@aglint/shared-utils';
import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { ListPop } from '@/devlink3/ListPop';

import AssigneeChip from '../../../Components/AssigneeChip';
import { useTaskStatesContext } from '../../../TaskStatesContext';
import { assigneeType } from '../../../utils';

function AssigneeList({
  selectedAssignee,
  setSelectedAssignee,
  onChange,
  isOptionList = true,
  hideAgents = false,
}: {
  selectedAssignee: assigneeType;
  setSelectedAssignee: (x: assigneeType) => void;
  onChange?: any;
  isOptionList?: boolean;
  hideAgents?: boolean;
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
        direction={'row'}
        sx={{
          cursor: 'pointer',
          width: '100%',
        }}
        onClick={handleClick}
      >
        {selectedAssignee ? (
          <AssigneeChip
            disableHoverListener={isOptionList}
            assigneeId={selectedAssignee.user_id}
          />
        ) : (
          <Typography variant='caption' fontSize={'14px'}>
            Select an agent or member
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
        <ListPop
          slotListCard={assignerList.map((ele, i) => {
            if (
              hideAgents &&
              (ele.user_id === EmailAgentId ||
                ele.user_id === PhoneAgentId ||
                ele.user_id === SystemAgentId)
            )
              return null;
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
                <AssigneeChip
                  disableHoverListener={true}
                  assigneeId={ele.user_id}
                />
              </Stack>
            );
          })}
        />
      </Popover>
    </>
  );
}

export default AssigneeList;
