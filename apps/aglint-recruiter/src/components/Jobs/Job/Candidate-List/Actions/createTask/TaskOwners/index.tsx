/* eslint-disable no-unused-vars */
import {
  EmailAgentId,
  PhoneAgentId,
  SystemAgentId,
} from '@aglint/shared-utils';
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
  hideAgents = false,
  hiringTeamIds = [],
  isOptionList = true,
}: {
  selectedAssignee: assigneeType;
  setSelectedAssignee: (x: assigneeType) => void;
  onChange: any;
  hideAgents?: boolean;
  hiringTeamIds: string[];
  isOptionList?: boolean;
}) {
  const { assignerList } = useTaskStatesContext();
  const specificUserIds = hiringTeamIds;
  const hiringTeam =
    assignerList &&
    assignerList.filter((a) => {
      // Check if a or b are in specificUserIds and sort them to the top
      if (
        specificUserIds.includes(a.user_id) &&
        selectedAssignee?.user_id !== a.user_id
      ) {
        return a;
      }
    });
  const agents =
    assignerList &&
    assignerList.filter((a) => {
      // Check if a or b are in specificUserIds and sort them to the top
      if (
        (a.user_id === EmailAgentId || a.user_id === PhoneAgentId) &&
        selectedAssignee?.user_id !== a.user_id
      ) {
        return a;
      }
    });
  const otherTeam =
    assignerList &&
    assignerList.filter((a) => {
      // Check if a or b are in specificUserIds and sort them to the top
      if (
        !specificUserIds.includes(a.user_id) &&
        !(a.user_id === EmailAgentId || a.user_id === PhoneAgentId) &&
        selectedAssignee?.user_id !== a.user_id
      ) {
        return a;
      }
    });

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
          <AssigneeChip
            disableHoverListener={isOptionList}
            assigneeId={selectedAssignee.user_id}
          />
        ) : (
          <Typography variant='caption' fontSize={'14px'}>
            Select Assignee
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
        <ListPop
          slotListCard={
            <>
              {!hideAgents && (
                <>
                  Agents
                  {(agents ?? []).map((ele, i) => {
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
                </>
              )}
              {hiringTeamIds.length ? (
                <>
                  Hiring Team
                  {(hiringTeam ?? []).map((ele, i) => {
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
                </>
              ) : null}
              Others
              {(otherTeam ?? [])
                .filter((ele) => ele.user_id !== SystemAgentId)
                .map((ele, i) => {
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
            </>
          }
        />
      </Popover>
    </>
  );
}

export default TaskOwners;
